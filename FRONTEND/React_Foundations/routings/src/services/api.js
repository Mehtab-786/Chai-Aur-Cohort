import { tokenStore } from './tokenStore'
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";



export const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json"
    }
})


// Add a request interceptor
api.interceptors.request.use((config) => {
    let token = tokenStore.getAccess()
    if(token){
        config.headers.Authorization = `Bearer ${token}`
    }
    return config;
}
);

// Add a response interceptor
axios.interceptors.response.use((response) => {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response;
    },
    function (error) {
        if(error.response?.status === 401){
            // call api for new acces token
            
        }
    }
);