/* eslint-disable @typescript-eslint/no-explicit-any */
import { buildFakeGenre, resolve } from "../../../__tests__/fixtures";
import { Id, InvalidPropertyError } from "../../utils";
import { makePutGenre } from "./put-genre";

describe("controllers: put genre", () => {
  const logger = { error: jest.fn() };
  const editGenre = jest.fn();

  const putGenre = makePutGenre({ editGenre, logger } as any);

  describe("successfully puts a genre", () => {
    it("returns the edited genre", async () => {
      const genre = buildFakeGenre();
      const headers = { "Content-Type": "application/json" };

      const request = {
        body: { name: genre.name },
        params: { id: genre._id },
      };

      editGenre.mockResolvedValue(genre);

      const actual = await putGenre(request as any);

      expect(editGenre).toHaveBeenCalledWith({
        id: genre._id,
        name: genre.name,
      });

      expect(editGenre).toHaveBeenCalledTimes(1);

      expect(actual).toEqual({
        headers,
        statusCode: 201,
        body: genre,
      });
    });
  });

  describe("failed to put a genre", () => {
    describe("encounters a known error", () => {
      it("responds with a 400 status code and an error message", async () => {
        const genre = { id: Id.makeId(), name: "Action" };
        const headers = { "Content-Type": "application/json" };

        const request = {
          body: { name: genre.name },
          params: { id: genre.id },
        };

        const error = new InvalidPropertyError("0-0");

        editGenre.mockRejectedValue(error);

        const actual = await putGenre(request as any);

        expect(editGenre).toHaveBeenCalledWith({
          id: genre.id,
          name: genre.name,
        });

        expect(editGenre).toHaveBeenCalledTimes(1);

        expect(logger.error).toHaveBeenCalledWith(error.message, error);
        expect(logger.error).toHaveBeenCalledTimes(1);

        expect(actual).toEqual({
          headers,
          statusCode: 400,
          body: error.message,
        });
      });
    });

    describe("encounters an unknown error", () => {
      it("re-throws the error", async () => {
        const genre = { id: Id.makeId(), name: "Action" };

        const request = {
          body: { name: genre.name },
          params: { id: genre.id },
        };

        const error = "0-0";

        editGenre.mockRejectedValue(error);

        const unknownError = await putGenre(request as any).catch(resolve);

        expect(editGenre).toHaveBeenCalledWith({
          id: genre.id,
          name: genre.name,
        });

        expect(editGenre).toHaveBeenCalledTimes(1);

        expect(logger.error).not.toHaveBeenCalled();

        expect(unknownError).toEqual(error);
      });
    });
  });
});
