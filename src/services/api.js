import axios from 'axios';
const api = axios.create({
  baseURL: 'https://localhost:44345', // URL da API
});

export default api;