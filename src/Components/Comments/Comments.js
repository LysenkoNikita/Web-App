import {useState, useEffect, useCallback} from 'react';
import {useSelector} from "react-redux";
import './Comments.css';
import axios from "axios";

export const Comments = ({gameId}) => {
    const {user, isAuth} = useSelector((state) => state.auth);
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);

    const [loadingMore, setLoadingMore] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const per_page = 10;

    const loadComments = useCallback(async (initialLoad = false) => {
        if (!initialLoad) setLoadingMore(true);
        try {
            const response = await axios.get(`http://127.0.0.1:8000/comments/`, {
                params: {
                    game_id: gameId,
                    per_page: per_page,
                    offset: initialLoad ? 0 : comments.length
                }
            });

            const [newComments, totalCount] = response.data;
            if (initialLoad) {
                setComments(newComments);
                setHasMore(newComments.length < totalCount);
            } else {
                setComments(prevComments => [...prevComments, ...newComments]);
                setHasMore(comments.length + newComments.length < totalCount);
            }
        } catch (error) {
            console.error("Error loading comments:", error);
        } finally {
            setLoadingMore(false);
        }
    }, [gameId, per_page, comments.length]); // Теперь comments не нужен в зависимостях

    useEffect(() => {
        loadComments(true);
        // eslint-disable-next-line
    }, [gameId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!comment.trim()) return;

        try {
            const response = await axios.post(`http://127.0.0.1:8000/comments`, {
                game_id: gameId,
                user_id: user.id,
                comment: comment
            });

            const newComment = {
                ...response.data,
            };

            setComments([newComment, ...comments]);
            setComment("");
        } catch (error) {
            console.error("Error submitting comment:", error);
        }
    };

    const handleDelete = async (comment_id) => {
        console.log(comment_id);
        await axios.delete(`http://127.0.0.1:8000/comment`, {
            data:{
                id: comment_id,
            }});
        setComments(prevComments => prevComments.filter(comment => comment[0] !== comment_id));

    }

    const CommentItem = ({ comment }) => {
        const isCurrentUser = isAuth && comment[1] === user?.id;
        return (
            <div className="comment">
                <div className="comment-header">
                    <span className="comment-author">{isCurrentUser ? "Вы": comment[5]}</span>
                    <span className="comment-date">{comment[3]}</span>
                    {isCurrentUser || user?.isAdmin || user?.isEditor ?
                        (<button
                            className="comment-delete-btn"
                            onClick={() => handleDelete(comment[0])}
                            aria-label="Удалить комментарий"
                        >
                        &times;
                    </button>): null}
                </div>
                <div className="comment-text">{comment[4]}</div>
            </div>
        );};

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
                {comments.length === 0 && !loadingMore ? (
                    <p className="no-comments">Пока нет комментариев. Будьте первым!</p>
                ) : (
                    <>
                        {comments.map((comment) => (
                            <CommentItem key={comment[0]} comment={comment} />
                        ))}
                        {hasMore && (
                            <button
                                onClick={() => loadComments(false)}
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