import { gql } from "apollo-server-express";

export default gql`
  type Query {
    seeReviewComments(id: Int!, lastId: Int): [Comment]
  }
`;
