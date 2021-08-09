import http from "./httpService";
import { apiUrl } from "../../config.json";

const apiEndpoint = apiUrl + "/users";

export async function getCurrentUser() {
  try {
    const { data: user } = await http.get(apiEndpoint + "/me");
    return user;
  } catch (ex) {
    return null;
  }
}

export function register(user) {
  return http.post(apiEndpoint, {
    username: user.username,
    email: user.email,
    password: user.password,
    repeatPassword: user.repeatPassword,
  });
}

export default {
  getCurrentUser,
  register,
};
