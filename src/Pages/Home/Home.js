import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { Content } from "../../Components/Content/Content";

import "./Home.css";

export const Home = () => {
    const {user} = useSelector((state) => state.auth);

    const navigate = useNavigate();
    const [games, setGames] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);

    const gamesPerPage = 8;

    const fetchGames = async (page) => {
        setLoading(true);
        try {
            const response = await axios.get(`http://127.0.0.1:8000/home/`, {
                params: {
                    page: page,
                    per_page: gamesPerPage
                }
            });
            setGames(response.data.games);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.error("Error fetching games:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchGames(currentPage);
    }, [currentPage]);

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
                        {loading ? (
                            <div>Загрузка...</div>
                        ) : (
                            games.map((game, index) => (
                                <Content key={index} Game={game} />
                            ))
                        )}
                    </div>
                </div>

            </div>
            <div className="pagination-container">
                <div className="pagination">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        Назад
                    </button>

                    <span>
                            Страница {currentPage} из {totalPages}
                        </span>

                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        Вперед
                    </button>
                </div>
            </div>
        </div>
    );
};