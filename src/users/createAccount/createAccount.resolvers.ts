import * as bcrypt from "bcrypt";
import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Mutation: {
    createAccount: async (
      _,
      { firstName, lastName, username, email, password },
      { client }
    ) => {
      try {
        const existingUser = await client.user.findFirst({
          where: {
            OR: [
              {
                username,
              },
              {
                email,
              },
            ],
          },
          select: { id: true },
        });
        if (existingUser) {
          throw new Error("This username is already taken.");
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const createdUser = await client.user.create({
          data: {
            firstName,
            lastName,
            username,
            email,
            password: hashedPassword,
          },
        });
        if (createdUser.id) {
          return {
            ok: true,
            id: createdUser.id,
          };
        } else {
          return {
            ok: false,
            error: "Could not create account.",
          };
        }
      } catch (e) {
        return {
          ok: false,
          error: e.message,
        };
      }
    },
  },
};

export default resolvers;
