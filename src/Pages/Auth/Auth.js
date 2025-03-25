import React, {useState} from "react";
import { useForm, Controller } from "react-hook-form";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import axios from "axios";

import {login} from "../../Components/Slices/AuthSlice";

import "./Auth.css"

export const Auth = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const URL = " http://127.0.0.1:8000";

    const [isLogin, setIsLogin] = useState(true); // Переключатель между входом и регистрацией

    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const onSubmit = async (data) => {
        try {
            if (!isLogin) {
                // Регистрация
                try {
                    const res_sign = await axios.post(URL + "/signup", data);
                    dispatch(login(res_sign.data));
                    navigate("/home");
                    console.log("Регистрация:", res_sign.data);
                } catch (error) {
                    alert(error.response?.data?.detail || "Ошибка при регистрации");
                    return;
                }
            }

            // Аутентификация
            try {
                const res = await axios.post(URL + "/auth", data);
                console.log("Вход:", res.data);

                dispatch(login(res.data));
                navigate("/home");

                reset();
            } catch (error) {
                alert(error.response?.data?.detail || "Неверный логин или пароль");
            }
        } catch (error) {
            console.error("Ошибка:", error);
        }
    };

    return (
        <div className="auth-container">
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
                            <input {...field} type="email" placeholder="Введите email" />
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
                            <input {...field} type="password" placeholder="Введите пароль" />
                        )}
                    />
                    {errors.password && <p className="error">{errors.password.message}</p>}
                </div>
                <button className={"btn-auth"} type="submit">{isLogin ? "Войти" : "Зарегистрироваться"}</button>
            </form>
            <p>
                {isLogin ? "Нет аккаунта? " : "Уже есть аккаунт? "}
                <button className={"btn-auth"} onClick={() => setIsLogin(!isLogin)}>
                    {isLogin ? "Зарегистрироваться" : "Войти"}
                </button>
            </p>
        </div>
    );
};
