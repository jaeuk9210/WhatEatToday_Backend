import { uploadToS3 } from "../../shared/shared.utils";
import { Resolvers } from "../../types";
import { protectedResolver } from "../../users/users.utils";
import { processHashtags } from "../photos.utils";

const resolvers: Resolvers = {
  Mutation: {
    uploadPhoto: protectedResolver(
      async (_, { files, caption }, { client, loggedInUser }) => {
        let hashtagObj = [];
        if (caption) {
          hashtagObj = processHashtags(caption);
        }
        console.log("files", files);
        let fileUrls = [];

        const uploadFiles = (file) => {
          return new Promise((resolve) => {
            uploadToS3(file, loggedInUser.id, "uploads").then((url) => {
              fileUrls.push(url);
              resolve(null);
            });
          });
        };
        const promises = files.map((file) => uploadFiles(file));
        await Promise.all(promises);

        const ok = await client.photo.create({
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
          },
        });

        if (ok) {
          return {
            ok: true,
          };
        }
      }
    ),
  },
};

export default resolvers;
