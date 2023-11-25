import express from 'express';
import cors from 'cors'
import Socket from '../socketio'
import Interface from '../../interface';
import NoSQL from '../repository/mongo';

const createServer = () => {
  const app = express()
  const API_PORT = process.env.PORT || process.env.NX_API_PORT;

  // Initialize Mongoose
  NoSQL.initialize();

  app.use(cors());
  app.use(express.json());

  // Init SocketIO
  const { io, server } = Socket.createClient({ app });
  Interface({ client: io, app })

  server.listen(API_PORT || 3000, () => {
    console.log(`Server listen on port ${API_PORT} server-time ${new Date().getHours()}:${new Date().getMinutes()}`);
  });

  return app;

}

export default { createServer }
