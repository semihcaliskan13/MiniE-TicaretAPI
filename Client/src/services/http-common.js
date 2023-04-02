import axios from "axios";

export default axios.create({
  baseURL: "https://localhost:7140/api",
  withCredentials: true,
  headers: {
    //"Content-type": "application/json"
  }
});