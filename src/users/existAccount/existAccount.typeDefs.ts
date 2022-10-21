import { gql } from "apollo-server-express";

export default gql`
  type Mutation {
    existAccount(email: String!): MutationResponse!
  }
`;
