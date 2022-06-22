import Koa from "koa";
import { ApolloServer } from "apollo-server-koa";
import dotenv from "dotenv-safe";

import { postgresMiddleware } from "~/postgres";
import resolvers from "~/resolvers";
import typeDefs from "~/types";

import { schema as bookSchema } from "../src/models/books";

const schemas = [bookSchema];

dotenv.load();

const config = {
  db_uri: process.env["DB_URI"],
  port: 4000, // process.env["BACKEND_PORT"]
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ ctx }) => ctx,
});

const app = new Koa();
app.use(postgresMiddleware(config.db_uri, schemas));

server.applyMiddleware({ app });

app.listen({ port: config.port }, () => {
  console.log(`Server up at http://localhost:4000${server.graphqlPath}`);
});