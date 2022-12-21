import { uploadToS3 } from "../../shared/shared.utils";
import { File, Resolvers } from "../../types";
import { protectedResolver } from "../../users/users.utils";
import { processHashtags } from "../reviews.utils";

const resolvers: Resolvers = {
  Mutation: {
    uploadReview: protectedResolver(
      async (
        _,
        { files, caption, menuId, taste, cost, reorder, clean, service },
        { client, loggedInUser }
      ) => {
        const ok = await client.menu.findUnique({
          where: {
            id: menuId,
          },
          select: {
            id: true,
          },
        });

        let hashtagObj = [];
        if (caption) {
          hashtagObj = processHashtags(caption);
        }
        let fileUrls = [];

        const uploadFiles = (file: Promise<File>) => {
          return new Promise((resolve) => {
            uploadToS3(file, loggedInUser.id, "uploads").then((url) => {
              fileUrls.push(url);
              resolve(null);
            });
          });
        };
        const promises = files.map((file: Promise<File>) => uploadFiles(file));
        await Promise.all(promises);
        if (!ok) {
          return {
            ok: false,
            error: "Menu not found.",
          };
        }
        try {
          await client.review.create({
            data: {
              user: {
                connect: {
                  id: loggedInUser.id,
                },
              },
              file: fileUrls,
              caption,
              ...(hashtagObj.length > 0 && {
                hashtags: {
                  connectOrCreate: processHashtags(caption),
                },
              }),
              menu: {
                connect: {
                  id: menuId,
                },
              },
              taste,
              cost,
              reorder,
              clean,
              service,
            },
          });
        } catch (e) {
          return {
            ok: false,
            error: e.message,
          };
        }
        return {
          ok: true,
        };
      }
    ),
  },
};

export default resolvers;
