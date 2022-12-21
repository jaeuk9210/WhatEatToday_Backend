import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Mutation: {
    checkPhoneVerification: async (_, { phone, code }, { client }) => {
      try {
        const nowDate = new Date();
        const verification = await client.verification.findFirst({
          where: {
            phone,
            code,
            verifyed: false,
          },
        });

        if (!verification || verification.expiredAt < nowDate) {
          return {
            ok: false,
            error: "Verification failed",
          };
        }

        await client.verification.update({
          where: {
            phone,
          },
          data: {
            verifyed: true,
          },
        });
        return {
          ok: true,
        };
      } catch (error) {
        return {
          ok: false,
          error: error.message,
        };
      }
    },
  },
};

export default resolvers;
