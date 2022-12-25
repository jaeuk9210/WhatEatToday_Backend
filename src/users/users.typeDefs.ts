import { gql } from "apollo-server-express";

export default gql`
  type User {
    id: Int!
    firstName: String
    lastName: String
    username: String!
    email: String!
    createdAt: String!
    updatedAt: String!
    gender: Gender
    avatar: String
    phone: String
    birth: String
    reviews(lastId: Int): [Review]
    following: [User]
    followers: [User]
    totalFollowing: Int!
    totalFollowers: Int!
    isMe: Boolean!
    isFollowing: Boolean!
  }

  enum Gender {
    male
    female
  }
`;
