import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Mutation: {
    existAccount: async (_, { email }, { client }) => {
      const ok = await client.user.findFirst({
        where: {
          email,
        },
        select: {
          id: true,
        },
      });
      if (ok) {
        return {
          ok: true,
        };
      } else {
        return {
          ok: false,
        };
      }
    },
  },
};

export default resolvers;
