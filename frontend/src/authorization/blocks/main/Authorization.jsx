import React, { useEffect, useState } from "react";
import { useLocation, useParams, useMatch } from "react-router-dom";
import FullScreenSlideshow from "../shared/full-screen-slideshow/FullScreenSlideshow";
import styles from "./Authorization.module.css";
import FirstBlock from "../shared/first-block/FirstBlock";
import Registration from "../shared/registration/Registration";
import AuthorizationBlock from "../shared/authorization/AuthorizationBlock";
import RecoverPassword from "../shared/recover-password/RecoverPassword";
import { useNavigate } from "react-router-dom";
import {
    getBackgrounds,
    userAuthorization,
    userRegistration,
    setNewPassword,
    recoverPassword,
    googleAuthorization,
    discordAuthorization,
    appleAuthorization
} from "../../services/apiService";
import PasswordForgot from "../shared/password-forgot/PasswordForgot";

export default React.memo(function Authorization({ isResetMode = false }) {
    const [slides, setSlides] = useState([]);
    const [blockNumber, setBlockNumber] = useState(0);
    const navigate = useNavigate();

    const { token } = useParams();

    useEffect(() => {
        if (isResetMode) {
            setBlockNumber(3);
        }
    }, [isResetMode]);

    useEffect(() => {
        const loadImages = async () => {
            try {
                const tmp = await getBackgrounds();
                if (tmp?.length) {
                    setSlides(tmp);
                } else {
                    setSlides([
                        "https://gaming-cdn.com/images/products/442/orig/minecraft-java-bedrock-edition-java-bedrock-edition-pc-spiel-cover.jpg?v=1716387513",
                        "https://cdn1.epicgames.com/b30b6d1b4dfd4dcc93b5490be5e094e5/offer/RDR2476298253_Epic_Games_Wishlist_RDR2_2560x1440_V01-2560x1440-2a9ebe1f7ee202102555be202d5632ec.jpg",
                        "https://www.fluter.de/sites/default/files/2025-04/AC%20Shadows_Fan%20Kit_Screenshot_2.jpg",
                    ]);
                }
            } catch (ex) {
                console.error("Ошибка загрузки фоновых изображений:", ex);
            }
        };

        loadImages();
    }, []);

    const handleClick = async (service) => {
        if(service === "google"){
            return await googleAuthorization();
        }
        if(service === "discord"){
            return await discordAuthorization();
        }
        if(service === "apple"){
            return await appleAuthorization();
        }
    };

    const handleMainClick = (type) => {
        if (type === "authorization") setBlockNumber(1);
        else if (type === "registration") setBlockNumber(2);
    };

    const handleAuthMainClick = async (email, password) => {
        const token = await userAuthorization(email, password);
        if (typeof token === "string") {
            sessionStorage.setItem("token", token);
            // navigate('/chat/1');
        }
        else return 1;
    };

    const handleRegMainClick = async (name, email, password) => {
        const answer = await userRegistration(name, email, password);
        if (answer !== null) return 1;
        setBlockNumber(1);
        return 0;
    };

    const handlePasswordForgot = () => {
        setBlockNumber(4);
    };

    const handleAuthorization = () => {
        setBlockNumber(1);
    };

    const handleOnPasswordRecover = async (password) => {
        const res = await setNewPassword(token, password);
        if (res) return true;
        return false;
    }

    const handleNewPasswordRequest = async (email) => {
        const res = await recoverPassword(email);
        if(res) return true;
        return false;
    }

    const handleRegistration = () => {
        setBlockNumber(2);
    };

    const blocks = {
        0: <FirstBlock serviceOnClick={handleClick} onClick={handleMainClick} />,
        1: (
            <AuthorizationBlock
                serviceOnClick={handleClick}
                onClick={handleAuthMainClick}
                handlePasswordForgot={handlePasswordForgot}
                handleRegistration={handleRegistration}
            />
        ),
        2: (
            <Registration
                serviceOnClick={handleClick}
                onClick={handleRegMainClick}
                handleAuthorization={handleAuthorization}
            />
        ),
        3: <RecoverPassword handleOnPasswordRecover={handleOnPasswordRecover} />,
        4: <PasswordForgot handleOnSubmit={handleNewPasswordRequest} handleAuthorization={() => setBlockNumber(1)} />
    };

    return (
        <div className={styles.mainContainer}>
            <div className={styles.container}>
                {blocks[blockNumber] || blocks[0]}
            </div>
            <FullScreenSlideshow slides={slides} interval={5000} />
        </div>
    );
});
