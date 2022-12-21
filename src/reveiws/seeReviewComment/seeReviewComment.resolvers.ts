import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Query: {
    seeReviewComments: (_, { id, lastId }, { client }) =>
      client.comment.findMany({
        where: {
          reviewId: id,
        },
        orderBy: {
          createdAt: "asc",
        },
        take: 5,
        skip: lastId ? 1 : 0,
        ...(lastId && { cursor: { id: lastId } }),
      }),
  },
};

export default resolvers;
