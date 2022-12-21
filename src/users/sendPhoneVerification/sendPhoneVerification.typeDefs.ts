import { gql } from "apollo-server-express";

export default gql`
  type Mutation {
    sendPhoneVerification(phone: String!): MutationResponse
  }
`;
