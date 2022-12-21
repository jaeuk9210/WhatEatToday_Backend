import { gql } from "apollo-server-express";

export default gql`
  type Mutation {
    addPlace(
      name: String!
      phoneNumber: String
      address: String!
    ): MutationResponse!
  }
`;
