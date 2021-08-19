const request = require("supertest");
const { User } = require("../../../models/user");
const bcrypt = require("bcrypt");

describe("api/users", () => {
  let server;
  let user;
  let token;
  const tokenKey = "jwt";

  const execPost = () => {
    return request(server).post("/api/users").send(user);
  };

  beforeEach(() => {
    server = require("../../../index");
  });
  afterEach(() => {
    server.close();
  });

  describe("GET /me", () => {
    beforeEach(() => {
      user = {
        username: "user1",
        email: "example1@domain.com",
        password: "12345",
        repeatPassword: "12345",
      };
    });
    afterEach(async () => {
      await User.deleteMany({});
    });

    it("should return 401 if the user is not logged in", async () => {
      token = "";

      const res = await request(server)
        .get("/api/users/me")
        .set("Cookie", `${tokenKey}=${token}`);

      expect(res.status).toBe(401);
    });

    it("should return current user information", async () => {
      const response = await execPost();
      token = response.headers["set-cookie"][0].replace(`${tokenKey}=`, "");

      const res = await request(server)
        .get("/api/users/me")
        .set("Cookie", `${tokenKey}=${token}`);

      expect(res.body).toHaveProperty("email");
      expect(res.status).toBe(200);
    });
  });

  describe("POST /", () => {
    beforeEach(() => {
      user = {
        username: "user1",
        email: "example1@domain.com",
        password: "12345",
        repeatPassword: "12345",
      };
    });
    afterEach(async () => {
      await User.deleteMany({});
    });

    it("should return 400 if the username is less than 5 characters", async () => {
      user.username = "user";

      const res = await execPost();

      expect(res.status).toBe(400);
    });

    it("should return 400 if the username is more than 30 characters", async () => {
      user.username = new Array(32).join("a");

      const res = await execPost();

      expect(res.status).toBe(400);
    });

    it("should return 400 if the e-mail is invalid", async () => {
      user.email = "123456789a";

      const res = await execPost();

      expect(res.status).toBe(400);
    });

    it("should return 400 if the e-mail is less than 10 characters", async () => {
      user.email = "123456789";

      const res = await execPost();

      expect(res.status).toBe(400);
    });

    it("should return 400 if the e-mail is more than 255 characters", async () => {
      user.email = new Array(257).join("a");

      const res = await execPost();

      expect(res.status).toBe(400);
    });

    it("should return 400 if the password is less than 5 characters", async () => {
      user.password = "1234";

      const res = await execPost();

      expect(res.status).toBe(400);
    });

    it("should return 400 if the password is more than 1024 characters", async () => {
      user.password = new Array(1026).join("a");

      const res = await execPost();

      expect(res.status).toBe(400);
    });

    it("should return 400 if the password is not the same as repeatPassword", async () => {
      user.repeatPassword = "1234";

      const res = await execPost();

      expect(res.status).toBe(400);
    });

    it("should return 400 if the e-mail already exists", async () => {
      await execPost();

      const res = await execPost();

      expect(res.status).toBe(400);
    });

    it("should hash the password", async () => {
      await execPost();

      const userToBeFound = await User.findOne({ email: user.email });

      expect(userToBeFound.password).not.toBe(user.password);
    });

    it("should save the user if it is valid", async () => {
      await execPost();

      const userToBeFound = await User.findOne({ email: user.email });

      expect(userToBeFound).not.toBeNull();
    });

    it("should set the cookie", async () => {
      const res = await execPost();

      expect(res.headers["set-cookie"][0]).toMatch(tokenKey);
    });

    it("should return the user's data back to the user if the input is valid", async () => {
      const res = await execPost();

      expect(res.body).toHaveProperty("email", user.email);
    });
  });

  describe("PATCH /me", () => {
    describe("PATCH /me input", () => {
      beforeEach(async () => {
        user = {
          username: "user1",
          email: "example1@domain.com",
          password: "12345",
          repeatPassword: "12345",
        };

        const response = await execPost();
        token = response.headers["set-cookie"][0].replace(`${tokenKey}=`, "");
      });
      afterEach(async () => {
        await User.deleteMany({});
      });

      it("should return 401 if the user is not logged in", async () => {
        const res = await request(server)
          .patch("/api/users/me")
          .set("Cookie", `${tokenKey}=`)
          .send({ newUsername: "user2" });

        expect(res.status).toBe(401);
      });

      it("should return 400 if the input is empty", async () => {
        const res = await request(server)
          .patch("/api/users/me")
          .set("Cookie", `${tokenKey}=${token}`)
          .send({});

        expect(res.status).toBe(400);
      });

      it("should return 400 if the input is invalid", async () => {
        const res = await request(server)
          .patch("/api/users/me")
          .set("Cookie", `${tokenKey}=${token}`)
          .send({ newUsername: "user2", currentPassword: "12345" });

        expect(res.status).toBe(400);
      });

      it("should return 400 if the new username is less than 5 characters", async () => {
        const res = await request(server)
          .patch("/api/users/me")
          .set("Cookie", `${tokenKey}=${token}`)
          .send({ newUsername: "user" });

        expect(res.status).toBe(400);
      });

      it("should return 400 if the new username is more than 30 characters", async () => {
        const res = await request(server)
          .patch("/api/users/me")
          .set("Cookie", `${tokenKey}=${token}`)
          .send({ newUsername: new Array(32).join("a") });

        expect(res.status).toBe(400);
      });

      it("should return 400 if the new e-mail is less than 10 characters", async () => {
        const res = await request(server)
          .patch("/api/users/me")
          .set("Cookie", `${tokenKey}=${token}`)
          .send({
            newEmail: "ab@cb.com",
            repeatNewEmail: "ab@cb.com",
          });

        expect(res.status).toBe(400);
      });

      it("should return 400 if the new e-mail is more than 255 characters", async () => {
        const res = await request(server)
          .patch("/api/users/me")
          .set("Cookie", `${tokenKey}=${token}`)
          .send({
            newEmail: `${new Array(257).join("a")}@domain.com`,
            repeatNewEmail: `${new Array(257).join("a")}@domain.com`,
          });

        expect(res.status).toBe(400);
      });

      it("should return 400 if the new e-mail is not spelled correctly twice", async () => {
        const res = await request(server)
          .patch("/api/users/me")
          .set("Cookie", `${tokenKey}=${token}`)
          .send({
            newEmail: "example2@domain.com",
            repeatNewEmail: "example3@domain.com",
          });

        expect(res.status).toBe(400);
      });

      it("should return 400 if the new password is less than 5 characters", async () => {
        const res = await request(server)
          .patch("/api/users/me")
          .set("Cookie", `${tokenKey}=${token}`)
          .send({
            currentPassword: user.password,
            newPassword: "a",
            repeatNewPassword: "a",
          });

        expect(res.status).toBe(400);
      });

      it("should return 400 if the new password is more than 1024 characters", async () => {
        const res = await request(server)
          .patch("/api/users/me")
          .set("Cookie", `${tokenKey}=${token}`)
          .send({
            currentPassword: user.password,
            newPassword: new Array(1026).join("a"),
            repeatNewPassword: new Array(1026).join("a"),
          });

        expect(res.status).toBe(400);
      });

      it("should return 400 if the new password is the same as the current password", async () => {
        const res = await request(server)
          .patch("/api/users/me")
          .set("Cookie", `${tokenKey}=${token}`)
          .send({
            currentPassword: user.password,
            newPassword: user.password,
            repeatNewPassword: user.password,
          });

        expect(res.status).toBe(400);
      });

      it("should return 400 if the new password is not spelled correctly twice", async () => {
        const res = await request(server)
          .patch("/api/users/me")
          .set("Cookie", `${tokenKey}=${token}`)
          .send({
            currentPassword: user.password,
            newPassword: "123456",
            repeatNewPassword: "1234567",
          });

        expect(res.status).toBe(400);
      });
    });

    describe("PATCH /me username", () => {
      beforeEach(async () => {
        user = {
          username: "user1",
          email: "example1@domain.com",
          password: "12345",
          repeatPassword: "12345",
        };

        const response = await execPost();
        token = response.headers["set-cookie"][0].replace(`${tokenKey}=`, "");
      });
      afterEach(async () => {
        await User.deleteMany({});
      });

      it("should return 400 if the new username is the same as the current username", async () => {
        const res = await request(server)
          .patch("/api/users/me")
          .set("Cookie", `${tokenKey}=${token}`)
          .send({ newUsername: "user1" });

        expect(res.status).toBe(400);
      });

      it("should update the username if the input was valid", async () => {
        const res = await request(server)
          .patch("/api/users/me")
          .set("Cookie", `${tokenKey}=${token}`)
          .send({ newUsername: "user2" });

        const { username } = await User.findOne({ email: user.email });

        expect(username).not.toBe(user.username);
        expect(res.status).toBe(200);
      });
    });

    describe("PATCH /me e-mail", () => {
      beforeEach(async () => {
        user = {
          username: "user1",
          email: "example1@domain.com",
          password: "12345",
          repeatPassword: "12345",
        };

        const response = await execPost();
        token = response.headers["set-cookie"][0].replace(`${tokenKey}=`, "");
      });
      afterEach(async () => {
        await User.deleteMany({});
      });

      it("should return 400 if the new e-mail is the same as the current e-mail", async () => {
        const res = await request(server)
          .patch("/api/users/me")
          .set("Cookie", `${tokenKey}=${token}`)
          .send({
            newEmail: "example1@domain.com",
            repeatNewEmail: "example1@domain.com",
          });

        expect(res.status).toBe(400);
      });

      it("should return 403 if the new e-mail has already been used", async () => {
        user = {
          username: "user2",
          email: "example2@domain.com",
          password: "12345",
          repeatPassword: "12345",
        };

        const postResponse = await execPost();
        token = postResponse.headers["set-cookie"][0].replace(
          `${tokenKey}=`,
          ""
        );

        const res = await request(server)
          .patch("/api/users/me")
          .set("Cookie", `${tokenKey}=${token}`)
          .send({
            newEmail: "example1@domain.com",
            repeatNewEmail: "example1@domain.com",
          });

        expect(res.status).toBe(403);
      });

      it("should update the e-mail if the input was valid", async () => {
        const res = await request(server)
          .patch("/api/users/me")
          .set("Cookie", `${tokenKey}=${token}`)
          .send({
            newEmail: "example2@domain.com",
            repeatNewEmail: "example2@domain.com",
          });

        const userToBeFound = await User.findOne({ email: user.email });

        expect(userToBeFound).toBeNull();
        expect(res.status).toBe(200);
      });
    });

    describe("PATCH /me password", () => {
      beforeEach(async () => {
        user = {
          username: "user1",
          email: "example1@domain.com",
          password: "12345",
          repeatPassword: "12345",
        };

        const response = await execPost();
        token = response.headers["set-cookie"][0].replace(`${tokenKey}=`, "");
      });
      afterEach(async () => {
        await User.deleteMany({});
      });

      it("should return 400 if the current password is not the same as the current password", async () => {
        const res = await request(server)
          .patch("/api/users/me")
          .set("Cookie", `${tokenKey}=${token}`)
          .send({
            currentPassword: "123456",
            newPassword: "1234567",
            repeatNewPassword: "1234567",
          });

        expect(res.status).toBe(400);
      });

      it("should update the password if the input was valid", async () => {
        const res = await request(server)
          .patch("/api/users/me")
          .set("Cookie", `${tokenKey}=${token}`)
          .send({
            currentPassword: "12345",
            newPassword: "123456",
            repeatNewPassword: "123456",
          });

        const { password } = await User.findOne({ email: user.email });
        const validatePassword = await bcrypt.compare(user.password, password);

        expect(validatePassword).toBeFalsy();
        expect(res.status).toBe(200);
      });
    });
  });

  describe("DELETE /me", () => {
    beforeEach(async () => {
      user = {
        username: "user1",
        email: "example1@domain.com",
        password: "12345",
        repeatPassword: "12345",
      };

      const response = await execPost();
      token = response.headers["set-cookie"][0].replace(`${tokenKey}=`, "");
    });
    afterEach(async () => {
      await User.deleteMany({});
    });

    it("should return 401 if the user is not logged in", async () => {
      token = "";

      const res = await request(server)
        .delete("/api/users/me")
        .set("Cookie", `${tokenKey}=${token}`);

      expect(res.status).toBe(401);
    });

    it("should return 200 if the user has been deleted successfully", async () => {
      const res = await request(server)
        .delete("/api/users/me")
        .set("Cookie", `${tokenKey}=${token}`);

      const userToBeFound = await User.findOne({ email: user.email });

      expect(userToBeFound).toBeNull();
      expect(res.status).toBe(200);
    });
  });
});
