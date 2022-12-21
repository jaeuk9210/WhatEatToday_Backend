import { Resolvers } from "../types";

const resolvers: Resolvers = {
  Place: {
    menus: ({ id }, _, { client }) =>
      client.menu.findMany({
        where: {
          placeId: id,
        },
      }),
    totalMenu: ({ id }, _, { client }) =>
      client.menu.count({
        where: {
          placeId: id,
        },
      }),
    totalReview: ({ id }, _, { client }) =>
      client.review.count({
        where: {
          menu: {
            placeId: id,
          },
        },
      }),
    businessHour: ({ id }, _, { client }) =>
      client.time.findMany({
        where: {
          placeId: id,
        },
      }),
    subCategories: async ({ id }, _, { client }) => {
      const subCategoriesObj = await client.menu.groupBy({
        by: ["subCategory"],
        where: {
          placeId: id,
        },
      });
      return subCategoriesObj.map((i) => i["subCategory"]);
    },
  },
};

export default resolvers;
