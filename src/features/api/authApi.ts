import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api',
    credentials: 'include',
    mode: 'cors',
    prepareHeaders: async (headers) => {
      headers.set('Content-Type', 'application/json');
      const response = await fetch('https://dev.epx.everypixel.com/api/v1/auth/csrf-token', {
        method: 'GET',
        credentials: 'include',
      });
      const json = await response.json();
      const token = json.token ? json.token.split(';')[0].split('=')[1] : '';
      // const token = json.token ?? '';

      if (token) {
        headers.set('X-CSRF-Token', token);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (userData) => ({
        url: '/register',
        method: 'POST',
        body: userData,
      }),
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: '/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    confirmEmail: builder.mutation({
      query: (token) => ({
        url: `/confirm-email/${token}`,
        method: 'POST',
      }),
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation, useConfirmEmailMutation } = authApi;
