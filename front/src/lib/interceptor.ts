import axios from "axios";
// import { useNavigate } from "react-router-dom";
import {API_URL} from "../../constant";


export const AxiosWrapper = axios.create({
    baseURL: API_URL, // our API base URL
});

// Request interceptor for adding the bearer token
AxiosWrapper.interceptors.request.use(
    (config) => {
        const token = sessionStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add a response interceptor to handle token expiration and refresh the token
AxiosWrapper.interceptors.response.use(
    (response) => {
        // If the response is successful, return it as-is
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        // Check if the error is due to an expired token
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            window.location.href = '/login';
        }

        return Promise.reject(error);
    }
);

