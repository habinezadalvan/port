import {Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";

@ObjectType()
@Entity('users')
export class User extends BaseEntity {

    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column('text')
    firstName: string;

    @Field()
    @Column('text')
    lastName: string;

    @Field()
    @Column('text')
    userName: string;

    @Field()
    @Column('text')
    email: string;

    @Column('text')
    password: string

    @Field()
    @Column('text')
    avatar?: string

    @Column('int', {default: 0})
    tokenVersion: number

}
