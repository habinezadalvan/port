import { hashSync, compareSync } from 'bcryptjs';
import {sign } from 'jsonwebtoken';
import 'dotenv/config';

const { JWT_SECRET_KEY } = process.env;

export const hashPassword = (password: string) => hashSync(password, 12);

export const generateToken = (payload: object) => sign(payload, `${JWT_SECRET_KEY}`, {expiresIn: '15min'});

export const comparePassword = (password: string, hashedPassword: string) => compareSync(password, hashedPassword)
