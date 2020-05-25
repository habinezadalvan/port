import {ObjectType, Field } from 'type-graphql';


@ObjectType()
export class AccessToken {
    @Field()
    accessToken: string
}

