import { buildFakeGenre } from "../../__tests__/fixtures/genre";
import { buildGenre } from "./genre";

describe("entity: genre", () => {
  const makeGenre = buildGenre();

  describe("user input is missing name", () => {
    it("throws an error", () => {
      const userInput = buildFakeGenre({ name: null });

      expect(() => makeGenre(userInput)).toThrowErrorMatchingInlineSnapshot(
        `"You must supply a name"`
      );
    });
  });

  describe("name is too short", () => {
    it("throws an error", () => {
      const tooShort = "ja";
      const userInput = buildFakeGenre({ name: tooShort });

      expect(() => makeGenre(userInput)).toThrowErrorMatchingInlineSnapshot(
        `"too short, name must be 3 characters or more"`
      );
    });
  });

  describe("name is too long", () => {
    it("throws an error", () => {
      const tooLong = makeLongGenreName();
      const userInput = buildFakeGenre({ name: tooLong });

      expect(() => makeGenre(userInput)).toThrowErrorMatchingInlineSnapshot(
        `"too long, name must be 30 characters or less"`
      );
    });
  });

  describe("valid fields", () => {
    it("returns a frozen object with getters", () => {
      const genre = buildFakeGenre();

      expect(makeGenre(genre)).toMatchInlineSnapshot(`
        Object {
          "getName": [Function],
        }
      `);
    });

    it("returns valid genre attributes", () => {
      const genre = buildFakeGenre();

      const { getName } = makeGenre(genre);

      expect(getName()).toBe(genre.name);
    });
  });
});

function makeLongGenreName() {
  return Array(35).fill("a").join("");
}
