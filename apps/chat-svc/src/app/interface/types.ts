import { Application, Request } from 'express';
import { Server } from 'socket.io';

export interface IMainRoute {
  app: Application,
  client: Server,
}

export interface IRequest extends Request {
  client: Server
}
