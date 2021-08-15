const Joi = require("joi");
const mongoose = require("mongoose");

const testimonialSchema = new mongoose.Schema({
  profilePhoto: { type: String, required: true },
  name: { type: String, required: true, min: 1, max: 256 },
  profession: { type: String, required: true, min: 1, max: 256 },
  socialPlatform: {
    type: String,
    enum: ["facebook", "instagram", "linkedin", "twitter"],
  },
  message: { type: String, required: true, min: 1, max: 256 },
});

const Testimonial = mongoose.model("Testimonial", testimonialSchema);

function validateTestimonial(testimonial) {
  const schema = Joi.object({
    profilePhoto: Joi.any().label("Profile photo"),
    name: Joi.string().min(1).max(256).required().label("Name"),
    profession: Joi.string().min(1).max(256).required().label("Profession"),
    socialPlatform: Joi.string()
      .valid("facebook", "instagram", "linkedin", "twitter")
      .label("Social platform"),
    message: Joi.string().min(1).max(256).required().label("Message"),
  });

  return schema.validate(testimonial);
}

exports.Testimonial = Testimonial;
exports.validate = validateTestimonial;
