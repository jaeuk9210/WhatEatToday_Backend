import { gql } from "apollo-server-express";

export default gql`
  type Query {
    seeReviewLikes(id: Int!, lastId: Int): [User]
  }
`;
