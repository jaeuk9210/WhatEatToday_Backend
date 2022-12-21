import { gql } from "apollo-server-express";

export default gql`
  type Place {
    id: Int!
    name: String!
    phoneNumber: String
    address: String!
    createdAt: String!
    updatedAt: String!
    totalMenu: Int!
    totalReview: Int!
    businessHour: [BusinessHour]
    menus: [Menu]
    subCategories: [String]!
  }

  type BusinessHour {
    id: Int!
    place: Place!
    weekday: Weekday!
    open: Int
    close: Int
  }

  enum Weekday {
    monday
    tuesday
    wednesday
    thursday
    friday
    saturday
    sunday
  }
`;
