import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Query: {
    seeReviewLikes: async (_, { id, lastId }, { client }) => {
      const likes = await client.like.findMany({
        where: {
          reviewId: id,
        },
        select: {
          user: true,
        },
        take: 5,
        skip: lastId ? 1 : 0,
        ...(lastId && { cursor: { id: lastId } }),
      });
      return likes.map((like) => like.user);
    },
  },
};

export default resolvers;
