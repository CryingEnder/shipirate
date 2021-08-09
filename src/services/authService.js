import http from "./httpService";
import { apiUrl } from "../../config.json";

const apiEndpoint = apiUrl + "/auth";

export async function login(email, password, rememberMe) {
  try {
    console.log(rememberMe);
    await http.post(apiEndpoint, { email, password, rememberMe });
  } catch (ex) {}
}

export function logout() {
  return http.delete(apiEndpoint + "/logout");
}

export default {
  login,
  logout,
};
