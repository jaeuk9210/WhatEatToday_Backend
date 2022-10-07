require("dotenv").config();
import { ApolloServer } from "apollo-server-express";
import client from "./client";
import * as logger from "morgan";
import { typeDefs, resolvers } from "./schema";
import { getUser } from "./users/users.utils";
import * as express from "express";
import { graphqlUploadExpress } from "graphql-upload";

const PORT = process.env.PORT;

const parseToken = (value) => {
  if (!value) {
    return null;
  }

  if (value.startsWith("Bearer ")) {
    return value.substring(7, value.length);
  } else {
    return null;
  }
};

const startServer = async () => {
  const apollo = new ApolloServer({
    resolvers,
    typeDefs,
    csrfPrevention: false,
    context: async ({ req }) => {
      return {
        loggedInUser: await getUser(parseToken(req.headers.authorization)),
        client,
      };
    },
  });

  await apollo.start();

  const app = express();

  app.use(graphqlUploadExpress());
  app.use(logger("tiny"));
  app.use("/static", express.static("uploads"));
  apollo.applyMiddleware({ app });

  await new Promise((func) => app.listen({ port: PORT }, func));
  console.log(`🚀 Server: http://localhost:${PORT}${apollo.graphqlPath}`);
};

startServer();
