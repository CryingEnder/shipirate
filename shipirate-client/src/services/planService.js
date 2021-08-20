import http from "./httpService";
import { apiUrl } from "../../config.json";

export async function getPlans() {
  try {
    const { data: plans } = await http.get(apiUrl + "/plans");
    return plans;
  } catch (ex) {
    return null;
  }
}

export default {
  getPlans,
};
