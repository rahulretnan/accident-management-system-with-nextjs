/* eslint-disable import/no-anonymous-default-export */
import { get, omit } from 'lodash';
import type { NextApiRequest, NextApiResponse } from 'next';
import {
  CreateClient,
  CreateDriver,
  CreateHospital,
  CreateUser,
} from '~/gql/user/mutations';
import gqlClient from '~/helpers/graphql-client';
import { admin } from '~/services/firebase/admin';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const method = req?.method;
  const variables = req?.body;
  const details = omit(variables, ['name', 'email', 'role', 'password']);
  if (method === 'POST') {
    try {
      const data = await gqlClient.request(CreateUser, {
        name: variables?.name,
        email: variables?.email,
        role: variables?.role,
      });
      const userId = get(data, 'user.id');

      await admin.auth().createUser({
        uid: userId,
        email: variables?.email,
        emailVerified: false,
        password: variables?.password,
        displayName: variables?.name,
        disabled: false,
      });

      await admin.auth().setCustomUserClaims(userId, {
        role: variables?.role,
      });

      if (variables?.role === 'DRIVER') {
        await gqlClient.request(CreateDriver, {
          objects: {
            ...details,
            user_id: userId,
          },
        });
      }
      if (variables?.role === 'HOSPITAL') {
        await gqlClient.request(CreateHospital, {
          objects: {
            ...details,
            user_id: userId,
          },
        });
      }
      if (variables?.role === 'USER') {
        await gqlClient.request(CreateClient, {
          objects: {
            ...details,
            user_id: userId,
          },
        });
      }
      return res.status(200).json({ id: userId });
    } catch (error) {
      return res.status(409).send({ error });
    }
  } else {
    return res.status(405).statusMessage;
  }
};
