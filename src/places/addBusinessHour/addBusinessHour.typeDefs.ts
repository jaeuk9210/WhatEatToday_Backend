import { gql } from "apollo-server-express";

export default gql`
  type Mutation {
    addBusinessHour(
      placeId: Int!
      weekday: Weekday!
      open: String
      close: String
    ): MutationResponse!
  }
`;
