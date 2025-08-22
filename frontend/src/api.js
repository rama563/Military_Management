import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5000/api", // Adjust the baseURL as needed
    withCredentials: true, // only if you use cookies or protected routes
});

export default api;
