import styles from "./FirstBlock.module.css";
import logo from "../../../assets/images/title.png";
import google from "../../../assets/images/google.png";
import discord from "../../../assets/images/discord.png";
import apple from "../../../assets/images/apple.png";
import React from "react";

export default React.memo(function FirstBlock({ serviceOnClick, onClick }) {
    return (
        <>
            <div className={styles.title}>
                <div className={styles.image}>
                    <img src={logo} alt='logo' />
                </div>
                <div className={styles.titleText}>
                    Грай і розмовляй
                </div>
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
                <div className={styles.text}>
                    або
                </div>
                <button type="button" onClick={() => onClick("authorization")} className={styles.mainBtn}>
                    Авторизація
                </button>
                <div className={styles.text}>
                    ви вже зареєстровані?
                </div>
                <button type="button" onClick={() => onClick("registration")} className={styles.mainBtn}>
                    Реєстрація
                </button>
            </div>
        </>)
})