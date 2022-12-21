import { Resolvers } from "../../types";
import { protectedResolver } from "../../users/users.utils";

const resolvers: Resolvers = {
  Mutation: {
    toggleLike: protectedResolver(
      async (_, { id }, { loggedInUser, client }) => {
        const review = await client.review.findUnique({
          where: {
            id,
          },
        });
        if (!review) {
          return {
            ok: false,
            error: "Review not found.",
          };
        }
        const likeWhere = {
          reviewId_userId: {
            userId: loggedInUser.id,
            reviewId: id,
          },
        };
        const like = await client.like.findUnique({
          where: likeWhere,
        });
        if (like) {
          await client.like.delete({
            where: likeWhere,
          });
        } else {
          await client.like.create({
            data: {
              user: {
                connect: {
                  id: loggedInUser.id,
                },
              },
              review: {
                connect: {
                  id: review.id,
                },
              },
            },
          });
        }
        return {
          ok: true,
        };
      }
    ),
  },
};

export default resolvers;
