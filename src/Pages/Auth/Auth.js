import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useLoginMutation, useRegisterMutation } from "../../Components/api/authApi";
import { login } from "../../Components/Slices/AuthSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ClipLoader } from "react-spinners";
import "./Auth.css";

const Auth = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true);

    // RTK Query hooks
    const [loginUser, { isLoading: isLoggingIn }] = useLoginMutation();
    const [registerUser, { isLoading: isRegistering }] = useRegisterMutation();

    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const onSubmit = async (data) => {
        try {
            if (!isLogin) {
                try {
                    const userData = await registerUser(data).unwrap();
                    dispatch(login(userData));
                    toast.success("Регистрация прошла успешно!");
                    setTimeout(() => navigate("/home"), 1500);
                } catch (error) {
                    toast.error(error.data?.detail || "Ошибка при регистрации");
                    return;
                }
            } else {
                try {
                    const userData = await loginUser(data).unwrap();
                    dispatch(login(userData));
                    toast.success("Вход выполнен успешно!");
                    reset();
                    setTimeout(() => navigate("/home"), 1500);
                } catch (error) {
                    toast.error(error.data?.detail || "Неверный логин или пароль");
                }
            }
        } catch (error) {
            toast.error("Произошла непредвиденная ошибка");
            console.error("Ошибка:", error);
        }
    };

    const isProcessing = isLoggingIn || isRegistering;

    return (
        <div className="auth-container">
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

            <h2>{isLogin ? "Вход" : "Регистрация"}</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                {!isLogin && (
                    <div className="form-group">
                        <label>Имя пользователя:</label>
                        <Controller
                            name="username"
                            control={control}
                            defaultValue=""
                            rules={{
                                required: "Имя пользователя обязательно" }}
                            render={({ field }) => (
                                <input
                                    {...field}
                                    type="text"
                                    placeholder="Введите имя пользователя"
                                    disabled={isProcessing}
                                />
                            )}
                        />
                        {errors.username && (
                            <p className="error">{errors.username.message}</p>
                        )}
                    </div>
                )}
                <div className="form-group">
                    <label>Email:</label>
                    <Controller
                        name="email"
                        control={control}
                        defaultValue=""
                        rules={{
                            required: "Email обязателен",
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "Некорректный email",
                            },
                        }}
                        render={({ field }) => (
                            <input
                                {...field}
                                type="email"
                                placeholder="Введите email"
                                disabled={isProcessing}
                            />
                        )}
                    />
                    {errors.email && <p className="error">{errors.email.message}</p>}
                </div>
                <div className="form-group">
                    <label>Пароль:</label>
                    <Controller
                        name="password"
                        control={control}
                        defaultValue=""
                        rules={{
                            required: "Пароль обязателен",
                            minLength: {
                                value: 6,
                                message: "Пароль должен быть не менее 6 символов",
                            },
                        }}
                        render={({ field }) => (
                            <input
                                {...field}
                                type="password"
                                placeholder="Введите пароль"
                                disabled={isProcessing}
                            />
                        )}
                    />
                    {errors.password && <p className="error">{errors.password.message}</p>}
                </div>
                <button
                    className="btn-auth"
                    type="submit"
                    disabled={isProcessing}
                >
                    {isProcessing ? (
                        <ClipLoader
                            color="#ffffff"
                            size={20}
                            cssOverride={{
                                marginRight: "8px"
                            }}
                        />
                    ) : null}
                    {isLogin
                        ? isProcessing ? "Вход..." : "Войти"
                        : isProcessing ? "Регистрация..." : "Зарегистрироваться"}
                </button>
            </form>
            <p>
                {isLogin ? "Нет аккаунта? " : "Уже есть аккаунт? "}
                <button
                    className="btn-auth"
                    onClick={() => setIsLogin(!isLogin)}
                    disabled={isProcessing}
                >
                    {isLogin ? "Зарегистрироваться" : "Войти"}
                </button>
            </p>
        </div>
    );
};

export default Auth;