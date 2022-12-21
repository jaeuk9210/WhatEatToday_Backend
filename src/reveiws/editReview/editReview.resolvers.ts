import { Resolvers } from "../../types";
import { protectedResolver } from "../../users/users.utils";
import { processHashtags } from "../reviews.utils";

const resolvers: Resolvers = {
  Mutation: {
    editReview: protectedResolver(
      async (
        _,
        { id, caption, taste, cost, reorder, clean, service },
        { loggedInUser, client }
      ) => {
        const oldReview = await client.review.findFirst({
          where: {
            id,
            userId: loggedInUser.id,
          },
          include: {
            hashtags: {
              select: {
                hashtag: true,
              },
            },
          },
        });
        if (!oldReview) {
          return {
            ok: false,
            error: "Review not found.",
          };
        }
        const review = await client.review.update({
          where: {
            id,
          },
          data: {
            caption,
            hashtags: {
              disconnect: oldReview.hashtags,
              connectOrCreate: processHashtags(caption),
            },
            taste,
            cost,
            reorder,
            clean,
            service,
          },
        });
        if (review.id) {
          return {
            ok: true,
          };
        } else {
          return {
            ok: false,
            error: "Can't edit review.",
          };
        }
      }
    ),
  },
};

export default resolvers;
