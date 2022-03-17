/* eslint-disable @typescript-eslint/no-explicit-any */
import { buildFakeGenre, resolve } from "../../../__tests__/fixtures";
import { Id, InvalidPropertyError } from "../../utils";
import { makeFindGenre } from "./find-genre";

describe("use-case: find genre", () => {
  const genreDb = { findById: jest.fn() };

  const findGenre = makeFindGenre({ genreDb, Id } as any);

  describe("no id was provided", () => {
    it("throws an error", async () => {
      const genre = buildFakeGenre({ _id: null });

      const error = await findGenre(genre._id).catch(resolve);

      expect(error).toBeInstanceOf(InvalidPropertyError);

      expect(error.message).toMatchInlineSnapshot(
        `"You must supply a valid id"`
      );
    });
  });

  describe("was supplied a valid id", () => {
    describe("finds no genre with the given id", () => {
      it("throws an error", async () => {
        const genre = buildFakeGenre();

        genreDb.findById.mockResolvedValueOnce(null);

        const error = await findGenre(genre._id).catch(resolve);

        expect(error).toBeInstanceOf(InvalidPropertyError);

        expect(error.message).toMatchInlineSnapshot(`"no genre found"`);
      });
    });

    describe("finds a genre with the given id", () => {
      it("returns the genre", async () => {
        const genre = buildFakeGenre();

        genreDb.findById.mockResolvedValueOnce(genre);

        const found = await findGenre(genre._id).catch(resolve);

        expect(found).not.toBeInstanceOf(InvalidPropertyError);

        expect(found).toMatchObject(genre);
      });
    });
  });
});
