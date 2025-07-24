import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;
const apiClient = axios.create({
    baseURL: apiUrl + "/api/authorization",
    withCredentials: true
});

export const getBackgroundImages = () => apiClient.get(`/backgroundImages`);
export const registration = (name, email, password) => apiClient.post("/registration", {
    email: email,
    password: password,
    name: name
});

export const authorization = (email, password) => apiClient.post("/authorization", {
    email: email,
    password: password
})

export const getUserId = (token) => apiClient.post("/getUserId", {
    token:token
})

export const passwordForgot = (email) => apiClient.post("/passwordForgot",
    {
        email:email
    }
)

export const newPassword = (token, newPassword) => apiClient.post("/setNewPassword",
    {
        password:newPassword,
        token:token
    }
)

export const googleAuth = () => {
    window.location.href = `${process.env.REACT_APP_API_URL}/api/authorization/external-login/Google?returnUrl=https://localhost:3000/authorization/after-service-authorization`;

};

export const discordAuth = () => {
    window.location.href = `${process.env.REACT_APP_API_URL}/api/authorization/external-login/Discord?returnUrl=https://localhost:3000/authorization/after-service-authorization`;
};

export const appleAuth = () => {
    window.location.href = `${process.env.REACT_APP_API_URL}/api/authorization/external-login/Apple?returnUrl=https://localhost:3000/authorization/after-service-authorization`;
};
