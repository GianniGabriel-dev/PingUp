import axios from "axios";
export type ApiErrors = {
  type: string;
  value: string;
  msg: string;
  path: string;
  location: string;
}[];

export const api = axios.create({
  baseURL: "http://localhost:3001/",
});

api.interceptors.response.use(
  (response) => response,
  //si hay un error 401 (no autorizado) se borra el token del local storage
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
    }
    // Rechazamos la promesa para que el código que hizo la petición sepa que falló
    return Promise.reject(error);
})