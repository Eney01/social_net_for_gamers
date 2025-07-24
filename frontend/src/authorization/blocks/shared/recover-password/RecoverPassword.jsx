import React, { useState } from "react";
import logo from "../../../assets/images/title.png";
import styles from "./RecoverPassword.module.css";

export default function RecoverPassword({ handleOnPasswordRecover }) {
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const [showPassword, setShowPassword] = useState(false);
    const [showRepeatPassword, setShowRepeatPassword] = useState(false);

    const validate = () => {
        if (!password || !repeatPassword) {
            return "Усі поля обов’язкові для заповнення.";
        }
        if (password.length < 8) {
            return "Пароль повинен містити щонайменше 8 символів.";
        }
        if (!/[A-Z]/.test(password) || !/[0-9]/.test(password)) {
            return "Пароль повинен містити принаймні одну велику літеру та одну цифру.";
        }
        if (password !== repeatPassword) {
            return "Паролі не співпадають.";
        }
        return "";
    };

    const onSubmit = async (e) => {
        e?.preventDefault();
        const errMsg = validate();
        if (errMsg) {
            setError(errMsg);
            setSuccess("");
            return;
        }

        try {
            setSubmitting(true);
            setError("");
            const result = await handleOnPasswordRecover(password);
            if (result === true) {
                setSuccess("Пароль успішно змінено.");
                setPassword("");
                setRepeatPassword("");
            } else {
                setError("Сталася помилка при зміні пароля. Спробуйте пізніше.");
            }
        } catch (ex) {
            setError("Невідома помилка.");
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

            {error && <div className={styles.message} style={{ color: "red" }}>{error}</div>}
            {success && <div className={styles.message} style={{ color: "green" }}>{success}</div>}
            <form className={styles.form} onSubmit={onSubmit}>
                <div style={{ position: "relative" }}>
                    <input
                        placeholder="Новий пароль"
                        className={styles.input}
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onInput={(e) => setPassword(e.target.value)}
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
                        onInput={(e) => setRepeatPassword(e.target.value)}
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

                <button
                    className={styles.mainBtn}
                    type="submit"
                    disabled={submitting}
                    style={{ marginTop: 20 }}
                >
                    {submitting ? "Зачекайте..." : "Змінити пароль"}
                </button>
            </form>
        </>
    );
}
