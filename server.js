require("dotenv").config();
import { ApolloServer } from "apollo-server";
import schema from "./schema";
import { getUser } from "./users/users.utils";

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

const server = new ApolloServer({
  schema,
  context: async ({ req }) => {
    return {
      loggedInUser: await getUser(parseToken(req.headers.authorization)),
    };
  },
});

const PORT = process.env.PORT;

server
  .listen(PORT)
  .then(() => console.log(`Server is running on http://localhost:${PORT}/`));
