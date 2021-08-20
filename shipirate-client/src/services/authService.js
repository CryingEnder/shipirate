import http from "./httpService";
import { apiUrl } from "../../config.json";

const apiEndpoint = apiUrl + "/auth";

export function login(email, password, rememberMe) {
  return http.post(apiEndpoint, { email, password, rememberMe });
}

export function logout() {
  return http.delete(apiEndpoint + "/logout");
}

export default {
  login,
  logout,
};
