const Joi = require("joi");
const mongoose = require("mongoose");

const planSchema = new mongoose.Schema({
  features: [
    {
      feature: { type: String, required: true, min: 1, max: 128 },
      available: { type: Boolean, required: true },
    },
  ],
  months: {
    type: Number,
    required: true,
    min: 1,
    max: 36,
  },
  price: {
    type: Number,
    required: true,
    min: 1,
    max: 256,
  },
  discount: {
    type: Number,
    min: 0,
    max: 100,
    default: 0,
  },
  currency: {
    type: String,
    required: true,
    min: 1,
    max: 16,
  },
  popular: {
    type: Boolean,
    default: false,
  },
});

const Plan = mongoose.model("Plan", planSchema);

function validatePlan(plan) {
  const schema = Joi.object({
    features: Joi.array()
      .items({
        feature: Joi.string().min(1).max(128).required().label("Feature"),
        available: Joi.boolean().required().label("Available"),
      })
      .required()
      .label("Plan features"),
    months: Joi.number().min(1).max(36).required().label("Subscription time"),
    price: Joi.number().min(1).max(256).required().label("Price"),
    discount: Joi.number().min(0).max(100).label("Discount percentage"),
    currency: Joi.string().min(1).max(16).required().label("Currency"),
    popular: Joi.boolean().label("Popular flag"),
  });

  return schema.validate(plan);
}

exports.Plan = Plan;
exports.validate = validatePlan;
