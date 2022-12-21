import { gql } from "apollo-server-express";

export default gql`
  type Mutation {
    uploadReview(
      files: [Upload]!
      caption: String
      menuId: Int!
      taste: Int!
      cost: Int!
      reorder: Int!
      clean: Int
      service: Int
    ): MutationResponse!
  }
`;
