import { gql } from 'urql/core';

export const UpdateAccidentHospital = gql`
  mutation updateAccident($id: uuid!, $status: Boolean) {
    update_accidents_by_pk(pk_columns: { id: $id }, _set: { status: $status }) {
      id
    }
  }
`;
