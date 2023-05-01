import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const LogIn = () => {
    return (
        <>
            <form className="login-box" action="login.php" method="post">
                <h2>Вход</h2>
                <input type="text" name="aut_login" required placeholder="Логин"/>
                <input type="password" name="aut_password" required placeholder="Пароль"/>
                <button type="submit">Войти</button>
            </form>
        </>
    );
}

export default LogIn;