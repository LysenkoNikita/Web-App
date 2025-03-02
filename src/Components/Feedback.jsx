import React, {useCallback, useContext} from 'react';
import { useForm } from 'react-hook-form';
import {ThemeContext} from '../Context/context';

function RegistrationForm() {
    const {theme} = useContext(ThemeContext);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    // Обработка submit с использованием useCallback
    const onSubmit = useCallback((data) => {
        console.log('Форма отправлена:', data);
        Object.entries(data).forEach(([key, value]) => {
            localStorage.setItem(key, JSON.stringify(value));
        });
        // Здесь можно отправить данные на сервер
        reset(); // Очистка формы после отправки
    }, [reset]);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label htmlFor="name">Имя:</label>
                <input
                    id="name"
                    style={{
                        backgroundColor: 'transparent',
                        border: 'none',
                        outline: 'none',
                        fontSize: '16px',
                        padding: '8px',
                        color: theme === 'light' ? 'black' : 'white',
                    }}
                    {...register('name', { required: 'Имя обязательно' })}
                />
                {errors.name && <span style={{ color: 'red' }}>{errors.name.message}</span>}
            </div>

            <div>
                <label htmlFor="email">Email:</label>
                <input
                    id="email"
                    type="email"
                    style={{
                        backgroundColor: 'transparent',
                        border: 'none',
                        outline: 'none',
                        fontSize: '16px',
                        padding: '8px',
                        color: theme === 'light' ? 'black' : 'white',
                    }}
                    {...register('email', {
                        required: 'Email обязателен',
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Некорректный email',
                        },
                    })}
                />
                {errors.email && <span style={{ color: 'red' }}>{errors.email.message}</span>}
            </div>

            <div>
                <label htmlFor="password">Пароль:</label>
                <input
                    id="password"
                    type="password"
                    style={{
                        backgroundColor: 'transparent',
                        border: 'none',
                        outline: 'none',
                        fontSize: '16px',
                        padding: '8px',
                        color: theme === 'light' ? 'black' : 'white',
                    }}
                    {...register('password', {
                        required: 'Пароль обязателен',
                        minLength: {
                            value: 6,
                            message: 'Пароль должен быть не менее 6 символов',
                        },
                    })}
                />
                {errors.password && <span style={{ color: 'red' }}>{errors.password.message}</span>}
            </div>

            <button type="submit">Зарегистрироваться</button>
        </form>
    );
}

export default RegistrationForm;