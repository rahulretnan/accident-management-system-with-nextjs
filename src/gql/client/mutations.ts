import { gql } from 'urql/core';

export const AddAccident = gql`
  mutation addAccident(
    $created_by: uuid
    $description: String
    $location: String
    $photo: String
  ) {
    insert_accidents(
      objects: {
        created_by: $created_by
        description: $description
        location: $location
        photo: $photo
      }
    ) {
      affected_rows
    }
  }
`;
