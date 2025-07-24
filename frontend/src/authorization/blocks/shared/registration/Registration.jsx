import React, { useState } from "react";
import logo from "../../../assets/images/title.png";
import google from "../../../assets/images/google.png";
import discord from "../../../assets/images/discord.png";
import apple from "../../../assets/images/apple.png";
import styles from "./Registration.module.css";

export default React.memo(function Registration({ serviceOnClick, onClick, handleAuthorization }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const [showPassword, setShowPassword] = useState(false);
    const [showRepeatPassword, setShowRepeatPassword] = useState(false);

    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const isStrongPassword = (pass) => {
        return pass.length >= 8 && /[A-Z]/.test(pass) && /\d/.test(pass);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (!name.trim()) {
            return setError("Введіть ім’я");
        }

        if (!isValidEmail(email)) {
            return setError("Некоректний email");
        }

        if (!isStrongPassword(password)) {
            return setError("Пароль має містити щонайменше 8 символів, 1 велику літеру та 1 цифру");
        }

        if (password !== repeatPassword) {
            return setError("Паролі не співпадають");
        }

        setSubmitting(true);
        try {
            const result = await onClick(name, email, password);
            if (result === 1) {
                setError("Користувач з таким email вже існує");
            } else {
                setSuccess("Реєстрація успішна!");
                setName("");
                setEmail("");
                setPassword("");
                setRepeatPassword("");
            }
        } catch (ex) {
            console.error(ex);
            setError("Сталася помилка при реєстрації");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <>
            <div className={styles.title}>
                <div className={styles.image}>
                    <img src={logo} alt="logo" />
                </div>
                <div className={styles.titleText}>Грай і розмовляй</div>
            </div>

            <div className={styles.main}>
                <div className={styles.images}>
                    <button onClick={() => serviceOnClick("google")} type="button" className={styles.btn}>
                        <img src={google} alt="google" />
                    </button>
                    <button onClick={() => serviceOnClick("discord")} type="button" className={styles.btn}>
                        <img src={discord} alt="discord" />
                    </button>
                    <button onClick={() => serviceOnClick("apple")} type="button" className={styles.btn}>
                        <img src={apple} alt="apple" />
                    </button>
                </div>
                <div className={styles.text}>або</div>
            </div>

            {error && <div className={styles.text} style={{ color: "red" }}>{error}</div>}
            {success && <div className={styles.text} style={{ color: "green" }}>{success}</div>}
            <form className={styles.form} onSubmit={handleSubmit}>
                <input
                    placeholder="Ім'я"
                    className={styles.input}
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={submitting}
                />

                <input
                    placeholder="Email"
                    className={styles.input}
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={submitting}
                />

                <div style={{ position: "relative" }}>
                    <input
                        placeholder="Пароль"
                        className={styles.input}
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={submitting}
                    />
                    <span
                        onClick={() => setShowPassword((prev) => !prev)}
                        style={{
                            position: "absolute",
                            right: 12,
                            top: "50%",
                            transform: "translateY(-50%)",
                            cursor: "pointer",
                            fontSize: 12,
                            color: "#666",
                            userSelect: "none"
                        }}
                    >
                        {showPassword ? "Сховати" : "Показати"}
                    </span>
                </div>

                <div style={{ position: "relative" }}>
                    <input
                        placeholder="Підтвердити пароль"
                        className={styles.input}
                        type={showRepeatPassword ? "text" : "password"}
                        value={repeatPassword}
                        onChange={(e) => setRepeatPassword(e.target.value)}
                        disabled={submitting}
                    />
                    <span
                        onClick={() => setShowRepeatPassword((prev) => !prev)}
                        style={{
                            position: "absolute",
                            right: 12,
                            top: "50%",
                            transform: "translateY(-50%)",
                            cursor: "pointer",
                            fontSize: 12,
                            color: "#666",
                            userSelect: "none"
                        }}
                    >
                        {showRepeatPassword ? "Сховати" : "Показати"}
                    </span>
                </div>

                <button className={styles.mainBtn} type="submit" disabled={submitting}>
                    {submitting ? "Реєстрація..." : "Реєстрація"}
                </button>
                <div className={styles.text} style={{ cursor: "pointer" }} onClick={handleAuthorization}>
                    ви вже зареєстровані?
                </div>
            </form>
        </>
    );
});
