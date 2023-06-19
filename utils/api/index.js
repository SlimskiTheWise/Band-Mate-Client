import Axios from 'axios';

const axios = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response?.data?.message === 'Access token has expired') {
      await axios.get('auth/refresh-token');
    }
  }
);

export default axios;
