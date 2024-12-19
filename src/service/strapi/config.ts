import axios from "axios";

const strapi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_STRAPI_API_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_ACCESS_TOKEN}`,
  },
});

export default strapi;
