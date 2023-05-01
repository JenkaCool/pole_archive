import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import '../../css/User.css';

const SignUp = () => {
    return (
        <>
            <form className="login-box" action="registration.php" method="post">
                <h2>Регистрация</h2>
                <input type="text" name="login" required placeholder="Логин"/>
                <input type="email" name="email" required placeholder="Email"/>
                <input type="password" name="password_1" required placeholder="Пароль"/>
                <input type="password" name="password_2" required placeholder="Повторите пароль"/>
                <button name="submit" type="submit">Зарегистрироваться</button>
            </form>
        </>
    );
}

export default SignUp;