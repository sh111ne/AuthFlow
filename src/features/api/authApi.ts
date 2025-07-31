import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://dev.epx.everypixel.com/api/v1/auth',
    prepareHeaders: async (headers) => {
      headers.set('Content-Type', 'application/json');

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
