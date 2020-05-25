import {MiddlewareFn} from 'type-graphql';
import {AuthenticationError} from 'apollo-server-express';
import {ContextInterface} from '../graphql/types/context.type';
import {verify} from 'jsonwebtoken';


const {JWT_SECRET_KEY} = process.env;
export const isAuth:MiddlewareFn<ContextInterface> = ({context}, next) => {
    const authorization = context.req.headers['authorization'];

    if (!authorization) throw new AuthenticationError('you are not authenticated!');

    try{
        const accessToken = context.req.headers['authorization']?.split(' ')[1];
        const user = verify(accessToken!, `${JWT_SECRET_KEY}`);
        context.user = user as any;
    }catch(err){
        console.log('err', err);
        throw new AuthenticationError('you are not authenticated!');
    }

    return next();
}