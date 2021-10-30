import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:3333/",       
});

api.interceptors.request.use(function (config) {
  const token = localStorage.getItem('MMAgendaToken');
  config.headers.Authorization =  token ? `Bearer ${token}` : '';
  return config;
});

export default api;