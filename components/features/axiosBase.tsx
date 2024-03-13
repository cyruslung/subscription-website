import axios from "axios";

export const axiosBase = axios.create({
  //baseURL: `${process.env.ApiUrl}`,
  baseURL: 'https://api.demo.com/subscription',
  headers: {
    "Content-Type": "application/json",
  },
});