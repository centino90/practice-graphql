import Koa from "koa";
import { ApolloServer } from "apollo-server-koa";
import dotenv from "dotenv-safe";
import logger from "koa-logger";

import { postgres, postgresMiddleware } from "./postgres";
import resolvers from "./resolvers";
import typeDefs from "./types";
import AuthDirective from "./directives/auth";

import { schema as bookSchema } from "./models/books";

// import updateSchema from './scripts/updateSchemas'

const schemas = [bookSchema];

dotenv.load();

const config = {
  db_uri: process.env["DB_URI"],
  production: process.env["NODE_ENV"] === "production",
  port: process.env["BACKEND_PORT"],
  default_db: process.env["DEFAULT_DB"],
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  schemaDirectives: {
    auth: AuthDirective,
  },
  context: ({ ctx }) => {
    return ctx;
  },
  playground: {
    settings: {
      "editor.cursorShape": "line",
    },
  },
});

const app = new Koa();
app.use(postgresMiddleware(config.db_uri, schemas));
app.use(logger());
app.use(async (ctx, next) => {
  console.log("POSTGTES", postgres);
  await next();
});
server.applyMiddleware({ app });

app.listen({ port: config.port }, () => {
  console.log(
    `Server up at http://localhost:${config.port}${server.graphqlPath}`
  );
});
