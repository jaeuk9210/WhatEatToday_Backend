import { Resolvers } from "../types";

const resolvers: Resolvers = {
  Review: {
    user: ({ id }, _, { client }) => client.user.findUnique({ where: { id } }),
    menu: ({ id }, _, { client }) => client.menu.findUnique({ where: id }),
    hashtags: ({ id }, _, { client }) =>
      client.hashtag.findMany({
        where: {
          reviews: {
            some: {
              id,
            },
          },
        },
      }),
    likes: ({ id }, _, { client }) =>
      client.like.count({ where: { reviewId: id } }),
    comments: ({ id }, _, { client }) =>
      client.comment.count({ where: { reviewId: id } }),
    isMine: ({ userId }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }
      return userId === loggedInUser.id;
    },
  },

  Hashtag: {
    reviews: ({ id }, { lastId }, { client }) => {
      return client.hashtag
        .findUnique({
          where: {
            id,
          },
        })
        .reviews({
          take: 5,
          skip: lastId ? 1 : 0,
          ...(lastId && { cursor: { id: lastId } }),
        });
    },
    totalReviews: ({ id }, _, { client }) =>
      client.review.count({
        where: {
          hashtags: {
            some: {
              id,
            },
          },
        },
      }),
  },
};

export default resolvers;
