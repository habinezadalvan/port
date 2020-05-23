import "reflect-metadata";
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import logger from './config/logger';

(() =>{
    const app = express();

    const apolloServer = new ApolloServer({
        typeDefs: `
            type Query{
                hello: String!
            }
        `,
        resolvers: {
            Query: {
                hello: () => 'hello world'
            }
        }
    })
    apolloServer.applyMiddleware({app});
    const port = process.env.PORT || 5000;
    app.listen(port, () => logger.info(`Server is running on ${port}`))
})();
