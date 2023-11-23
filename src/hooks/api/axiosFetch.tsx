import axios from "axios";

export const axiosFetch = axios.create({
  baseURL: process.env["NEXT_PUBLIC_BASE_URL"],
  withCredentials: true,
});
