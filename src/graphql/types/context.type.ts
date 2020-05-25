import {Request, Response} from 'express';
export interface ContextInterface {
    req: Request;
    res: Response;
    user?: {
        id: number
        firstName: string,
        lastName: string,
        userName: string,
        email: string,
        avatar?:string
    }
}