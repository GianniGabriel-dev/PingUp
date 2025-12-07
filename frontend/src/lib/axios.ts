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