import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Query: {
    searchReviews: (_, { keyword, lastId }, { client }) =>
      client.review.findMany({
        where: {
          caption: {
            startsWith: keyword,
          },
        },
        take: 5,
        skip: lastId ? 1 : 0,
        ...(lastId && { cursor: { id: lastId } }),
      }),
  },
};

export default resolvers;
