const request = require("supertest");
const { User } = require("../../../models/user");

describe("auth middleware", () => {
  let server;
  let token;
  const tokenKey = "jwt";

  const exec = () => {
    return request(server)
      .delete("/api/auth/logout")
      .set("Cookie", `${tokenKey}=${token}`);
  };

  beforeEach(async () => {
    server = require("../../../index");

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

    server.close();
  });

  it("should return 401 if no token is provided", async () => {
    token = "";

    const res = await exec();

    expect(res.status).toBe(401);
  });

  it("should return 400 if token is invalid", async () => {
    token = "a";

    const res = await exec();

    expect(res.status).toBe(400);
  });

  it("should return 200 if token is valid", async () => {
    const res = await exec();

    expect(res.status).toBe(200);
  });
});
