import axios from "axios";

 
export const apiClient = axios.create({
    baseURL: 'http://localhost:5000',
});

// "https://farmtrail-server.vercel.app"
