import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import socket from '../socketio';
import appInterface from '../../interface';
import database from '../repository/mongo';

const createServer = () => {
  const app = express()
  const API_PORT = process.env.PORT || process.env.NX_API_PORT;

  // Initialize Database
  database.initialize();

  app.use(
    cors({
      origin: [process.env.CORS_ORIGIN || 'http://localhost:4200'],
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      credentials: true,
    })
  );
  app.use(helmet())
  app.use(express.json());

  // Init SocketIO
  const { io, server } = socket.createClient({ app });

  // Initialize Interface
  appInterface({ client: io, app })

  server.listen(API_PORT || 3000, () => {
    console.log(`Server listen on port ${API_PORT} server-time ${new Date().getHours()}:${new Date().getMinutes()}`);
  });

  return app;

}

export default { createServer }
