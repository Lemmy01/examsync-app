import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.API_URL, // Replace with your API's base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
