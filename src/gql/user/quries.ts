import { gql } from 'graphql-request';

export const GetUserProfile = gql`
  query getUserProfile($user_id: uuid!) {
    users(where: { id: { _eq: $user_id } }) {
      drivers {
        id
        profile_picture
      }
      hospitals {
        id
        profile_picture
      }
      clients {
        id
        profile_picture
      }
    }
  }
`;
