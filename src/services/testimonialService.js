import http from "./httpService";
import { apiUrl } from "../../config.json";

export async function getTestimonials() {
  try {
    const { data: testimonials } = await http.get(apiUrl + "/testimonials");
    return testimonials;
  } catch (ex) {
    return null;
  }
}

export default {
  getTestimonials,
};
