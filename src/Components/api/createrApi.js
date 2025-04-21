import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const createrApi = createApi({  // Changed from createrApi to createApi
    reducerPath: 'createrApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:8000' }),
    tagTypes: ['Games'],
    endpoints: (builder) => ({
        createGame: builder.mutation({
            query: (formData) => ({
                url: '/createGame',
                method: 'POST',
                body: formData
            }),
            invalidatesTags: ['Games']
        })
    })
});

export const { useCreateGameMutation } = createrApi;