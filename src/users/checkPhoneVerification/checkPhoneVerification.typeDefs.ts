import { gql } from "apollo-server-express";

export default gql`
  type Mutation {
    checkPhoneVerification(phone: String!, code: String!): MutationResponse!
  }
`;
