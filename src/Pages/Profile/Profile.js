import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { logout, setUser } from "../../Components/Slices/AuthSlice";
import axios from "axios";
import {
    Box,
    Button,
    Card,
    CardContent,
    TextField,
    Typography,
    Alert,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from "@mui/material";


export const Profile = ({ user }) => {
    const dispatch = useDispatch();
    const [editMode, setEditMode] = useState(false);
    const [newUsername, setNewUsername] = useState(user.username);
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [deletePassword, setDeletePassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

    const handleUpdateUsername = async () => {
        if (newUsername.trim() === "") {
            setError("Имя пользователя не может быть пустым");
            return;
        }
        try {
            await axios.put("http://127.0.0.1:8000/username", {
                id: user.id,
                name: newUsername,
            });
            dispatch(setUser({ username: newUsername }));
            setEditMode(false);
            setSuccess("Имя пользователя успешно изменено");
            setTimeout(() => setSuccess(""), 3000);
        } catch (err) {
            setError("Ошибка при изменении имени пользователя");
        }
    };

    const handleUpdatePassword = async () => {
        if (oldPassword.trim() === "") {
            setError("Введите старый пароль");
            return;
        }
        if (newPassword.trim() === "") {
            setError("Новый пароль не может быть пустым");
            return;
        }
        try {
            await axios.put("http://127.0.0.1:8000/password", {
                id: user.id,
                newPassword: newPassword,
                oldPassword: oldPassword,
            });
            setOldPassword("");
            setNewPassword("");
            setSuccess("Пароль успешно изменен");
            setTimeout(() => setSuccess(""), 3000);
        } catch (err) {
            setError("Ошибка при изменении пароля");
        }
    };

    const handleDeleteAccount = async () => {
        if (deletePassword.trim() === "") {
            setError("Введите пароль для подтверждения");
            return;
        }
        try {
            await axios.delete("http://127.0.0.1:8000/user", {
                data: {
                    id: user.id,
                    password: deletePassword,
                },
            });
            setUser(null);
            dispatch(logout());
            setSuccess("Аккаунт успешно удален");
        } catch (err) {
            setError("Ошибка при удалении аккаунта");
        }
    };

    if (!user) {
        return (
            <Box sx={{ p: 3 }}>
                <Typography variant="h6">Аккаунт удален</Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ maxWidth: 600, minHeight: 800, mx: "auto", p: 3 }}>
            {error && (
                <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError("")}>
                    {error}
                </Alert>
            )}
            {success && (
                <Alert severity="success" sx={{ mb: 2 }} onClose={() => setSuccess("")}>
                    {success}
                </Alert>
            )}

            <Card sx={{ mb: 3 }}>
                <CardContent>
                    <Typography variant={"h6"} gutterBottom>
                        <strong>Информация о пользователе</strong>
                    </Typography>
                    <Typography>
                        <strong>Имя пользователя:</strong> {user.username}
                    </Typography>
                    <Typography>
                        <strong>Email:</strong> {user.email}
                    </Typography>

                    <Box sx={{ mt: 2 }}>
                        <Button
                            variant="contained"
                            onClick={() => setEditMode(!editMode)}
                            sx={{ mr: 2 }}
                        >
                            {editMode ? "Отменить" : "Изменить имя пользователя"}
                        </Button>

                        {editMode && (
                            <Box sx={{ mt: 2 }}>
                                <TextField
                                    fullWidth
                                    label="Новое имя пользователя"
                                    value={newUsername}
                                    onChange={(e) => setNewUsername(e.target.value)}
                                    sx={{ mb: 2 }}
                                />
                                <Button
                                    variant="contained"
                                    color="success"
                                    onClick={handleUpdateUsername}
                                >
                                    Сохранить
                                </Button>
                            </Box>
                        )}
                    </Box>
                </CardContent>
            </Card>

            <Card sx={{ mb: 3 }}>
                <CardContent>
                    <Typography variant="h6" gutterBottom>
                        Смена пароля
                    </Typography>
                    <TextField
                        fullWidth
                        type="password"
                        label="Старый пароль"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        fullWidth
                        type="password"
                        label="Новый пароль"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        sx={{ mb: 2 }}
                    />
                    <Button variant="contained" onClick={handleUpdatePassword}>
                        Изменить пароль
                    </Button>
                </CardContent>
            </Card>

            <Card sx={{ borderColor: "error.main" }}>
                <CardContent>
                    <Typography variant="h6" gutterBottom color="error">
                        Удаление аккаунта
                    </Typography>
                    <TextField
                        fullWidth
                        type="password"
                        label="Введите пароль для подтверждения"
                        value={deletePassword}
                        onChange={(e) => setDeletePassword(e.target.value)}
                        sx={{ mb: 2 }}
                    />
                    <Button
                        variant="contained"
                        color="error"
                        onClick={() => setOpenDeleteDialog(true)}
                    >
                        Удалить аккаунт
                    </Button>
                </CardContent>
            </Card>

            <Dialog
                open={openDeleteDialog}
                onClose={() => setOpenDeleteDialog(false)}
            >
                <DialogTitle>Подтверждение удаления аккаунта</DialogTitle>
                <DialogContent>
                    <Typography>
                        Вы уверены, что хотите удалить свой аккаунт? Это действие нельзя
                        отменить.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDeleteDialog(false)}>Отмена</Button>
                    <Button
                        onClick={() => {
                            setOpenDeleteDialog(false);
                            handleDeleteAccount();
                        }}
                        color="error"
                    >
                        Удалить
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};