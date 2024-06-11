import bcrypt, { genSaltSync } from 'bcryptjs';
import logger from './logger';

/* eslint-disable no-unused-vars */
export interface Hasher {
  hashPasswordHandler(password: string): Promise<string>;
  comparePassword(password: string, hash: string): Promise<boolean>;
}
/* eslint-enable no-unused-vars */

class BCryptHasher implements Hasher {
  public async hashPasswordHandler(password: string): Promise<string> {
    try {
      const hash = await bcrypt.hashSync(password, genSaltSync(10));
      return hash;
    } catch (error) {
      logger.error(`Failed to hash password: ${error}`);
      throw error;
    }
  }

  public async comparePassword(
    password: string,
    hash: string,
  ): Promise<boolean> {
    try {
      const isPasswordValid = await bcrypt.compareSync(password, hash);
      return isPasswordValid;
    } catch (error) {
      logger.error(`Could not compare passwords: ${error}`);
      return false;
    }
  }
}

export const hasher: BCryptHasher = new BCryptHasher();
