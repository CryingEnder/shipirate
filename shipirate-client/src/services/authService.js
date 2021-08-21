import http from "./httpService";

const apiEndpoint = "/auth";

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
