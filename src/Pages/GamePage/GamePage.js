import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './GamePage.css';

export const GamePage = () => {
    const { id } = useParams();
    const [game, setGame] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGame = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/games/${id}`);
                setGame(response.data);
            } catch (error) {
                console.error("Error fetching game:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchGame();
    }, [id]);

    if (loading) return <div>Загрузка...</div>;
    if (!game) return <div>Игра не найдена</div>;

    return (
        <div className="game-page">
            <div className="game-header">
                <div className="game-cover-container">
                    <img
                        src={game.img}
                        alt={game.name}
                        className="game-cover"
                    />
                </div>

                <div className="game-info">
                    <h1 className="game-title">{game.name}</h1>

                    <div className="game-meta">
                        <div className="meta-item">
                            <span className="meta-label">Год выпуска:</span>
                            <span className="meta-value">{game.year}</span>
                        </div>

                        <div className="meta-item">
                            <span className="meta-label">Жанр:</span>
                            <span className="meta-value">{game.genre}</span>
                        </div>

                        <div className="meta-item">
                            <span className="meta-label">Разработчик:</span>
                            <span className="meta-value">{game.studio}</span>
                        </div>

                        <div className="meta-item">
                            <span className="meta-label">Издатель:</span>
                            <span className="meta-value">{game.studio}</span>
                        </div>
                    </div>

                    <a
                        href={game.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="play-button"
                    >
                        Играть
                    </a>
                </div>
            </div>

            <div className="game-description">
                <h2>Описание</h2>
                <p>{game.description}</p>
            </div>

            <div className="game-screenshots">
                <h2>Скриншоты</h2>
                <div className="screenshots-grid">
                    {game.screenshots?.map((screenshot, index) => (
                        <img
                            key={index}
                            src={screenshot.startsWith('data:image') ? screenshot : `data:image/jpeg;base64,${screenshot}`}
                            alt={`Скриншот ${index + 1}`}
                            className="screenshot"
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};
