import { postLoginUser, postRegisterUser } from ".";

describe("controllers: dependency injection", () => {
  describe("make post register user", () => {
    it("should be defined", () => {
      expect(postRegisterUser).toBeDefined();
    });
  });

  describe("make post login user", () => {
    it("should be defined", () => {
      expect(postLoginUser).toBeDefined();
    });
  });
});
