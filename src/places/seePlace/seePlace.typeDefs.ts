import { gql } from "apollo-server-express";

export default gql`
  type Query {
    seePlace(id: Int!): Place
  }
`;
