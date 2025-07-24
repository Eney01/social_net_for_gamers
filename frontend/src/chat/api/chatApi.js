import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;
const apiClient = axios.create({
  baseURL: API_URL + "/api/chat",
  withCredentials: true
});

export const getChats = (userId) => apiClient.get(`/chats/user/${userId}`);
export const getChat = (chatId) => apiClient.get(`/chats/${chatId}`);
export const sendMessage = (chatId, formData) =>
  apiClient.post(`/chats/${chatId}/messages`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });

export const getUserId = (token) =>
  apiClient.get("/userId", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
