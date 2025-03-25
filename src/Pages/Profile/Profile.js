import React, { useState } from "react";
import "./Profile.css";

export const Profile = ({ user, setUser }) => {
    const [editMode, setEditMode] = useState(false);
    const [newUsername, setNewUsername] = useState(user.username);
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [deletePassword, setDeletePassword] = useState("");

    const handleUpdateUsername = () => {
        if (newUsername.trim() === "") {
            alert("Имя пользователя не может быть пустым");
            return;
        }
        setUser({ ...user, username: newUsername });
        setEditMode(false);
        alert("Имя пользователя успешно изменено");
    };

    const handleUpdatePassword = () => {
        if (oldPassword !== user.password) {
            alert("Неверный старый пароль");
            return;
        }
        if (newPassword.trim() === "") {
            alert("Новый пароль не может быть пустым");
            return;
        }
        setUser({ ...user, password: newPassword });
        setOldPassword("");
        setNewPassword("");
        alert("Пароль успешно изменен");
    };

    const handleDeleteAccount = () => {
        if (deletePassword !== user.password) {
            alert("Неверный пароль");
            return;
        }
        setUser(null);
        alert("Аккаунт успешно удален");
    };

    if (!user) {
        return <div className="profile-page">Аккаунт удален</div>;
    }

    return (
        <div className="profile-page">
            <div className="profile-section">
                <h2>Информация о пользователе</h2>
                <p>
                    <strong>Имя пользователя:</strong> {user.username}
                </p>
                <p>
                    <strong>Email:</strong> {user.email}
                </p>
                <button onClick={() => setEditMode(!editMode)}>
                    {editMode ? "Отменить" : "Изменить имя пользователя"}
                </button>
                {editMode && (
                    <div className="edit-section">
                        <input
                            type="text"
                            value={newUsername}
                            onChange={(e) => setNewUsername(e.target.value)}
                            placeholder="Новое имя пользователя"
                        />
                        <button onClick={handleUpdateUsername}>Сохранить</button>
                    </div>
                )}
            </div>

            <div className="password-section">
                <h2>Смена пароля</h2>
                <input
                    type="password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    placeholder="Старый пароль"
                />
                <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Новый пароль"
                />
                <button onClick={handleUpdatePassword}>Изменить пароль</button>
            </div>

            <div className="delete-section">
                <h2>Удаление аккаунта</h2>
                <input
                    type="password"
                    value={deletePassword}
                    onChange={(e) => setDeletePassword(e.target.value)}
                    placeholder="Введите пароль для подтверждения"
                />
                <button onClick={handleDeleteAccount}>Удалить аккаунт</button>
            </div>
        </div>
    );
};