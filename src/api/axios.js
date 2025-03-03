import axios from "axios";
import { baseURL } from "./Api";
import Cookie from "cookie-universal";

// Cookies And Token
const cookie = Cookie();
const token = cookie.get("e-commerce");

export const Axios = axios.create({
  baseURL: baseURL,
  headers: {
    Authorization: "Bearer " + token,
  },
});
