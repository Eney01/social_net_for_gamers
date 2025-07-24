import {
    authorization,
    getBackgroundImages,
    getUserId,
    googleAuth,
    newPassword,
    passwordForgot,
    registration,
    discordAuth,
    appleAuth
} from "../api/authorizationApi";

export async function getBackgrounds() {
    try {
        const response = await getBackgroundImages();
        return response.data || [];
    } catch (error) {
        console.error("Помилка:", error);
        return [];
    }
}

export async function userRegistration(name, email, password) {
    try {
        const response = await registration(name, email, password);

        if (response.status === 200) return null;

        return response.statusText || "Невідома помилка";
    } catch (error) {
        console.error("Помилка реєстрації:", error);
        return error?.response?.data || "Помилка з'єднання";
    }
}

export async function userAuthorization(email, password) {
    try {
        const response = await authorization(email, password);

        if (response.status === 200) return response.data;

        return response.status || 500;
    } catch (error) {
        console.error("Помилка авторизації:", error);
        return error?.response?.data || "Помилка з'єднання";
    }
}

export async function getUserIdByToken(token) {
    try {
        const response = await getUserId(token);

        if (response.status === 200) return response.data;

        return response.statusText || "Помилка";
    } catch (error) {
        console.error("Помилка:", error);
        return error?.response?.data || "Помилка";
    }
}

export async function recoverPassword(email) {
    try {
        const response = await passwordForgot(email);
        if (response.status === 200) return true;
        return false;
    }
    catch (ex) {
        console.log(ex);
        return false;
    }
}

export async function setNewPassword(token, password) {
    try {
        const response = await newPassword(token, password);
        if (response.status === 200) return true;
        return false;
    }
    catch (ex) {
        console.log(ex);
        return false;
    }
}

export async function googleAuthorization(){
    try{
        const response = await googleAuth();
        if (response.status === 200) return true;
        return false;
    }
    catch (ex) {
        console.log(ex);
        return false;
    }
}

export async function discordAuthorization(){
    try{
        const response = await discordAuth();
        if (response.status === 200) return true;
        return false;
    }
    catch (ex) {
        console.log(ex);
        return false;
    }
}

export async function appleAuthorization(){
    try{
        const response = await appleAuth();
        if (response.status === 200) return true;
        return false;
    }
    catch (ex) {
        console.log(ex);
        return false;
    }
}