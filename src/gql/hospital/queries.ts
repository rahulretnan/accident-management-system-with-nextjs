import { gql } from 'urql/core';

export const HospitalDashboardDetails = gql`
  query hospitalDashboard {
    accidents: accidents_aggregate {
      aggregate {
        count
      }
    }
  }
`;

export const GetAccidentList = gql`
  query AccidentList {
    accidents {
      id
      location
      photo
      status
      description
    }
  }
`;
