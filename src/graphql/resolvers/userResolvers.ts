import { Resolver, Query, Mutation, Arg } from 'type-graphql';
import { ApolloError } from 'apollo-server-express';
import {hashPassword, comparePassword, generateToken} from '../../helpers/user.helpers';
import { User } from '../../entity/User';
import { AccessToken } from '../types/user.types';

@Resolver()
export class UserResolvers {
    @Query(() => String)
    hello(){
        return 'hello world'
    }

    @Query(() => [User])
    async users(){
        const res = await User.find();
        return res;
    }

    @Mutation(() => AccessToken)
    async login(
        @Arg('email')  email: string,
        @Arg('password') password: string
    ): Promise<AccessToken>{
        const user = await User.findOne({where : {email}});
        if(!user || (!comparePassword(password, user.password))) throw new ApolloError('Incorrect email or password!');
        const {password: hashedUserPassword, ...rest} = user;
        return {
            accessToken: generateToken(rest),
        }
    }

    @Mutation(() => Boolean)
    async register(
        @Arg('firstName') firstName: string,
        @Arg('lastName') lastName: string,
        @Arg('userName') userName: string,
        @Arg('email') email: string,
        @Arg('password') password: string,
        @Arg('avatar') avatar?: string,
    ){
       try{
        const hashedPassword = await hashPassword(password);
        await User.insert({
            firstName,
            lastName,
            userName,
            email,
            password: hashedPassword,
            avatar
        })
       }catch(err){
           console.log('err', err);
           return false;
       }
       return true;
    }
}
