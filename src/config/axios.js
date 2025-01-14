import axios from "axios";
import { DOMAIN } from "./domain";

const instance = axios.create({
  baseURL: `http://${DOMAIN}/`,  //https or http
  headers: {
    "Content-Type": "application/json",
    timeout: 1000,
  },
});

export default instance;
