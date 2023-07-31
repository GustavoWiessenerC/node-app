import { NestMiddleware, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

export class MethodNotAllowedMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const allowedMethods = ['GET', 'POST']; 

    if (!allowedMethods.includes(req.method)) {
      throw new HttpException('Método não permitido', HttpStatus.METHOD_NOT_ALLOWED);
    }
    next();
  }
}
