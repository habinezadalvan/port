import { hashSync, compareSync } from 'bcryptjs';
import {sign } from 'jsonwebtoken';

export const hashPassword = (password: string) => hashSync(password, 12);
