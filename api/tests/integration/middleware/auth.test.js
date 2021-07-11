const request = require("supertest");
const { User } = require("../../../models/user");
const mongoose = require("mongoose");

describe("auth middleware", () => {
  let server;
  let token;

  const exec = () => {
    return request(server).get("/api/users/me").set("x-auth-token", token);
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
    expect(res.text).toBe("Access denied. No token provided.");
  });

  it("should return 400 if token is invalid", async () => {
    token = "a";

    const res = await exec();

    expect(res.status).toBe(400);
    expect(res.text).toBe("Invalid token.");
  });

  it("should return 200 if token is valid", async () => {
    const res = await exec();

    expect(res.status).toBe(200);
  });
});
