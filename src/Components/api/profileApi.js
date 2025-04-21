import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const profileApi = createApi({
    reducerPath: 'profileApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:8000' }),
    tagTypes: ['Profile'],
    endpoints: (builder) => ({
        updateUsername: builder.mutation({
            query: ({ id, name }) => ({
                url: '/username',
                method: 'PUT',
                body: { id, name }
            }),
            invalidatesTags: ['Profile']
        }),
        updatePassword: builder.mutation({
            query: ({ id, newPassword, oldPassword }) => ({
                url: '/password',
                method: 'PUT',
                body: { id, newPassword, oldPassword }
            })
        }),
        deleteAccount: builder.mutation({
            query: ({ id, password }) => ({
                url: '/user',
                method: 'DELETE',
                body: { id, password }
            })
        })
    })
});

export const {
    useUpdateUsernameMutation,
    useUpdatePasswordMutation,
    useDeleteAccountMutation
} = profileApi;