import { Profile } from '../../models/user/profile.model';
import { ApiServiceResponse } from '../../utils/api-response';
import { UploadedFiles, UploadedFilesService } from '../../types/files';
import { IProfile } from '../../types/user';

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
  ): Promise<ApiServiceResponse<IProfile>> {
    const profile = await Profile.findOne({ user: user_id });

    return { status: 200, data: profile?.toObject() };
  }
}
