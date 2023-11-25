import healthCheck from './routes/healthcheck';
import rooms from './routes/rooms';
import { IMainRoute, IRequest } from './types'

const Interface = ({ app, client }: IMainRoute) => {

  // Define Routes
  app.use((req: IRequest, res, next) => {
    req.client = client;

    next();
  })
  app.use('/app', healthCheck());
  app.use('/api/rooms', rooms());

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
