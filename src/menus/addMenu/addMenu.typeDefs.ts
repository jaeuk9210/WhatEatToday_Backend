import { gql } from "apollo-server-express";

export default gql`
  type Mutation {
    addMenu(
      name: String!
      placeId: Int!
      price: Int!
      category: Category!
      subCategory: String!
    ): MutationResponse!
  }
`;
