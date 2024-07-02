import { Profile } from '../../models/user/profile.model';
import { ApiServiceResponse } from '../../utils/api-response';
import { UploadedFiles, UploadedFilesService } from '../../interfaces/files';
import { IProfile } from '../../interfaces/user';
import { AuthResponse } from '../../dtos/user/auth.dto';
import { Auth } from '../../models/user/auth.model';

export default class ProfileServices {
  public async updateUserProfileService(
    files: UploadedFiles,
    user_id: string,
  ): Promise<ApiServiceResponse<IProfile>> {
    const profile = await Profile.findOne({ user: user_id });
    const { profile_picture } =
      files as UploadedFilesService<'profile_picture'>;

    return { status: 200, data: profile?.toObject() };
  }

  public async getUserProfileService(
    user_id: string,
  ): Promise<ApiServiceResponse<AuthResponse>> {
    const [user, profile] = await Promise.all([
      Auth.findById(user_id),
      Profile.findOne({ user: user_id }),
    ]);

    const response = AuthResponse.createResponse(
      user!.toObject(),
      profile!.toObject(),
    );

    return { status: 200, data: response };
  }
}
