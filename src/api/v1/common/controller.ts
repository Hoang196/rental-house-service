import { NextFunction, Response } from 'express';
import RequestWithUser from 'utils/rest/request';
import fmt from 'utils/formatter';
import * as service from './service';

const getDataSearch = async (request: RequestWithUser, response: Response, next: NextFunction) => {
  const data = await service.getDataSearch(request);
  response.status(200);
  response.send(fmt.formatResponse(data, Date.now() - request.startTime, 'OK', 1));
};

const getTopFavourite = async (request: RequestWithUser, response: Response, next: NextFunction) => {
  const data = await service.getTopFavourite(request);
  response.status(200);
  response.send(fmt.formatResponse(data, Date.now() - request.startTime, 'OK', 1));
};

const checkUserLikePost = async (request: RequestWithUser, response: Response, next: NextFunction) => {
  const data = await service.checkUserLikePost(request);
  response.status(200);
  response.send(fmt.formatResponse(data, Date.now() - request.startTime, 'OK', 1));
};

const getRandomHouse = async (request: RequestWithUser, response: Response, next: NextFunction) => {
  const data = await service.getRandomHouse(request);
  response.status(200);
  response.send(fmt.formatResponse(data, Date.now() - request.startTime, 'OK', 1));
};

const getStatistics = async (request: RequestWithUser, response: Response, next: NextFunction) => {
  const data = await service.getStatistics(request);
  response.status(200);
  response.send(fmt.formatResponse(data, Date.now() - request.startTime, 'OK', 1));
};

export { getDataSearch, getTopFavourite, checkUserLikePost, getRandomHouse, getStatistics };
