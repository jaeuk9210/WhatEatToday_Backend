import { Resolvers } from "../../types";
import { protectedResolver } from "../../users/users.utils";
import { processHashtags } from "../photos.utils";

const resolvers: Resolvers = {
  Mutation: {
    uploadPhoto: protectedResolver(
      async (_, { file, caption }, { client, loggedInUser }) => {
        const photo = client.photo.create({
          data: {
            user: {
              connect: {
                id: loggedInUser.id,
              },
            },
            file,
            caption,
            hashtags: {
              connectOrCreate: processHashtags(caption),
            },
          },
        });
        if (photo) {
          return {
            ok: true,
            result: photo,
          };
        }
      }
    ),
  },
};

export default resolvers;
