import axios from 'axios';
import { PATH } from 'components/helpers/constants';

axios.defaults.baseURL = process.env.REACT_APP_BACKEND_BASE_URL;

export const getMessages = async () => {
  const res = await axios.get(PATH).then(({ data }) => data.data);
  return res;
};

export const addMessages = data => {
  return axios.post(PATH, data);
};

export const removeMessages = async id => {
  const res = await axios.delete(`${PATH}${id}`);
  return res;
};
