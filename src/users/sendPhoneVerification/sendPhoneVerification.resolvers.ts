import {
  makeCode,
  sendVerificationSMS,
} from "../../shared/sendSMS/sendSMS.util";
import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Mutation: {
    sendPhoneVerification: async (_, { phone }, { client }) => {
      const expiredDate = new Date();
      expiredDate.setMinutes(expiredDate.getMinutes() + 3);

      const code = makeCode();
      try {
        await client.verification.upsert({
          where: {
            phone,
          },
          create: {
            phone,
            expiredAt: expiredDate,
            code: makeCode(),
            verifyed: false,
          },
          update: {
            phone,
            expiredAt: expiredDate,
            code,
            verifyed: false,
          },
        });

        await sendVerificationSMS(phone, code);

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
