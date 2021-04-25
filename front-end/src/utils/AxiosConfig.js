import axios from "axios";

const httpProcessor = axios.create({
    baseURL: process.env.REACT_APP_BACK_END_API,
    withCredentials: true,
});

// Custom Response Interceptors
httpProcessor.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject(error.response.data)
);

export default httpProcessor;
