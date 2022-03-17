/* eslint-disable @typescript-eslint/no-explicit-any */
import { resolve } from "../../../__tests__/fixtures";
import { Id } from "../../utils";
import { makeRemoveGenre } from "./remove-genre";

describe("use-case: remove genre", () => {
  const genreDb = { remove: jest.fn(), findById: jest.fn() };

  const removeGenre = makeRemoveGenre({ genreDb, Id } as any);
  it("throws an error when supplied an invalid id", () => {
    const genre = { id: "bad-id", name: "Horror" };

    removeGenre(genre.id).catch((e) => {
      expect(e.message).toMatchInlineSnapshot(`"Invalid id argument"`);
    });
  });

  it("throws an error if genre wasnt found", async () => {
    const genre = { id: Id.makeId(), name: "Horror" };

    genreDb.findById.mockResolvedValueOnce(null);

    const error = await removeGenre(genre.id).catch(resolve);

    expect(genreDb.findById).toHaveBeenCalledWith(genre.id);
    expect(genreDb.findById).toHaveBeenCalledTimes(1);

    expect(error.message).toMatchInlineSnapshot(`"no such genre exists"`);
  });

  it("returns the deleted genre", async () => {
    const genre = { id: Id.makeId(), name: "Horror" };

    genreDb.findById.mockResolvedValueOnce(genre);
    genreDb.remove.mockResolvedValueOnce(genre);

    const result = await removeGenre(genre.id).catch(resolve);

    expect(genreDb.remove).toHaveBeenCalledWith(genre.id);
    expect(genreDb.remove).toHaveBeenCalledTimes(1);

    expect(result).toEqual(genre);
  });
});
