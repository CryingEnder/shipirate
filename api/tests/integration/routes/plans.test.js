const request = require("supertest");
const config = require("config");
const { Plan } = require("../../../models/plan");
const { User } = require("../../../models/user");

describe("api/plans", () => {
  let server;
  let plan;
  let token;
  const tokenKey = "jwt";
  const user = {
    username: "user1",
    email: "example1@domain.com",
    password: "12345",
    repeatPassword: "12345",
  };

  const exec = () => {
    return request(server)
      .post("/api/plans")
      .set("Cookie", `${tokenKey}=${token}`)
      .send(plan);
  };

  beforeAll(() => {
    if (config.get("db") === "mongodb://localhost:27017/api_tests")
      server = require("../../../index");
    else
      throw new Error(
        "Fatal error: The connection string of the test database was changed!"
      );
  });
  afterAll(() => {
    server.close();
  });

  describe("GET /", () => {
    beforeEach(async () => {
      plan = {
        features: [
          { feature: "Lorem ipsum dolor sit amet", available: true },
          { feature: "Lorem ipsum dolor sit am", available: true },
          { feature: "Lorem ipsum dolor sit", available: false },
        ],
        months: 1,
        price: 10,
        currency: "$",
      };

      const { body: userData } = await request(server)
        .post("/api/users")
        .send(user);
      await User.findByIdAndUpdate(userData._id, { isAdmin: "true" });
      const response = await request(server).post("/api/auth").send({
        email: user.email,
        password: user.password,
        rememberMe: false,
      });
      token = response.headers["set-cookie"][0].replace(`${tokenKey}=`, "");

      await request(server)
        .post("/api/plans")
        .set("Cookie", `${tokenKey}=${token}`)
        .send(plan);
    });
    afterEach(async () => {
      await Plan.deleteMany({});
      await User.deleteMany({});
    });

    it("should get all the plans", async () => {
      const res = await request(server).get("/api/plans");

      expect(typeof res.body).toBe("object");
      expect(res.status).toBe(200);
    });
  });

  describe("PLAN /", () => {
    beforeEach(async () => {
      plan = {
        features: [
          { feature: "Lorem ipsum dolor sit amet", available: true },
          { feature: "Lorem ipsum dolor sit am", available: true },
          { feature: "Lorem ipsum dolor sit", available: false },
        ],
        months: 1,
        price: 10,
        currency: "$",
      };

      const { body: userData } = await request(server)
        .post("/api/users")
        .send(user);
      await User.findByIdAndUpdate(userData._id, { isAdmin: "true" });
      const response = await request(server).post("/api/auth").send({
        email: user.email,
        password: user.password,
        rememberMe: false,
      });
      token = response.headers["set-cookie"][0].replace(`${tokenKey}=`, "");
    });
    afterEach(async () => {
      await Plan.deleteMany({});
      await User.deleteMany({});
    });

    it("should return 401 if user is not logged in", async () => {
      const res = await request(server).post("/api/plans").send(plan);

      expect(res.status).toBe(401);
    });
    it("should return 403 if user is not an admin", async () => {
      const normalUser = {
        username: "user2",
        email: "example2@domain.com",
        password: "12345",
        repeatPassword: "12345",
      };

      const resp = await request(server).post("/api/users").send(normalUser);
      token = resp.headers["set-cookie"][0].replace(`${tokenKey}=`, "");

      const res = await exec();

      expect(res.status).toBe(403);
    });

    it("should return 400 if features is not defined", async () => {
      delete plan.features;

      const res = await exec();

      expect(res.status).toBe(400);
    });
    it("should return 400 if one of the features only has one property", async () => {
      delete plan.features[0].available;

      const res = await exec();

      expect(res.status).toBe(400);
    });
    it("should return 400 if 'feature' property is not a string", async () => {
      plan.features[0].feature = 1;

      const res = await exec();

      expect(res.status).toBe(400);
    });
    it("should return 400 if length of 'feature' property is less than 1", async () => {
      plan.features[0].feature = "";

      const res = await exec();

      expect(res.status).toBe(400);
    });
    it("should return 400 if length of 'feature' property is greater than 128", async () => {
      plan.features[0].feature = new Array(130).join("a");

      const res = await exec();

      expect(res.status).toBe(400);
    });
    it("should return 400 if 'available' property is not a boolean", async () => {
      plan.features[0].available = "a";

      const res = await exec();

      expect(res.status).toBe(400);
    });

    it("should return 400 if months is not defined", async () => {
      delete plan.months;

      const res = await exec();

      expect(res.status).toBe(400);
    });
    it("should return 400 if months is not a number", async () => {
      plan.months = "a";

      const res = await exec();

      expect(res.status).toBe(400);
    });
    it("should return 400 if months is less than 1", async () => {
      plan.months = 0;

      const res = await exec();

      expect(res.status).toBe(400);
    });
    it("should return 400 if months is greater than 36", async () => {
      plan.months = 37;

      const res = await exec();

      expect(res.status).toBe(400);
    });

    it("should return 400 if price is not defined", async () => {
      delete plan.price;

      const res = await exec();

      expect(res.status).toBe(400);
    });
    it("should return 400 if price is not a number", async () => {
      plan.price = "a";

      const res = await exec();

      expect(res.status).toBe(400);
    });
    it("should return 400 if price is less than 1", async () => {
      plan.price = 0;

      const res = await exec();

      expect(res.status).toBe(400);
    });
    it("should return 400 if price is greater than 256", async () => {
      plan.price = 257;

      const res = await exec();

      expect(res.status).toBe(400);
    });

    it("should return 400 if discount is not a number", async () => {
      plan.discount = "a";

      const res = await exec();

      expect(res.status).toBe(400);
    });
    it("should return 400 if discount is greater than 100", async () => {
      plan.discount = 101;

      const res = await exec();

      expect(res.status).toBe(400);
    });

    it("should return 400 if currency is not defined", async () => {
      delete plan.currency;

      const res = await exec();

      expect(res.status).toBe(400);
    });
    it("should return 400 if currency is not a string", async () => {
      plan.currency = 1;

      const res = await exec();

      expect(res.status).toBe(400);
    });
    it("should return 400 if length of currency is less than 1", async () => {
      plan.currency = "";

      const res = await exec();

      expect(res.status).toBe(400);
    });
    it("should return 400 if length of currency is greater than 16", async () => {
      plan.currency = new Array(18).join("a");

      const res = await exec();

      expect(res.status).toBe(400);
    });

    it("should return 400 if popular is not a boolean", async () => {
      plan.popular = "a";

      const res = await exec();

      expect(res.status).toBe(400);
    });

    it("should save the plan if the plan is valid", async () => {
      const res = await exec();

      const planToBeFound = await Plan.findOne({ _id: res.body._id });

      expect(planToBeFound).not.toBeNull();
      expect(typeof res.body).toBe("object");
      expect(res.status).toBe(200);
    });
  });
});
