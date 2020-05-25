import { hashSync, compareSync } from 'bcryptjs';
import {sign } from 'jsonwebtoken';
import 'dotenv/config';

const { JWT_SECRET_KEY } = process.env;

export const hashPassword = (password: string) => hashSync(password, 12);

export const generateToken = (payload: object, expireTime: string) => sign(payload, `${JWT_SECRET_KEY}`, {expiresIn: `${expireTime}`});

export const comparePassword = (password: string, hashedPassword: string) => compareSync(password, hashedPassword)
