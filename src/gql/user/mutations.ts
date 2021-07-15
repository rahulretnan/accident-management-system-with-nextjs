import { gql } from 'urql/core';

export const CreateUser = gql`
  mutation addUser($name: String!, $email: String!, $role: user_roles_enum!) {
    user: insert_users_one(
      object: { name: $name, email: $email, role: $role }
    ) {
      id
    }
  }
`;

export const CreateDriver = gql`
  mutation CreateDriver($objects: [drivers_insert_input!] = {}) {
    insert_drivers(objects: $objects) {
      affected_rows
    }
  }
`;
export const CreateHospital = gql`
  mutation CreateHospital($objects: [hospitals_insert_input!] = {}) {
    insert_hospitals(objects: $objects) {
      affected_rows
    }
  }
`;
export const CreateClient = gql`
  mutation CreateClient($objects: [clients_insert_input!] = {}) {
    insert_clients(objects: $objects) {
      affected_rows
    }
  }
`;

export const DeleteUser = gql`
  mutation deleteUserById($id: uuid!) {
    delete_users_by_pk(id: $id) {
      id
    }
  }
`;
