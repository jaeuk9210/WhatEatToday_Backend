import { gql } from "apollo-server-express";

export default gql`
  type Review {
    id: Int!
    user: User!
    menu: Menu!
    file: [String]!
    caption: String
    hashtags: [Hashtag]
    likes: Int!
    comments: Int!
    createdAt: String!
    updatedAt: String!
    isMine: Boolean!
    taste: Int!
    cost: Int!
    reorder: Int!
    clean: Int
    service: Int
  }

  type Hashtag {
    id: Int!
    hashtag: String!
    reviews(lastId: Int): [Review]
    totalReviews: Int!
    createdAt: String!
    updatedAt: String!
  }

  type Like {
    id: Int!
    review: Review!
    createdAt: String!
    updatedAt: String!
  }
`;
