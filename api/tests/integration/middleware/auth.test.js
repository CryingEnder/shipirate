const request = require("supertest");
const { User } = require("../../../models/user");

describe("auth middleware", () => {
  let server;
  let token;
  const tokenKey = "jwt";

  const exec = () => {
    return request(server)
      .get("/api/users/me")
      .set("Cookie", `${tokenKey}=${token}`);
  };

  beforeEach(() => {
    server = require("../../../index");

    token = new User().generateAuthToken();
  });
  afterEach(() => {
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
