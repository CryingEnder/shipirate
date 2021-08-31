const { Plan } = require("../models/plan");
const { Testimonial } = require("../models/testimonial");

module.exports = {
  async up(db, client) {
    await db.collection("plans").insertMany([
      new Plan({
        discount: 0,
        popular: false,
        features: [
          {
            feature: "Lorem ipsum dolor sit amet",
            available: true,
          },
          {
            feature: "Lorem ipsum dolor sit amet",
            available: false,
          },
          {
            feature: "Lorem ipsum dolor sit amet",
            available: false,
          },
        ],
        months: 1,
        price: 10,
        currency: "$",
      }),
      new Plan({
        discount: 10,
        popular: true,
        features: [
          {
            feature: "Lorem ipsum dolor sit amet",
            available: true,
          },
          {
            feature: "Lorem ipsum dolor sit amet",
            available: true,
          },
          {
            feature: "Lorem ipsum dolor sit amet",
            available: false,
          },
        ],
        months: 6,
        price: 10,
        currency: "$",
      }),
      new Plan({
        discount: 20,
        popular: false,
        features: [
          {
            feature: "Lorem ipsum dolor sit amet",
            available: true,
          },
          {
            feature: "Lorem ipsum dolor sit amet",
            available: true,
          },
          {
            feature: "Lorem ipsum dolor sit amet",
            available: true,
          },
        ],
        months: 12,
        price: 10,
        currency: "$",
      }),
    ]);
    await db.collection("testimonials").insertMany([
      new Testimonial({
        profilePhoto: "images/customer-1.jpg-1629057803495",
        name: "John Smith",
        profession: "Front-End Developer",
        socialPlatform: "twitter",
        message:
          "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusantium animi excepturi totam provident sequi quisquam quibusdam impedit ex omnis! Minus fuga natus aliquam aliquid.",
      }),
      new Testimonial({
        profilePhoto: "images/customer-2.jpg-1629057965273",
        name: "Alex Fiero",
        profession: "Back-End Developer",
        socialPlatform: "linkedin",
        message:
          "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusantium animi excepturi totam provident sequi quisquam quibusdam impedit ex omnis! Minus fuga.",
      }),
      new Testimonial({
        profilePhoto: "images/customer-3.jpg-1629058056020",
        name: "Gabriel Constantinescu",
        profession: "Full-Stack Developer",
        message:
          "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusantium animi excepturi totam provident sequi quisquam quibusdam.",
      }),
      new Testimonial({
        profilePhoto: "images/customer-4.jpg-1629058097068",
        name: "Chun Hei",
        profession: "Front-End Developer",
        socialPlatform: "facebook",
        message:
          "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusantium animi excepturi totam provident sequi quisquam quibusdam impedit ex omnis! Minus fuga natus aliquam aliquid.",
      }),
      new Testimonial({
        profilePhoto: "images/customer-5.jpg-1629058141351",
        name: "Ji Woo",
        profession: "Back-End Developer",
        socialPlatform: "twitter",
        message:
          "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusantium animi excepturi totam provident.",
      }),
      new Testimonial({
        profilePhoto: "images/customer-6.jpg-1629058178080",
        name: "Amy Oakwood",
        profession: "Full-Stack Developer",
        socialPlatform: "instagram",
        message:
          "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusantium animi excepturi totam provident sequi quisquam quibusdam impedit ex omnis! Minus fuga natus aliquam aliquid.",
      }),
    ]);
  },

  async down(db, client) {
    await db.collection("plans").deleteMany({});
    await db.collection("testimonials").deleteMany({});
  },
};
