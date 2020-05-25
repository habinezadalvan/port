import { hashSync, compareSync } from 'bcryptjs';
import {sign } from 'jsonwebtoken';
import { Response } from 'express';
import 'dotenv/config';

const { ACCESS_TOKEN_SECRET_KEY } = process.env;
const { REFRESH_TOKEN_SECRET_KEY } = process.env;

export const hashPassword = (password: string) => hashSync(password, 12);

export const generateAccessToken = (payload: any) => sign(payload, `${ACCESS_TOKEN_SECRET_KEY}`, {expiresIn: '1h'});
export const generateRefreshToken = (payload: any) => sign(payload, `${REFRESH_TOKEN_SECRET_KEY}`, {expiresIn: '7d'});

export const comparePassword = (password: string, hashedPassword: string) => compareSync(password, hashedPassword)

export const sendRefreshToken = (res: Response, token: string) => {
    res.cookie('jid', token ,{httpOnly: true});
}