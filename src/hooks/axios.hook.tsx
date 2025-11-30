import axios from 'axios';
import { auth } from '../configs/firebase.config';

const serverSecured = axios.create({
  baseURL: import.meta.env.VITE_server_api,
});

serverSecured.interceptors.request.use(async (config) => {
  const user = auth.currentUser;
  if (user) {
    const token = await user.getIdToken();
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

function useAxios() {
  return serverSecured;
}

export { useAxios };
