import { Auth } from '../../models/user/auth.model';
import { Profile } from '../../models/user/profile.model';
import { bcryptHasher } from '../../utils/bcrypt';
import { ApiServiceResponse } from '../../utils/api-response';
import logger from '../../utils/logger';
import { authResFactory } from '../../utils/auth-res-factory';
import { startTransaction } from '../../database/db-transaction';
import {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
  RequestVerCodeRequest,
  VerifyVerCodeRequest,
} from '../../dtos/user/auth.dto';
import fs from 'fs';
import path from 'path';
import { TokenAction } from '../../utils/token-action';
import { transporter } from '../../utils/nodemailer-transporter';
import { nodemailerConfig } from '../../config';
import { UploadedFiles, UploadedFilesService } from '../../interfaces/files';
import Cloudinary from '../../utils/cloudinary';

export default class AuthServices {
  // =============================================
  // Request verification Code
  // =============================================
  private assetDelivery() {
    const assetPath: string[] = ['../../assets/logo.png'];
    const singlePath = assetPath.map(idx => path.resolve(__dirname, idx)); // eslint-disable-line no-undef
    const images = singlePath.map(idx => fs.readFileSync(idx));
    const attachments: any[] = []; // eslint-disable-line @typescript-eslint/no-explicit-any

    images.map((file, index) => {
      attachments.push({
        filename: `Attachment-${index}.jpg`,
        content: file,
        cid: `Attachment-${index}`,
      });
    });

    return attachments;
  }

  public async requestVerCodeService(
    user: RequestVerCodeRequest,
  ): Promise<ApiServiceResponse<string>> {
    const { email, phone_number, user_name } = user;

    const [existing_user, existing_profile] = await Promise.all([
      Auth.findOne({ $or: [{ email }, { user_name }] }),
      Profile.findOne({ phone_number }),
    ]);
    if (existing_user || existing_profile) {
      return { status: 400, msg: 'Invalid credentials' };
    }

    const token = await TokenAction.generateSecretAndToken(email);

    const templatePath = path.join(
      __dirname, // eslint-disable-line no-undef
      '..',
      '..',
      'view',
      'verification_code.html',
    );
    const htmlContent = fs.readFileSync(templatePath, 'utf8');

    await transporter.sendMail({
      from: `Whispr ${nodemailerConfig.user}`,
      to: email,
      subject: 'Verification code for your Whispr account',
      html: htmlContent.replace('${token}', token),
      attachments: this.assetDelivery(),
    });

    return {
      status: 200,
      data: 'Your verification code has been sent to your email!',
    };
  }

  // =============================================
  // Verify the verification code
  // =============================================
  public async verifyVerCodeService(
    user: VerifyVerCodeRequest,
  ): Promise<ApiServiceResponse<boolean>> {
    const { email, token } = user;

    const token_validates = await TokenAction.validateToken(email, token);

    if (!token_validates) {
      return { status: 401, msg: 'Invalid/Expired token!' };
    }

    return {
      status: 200,
      data: token_validates,
    };
  }

  // =============================================
  // Register new user
  // =============================================
  public async registerUserService(
    files: UploadedFiles,
    user: RegisterRequest,
  ): Promise<ApiServiceResponse<{ token: string; user: AuthResponse }>> {
    const { email, password, user_name, full_name, bio, phone_number } = user;

    const { profile_picture } =
      files as UploadedFilesService<'profile_picture'>;

    const [existing_user, existing_profile] = await Promise.all([
      Auth.findOne({ email }),
      Profile.findOne({ $or: [{ phone_number }, { user_name }] }),
    ]);

    if (existing_user || existing_profile) {
      await Cloudinary.cleanUpCloudinary(files);
      return { status: 400, msg: 'Existing/Invalid credentials' };
    }

    let new_user;
    let profile;
    let payload;

    await startTransaction(async session => {
      new_user = await Auth.create(
        [{ email, password: await bcryptHasher.hashPasswordHandler(password) }],
        { session },
      );

      profile = await Profile.create(
        [
          {
            user: new_user[0]._id,
            user_name,
            full_name,
            phone_number,
            bio,
            profile_picture: profile_picture?.[0]?.path,
          },
        ],
        { session },
      );

      payload = {
        user_id: new_user[0]._id.toString(),
      };
    });

    const { status, data } = await authResFactory(
      // @ts-expect-error dbSession
      payload,
      new_user?.[0],
      profile?.[0],
    );
    return { status, data };
  }

  // =============================================
  // User login
  // =============================================
  public async loginUserService(
    user: LoginRequest,
  ): Promise<ApiServiceResponse<{ token: string; user: AuthResponse }>> {
    const { email, password } = user;

    const check_user = await Auth.findOne({ email });
    if (check_user === null) {
      return { status: 401, msg: 'Invalid credentials!' };
    }
    if (check_user?.banned) {
      return { status: 403, msg: 'Forbidden Access' };
    }

    const user_profile = await Profile.findOne({
      user: check_user._id,
    });

    if (user_profile === null) {
      logger.warn('User profile not found');
      return {
        status: 401,
        msg: 'You cannot login at the moment, please contact an admin!',
      };
    }

    const is_password_match = await bcryptHasher.comparePassword(
      password,
      check_user?.password,
    );

    if (!is_password_match) {
      return { status: 400, msg: 'Invalid credentials!' };
    }

    const { status, data } = authResFactory(
      { user_id: check_user._id.toString() },
      check_user,
      user_profile,
    );
    return { status, data };
  }
}
