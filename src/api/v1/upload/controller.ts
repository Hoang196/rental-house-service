import { NextFunction, Response } from 'express';
import RequestWithUser from 'utils/rest/request';
import fmt from 'utils/formatter';
import * as service from './service';

const uploadFile = async (request: RequestWithUser, response: Response, next: NextFunction) => {
  try {
    const data = await service.uploadImage(request);
    response.status(200);
    response.send(fmt.formatResponse(data, Date.now() - request.startTime, 'OK', 1));
  } catch (error) {
    response.status(400);
  }
};

export { uploadFile };
