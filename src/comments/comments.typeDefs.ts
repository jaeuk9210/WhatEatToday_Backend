import { gql } from "apollo-server-express";

export default gql`
  type Comment {
    id: Int!
    user: User!
    review: Review!
    payload: String!
    isMine: Boolean!
    createdAt: String!
    updatedAt: String!
  }
`;
