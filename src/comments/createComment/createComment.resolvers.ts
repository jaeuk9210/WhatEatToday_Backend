import { Resolvers } from "../../types";
import { protectedResolver } from "../../users/users.utils";

const resolvers: Resolvers = {
  Mutation: {
    createComment: protectedResolver(
      async (_, { reviewId, payload }, { client, loggedInUser }) => {
        const ok = await client.review.findUnique({
          where: {
            id: reviewId,
          },
          select: {
            id: true,
          },
        });
        if (!ok) {
          return {
            ok: false,
            error: "Photo not found.",
          };
        }
        await client.comment.create({
          data: {
            payload,
            review: {
              connect: {
                id: reviewId,
              },
            },
            user: {
              connect: {
                id: loggedInUser.id,
              },
            },
          },
        });
        return {
          ok: true,
        };
      }
    ),
  },
};

export default resolvers;
