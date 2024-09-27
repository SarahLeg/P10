// src/Redux/api.js
import axios from 'axios';

// Créez une instance axios avec la configuration de base
const api = axios.create({
  baseURL: 'http://localhost:3001/api/v1', // Base URL pour toutes les requêtes
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteur pour ajouter le token d'authentification aux requêtes
api.interceptors.request.use((config) => {
  
  const token = localStorage.getItem('token'); // Ou utilisez un sélecteur pour obtenir le token depuis Redux

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;