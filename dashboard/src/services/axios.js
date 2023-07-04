import axios from "axios";

const client = axios.create({
  baseURL: "http://localhost:8000/api",
});

const clientP01 = axios.create({
  baseURL: "http://localhost:8000/api",
});

export { client, clientP01 };
