import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateGameMutation } from "../../Components/api/createrApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ClipLoader } from "react-spinners";
import "./CreateGame.css";

const CreateGame = () => {
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

    const [createGame, { isLoading }] = useCreateGameMutation();

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    const handleScreenShotsChange = (e) => {
        const files = e.target.files;
        const fileArray = Array.from(files);
        if (fileArray.length > 0) {
            setScreen(fileArray);
        }
    };

    const handleSave = async () => {
        if (!title || !genre || !studio || !year || !description || !link || !image || !screen) {
            toast.error("Пожалуйста, заполните все поля");
            return;
        }

        const formData = new FormData();
        formData.append('title', title);
        formData.append('genre', genre);
        formData.append('studio', studio);
        formData.append('year', year);
        formData.append('description', description);
        formData.append('link', link);
        formData.append('image', image);

        screen.forEach((file) => {
            formData.append('screens', file);
        });

        try {
            await createGame(formData).unwrap();
            toast.success("Игра успешно создана!");
            setTimeout(() => navigate("/home"), 1500);
        } catch (err) {
            toast.error(err.data?.message || "Ошибка при создании игры");
        }
    };

    const handleCancel = () => {
        if (title || genre || studio || year || description || link || image || screen) {
            if (window.confirm("Вы уверены, что хотите отменить создание игры? Все данные будут потеряны.")) {
                resetForm();
                toast.info("Создание игры отменено");
            }
        }
    };

    const resetForm = () => {
        setTitle("");
        setGenre("");
        setStudio("");
        setYear("");
        setDescription("");
        setLink("");
        setImage(null);
        setScreen(null);
        setPreviewImage(null);
    };

    return (
        <div className="createGame">
            <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />

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
                        disabled={isLoading}
                    />
                </div>
                <div className="details_container">
                    <input
                        type="text"
                        placeholder="Название игры*"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="input_field"
                        disabled={isLoading}
                    />
                    <input
                        type="text"
                        placeholder="Жанр*"
                        value={genre}
                        onChange={(e) => setGenre(e.target.value)}
                        className="input_field"
                        disabled={isLoading}
                    />
                    <input
                        type="date"
                        placeholder="Год выпуска*"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        className="input_field"
                        disabled={isLoading}
                    />
                    <input
                        type="text"
                        placeholder="Студия разработчик*"
                        value={studio}
                        onChange={(e) => setStudio(e.target.value)}
                        className="input_field"
                        disabled={isLoading}
                    />
                </div>
            </div>
            <div className="description_container">
                <textarea
                    placeholder="Описание игры*"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="description_input"
                    disabled={isLoading}
                />
            </div>
            <div>
                <input
                    type="text"
                    placeholder="Ссылка на игру*"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    className="input_field"
                    disabled={isLoading}
                />
            </div>
            <div className="screen_container">
                {screen ? (
                    <div className="images-grid">
                        {screen.map((image, index) => (
                            <img
                                key={index}
                                src={URL.createObjectURL(image)}
                                alt={`Preview ${index}`}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="screen_placeholder">Выберите скриншоты игры*</div>
                )}
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleScreenShotsChange}
                    className="image_input"
                    multiple
                    disabled={isLoading}
                />
            </div>
            <div className="buttons_container">
                <button
                    onClick={handleSave}
                    className="save_button"
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <>
                            <ClipLoader
                                color="#ffffff"
                                size={20}
                                cssOverride={{ marginRight: "8px" }}
                            />
                            Сохранение...
                        </>
                    ) : "Сохранить"}
                </button>
                <button
                    onClick={handleCancel}
                    className="cancel_button"
                    disabled={isLoading}
                >
                    Отменить
                </button>
            </div>
        </div>
    );
};

export default CreateGame;