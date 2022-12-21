import * as bcrypt from "bcrypt";
import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Mutation: {
    addBusinessHour: async (
      _,
      { placeId, weekday, open, close },
      { client }
    ) => {
      try {
        const createdBusinessHour = await client.time.create({
          data: {
            place: {
              connect: {
                id: placeId,
              },
            },
            weekday,
            open,
            close,
          },
        });
        if (createdBusinessHour) {
          return {
            ok: true,
          };
        } else {
          return {
            ok: false,
            error: "Could not add business hour",
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
