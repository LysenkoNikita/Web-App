import React, { useState } from "react";
import axios from "axios";


export const Feedback= () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await axios.post("http://127.0.0.1:8000/feedback", formData);
            if (response.status === 200) {
                setSubmitted(true);
                setFormData({ name: "", email: "", message: "" });
            }
        } catch (error) {
            setError("Ошибка при отправке отзыва. Пожалуйста, попробуйте снова.");
            console.error("Ошибка:", error);
        }
    };

    return (
        <div className="Feedback">
            <h1>Форма обратной связи</h1>
            {submitted ? (
                <p>Спасибо за ваш отзыв!</p>
            ) : (
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name">Имя:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="message">Сообщение:</label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    {error && <p style={{ color: "red" }}>{error}</p>}
                    <button type="submit">Отправить</button>
                </form>
            )}
        </div>
    );
};
