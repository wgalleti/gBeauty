import axios from 'axios'

const config = {
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:8000/api/",
};

const http = axios.create(config);

export default http;
