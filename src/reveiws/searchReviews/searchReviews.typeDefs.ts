import { gql } from "apollo-server-express";

export default gql`
  type Query {
    searchReviews(keyword: String!, lastId: Int): [Review]
  }
`;
