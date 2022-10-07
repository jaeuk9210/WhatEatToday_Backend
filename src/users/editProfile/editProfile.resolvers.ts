import * as bcrypt from "bcrypt";
import { GraphQLUpload } from "graphql-upload";
import { Resolvers } from "../../types";
import { protectResolver } from "../users.utils";
import { createWriteStream } from "fs";

const resolvers = {
  Upload: GraphQLUpload,

  Mutation: {
    editProfile: protectResolver(
      async (
        _,
        {
          firstName,
          lastName,
          username,
          email,
          password: newPassword,
          bio,
          avatar,
        },
        { loggedInUser, client }
      ) => {
        const { filename, createReadStream } = await avatar;
        const readStream = createReadStream();
        const writeStream = createWriteStream(
          process.cwd() + "/upload/" + filename
        );
        readStream.pipe(writeStream);
        let hashedPassword = null;
        if (newPassword) {
          hashedPassword = await bcrypt.hash(newPassword, 10);
        }

        const updatedUser = await client.user.update({
          where: {
            id: loggedInUser.id,
          },
          data: {
            firstName,
            lastName,
            username,
            email,
            bio,
            ...(hashedPassword && { password: hashedPassword }),
          },
        });

        if (updatedUser.id) {
          return {
            ok: true,
          };
        } else {
          return {
            ok: false,
            error: "Could not update profile.",
          };
        }
      }
    ),
  },
};

export default resolvers;
