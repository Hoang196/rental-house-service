import { NextFunction, Response } from 'express';
import RequestWithUser from 'utils/rest/request';
import fmt from 'utils/formatter';
import * as service from './service';

const getMe = async (request: RequestWithUser, response: Response, next: NextFunction) => {
  const data = await service.getMe(request.user);
  response.status(200);
  response.send(fmt.formatResponse(data, Date.now() - request.startTime, 'OK', 1));
};

const getUser = async (request: RequestWithUser, response: Response, next: NextFunction) => {
  const data = await service.getUser(request.params);
  response.status(200);
  response.send(fmt.formatResponse(data, Date.now() - request.startTime, 'OK', 1));
};

const getUsers = async (request: RequestWithUser, response: Response, next: NextFunction) => {
  const data = await service.getUsers(request.query);
  response.status(200);
  response.send(fmt.formatResponse(data, Date.now() - request.startTime, 'OK', 1));
};

const updateMe = async (request: RequestWithUser, response: Response, next: NextFunction) => {
  const data = await service.updateMe(request);
  response.status(200);
  response.send(fmt.formatResponse(data, Date.now() - request.startTime, 'OK', 1));
};

const updateUser = async (request: RequestWithUser, response: Response, next: NextFunction) => {
  const data = await service.updateUser(request);
  response.status(200);
  response.send(fmt.formatResponse(data, Date.now() - request.startTime, 'OK', 1));
};

const deleteUser = async (request: RequestWithUser, response: Response, next: NextFunction) => {
  const data = await service.deleteUser(request);
  response.status(200);
  response.send(fmt.formatResponse(data, Date.now() - request.startTime, 'OK', 1));
};

export { getUser, getUsers, updateUser, deleteUser, getMe, updateMe };
