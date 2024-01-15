import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import RequestWithUser from 'utils/rest/request';
import logger from 'logger';
import { UserNotAuthorizedException, TokenExpiredException } from 'exceptions';
import config from 'config';

const authMiddleware = async (request: RequestWithUser, response: Response, next: NextFunction) => {
  if (request.headers && request.headers.authorization) {
    const tokenArray = request.headers.authorization.split(' ');
    const idToken = tokenArray[1];
    if (idToken) {
      jwt.verify(idToken, config.jwtAccessSecretKey, (err, data) => {
        if (err) {
          next(new TokenExpiredException());
        }
      });
      next();
    } else {
      next(new UserNotAuthorizedException());
    }
  } else {
    logger.warn(`Admin token not present`);
    next(new UserNotAuthorizedException());
  }
};

export { authMiddleware };
