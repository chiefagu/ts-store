import { deserializeUser, errorHandler, notFoundHandler, requireUser } from ".";

describe("middleware: dependency injection", () => {
  describe("make deserialize user", () => {
    it("should be defined", () => {
      expect(deserializeUser).toBeDefined();
    });
  });

  describe("make require user", () => {
    it("should be defined", () => {
      expect(requireUser).toBeDefined();
    });
  });

  describe("make error handler", () => {
    it("should be defined", () => {
      expect(errorHandler).toBeDefined();
    });
  });

  describe("make not found", () => {
    it("should be defined", () => {
      expect(notFoundHandler).toBeDefined();
    });
  });
});
