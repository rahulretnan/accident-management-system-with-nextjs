import { gql } from 'urql/core';

export const UpdateDriverStatus = gql`
  mutation updateDriverStatus($id: uuid!, $created_by: uuid!) {
    update_accidents_by_pk(
      pk_columns: { id: $id }
      _set: { created_by: $created_by }
    ) {
      accepted_by
    }
  }
`;
