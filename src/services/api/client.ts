import axios from 'axios';

export const apiClient = axios.create({
  baseURL: 'https://minishop-backend-ezc8.onrender.com',

  timeout: 10000,

  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  config => {
    console.log(
      `🚀 ${config.method?.toUpperCase()} ${config.url}`
    );

    return config;
  },
  error => Promise.reject(error)
);

apiClient.interceptors.response.use(
  response => {
    console.log(
      `✅ ${response.config.url}`
    );

    return response;
  },
  error => {
    console.log(
      '❌ API ERROR',
      error?.response?.data || error.message
    );

    return Promise.reject(error);
  }
);