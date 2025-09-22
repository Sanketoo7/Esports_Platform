// src/api.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://192.0.0.2:4000/api", // ⚠️ replace with your Mac local IP
});

export default API;