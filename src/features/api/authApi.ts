import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import Cookies from 'js-cookie';

type Profile = {
  blockchain_account_id: null | number;
  created_at: string;
  email: string;
  extension: null; //не уверен
  id: string;
  mailing_agree: number;
  name: string;
  pricing_plan_id: null; //не уверен
  updated_at: string;
};

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://dev.epx.everypixel.com/api/v1',
    prepareHeaders: async (headers) => {
      headers.set('Content-Type', 'application/json');
      const token = Cookies.get('access_token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (userData) => ({
        url: '/auth/register',
        method: 'POST',
        body: userData,
      }),
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    confirmEmail: builder.mutation({
      query: (token) => ({
        url: `/auth/confirm-email/${token}`,
        method: 'POST',
      }),
    }),
    getMe: builder.query<{ name: string; email: string }, void>({
      query: () => '/users/me',
      transformResponse: (response: Profile) => {
        if (!response) {
          throw new Error('Invalid user data format');
        }
        const userData = response;

        if (!userData || !userData.name || !userData.email) {
          throw new Error('Invalid user data format');
        }
        console.log(response);
        return {
          name: userData.name,
          email: userData.email,
        };
      },
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation, useConfirmEmailMutation, useGetMeQuery } =
  authApi;
