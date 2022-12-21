import { gql } from "apollo-server-express";

export default gql`
  type Menu {
    id: Int!
    name: String!
    price: Int!
    createdAt: String!
    updatedAt: String!
    review: [Review]!
    place: Place
    category: Category!
    subCategory: String!
  }

  enum Category {
    korean
    wastern
    chinese
    japanese
    buffet
    snack
    cafe
    pub
  }
`;
