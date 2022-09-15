import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_BACKEND_BASE_URL;

export const getMessages = async () => {
  const res = await axios.get('/messages/').then(({ data }) => data.data);
  return res;
};

export const addMessages = data => {
  return axios.post('/messages/', data);
};

export const removeMessages = async id => {
  const res = await axios.delete(`/messages/${id}`);
  return res;
};
