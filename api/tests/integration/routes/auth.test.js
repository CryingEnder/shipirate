const request = require("supertest");
const { User } = require("../../../models/user");
const mongoose = require("mongoose");

describe("/api/auth", () => {
  let server;
  let user;

  const exec = () => {
    return request(server)
      .post("/api/auth")
      .send({ email: user.email, password: user.password });
  };

  beforeAll(async () => {
    server = require("../../../index");
    await request(server).post("/api/users").send({
      username: "user1",
      email: "example1@domain.com",
      password: "12345",
      repeatPassword: "12345",
    });
  });
  beforeEach(async () => {
    server = require("../../../index");
    user = {
      username: "user1",
      email: "example1@domain.com",
      password: "12345",
      repeatPassword: "12345",
    };
  });
  afterEach(async () => {
    await server.close();
  });
  afterAll(async () => {
    await User.deleteMany({});
    await mongoose.connection.close();
  });

  it("should return 400 if the e-mail is less than 10 characters", async () => {
    user.email = "123456789";

    const res = await exec();

    expect(res.status).toBe(400);
  });

  it("should return 400 if the e-mail is more than 255 characters", async () => {
    user.email = new Array(257).join("a");

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

  it("should find the provided e-mail", async () => {
    await exec();

    const res = await User.findOne({ email: user.email });

    expect(res).not.toBeNull();
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

  it("should return 200 and a token if the input is valid", async () => {
    const res = await exec();

    expect(res.status).toBe(200);
    expect(res.body.token).toBeTruthy();
    expect(res.body.token).toMatch(/.*..*..*/);
  });
});
