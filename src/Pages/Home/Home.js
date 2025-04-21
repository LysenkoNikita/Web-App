import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { useGetHomeGamesQuery } from "../../Components/api/homeApi";
import { Content } from "../../Components/Content/Content";

import "./Home.css";

const Home = () => {
    const { user } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const gamesPerPage = 8;

    const {
        data: { games = [], totalPages = 1 } = {},
        isLoading,
        isFetching
    } = useGetHomeGamesQuery({ page: currentPage, per_page: gamesPerPage });

    const handlePageChange = (newPage) => {
        if (newPage > 0 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    return (
        <div className="home_page">
            <div className="content-wrapper">
                <div className={`games_container`}>
                    {user?.isAdmin || user?.isEditor ? (
                        <div
                            className="addGame"
                            onClick={() => navigate("/createGame")}
                        >
                            Добавить игру
                        </div>
                    ) : null}
                    <div className="games_container_block">
                        {(isLoading || isFetching) ? (
                            <div>Загрузка...</div>
                        ) : (
                            games.map((game, index) => (
                                <Content key={`${game.id}-${index}`} Game={game} />
                            ))
                        )}
                    </div>
                </div>
            </div>
            <div className="pagination-container">
                <div className="pagination">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1 || isLoading}
                    >
                        Назад
                    </button>

                    <span>
                        Страница {currentPage} из {totalPages}
                    </span>

                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages || isLoading}
                    >
                        Вперед
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Home;