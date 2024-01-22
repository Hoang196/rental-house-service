import { NextFunction, Response } from 'express';
import RequestWithUser from 'utils/rest/request';
import fmt from 'utils/formatter';
import * as service from './service';

import { Server } from 'socket.io';

const io = new Server(3000);

const getChats = async (request: RequestWithUser, response: Response, next: NextFunction) => {
  const data = await service.getChats(request);
  io.emit('chats', data);
  response.status(200);
  response.send(fmt.formatResponse(data, Date.now() - request.startTime, 'OK', 1));
};

const createChat = async (request: RequestWithUser, response: Response, next: NextFunction) => {
  const data = await service.createChat(request.body);
  response.status(200);
  response.send(fmt.formatResponse(data, Date.now() - request.startTime, 'OK', 1));
};

const updateChat = async (request: RequestWithUser, response: Response, next: NextFunction) => {
  const data = await service.updateChat(request);
  response.status(200);
  response.send(fmt.formatResponse(data, Date.now() - request.startTime, 'OK', 1));
};

const deleteChat = async (request: RequestWithUser, response: Response, next: NextFunction) => {
  const data = await service.deleteChat(request);
  response.status(200);
  response.send(fmt.formatResponse(data, Date.now() - request.startTime, 'OK', 1));
};

export { getChats, createChat, updateChat, deleteChat };
