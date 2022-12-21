import { gql } from "apollo-server-express";

export default gql`
  type Query {
    conditionSearchMenu(
      categories: [String]!
      minPrice: Int
      maxPrice: Int
      startTime: Int
      endTime: Int
      delivery: [String]
      distanse: [String]
    ): [Place]
  }
`;
