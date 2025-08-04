import http from 'http';
import { Server } from 'socket.io';
import { Application } from 'express'

interface ISocket {
  app: Application
}

const createClient = ({ app }: ISocket) => {
  const server = http.createServer(app);
  const io = new Server(server, {
    cors: {
      origin: "*"
    }
  });
  // const [productList, updateProductState] = useInitHooks([])

  io.on('connection', (socket) => {
    // console.log(`⚡: ${socket.id} user just connected!`);
    socket.on( 'connect', function() {
      console.log(`⚡: ${socket.id} user just connected!`);
    });

    socket.on('initialize', () => {
      // const
    });

    socket.on('disconnect', () => {
      console.log('🔥: A user disconnected');
    });
  });

  return { io, server }
}

export default { createClient }
