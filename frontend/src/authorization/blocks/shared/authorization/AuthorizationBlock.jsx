import React, { useState } from "react";
import logo from "../../../assets/images/title.png";
import google from "../../../assets/images/google.png";
import discord from "../../../assets/images/discord.png";
import apple from "../../../assets/images/apple.png";
import styles from "./AuthorizationBlock.module.css";

export default React.memo(function AuthorizationBlock({ serviceOnClick, onClick, handlePasswordForgot, handleRegistration }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [err, setErr] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const handleSubmit = async (e) => {
        e?.preventDefault();
        setErr("");

        if (!isValidEmail(email)) {
            return setErr("Некоректний email");
        }

        if (password.length < 6) {
            return setErr("Пароль має містити щонайменше 6 символів");
        }

        setSubmitting(true);
        try {
            const result = await onClick(email.trim().toLowerCase(), password);
            if (result === 1) {
                setErr("Невірний email або пароль");
            }
        } catch (ex) {
            console.error(ex);
            setErr("Помилка авторизації");
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

            {err && <div className={styles.text} style={{ color: "red" }}>{err}</div>}
            <form className={styles.form} onSubmit={handleSubmit}>

                <input
                    placeholder="Email"
                    className={styles.input}
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={submitting}
                />

                <div style={{ position: "relative", width: "100%" }}>
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
                            color: "#666"
                        }}
                    >
                        {showPassword ? "Сховати" : "Показати"}
                    </span>
                </div>

                <button className={styles.mainBtn} type="submit" disabled={submitting}>
                    {submitting ? "Авторизація..." : "Авторизація"}
                </button>

                <div className={styles.text} style={{ cursor: "pointer" }} onClick={handlePasswordForgot}>
                    Забули пароль?
                </div>

                <div className={styles.text} style={{ cursor: "pointer" }} onClick={handleRegistration}>
                    Ще не зареєстровані?
                </div>
            </form>
        </>
    );
});
