import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Mutation: {
    addMenu: async (
      _,
      { name, placeId, price, category, subCategory },
      { client }
    ) => {
      const ok = await client.place.findUnique({
        where: {
          id: placeId,
        },
        select: {
          id: true,
        },
      });
      if (!ok) {
        return {
          ok: false,
          error: "Cannot add menu.",
        };
      }
      try {
        const createdMenu = await client.menu.create({
          data: {
            name,
            price,
            place: {
              connect: {
                id: placeId,
              },
            },
            category,
            subCategory,
          },
        });
        if (createdMenu.id) {
          return {
            ok: true,
          };
        } else {
          return {
            ok: false,
            error: "Could not add Menu",
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
