import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Query: {
    conditionSearchMenu: async (
      _,
      {
        categories,
        minPrice,
        maxPrice,
        startTime,
        endTime,
        delivery,
        distanse,
      },
      { client }
    ) => {
      console.log(minPrice);

      const openTime = new Date(startTime);
      const closeTime = new Date(endTime);

      const result = await client.place.findMany({
        where: {
          time: {
            some: {
              open: {
                lte: openTime,
              },
              close: {
                gte: closeTime,
              },
            },
          },
          menu: {
            some: {
              category: {
                in: categories,
              },
              price: {
                gte: minPrice,
                lte: maxPrice,
              },
            },
          },
        },
      });
      return result;
    },
  },
};

export default resolvers;
