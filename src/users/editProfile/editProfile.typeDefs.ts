import { gql } from "apollo-server-express";

export default gql`
  type Mutation {
    editProfile(
      firstName: String
      lastName: String
      username: String
      email: String
      password: String
      gender: Gender
      avatar: Upload
    ): MutationResponse!
  }
`;
