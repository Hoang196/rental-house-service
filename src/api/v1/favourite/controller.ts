import { NextFunction, Response } from 'express';
import RequestWithUser from 'utils/rest/request';
import fmt from 'utils/formatter';
import * as service from './service';

const getFavourites = async (request: RequestWithUser, response: Response, next: NextFunction) => {
  const data = await service.getFavourites(request.query);
  response.status(200);
  response.send(fmt.formatResponse(data, Date.now() - request.startTime, 'OK', 1));
};

const createFavourite = async (request: RequestWithUser, response: Response, next: NextFunction) => {
  const data = await service.createFavourite(request.body);
  response.status(200);
  response.send(fmt.formatResponse(data, Date.now() - request.startTime, 'OK', 1));
};

const updateFavourite = async (request: RequestWithUser, response: Response, next: NextFunction) => {
  const data = await service.updateFavourite(request);
  response.status(200);
  response.send(fmt.formatResponse(data, Date.now() - request.startTime, 'OK', 1));
};

const deleteFavourite = async (request: RequestWithUser, response: Response, next: NextFunction) => {
  const data = await service.deleteFavourite(request);
  response.status(200);
  response.send(fmt.formatResponse(data, Date.now() - request.startTime, 'OK', 1));
};

export { getFavourites, createFavourite, updateFavourite, deleteFavourite };
