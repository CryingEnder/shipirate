import http from "./httpService";

export async function getTestimonials() {
  try {
    const { data: testimonials } = await http.get("/testimonials");
    return testimonials;
  } catch (ex) {
    return null;
  }
}

export default {
  getTestimonials,
};
