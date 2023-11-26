import healthCheck from './routes/healthcheck';
import rooms from './routes/rooms';
import message from './routes/messages';
import { IMainRoute, IRequest } from './types'
import verifyToken from '../infrastructure/middleware/auth';

const Interface = ({ app, client }: IMainRoute) => {

  // Define Routes
  app.use((req: IRequest, res, next) => {
    req.client = client;

    next();
  })
  app.use('/app', healthCheck());
  app.use('/api/rooms', rooms());
  app.use('/api/message', verifyToken, message());

  /**
   * Catch 404 and forward to error handle.
   */
  app.use((req, res, next) => {
    const err = new Error('Not Found');
    err['status'] = 404;
    next(err);
  });
}

export default Interface;
