import { gql } from 'urql/core';

export const AdminDashboardDetails = gql`
  query adminDashboard {
    hospitals: hospitals_aggregate {
      aggregate {
        count
      }
    }
    drivers: drivers_aggregate {
      aggregate {
        count
      }
    }
    clients: clients_aggregate {
      aggregate {
        count
      }
    }
  }
`;

export const GetDrivers = gql`
  query GetDrivers {
    users(where: { role: { _eq: DRIVER } }) {
      id
      name
      email
      drivers {
        phone
      }
    }
  }
`;

export const GetHospitals = gql`
  query GetHospitals {
    users(where: { role: { _eq: HOSPITAL } }) {
      id
      name
      email
      hospitals {
        phone
      }
    }
  }
`;

export const GetClients = gql`
  query GetClients {
    users(where: { role: { _eq: USER } }) {
      id
      name
      email
      clients {
        phone
      }
    }
  }
`;
