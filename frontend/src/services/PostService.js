import api from '../api/api.js';

export const createPost = async (data) => {
  const res = await api.post('/post', data);
  return res.data;
};