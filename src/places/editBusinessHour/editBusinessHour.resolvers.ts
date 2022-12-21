import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Mutation: {
    editBusinessHour: async (
      _,
      { placeId, weekday, open, close },
      { client }
    ) => {
      const oldBusinessHour = await client.time.findUnique({
        where: {
          placeId_weekday: {
            placeId,
            weekday,
          },
        },
      });
      if (!oldBusinessHour) {
        return {
          ok: false,
          error: "Business hour not found.",
        };
      }
      const businessHour = await client.time.update({
        where: {
          placeId_weekday: {
            placeId,
            weekday,
          },
        },
        data: {
          open,
          close,
        },
      });
      if (businessHour) {
        return {
          ok: true,
        };
      } else {
        return {
          ok: false,
          error: "Can't edit business hour.",
        };
      }
    },
  },
};

export default resolvers;
