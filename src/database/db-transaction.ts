import { ClientSession } from 'mongoose';
import { dbConnection } from './index';

export async function startTransaction(
  // eslint-disable-next-line no-unused-vars
  cb: (session: ClientSession) => Promise<void>,
) {
  const session = await dbConnection.startSession();
  session.startTransaction();
  try {
    await cb(session);
    await session.commitTransaction();
    session.endSession();
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
}
