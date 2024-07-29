import { Server } from 'socket.io';

export const appSocket = (io: Server) => {
  let onlineUsers: string[] = [];

  io.on('connection', socket => {
    console.log(socket.id);

    socket.on('onOnlineStatus', data => {
      if (!onlineUsers.includes(data)) onlineUsers.push(data);
    });

    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });

  return io;
};
