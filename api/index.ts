import axios from 'axios';

const api = axios.create({
  baseURL: 'https:/jjy.mengmota.com/api',
  timeout: 10000,
});

export default api;
