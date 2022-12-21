import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Query: {
    seePlace: (_, { id }, { client }) =>
      client.place.findUnique({
        where: {
          id,
        },
      }),
  },
};

export default resolvers;
