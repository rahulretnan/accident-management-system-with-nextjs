import React from 'react';
import { createClient, Provider } from 'urql';
import { TProps } from '~/shared/types';

const GraphQlProvider = ({ children }: TProps<any>) => {
  const client = createClient({
    url: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || '',
    requestPolicy: 'network-only',
    fetchOptions: () => {
      return {
        headers: {
          'content-type': 'application/json',
          'x-hasura-admin-secret':
            process.env.NEXT_PUBLIC_GRAPHQL_ADMIN_SECRET || '',
        },
      };
    },
  });

  return <Provider value={client}>{children}</Provider>;
};

export default GraphQlProvider;
