import { Server, Socket } from 'socket.io';
import { GetUserChatsResponse } from './dtos/chat/chat.dto';
import { IMessage, IMessageStatus } from './interfaces/message';
import { Message } from './models/message/message.model';
import { Chat } from './models/chat/chat.model';
import { Types } from 'mongoose';
import MessageServices from './services/message/message.services';
import {
  GetChatMessagesParamsRequest,
  GetChatMessagesQueryRequest,
} from './dtos/message/message.dto';

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

interface IRequestChatMessages
  extends GetChatMessagesParamsRequest,
    GetChatMessagesQueryRequest {}

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
      const user = onlineUsers.find(user => user.user_id === data?.receiver_id);

      if (user?.socket_id) {
        io.to(user?.socket_id).emit('receive_new_chat', data?.chat);
      }
    });

    // get user messages for a specific chat
    socket.on('request_user_messages', async (data: IRequestChatMessages) => {
      try {
        const messages = await new MessageServices().getChatMessagesService(
          { chat_id: data.chat_id },
          { from: data.from },
        );

        const user = onlineUsers.find(user => user.socket_id === socket.id);
        if (user?.socket_id) {
          io.to(user.socket_id).emit('get_user_messages', messages?.data || []);
        }
      } catch (error) {}
    });

    // send new message and alert the recipient
    socket.on('send_message', async (data: INewMessage) => {
      try {
        let delivered: boolean = false;

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

        // Send saved message to the receiver if online
        const receiver = onlineUsers.find(
          user => user.user_id == data?.receiver_id,
        );
        if (receiver?.socket_id) {
          await Message.findByIdAndUpdate(message?._id, {
            $set: { status: IMessageStatus.D },
          });

          io.to(receiver.socket_id).emit('get_message', {
            ...message?.toObject(),
            status: IMessageStatus.D,
          } as IMessage);

          delivered = true;
        }

        // Send saved message to the sender
        const sender = onlineUsers.some(user => user.socket_id === socket.id);
        if (sender) {
          io.to(socket.id).emit('message_sent', {
            ...message?.toObject(),
            status: delivered ? IMessageStatus.D : IMessageStatus.U,
          } as IMessage);
        }

        delivered = false;
      } catch (error) {}
    });

    // on message read
    // for a message to have been read, it means the receiver saw it and emitted this event
    socket.on('on_message_read', async (data: IMessage) => {
      try {
        if (data._id) {
          // update the message
          await Message.findByIdAndUpdate(data._id, {
            $set: { status: IMessageStatus.R },
          });

          // Send updated message id to the receiver if online -> receiver was the person who emitted this event
          const receiver = onlineUsers.some(
            user => user.socket_id == socket.id,
          );
          if (receiver) {
            io.to(socket.id).emit('message_read', {
              ...data,
              status: IMessageStatus.R,
            } as IMessage);
          }

          // Send updated message to the sender of the message
          const sender = onlineUsers.find(
            user => user.user_id === data.sender_id?.toString(),
          );
          if (sender?.socket_id) {
            io.to(sender.socket_id).emit('message_read', {
              ...data,
              status: IMessageStatus.R,
            } as IMessage);
          }
        }
      } catch (error) {}
    });

    socket.on('disconnect', () => {
      onlineUsers = onlineUsers.filter(users => users?.socket_id !== socket.id);
      io.emit('get_online_users', onlineUsers);
    });
  });

  return io;
};
