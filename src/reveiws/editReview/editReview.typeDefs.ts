import { gql } from "apollo-server-express";

export default gql`
  type Mutation {
    editReview(
      id: Int!
      caption: String!
      taste: Int!
      cost: Int!
      reorder: Int!
      clean: Int
      service: Int!
    ): MutationResponse!
  }
`;
