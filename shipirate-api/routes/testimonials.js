const { Testimonial, validate } = require("../models/testimonial");
const auth = require("../middleware/auth");
const isAdmin = require("../middleware/isAdmin");
const upload = require("../middleware/upload");
const tryCatch = require("../middleware/async");
const validator = require("../middleware/validate");
const { unlink } = require("fs/promises");
const express = require("express");
const router = express.Router();

router.get(
  "/",
  tryCatch(async (req, res) => {
    const testimonials = await Testimonial.find().select("-__v").sort("name");
    res.send(testimonials);
  })
);

router.post(
  "/",
  [auth, isAdmin, upload.none(), validator(validate)],
  tryCatch(async (req, res) => {
    testimonial = new Testimonial({
      profilePhoto: req.body.profilePhoto,
      name: req.body.name,
      profession: req.body.profession,
      socialPlatform: req.body.socialPlatform,
      message: req.body.message,
    });

    await testimonial.save();

    res.status(200).send(testimonial);
  })
);

router.post(
  "/fs",
  [auth, isAdmin, upload.single("profilePhoto")],
  tryCatch(async (req, res) => {
    const { error } = validate(req.body);
    const path = `public/images/${req.file.filename}`;
    if (error) {
      await unlink(path);
      return res.status(400).send(error.details[0].message);
    }

    testimonial = new Testimonial({
      profilePhoto: path,
      name: req.body.name,
      profession: req.body.profession,
      socialPlatform: req.body.socialPlatform,
      message: req.body.message,
    });

    await testimonial.save();

    res.status(200).send(testimonial);
  })
);

module.exports = router;
