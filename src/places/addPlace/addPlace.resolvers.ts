import * as bcrypt from "bcrypt";
import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Mutation: {
    addPlace: async (_, { name, phoneNumber, address }, { client }) => {
      try {
        const createdPlace = await client.place.create({
          data: {
            name,
            phoneNumber,
            address,
          },
        });
        if (createdPlace.id) {
          return {
            ok: true,
          };
        } else {
          return {
            ok: false,
            error: "Could not add place",
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
