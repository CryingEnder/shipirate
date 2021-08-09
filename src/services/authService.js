import http from "./httpService";
import { apiUrl } from "../../config.json";

const apiEndpoint = apiUrl + "/auth";

export async function login(email, password) {
  try {
    await http.post(apiEndpoint, { email, password });
  } catch (ex) {}
}

export function logout() {
  return http.delete(apiEndpoint + "/logout");
}

export default {
  login,
  logout,
};
