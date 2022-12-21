import { gql } from "apollo-server-express";

export default gql`
  type Mutation {
    editBusinessHour(
      placeId: Int!
      weekday: Weekday!
      open: String
      close: String
    ): MutationResponse!
  }
`;
