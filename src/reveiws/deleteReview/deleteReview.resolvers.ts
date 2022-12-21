import { deleteFromS3 } from "../../shared/shared.utils";
import { Resolvers } from "../../types";
import { protectedResolver } from "../../users/users.utils";

const resolvers: Resolvers = {
  Mutation: {
    deleteReview: protectedResolver(
      async (_, { id }, { loggedInUser, client }) => {
        const review = await client.review.findUnique({
          where: {
            id,
          },
          select: {
            userId: true,
            file: true,
          },
        });

        if (!review) {
          return {
            ok: false,
            error: "Review not found.",
          };
        } else if (review.userId !== loggedInUser.id) {
          return {
            ok: false,
            error: "Not authorized.",
          };
        } else {
          await deleteFromS3(review.file, "uploads");
          await client.review.delete({
            where: {
              id,
            },
          });
          return {
            ok: true,
          };
        }
      }
    ),
  },
};

export default resolvers;
