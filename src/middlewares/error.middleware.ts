import { NextFunction, Request, Response } from 'express';

import IError from '../Interfaces/IError';

export default (error: IError, _req: Request, res: Response, _next: NextFunction) => {
  const { code, message } = error;
  return res.status(code || 500).json({ message: message || 'internal error' });
};
