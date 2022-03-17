/* eslint-disable @typescript-eslint/no-explicit-any */
import { makeEditGenre } from "./edit-genre";
import { Id } from "../../utils";
import { buildFakeGenre, resolve } from "../../../__tests__/fixtures";

describe("use-case: edit genre", () => {
  const genreDb = { findById: jest.fn(), update: jest.fn() };
  const editGenre = makeEditGenre({ genreDb, Id } as any);

  describe("when invalid id is supplied", () => {
    it("throws an error", async () => {
      const genreInput = { id: "bad" };

      const error = await editGenre(genreInput as any).catch(resolve);
      expect(error.message).toMatchInlineSnapshot(`"Invalid argument for id"`);
    });
  });

  describe("when no matching genre found", () => {
    it("throws an error", async () => {
      const genreInput = { id: Id.makeId() };

      genreDb.findById.mockResolvedValueOnce(null);

      const error = await editGenre(genreInput as any).catch(resolve);
      expect(error.message).toMatchInlineSnapshot(`"no such genre exists"`);
    });
  });

  describe("when matching genre is found", () => {
    it("updates the genre info", async () => {
      const genreInput = { id: Id.makeId(), name: "Action" };

      const genre = buildFakeGenre();

      const update = { ...genre, name: genreInput.name };

      genreDb.findById.mockResolvedValue(genre);
      genreDb.update.mockResolvedValue(update);

      const actual = await editGenre(genreInput);

      expect(genreDb.findById).toHaveBeenCalledWith(genreInput.id);
      expect(genreDb.findById).toHaveBeenCalledTimes(1);

      expect(genreDb.update).toHaveBeenCalledWith(genreInput.id, {
        name: genreInput.name,
      });
      expect(genreDb.update).toHaveBeenCalledTimes(1);

      expect(actual).toEqual(update);
    });
  });
});
