import React, { useState } from "react";
import axios from "axios";

import "./CreateGame.css";
import {useNavigate} from "react-router-dom";

export const CreateGame = () => {
    const [title, setTitle] = useState("");
    const [genre, setGenre] = useState("");
    const [studio, setStudio] = useState("");
    const [year, setYear] = useState("");
    const [description, setDescription] = useState("");
    const [link, setLink] = useState("");
    const [image, setImage] = useState(null);
    const [screen, setScreen] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const navigate = useNavigate();

    const URLPage = " http://127.0.0.1:8000";

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setPreviewImage(URL.createObjectURL(file)); // Создаем временный URL для предпросмотра
        }
    };

    const handleScreenShotsChange = (e) => {
        const files = e.target.files;
        const file_array = []
        for (let i = 0; i < files.length; i++) {
            file_array.push(files[i]);
        }
        if (file_array) {
            setScreen(file_array);
        }
    };

    const handleSave = async () => {
        const formData = new FormData();
        formData.append('title', title);
        formData.append('genre', genre);
        formData.append('studio', studio);
        formData.append('year', year);
        formData.append('description', description);
        formData.append('link', link);
        formData.append('image', image);

        for (let i = 0; i < screen.length; i++) {
            formData.append('screens', screen[i]);  // Note: 'screens' matches backend parameter
        }
        try{
            await axios.post(URLPage + "/createGame", formData, {
                headers: {
                "Content-Type": "multipart/form-data",
            }});
            navigate("/home");
        }
        catch(err){
            alert(err.response.data.message);
        }

    };

    const handleCancel = () => {
        setTitle("");
        setGenre("");
        setStudio("")
        setYear("")
        setDescription("");
        setLink("");
        setImage(null);
        setPreviewImage(null);
        alert("Изменения отменены.");
    };

    return (
        <div className="createGame">
            <div className="info_container">
                <div className="img_container">
                    {previewImage ? (
                        <img src={previewImage} alt="Preview" />
                    ) : (
                        <div className="image_placeholder">Выберите изображение</div>
                    )}
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="image_input"
                    />
                </div>
                <div className="details_container">
                    <input
                        type="text"
                        placeholder="Название игры"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="input_field"
                    />
                    <input
                        type="text"
                        placeholder="Жанр"
                        value={genre}
                        onChange={(e) => setGenre(e.target.value)}
                        className="input_field"
                    />
                    <input
                        type="date"
                        placeholder="Год выпуска"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        className="input_field"
                    />
                    <input
                        type="text"
                        placeholder="Студия разработчик"
                        value={studio}
                        onChange={(e) => setStudio(e.target.value)}
                        className="input_field"
                    />
                </div>
            </div>
            <div className="description_container">
                <textarea
                    placeholder="Описание игры"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="description_input"
                />
            </div>
            <div>
                <input
                    type="text"
                    placeholder="Ссылка на игру"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    className="input_field"
                />
            </div>
            <div className="screen_container">
                {screen ? (
                    <div className="images-grid">
                        {screen.map((image, index) => (
                            <img key={index} src={URL.createObjectURL(image)} alt={`Preview ${index}`} />
                        ))}
                    </div>
                ) : (
                    <div className="screen_placeholder">Выберите скриншоты игры</div>
                )}
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleScreenShotsChange}
                    className="image_input"
                    multiple={true}
                />
            </div>
            <div className="buttons_container">
            <button onClick={handleSave} className="save_button">
                Сохранить
            </button>
            <button onClick={handleCancel} className="cancel_button">
                Отменить
            </button>
        </div>
        </div>
    );
};