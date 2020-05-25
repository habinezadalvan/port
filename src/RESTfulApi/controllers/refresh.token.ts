import { Request } from 'express';

export const refreshTokenController = (req:Request) => {
    console.log('req.headers', req.headers);
}