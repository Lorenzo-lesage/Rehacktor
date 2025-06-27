import axios from "axios";

const API_KEY = import.meta.env.VITE_RAWG_API_KEY;

const axiosClient = axios.create({
  baseURL: "https://api.rawg.io/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor per aggiungere sempre la chiave API a ogni richiesta (così non devi metterla ogni volta negli endpoint)
axiosClient.interceptors.request.use(
  (config) => {
    if (!config.params) {
      config.params = {};
    }
    // Aggiunge automaticamente la chiave API a ogni richiesta
    config.params.key = API_KEY;
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosClient;
