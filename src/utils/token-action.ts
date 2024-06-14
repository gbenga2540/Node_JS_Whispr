import speakeasy from '@levminer/speakeasy';
import { Token } from '../models/user/token.model';

export class TokenAction {
  static async generateSecretAndToken(email: string | undefined) {
    const secret = await speakeasy.generateSecret({
      length: 20,
      otpauth_url: false,
    });

    const token = speakeasy.totp({
      secret: secret.base32,
      encoding: 'base32',
      digits: 4,
      algorithm: 'sha256',
      step: 300,
    });

    await Token.deleteMany({ email });
    await Token.create({
      email,
      base32: secret.base32,
    });

    return token;
  }

  static async validateToken(email: string, token: string) {
    const token_instance = await Token.findOne({ email });
    if (token_instance) {
      const token_validates = await speakeasy.totp.verify({
        secret: token_instance.base32,
        encoding: 'base32',
        token: token,
        digits: 4,
        algorithm: 'sha256',
        window: 10,
        step: 300,
      });

      return token_validates;
    } else {
      return false;
    }
  }
}
