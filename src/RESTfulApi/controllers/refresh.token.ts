import { Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import {User} from '../../entity/User';
import {generateAccessToken, generateRefreshToken, sendRefreshToken} from '../../helpers/user.helpers';

const {REFRESH_TOKEN_SECRET_KEY} = process.env;

export const refreshTokenController = async (req:Request, res: Response) => {
    const token = req.cookies.jid;
    if(!token) {
        res.send({ok: false, accessToken: ''});
    }

    let payload: any = null;

    try {
        payload = await verify(token, REFRESH_TOKEN_SECRET_KEY!)
    }catch(err){
        return res.send({ok: false, accessToken: ''});
    }

    const findUser = await User.findOne({id: payload.id })
    if(!findUser) {
        return res.send({ok: false, accessToken: ''});
    }

    const {password, ...rest} = findUser!; 
    
    if(findUser?.tokenVersion !== payload.tokenVersion) {
        return res.send({ok: false, accessToken: ''});
    }

    const refreshToken = generateRefreshToken(rest);
    sendRefreshToken(res, refreshToken);

    return res.send({
        ok: true,
        accessToken: generateAccessToken(rest)
    });
}