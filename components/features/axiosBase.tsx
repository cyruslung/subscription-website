import axios from "axios";

export const axiosBase = axios.create({
  //baseURL: `${process.env.ApiUrl}`,
  baseURL: 'https://my-json-server.typicode.com/cyruslung/demo-api/subscription',
  headers: {
    "Content-Type": "application/json",
  },
});