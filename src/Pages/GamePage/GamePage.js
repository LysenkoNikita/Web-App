import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import { useGetGameByIdQuery } from '../../Components/api/gamesApi';
import { Comments } from "../../Components/Comments/Comments";

import './GamePage.css';

const GamePage = () => {
    const { id } = useParams();
    const [currentSlide, setCurrentSlide] = useState(0);

    const {
        data: game,
        isLoading,
        isError
    } = useGetGameByIdQuery(id);

    const nextSlide = () => {
        setCurrentSlide((prev) =>
            prev === game.screen.length - 1 ? 0 : prev + 1
        );
    };

    const prevSlide = () => {
        setCurrentSlide((prev) =>
            prev === 0 ? game.screen.length - 1 : prev - 1
        );
    };

    if (isLoading) return <div>Загрузка...</div>;
    if (isError || !game) return <div>Игра не найдена</div>;

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

            {game.screen.length > 0 && (
                <div className="game-screenshots">
                    <h2>Скриншоты</h2>
                    <div className="carousel-container">
                        <button
                            className="carousel-button prev"
                            onClick={prevSlide}
                        >
                            &lt;
                        </button>

                        <div className="carousel-slide">
                            <img
                                src={game.screen[currentSlide]}
                                alt={`Скриншот ${currentSlide + 1}`}
                                className="screenshot"
                            />
                            <div className="slide-counter">
                                {currentSlide + 1} / {game.screen.length}
                            </div>
                        </div>

                        <button
                            className="carousel-button next"
                            onClick={nextSlide}
                        >
                            &gt;
                        </button>
                    </div>
                </div>
            )}

            <Comments gameId={id} />
        </div>
    );
};

export default GamePage;