import { addUser, loginUser } from ".";

describe("use-case: DI", () => {
  describe("make add user", () => {
    it("should be defined", () => {
      expect(addUser).toBeDefined();
    });
  });

  describe("make login user", () => {
    it("should be defined", () => {
      expect(loginUser).toBeDefined();
    });
  });
});
