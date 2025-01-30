
import axios from "axios";
export default defineNuxtPlugin(() => {

  const axiosInstance = axios.create({
    baseURL: "http://localhost:7000/api",
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
     },
  });

  return {
    provide: {
      axios: axiosInstance,
    },
  };
});
