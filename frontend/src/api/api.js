import axios from 'axios';

const api = axios.create({
  baseURL: 'http://172.27.248.4:5093/api', // ЗАМІНИ на свою backend API адресу, якщо інша
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
