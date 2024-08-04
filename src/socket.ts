import { Server, Socket } from 'socket.io';
import { GetUserChatsResponse } from './dtos/chat/chat.dto';
import { IMessage } from './interfaces/message';
import { Message } from './models/message/message.model';
import { Chat } from './models/chat/chat.model';
import { Types } from 'mongoose';

interface IOnlineUser {
  user_id: string;
  socket_id: string;
}

interface INewChat {
  receiver_id: string;
  chat: GetUserChatsResponse;
}

interface INewMessage {
  receiver_id: string;
  message: IMessage;
}

export const appSocket = (io: Server) => {
  let onlineUsers: IOnlineUser[] = [];

  io.on('connection', (socket: Socket) => {
    // set a new user status to online and emit to all online users
    socket.on('add_new_online_user', () => {
      !onlineUsers.some(
        users => users?.user_id === socket.handshake.query?.user_id,
      ) &&
        onlineUsers.push({
          socket_id: socket.id,
          user_id: socket.handshake.query?.user_id as string,
        });

      io.emit('get_online_users', onlineUsers);
    });

    // add a new chat and alert the recipient
    socket.on('add_new_chat', (data: INewChat) => {
      const user = onlineUsers.find(user => user.user_id == data?.receiver_id);

      if (user?.socket_id) {
        io.to(user?.socket_id).emit('receive_new_chat', data?.chat);
      }
    });

    // send new message and alert the recipient
    socket.on('send_message', async (data: INewMessage) => {
      // save the message
      const message = await Message.create({
        chat_id: new Types.ObjectId(data?.message?.chat_id),
        sender_id: new Types.ObjectId(data?.message?.sender_id),
        type: data?.message?.type,
        data: data?.message?.data,
      });
      await Chat.updateOne(
        { _id: new Types.ObjectId(data?.message?.chat_id) },
        { $set: { updatedAt: new Date() } },
      );

      // Send saved message to the sender
      const sender = onlineUsers.find(user => user.socket_id == socket.id);
      if (sender?.socket_id) {
        io.to(socket.id).emit('message_sent', message?.toObject());
      }

      // Send saved message to the receiver if online
      const receiver = onlineUsers.find(
        user => user.user_id == data?.receiver_id,
      );
      if (receiver?.socket_id) {
        io.to(receiver.socket_id).emit('get_message', message?.toObject());
      }
    });

    socket.on('disconnect', () => {
      onlineUsers = onlineUsers.filter(users => users?.socket_id !== socket.id);
      io.emit('get_online_users', onlineUsers);
    });
  });

  return io;
};
