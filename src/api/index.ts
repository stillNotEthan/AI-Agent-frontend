import axios from "axios";

const app = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
});

app.interceptors.request.use(
    (config) => {
        config.headers["Authorization"] = `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`;
        return config;
    },
    (error) => {
        throw error;
    }
);

app.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        throw error;
    }
);


