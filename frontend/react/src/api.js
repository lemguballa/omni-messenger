import axios from "axios";

// Now, all API requests will be made via axios.post("/api/send-email", data)
const instance = axios.create({
  baseURL: "http://localhost:5000",
});

export default instance;