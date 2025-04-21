import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const homeApi = createApi({
    reducerPath: 'homeApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:8000' }),
    tagTypes: ['Home'],
    endpoints: (builder) => ({
        getHomeGames: builder.query({
            query: ({ page = 1, per_page = 8 }) => ({
                url: '/home/',
                params: { page, per_page }
            }),
            transformResponse: (response) => ({
                games: response.games,
                totalPages: response.totalPages
            }),
            providesTags: ['Home'],
            serializeQueryArgs: ({ endpointName }) => endpointName,
            merge: (currentCache, newItems) => {
                if (newItems.meta.arg.page === 1) {
                    return newItems.data;
                }
                return {
                    games: [...currentCache.games, ...newItems.data.games],
                    totalPages: newItems.data.totalPages
                };
            },
            forceRefetch({ currentArg, previousArg }) {
                return currentArg?.page !== previousArg?.page;
            }
        })
    })
});

export const { useGetHomeGamesQuery } = homeApi;