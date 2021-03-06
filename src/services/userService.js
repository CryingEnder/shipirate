import http from "./httpService";

const apiEndpoint = "/users";

export async function getCurrentUser() {
  try {
    const user = await http.get(apiEndpoint + "/me");
    if (user.data._id) return user.data;
    else return null;
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

export function updateAccount(input) {
  return http.patch(apiEndpoint + "/me", input);
}

export function deleteAccount() {
  return http.delete(apiEndpoint + "/me");
}

export default {
  getCurrentUser,
  register,
  updateAccount,
  deleteAccount,
};
