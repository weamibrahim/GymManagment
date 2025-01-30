
import axios from "axios";
export default defineNuxtPlugin(() => {

  const axiosInstance = axios.create({
    baseURL: "https://gym-managment-kappa.vercel.app/api",
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
