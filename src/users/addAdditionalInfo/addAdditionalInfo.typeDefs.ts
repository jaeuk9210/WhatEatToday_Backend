import { gql } from "apollo-server-express";

export default gql`
  type Mutation {
    addAdditionalInfo(
      id: Int!
      firstName: String!
      lastName: String!
      gender: Gender!
      phone: String!
      birth: String!
      code: String!
    ): MutationResponse!
  }
`;
