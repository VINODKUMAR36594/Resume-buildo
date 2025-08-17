import axios from 'axios'
import { BASE_URL } from './apiPath'

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    }
})

axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem('token')
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`
        }
        return config;
    },
    (error) => {
        return Promise.reject(error); 
    }
)

// RESPONSE interceptors - Fixed error handling
axiosInstance.interceptors.response.use(
    (response) => {   
        return response;            
    },
    (error) => {
        // Handle cases where error.response might be undefined
        if (error.response) {
            // Server responded with error status
            if (error.response.status === 401) {
                localStorage.removeItem('token');
                window.location.href = '/';
            } else if (error.response.status === 500) {
                console.error("SERVER ERROR:", error.response.data);
            }
        } else if (error.request) {
            // Request was made but no response received
            console.error("NETWORK ERROR: Server is not reachable");
            error.message = "Unable to connect to server. Please check if the backend is running.";
        } else if (error.code === "ECONNABORTED") {
            console.error("Request timeout");
            error.message = "Request timeout. Please try again.";
        } else {
            // Something else happened
            console.error("Error:", error.message);
        }
        
        return Promise.reject(error);
    }
)

export default axiosInstance;
