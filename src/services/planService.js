import http from "./httpService";

export async function getPlans() {
  try {
    const { data: plans } = await http.get("/plans");
    if (plans.length === 0) return null;
    else return plans;
  } catch (ex) {
    return null;
  }
}

export default {
  getPlans,
};
