import { buildUser } from "./user";
import { buildFakeUser } from "../../__tests__/fixtures/user";

describe("entity: user", () => {
  const makeUser = buildUser();

  describe("invalid/missing fields", () => {
    it("throws an error if name is invalid", () => {
      let userDetails = buildFakeUser({ name: "" });

      expect(() => makeUser(userDetails)).toThrowErrorMatchingInlineSnapshot(
        `"You must supply a name"`
      );

      userDetails = buildFakeUser({ name: "a" });

      expect(() => makeUser(userDetails)).toThrowErrorMatchingInlineSnapshot(
        `"too short, name must be 3 characters or more"`
      );

      const tooLong = Array(21).fill("n").join("");

      expect(() =>
        makeUser(buildFakeUser({ name: tooLong }))
      ).toThrowErrorMatchingInlineSnapshot(
        `"too long, name must be 20 characters or less"`
      );
    });

    it("throws an error if email is invalid", () => {
      expect(() =>
        makeUser(buildFakeUser({ email: "" }))
      ).toThrowErrorMatchingInlineSnapshot(`"You must supply an email"`);
    });

    it("throws an error if password is invalid", () => {
      expect(() =>
        makeUser(buildFakeUser({ password: "" }))
      ).toThrowErrorMatchingInlineSnapshot(`"You must supply a password"`);

      expect(() =>
        makeUser(buildFakeUser({ password: "short" }))
      ).toThrowErrorMatchingInlineSnapshot(
        `"too short, password must be 6 characters or more"`
      );

      const password = Array(31).fill("p").join("");

      expect(() =>
        makeUser(buildFakeUser({ password }))
      ).toThrowErrorMatchingInlineSnapshot(
        `"too long, password must be 30 characters or less"`
      );
    });
  });

  describe("valid fields", () => {
    it("return an object with getters", () => {
      const userDetails = buildFakeUser();

      const userGetters = makeUser(userDetails);

      expect(userGetters).toMatchInlineSnapshot(`
        Object {
          "getEmail": [Function],
          "getName": [Function],
          "getPassword": [Function],
        }
      `);
    });
    it("returns valid user attributes", () => {
      const userDetails = buildFakeUser();

      const { getName, getEmail, getPassword } = makeUser({
        ...userDetails,
      });

      expect(getName()).toBe(userDetails.name);
      expect(getEmail()).toBe(userDetails.email);
      expect(getPassword()).toBe(userDetails.password);
    });
  });
});
