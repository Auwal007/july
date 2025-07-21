// API Configuration
const API_CONFIG = {
  development: {
    baseURL: 'http://localhost:5000'
  },
  production: {
    baseURL: 'https://skillbridgeai-d4dxgwezb7d6htc9.canadacentral-01.azurewebsites.net/' 
  }
};

const isDevelopment = import.meta.env.DEV;
export const API_BASE_URL = isDevelopment ? API_CONFIG.development.baseURL : API_CONFIG.production.baseURL;

// API endpoints
export const API_ENDPOINTS = {
  chatAssess: `${API_BASE_URL}/api/chat-assess`,
  health: `${API_BASE_URL}/api/health`,
  courses: `${API_BASE_URL}/api/courses`
};
