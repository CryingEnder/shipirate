const { Plan, validate } = require("../models/plan");
const tryCatch = require("../middleware/async");
const validator = require("../middleware/validate");
const express = require("express");
const router = express.Router();

router.get(
  "/",
  tryCatch(async (req, res) => {
    const plans = await Plan.find().select("-__v").sort("months");
    res.send(plans);
  })
);

router.post(
  "/",
  validator(validate),
  tryCatch(async (req, res) => {
    plan = new Plan({
      features: req.body.features,
      months: req.body.months,
      price: req.body.price,
      currency: req.body.currency,
      popular: req.body.popular,
    });

    await plan.save();

    res.status(200).send(plan);
  })
);

module.exports = router;
