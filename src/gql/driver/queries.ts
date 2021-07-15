import { gql } from 'urql/core';

export const GetAccidentDetails = gql`
  query getAccidentSubscription {
    accidents {
      description
      location
      accepted_by
      photo
      client {
        id
        phone
        profile_picture
      }
    }
  }
`;
