import { IProfile, IUser } from '../../types/user';

export interface LoginRequest {
  email: string;
  password: string;
}
export interface RegisterRequest extends LoginRequest {
  user_name: string;
}

export class AuthResponse {
  user_id?: string;
  email?: string;
  user_name?: string;

  static createResponse(user: IUser, profile: IProfile): AuthResponse {
    return {
      email: user.email,
      user_id: user._id.toString(),
      user_name: profile.user_name,
    };
  }
}
