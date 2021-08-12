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
  currency: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 16,
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
        feature: Joi.string().min(1).max(128).required(),
        available: Joi.boolean().required(),
      })

      .required()
      .label("Plan features"),
    months: Joi.number().min(1).max(36).required().label("Subscription time"),
    price: Joi.number().min(1).max(256).required().label("Price"),
    currency: Joi.string().min(1).max(16).required().label("Currency"),
    popular: Joi.boolean().label("Popular flag"),
  });

  return schema.validate(plan);
}

exports.Plan = Plan;
exports.validate = validatePlan;
