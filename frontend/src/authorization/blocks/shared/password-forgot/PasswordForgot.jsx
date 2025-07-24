import React, { useState } from "react";
import logo from "../../../assets/images/title.png";
import styles from "./PasswordForgot.module.css";

export default function PasswordForgot({ handleOnSubmit, handleAuthorization }) {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const onSubmit = async (e) => {
        e?.preventDefault();
        setError("");
        setSuccess("");

        const trimmedEmail = email.trim().toLowerCase();

        if (!trimmedEmail) {
            return setError("Email обов'язковий для заповнення.");
        }

        if (!isValidEmail(trimmedEmail)) {
            return setError("Введіть коректну адресу електронної пошти.");
        }

        try {
            setSubmitting(true);
            const result = await handleOnSubmit(trimmedEmail);
            if (result === true) {
                setSuccess("Інструкції з відновлення пароля надіслано на вашу пошту.");
                setEmail("");
            } else {
                setError("Не вдалося надіслати лист. Спробуйте пізніше.");
            }
        } catch (ex) {
            console.error(ex);
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

            <p className={styles.text}>
                Надішліть свій емейл та стежте за повдомленнями
            </p>

            {error && <div className={styles.message} style={{ color: "red" }}>{error}</div>}
            {success && <div className={styles.message} style={{ color: "green" }}>{success}</div>}

            <form className={styles.form} onSubmit={onSubmit}>
                <input
                    placeholder="Email"
                    className={styles.input}
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={submitting}
                />
                <button
                    className={styles.mainBtn}
                    type="submit"
                    disabled={submitting}
                >
                    {submitting ? "Зачекайте..." : "Отримати пароль"}
                </button>
                <div className={styles.text} style={{ cursor: "pointer" }} onClick={handleAuthorization}>
                    до авторизації
                </div>
            </form>
        </>
    );
}
