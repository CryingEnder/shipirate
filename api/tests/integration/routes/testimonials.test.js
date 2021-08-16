const request = require("supertest");
const { Testimonial } = require("../../../models/testimonial");
const { User } = require("../../../models/user");
const { unlink } = require("fs/promises");

describe("api/testimonials", () => {
  let server;
  let testimonial;
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
      .post("/api/testimonials")
      .set("Cookie", `${tokenKey}=${token}`)
      .field("profilePhoto", testimonial.profilePhoto)
      .field("name", testimonial.name)
      .field("profession", testimonial.profession)
      .field("socialPlatform", testimonial.socialPlatform)
      .field("message", testimonial.message);
  };

  const execFs = () => {
    return request(server)
      .post("/api/testimonials/fs")
      .set("Cookie", `${tokenKey}=${token}`)
      .attach("profilePhoto", testimonial.profilePhoto)
      .field("name", testimonial.name)
      .field("profession", testimonial.profession)
      .field("socialPlatform", testimonial.socialPlatform)
      .field("message", testimonial.message);
  };

  beforeEach(() => {
    server = require("../../../index");
  });
  afterEach(() => {
    server.close();
  });

  describe("GET /", () => {
    beforeEach(async () => {
      testimonial = {
        profilePhoto: "url",
        name: "John Smith",
        profession: "Front-End Developer",
        socialPlatform: "twitter",
        message: "Random message",
      };

      const { body: userData } = await request(server)
        .post("/api/users")
        .send(user);
      await Testimonial.findByIdAndUpdate(userData._id, { isAdmin: "true" });
      const response = await request(server).post("/api/auth").send({
        email: user.email,
        password: user.password,
        rememberMe: false,
      });
      token = response.headers["set-cookie"][0].replace(`${tokenKey}=`, "");

      await request(server)
        .post("/api/testimonials")
        .set("Cookie", `${tokenKey}=${token}`)
        .send(testimonial);
    });
    afterEach(async () => {
      await Testimonial.deleteMany({});
      await User.deleteMany({});
    });

    it("should get all the testimonials", async () => {
      const res = await request(server).get("/api/testimonials");

      expect(typeof res.body).toBe("object");
      expect(res.status).toBe(200);
    });
  });

  describe("POST /", () => {
    beforeEach(async () => {
      testimonial = {
        profilePhoto: "url",
        name: "John Smith",
        profession: "Front-End Developer",
        socialPlatform: "twitter",
        message: "Random message",
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
      await Testimonial.deleteMany({});
      await User.deleteMany({});
    });

    it("should return 401 if user is not logged in", async () => {
      const res = await request(server)
        .post("/api/testimonials")
        .send(testimonial);

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

    it("should return 500 if profilePhoto is not defined", async () => {
      const res = await request(server)
        .post("/api/testimonials")
        .set("Cookie", `${tokenKey}=${token}`)
        .field("name", testimonial.name)
        .field("profession", testimonial.profession)
        .field("socialPlatform", testimonial.socialPlatform)
        .field("message", testimonial.message);

      expect(res.status).toBe(500);
    });
    it("should return 500 if profilePhoto is not a string", async () => {
      testimonial.profilePhoto = "tests/images/test-image.jpg";

      const res = await request(server)
        .post("/api/testimonials")
        .set("Cookie", `${tokenKey}=${token}`)
        .attach("profilePhoto", testimonial.profilePhoto)
        .field("name", testimonial.name)
        .field("profession", testimonial.profession)
        .field("socialPlatform", testimonial.socialPlatform)
        .field("message", testimonial.message);

      expect(res.status).toBe(500);
    });

    it("should return 400 if name is not defined", async () => {
      delete testimonial.name;

      const res = await request(server)
        .post("/api/testimonials")
        .set("Cookie", `${tokenKey}=${token}`)
        .field("profilePhoto", testimonial.profilePhoto)
        .field("profession", testimonial.profession)
        .field("socialPlatform", testimonial.socialPlatform)
        .field("message", testimonial.message);

      expect(res.status).toBe(400);
    });
    it("should return 400 if name length is less than 1", async () => {
      testimonial.name = "";

      const res = await exec();

      expect(res.status).toBe(400);
    });
    it("should return 400 if name length is greater than 256", async () => {
      testimonial.name = new Array(258).join("a");

      const res = await exec();

      expect(res.status).toBe(400);
    });

    it("should return 400 if profession is not defined", async () => {
      const res = await request(server)
        .post("/api/testimonials")
        .set("Cookie", `${tokenKey}=${token}`)
        .field("profilePhoto", testimonial.profilePhoto)
        .field("name", testimonial.name)
        .field("socialPlatform", testimonial.socialPlatform)
        .field("message", testimonial.message);

      expect(res.status).toBe(400);
    });
    it("should return 400 if profession length is less than 1", async () => {
      testimonial.profession = "";

      const res = await exec();

      expect(res.status).toBe(400);
    });
    it("should return 400 if profession length is greater than 256", async () => {
      testimonial.profession = new Array(258).join("a");

      const res = await exec();

      expect(res.status).toBe(400);
    });

    it("should return 400 if socialPlatform is not a custom valid value", async () => {
      testimonial.socialPlatform = "google";

      const res = await exec();

      expect(res.status).toBe(400);
    });

    it("should return 400 if message is not defined", async () => {
      const res = await request(server)
        .post("/api/testimonials")
        .set("Cookie", `${tokenKey}=${token}`)
        .field("profilePhoto", testimonial.profilePhoto)
        .field("name", testimonial.name)
        .field("profession", testimonial.profession)
        .field("socialPlatform", testimonial.socialPlatform);

      expect(res.status).toBe(400);
    });
    it("should return 400 if message length is less than 1", async () => {
      testimonial.message = "";

      const res = await exec();

      expect(res.status).toBe(400);
    });
    it("should return 400 if message length is greater than 256", async () => {
      testimonial.message = new Array(258).join("a");

      const res = await exec();

      expect(res.status).toBe(400);
    });

    it("should save the testimonial if the testimonial is valid", async () => {
      const res = await exec();

      const testimonialToBeFound = await Testimonial.findOne({
        _id: res.body._id,
      });

      expect(testimonialToBeFound).not.toBeNull();
      expect(typeof res.body).toBe("object");
      expect(res.status).toBe(200);
    });
  });

  describe("POST /fs", () => {
    beforeEach(async () => {
      testimonial = {
        profilePhoto: "tests/images/test-image.jpg",
        name: "John Smith",
        profession: "Front-End Developer",
        socialPlatform: "twitter",
        message: "Random message",
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
      await Testimonial.deleteMany({});
      await User.deleteMany({});
    });

    it("should return 500 if profilePhoto is not defined", async () => {
      const res = await request(server)
        .post("/api/testimonials/fs")
        .set("Cookie", `${tokenKey}=${token}`)
        .field("name", testimonial.name)
        .field("profession", testimonial.profession)
        .field("socialPlatform", testimonial.socialPlatform)
        .field("message", testimonial.message);

      expect(res.status).toBe(500);
    });
    it("should return 500 if profilePhoto is not a photo", async () => {
      const res = await request(server)
        .post("/api/testimonials/fs")
        .set("Cookie", `${tokenKey}=${token}`)
        .field("profilePhoto", testimonial.profilePhoto)
        .field("name", testimonial.name)
        .field("profession", testimonial.profession)
        .field("socialPlatform", testimonial.socialPlatform)
        .field("message", testimonial.message);

      expect(res.status).toBe(500);
    });

    it("should save the testimonial if the testimonial is valid", async () => {
      const res = await execFs();

      const testimonialToBeFound = await Testimonial.findOne({
        _id: res.body._id,
      });

      expect(testimonialToBeFound).not.toBeNull();
      expect(typeof res.body).toBe("object");
      expect(res.status).toBe(200);

      const path = res.body.profilePhoto;
      await unlink(path);
    });
  });
});
