import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Mutation: {
    addAdditionalInfo: async (
      _,
      { id, firstName, lastName, gender, phone, birth, code },
      { client }
    ) => {
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

        const updatedVerification = await client.verification.update({
          where: {
            phone,
          },
          data: {
            verifyed: true,
          },
        });

        if (updatedVerification) {
          const ok = await client.user.update({
            where: {
              id,
            },
            data: {
              firstName,
              lastName,
              gender,
              phone,
              birth,
            },
          });
          if (!ok) {
            return {
              ok: false,
              error: "Cannot update user",
            };
          }
          return {
            ok: true,
          };
        }
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
