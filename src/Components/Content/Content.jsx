import React from 'react';
import {useNavigate} from 'react-router-dom';

import "./Content.css";

export const Content = ({ Game }) => {
    const navigate = useNavigate();
    return (
        <div className="content">
            <div className="content_info">
                <div className="content_block" onClick={() => navigate("/games/" + Game.id)}>
                    <img
                        className="content_image"
                        src={Game.image}
                        alt={Game.name}
                    />
                    <div className="content_description">
                        <p className="content_description-text">
                            {Game.description}
                        </p>
                    </div>
                </div>
                <div className="content_name">
                    <p className="content_name-text">
                        {Game.name}
                    </p>
                </div>
            </div>
        </div>
    );
};