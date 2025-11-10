import { ApolloServer } from 'apollo-server';
import { typeDefs } from './schema/typeDefs.js';
import { resolvers } from './schema/resolvers.js';
import { authMiddleware } from './middleware/auth.js';
import { config } from './config/env.js';
import dotenv from 'dotenv';

dotenv.config();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

server.listen({ port: config.port }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
