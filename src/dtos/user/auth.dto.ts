import { IProfile, IAuth } from '../../interfaces/user';

export class AuthResponse {
  user_id?: string;
  email?: string;
  user_name?: string;
  full_name?: string;
  phone_number?: string;
  bio?: string;
  profile_picture?: string;

  static createResponse(auth: IAuth, profile: IProfile): AuthResponse {
    return {
      email: auth.email,
      user_id: auth._id.toString(),
      user_name: profile.user_name,
      full_name: profile.full_name,
      phone_number: profile.phone_number,
      bio: profile.bio,
      profile_picture: profile.profile_picture,
    };
  }
}

export interface RequestVerCodeRequest {
  email: string;
  phone_number: string;
  user_name: string;
}

export interface VerifyVerCodeRequest {
  token: string;
  email: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest extends LoginRequest {
  user_name: string;
  full_name: string;
  phone_number: string;
  bio: string;
  profile_picture?: string;
}
