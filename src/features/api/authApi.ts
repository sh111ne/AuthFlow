import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import Cookies from 'js-cookie';
import type { PostRegistration, Profile, User } from '../../@types/types';

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
      query: (userData: PostRegistration) => ({
        url: '/auth/register',
        method: 'POST',
        body: userData,
      }),
    }),
    login: builder.mutation({
      query: (credentials: User) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    confirmEmail: builder.mutation({
      query: (token: string) => ({
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
