import axios from "axios";
import { defaultUrl } from "../services/url";

export const api = axios.create({
  baseURL: defaultUrl + "/api",
});
