import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Query: {
    seeReview: (_, { id }, { client }) =>
      client.review.findUnique({
        where: {
          id,
        },
      }),
  },
};

export default resolvers;
