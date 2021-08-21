import http from "./httpService";

export async function getPlans() {
  try {
    const { data: plans } = await http.get("/plans");
    return plans;
  } catch (ex) {
    return null;
  }
}

export default {
  getPlans,
};
