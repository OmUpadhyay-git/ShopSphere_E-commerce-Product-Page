// API service
// Centralized Axios client and API endpoints for Fake Store API

import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://fakestoreapi.com';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// API endpoints would be defined here

export default apiClient;
