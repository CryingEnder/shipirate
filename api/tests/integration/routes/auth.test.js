const request = require("supertest");
const { User } = require("../../../models/user");

describe("/api/auth", () => {
  let server;
  let user;
  let token;
  const tokenKey = "jwt";

  const exec = () => {
    return request(server)
      .post("/api/auth")
      .send({ email: user.email, password: user.password, rememberMe: false });
  };

  beforeEach(() => {
    server = require("../../../index");
  });
  afterEach(() => {
    server.close();
  });

  describe("POST /", () => {
    beforeEach(async () => {
      user = {
        username: "user1",
        email: "example1@domain.com",
        password: "12345",
        repeatPassword: "12345",
      };
      await request(server).post("/api/users").send(user);
    });
    afterEach(async () => {
      await User.deleteMany({});
    });

    it("should return 400 if the e-mail is less than 10 characters", async () => {
      user.email = "ab@bc.com";

      const res = await exec();

      expect(res.status).toBe(400);
    });

    it("should return 400 if the e-mail is more than 255 characters", async () => {
      user.email = `${new Array(257).join("a")}@domain.com`;

      const res = await exec();

      expect(res.status).toBe(400);
    });

    it("should return 400 if the e-mail is invalid", async () => {
      user.email = "123456789a";

      const res = await exec();

      expect(res.status).toBe(400);
    });

    it("should return 400 if the password is less than 5 characters", async () => {
      user.password = "1234";

      const res = await exec();

      expect(res.status).toBe(400);
    });

    it("should return 400 if the password is more than 1024 characters", async () => {
      user.password = new Array(1026).join("a");

      const res = await exec();

      expect(res.status).toBe(400);
    });

    it("should return 400 if the e-mail does not exist", async () => {
      user.email = "example2@domain.com";

      const res = await exec();

      expect(res.status).toBe(400);
    });

    it("should return 400 if the provided password does not match", async () => {
      user.password = "123456";

      const res = await exec();

      expect(res.status).toBe(400);
    });

    it("should return 400 if the remember me property does not exist", async () => {
      const res = await request(server)
        .post("/api/auth")
        .send({ email: user.email, password: user.password });

      expect(res.status).toBe(400);
    });

    it("should return 200 if the input is valid", async () => {
      const res = await exec();

      expect(res.status).toBe(200);
    });
  });

  describe("DELETE /logout", () => {
    beforeEach(async () => {
      user = {
        username: "user1",
        email: "example1@domain.com",
        password: "12345",
        repeatPassword: "12345",
      };
      const response = await request(server).post("/api/users").send(user);
      token = response.headers["set-cookie"][0].replace(`${tokenKey}=`, "");
    });
    afterEach(async () => {
      await User.deleteMany({});
    });

    it("should return 401 if the user is not logged in", async () => {
      token = "";

      const res = await request(server)
        .delete("/api/auth/logout")
        .set("Cookie", `${tokenKey}=${token}`);

      expect(res.status).toBe(401);
    });

    it("should log out the user", async () => {
      const res = await request(server)
        .delete("/api/auth/logout")
        .set("Cookie", `${tokenKey}=${token}`);

      expect(res.status).toBe(200);
    });
  });
});
