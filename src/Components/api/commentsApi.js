import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const commentsApi = createApi({
    reducerPath: 'commentsApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:8000' }),
    endpoints: (builder) => ({
        getComments: builder.query({
            query: ({ gameId, per_page, offset }) => ({
                url: '/comments/',
                params: { game_id: gameId, per_page, offset }
            }),
            transformResponse: (response) => {
                const [comments, totalCount] = response;
                return { comments, totalCount };
            }
        }),
        addComment: builder.mutation({
            query: ({ gameId, userId, comment }) => ({
                url: '/comments',
                method: 'POST',
                body: { game_id: gameId, user_id: userId, comment }
            })
        }),
        deleteComment: builder.mutation({
            query: (commentId) => ({
                url: '/comment',
                method: 'DELETE',
                body: { id: commentId }
            })
        })
    })
});

export const {
    useGetCommentsQuery,
    useLazyGetCommentsQuery,
    useAddCommentMutation,
    useDeleteCommentMutation
} = commentsApi;