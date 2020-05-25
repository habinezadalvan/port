import "reflect-metadata";
import express from 'express';
import {buildSchema} from 'type-graphql';
import { ApolloServer } from 'apollo-server-express';
import { createConnection } from "typeorm";
import logger from './config/logger';
import { UserResolvers } from './graphql/resolvers/userResolvers';

(async () =>{
    const app = express();

    await createConnection();

    const apolloServer = new ApolloServer({
       schema: await buildSchema({
           resolvers: [ UserResolvers ],
       }),
       context: ({req, res}) => ({req, res}),
    })
    apolloServer.applyMiddleware({app});
    const port = process.env.PORT || 5000;
    app.listen(port, () => logger.info(`Server is running on ${port}`))
})();
