import axios from "axios";

const API = axios.create({
  baseURL: "https://ai-resume-analyzer-thlu.onrender.com/api",
});

export default API;