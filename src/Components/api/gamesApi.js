import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const gamesApi = createApi({
    reducerPath: 'gamesApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:8000' }),
    tagTypes: ['Game'],
    endpoints: (builder) => ({
        getGameById: builder.query({
            query: (id) => `/games/${id}`,
            transformResponse: (response) => {
                if (!response) return null;
                return {
                    ...response,
                    screen: response.screen ? response.screen.split(" ") : []
                };
            },
            providesTags: (result, error, id) => result ? [{ type: 'Game', id }] : [],
        }),
    })
});

export const { useGetGameByIdQuery } = gamesApi;