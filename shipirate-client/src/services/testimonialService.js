import http from "./httpService";

export async function getTestimonials() {
  try {
    const { data: testimonials } = await http.get("/testimonials");
    if (testimonials.length === 0) return null;
    else return testimonials;
  } catch (ex) {
    return null;
  }
}

export default {
  getTestimonials,
};
