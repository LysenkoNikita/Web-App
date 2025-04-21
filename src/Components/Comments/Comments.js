import { useState, useEffect } from 'react';
import { useSelector } from "react-redux";

import {
    useGetCommentsQuery,
    useLazyGetCommentsQuery,
    useAddCommentMutation,
    useDeleteCommentMutation
} from '../api/commentsApi';

import './Comments.css';

export const Comments = ({ gameId }) => {
    const { user, isAuth } = useSelector((state) => state.auth);
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);
    const [offset, setOffset] = useState(0);
    const [hasMore, setHasMore] = useState(true);

    const per_page = 10;

    const { data: initialData, isLoading: initialLoading } = useGetCommentsQuery(
        { gameId, per_page, offset: 0 },
        { skip: !gameId }
    );
    const [fetchMoreComments, { isLoading: loadingMore }] = useLazyGetCommentsQuery();
    const [addComment] = useAddCommentMutation();
    const [deleteComment] = useDeleteCommentMutation();

    useEffect(() => {
        if (initialData) {
            setComments(initialData.comments);
            setHasMore(initialData.comments.length < initialData.totalCount);
            setOffset(initialData.comments.length);
        }
    }, [initialData]);

    const loadMoreComments = async () => {
        if (!hasMore || loadingMore) return;

        const { data } = await fetchMoreComments({
            gameId,
            per_page,
            offset
        });

        if (data) {
            setComments(prev => [...prev, ...data.comments]);
            setHasMore(comments.length + data.comments.length < data.totalCount);
            setOffset(prev => prev + data.comments.length);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!comment.trim()) return;

        try {
            const newComment = await addComment({
                gameId,
                userId: user.id,
                comment
            }).unwrap();

            setComments(prev => [newComment, ...prev]);
            setComment("");
        } catch (error) {
            console.error("Error submitting comment:", error);
        }
    };

    const handleDelete = async (commentId) => {
        try {
            await deleteComment(commentId).unwrap();
            setComments(prev => prev.filter(c => c[0] !== commentId));
        } catch (error) {
            console.error("Error deleting comment:", error);
        }
    };

    const CommentItem = ({ comment }) => {
        const isCurrentUser = isAuth && comment[1] === user?.id;
        return (
            <div className="comment">
                <div className="comment-header">
                    <span className="comment-author">{isCurrentUser ? "Вы" : comment[5]}</span>
                    <span className="comment-date">{comment[3]}</span>
                    {(isCurrentUser || user?.isAdmin || user?.isEditor) && (
                        <button
                            className="comment-delete-btn"
                            onClick={() => handleDelete(comment[0])}
                            aria-label="Удалить комментарий"
                        >
                            &times;
                        </button>
                    )}
                </div>
                <div className="comment-text">{comment[4]}</div>
            </div>
        );
    };

    return (
        <div className="game-comments">
            <h2>Комментарии</h2>

            {user && (
                <form onSubmit={handleSubmit} className="comment-form">
                    <div className="form-row">
            <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Напишите ваш комментарий..."
                className="comment-textarea"
                required
            />
                    </div>
                    <button type="submit" className="comment-submit">
                        Отправить комментарий
                    </button>
                </form>
            )}

            <div className="comments-list">
                {initialLoading ? (
                    <p>Загрузка комментариев...</p>
                ) : comments.length === 0 ? (
                    <p className="no-comments">Пока нет комментариев. Будьте первым!</p>
                ) : (
                    <>
                        {comments.map((comment) => (
                            <CommentItem key={comment[0]} comment={comment} />
                        ))}
                        {hasMore && (
                            <button
                                onClick={loadMoreComments}
                                className="load-more-btn"
                                disabled={loadingMore}
                            >
                                {loadingMore ? 'Загрузка...' : 'Показать еще'}
                            </button>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};