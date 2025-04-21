import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
    useUpdateUsernameMutation,
    useUpdatePasswordMutation,
    useDeleteAccountMutation
} from "../../Components/api/profileApi";
import { logout, setUser } from "../../Components/Slices/AuthSlice";
import {ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
    Box,
    Button,
    Card,
    CardContent,
    TextField,
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    CircularProgress
} from "@mui/material";

const Profile = ({ user }) => {
    const dispatch = useDispatch();
    const [editMode, setEditMode] = useState(false);
    const [newUsername, setNewUsername] = useState(user.username);
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [deletePassword, setDeletePassword] = useState("");
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

    const [
        updateUsername,
        { isLoading: isUpdatingUsername }
    ] = useUpdateUsernameMutation();

    const [
        updatePassword,
        { isLoading: isUpdatingPassword }
    ] = useUpdatePasswordMutation();

    const [
        deleteAccount,
        { isLoading: isDeletingAccount }
    ] = useDeleteAccountMutation();

    const showSuccess = (message) => {
        toast.success(message, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };

    const showError = (message) => {
        toast.error(message, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };

    const handleUpdateUsername = async () => {
        if (newUsername.trim() === "") {
            showError("Имя пользователя не может быть пустым");
            return;
        }

        try {
            await updateUsername({
                id: user.id,
                name: newUsername
            }).unwrap();

            dispatch(setUser({ username: newUsername }));
            setEditMode(false);
            showSuccess("Имя пользователя успешно изменено");
        } catch (err) {
            showError(err.data?.message || "Ошибка при изменении имени пользователя");
        }
    };

    const handleUpdatePassword = async () => {
        if (oldPassword.trim() === "") {
            showError("Введите старый пароль");
            return;
        }
        if (newPassword.trim() === "") {
            showError("Новый пароль не может быть пустым");
            return;
        }

        try {
            await updatePassword({
                id: user.id,
                newPassword,
                oldPassword
            }).unwrap();

            setOldPassword("");
            setNewPassword("");
            showSuccess("Пароль успешно изменен");
        } catch (err) {
            showError(err.data?.message || "Ошибка при изменении пароля");
        }
    };

    const handleDeleteAccount = async () => {
        if (deletePassword.trim() === "") {
            showError("Введите пароль для подтверждения");
            return;
        }

        try {
            await deleteAccount({
                id: user.id,
                password: deletePassword
            }).unwrap();

            dispatch(logout());
            showSuccess("Аккаунт успешно удален");
        } catch (err) {
            showError(err.data?.message || "Ошибка при удалении аккаунта");
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
                            disabled={isUpdatingUsername}
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
                                    disabled={isUpdatingUsername}
                                />
                                <Button
                                    variant="contained"
                                    color="success"
                                    onClick={handleUpdateUsername}
                                    disabled={isUpdatingUsername}
                                >
                                    {isUpdatingUsername ? (
                                        <>
                                            <CircularProgress
                                                size={24}
                                                sx={{
                                                    color: 'inherit',
                                                    marginRight: '8px'
                                                }}
                                            />
                                            Сохранение...
                                        </>
                                    ) : "Сохранить"}
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
                        disabled={isUpdatingPassword}
                    />
                    <TextField
                        fullWidth
                        type="password"
                        label="Новый пароль"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        sx={{ mb: 2 }}
                        disabled={isUpdatingPassword}
                    />
                    <Button
                        variant="contained"
                        onClick={handleUpdatePassword}
                        disabled={isUpdatingPassword}
                    >
                        {isUpdatingPassword ? (
                            <>
                                <CircularProgress
                                    size={24}
                                    sx={{
                                        color: 'inherit',
                                        marginRight: '8px'
                                    }}
                                />
                                Обновление...
                            </>
                        ) : "Изменить пароль"}
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
                        disabled={isDeletingAccount}
                    />
                    <Button
                        variant="contained"
                        color="error"
                        onClick={() => setOpenDeleteDialog(true)}
                        disabled={isDeletingAccount}
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
                    <Button
                        onClick={() => setOpenDeleteDialog(false)}
                        disabled={isDeletingAccount}
                    >
                        Отмена
                    </Button>
                    <Button
                        onClick={() => {
                            setOpenDeleteDialog(false);
                            handleDeleteAccount();
                        }}
                        color="error"
                        disabled={isDeletingAccount}
                    >
                        {isDeletingAccount ? (
                            <>
                                <CircularProgress
                                    size={24}
                                    sx={{
                                        color: 'inherit',
                                        marginRight: '8px'
                                    }}
                                />
                                Удаление...
                            </>
                        ) : "Удалить"}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default Profile;