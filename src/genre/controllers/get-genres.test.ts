/* eslint-disable @typescript-eslint/no-explicit-any */
import { buildFakeGenre, resolve } from "../../../__tests__/fixtures";
import { InvalidPropertyError } from "../../utils";
import { makeGetGenres } from "./get-genres";

describe("controllers: get-genres", () => {
  const listGenres = jest.fn();
  const logger = { error: jest.fn() };

  const getGenres = makeGetGenres({ listGenres, logger } as any);

  describe("successfully gets genres", () => {
    it("returns a list of genres", async () => {
      const genres = [buildFakeGenre(), buildFakeGenre({ name: "Action" })];

      const headers = { "Content-Type": "application/json" };

      listGenres.mockResolvedValueOnce(genres);

      const actual = await getGenres();

      expect(listGenres).toHaveBeenCalledWith(/** nothing */);
      expect(listGenres).toHaveBeenCalledTimes(1);

      expect(actual).toMatchObject({
        headers,
        statusCode: 200,
        body: genres,
      });
    });
  });

  describe("failed to gets genres", () => {
    describe("encounters a known error", () => {
      it("returns a 400 status and an error message", async () => {
        const headers = { "Content-Type": "application/json" };

        const error = new InvalidPropertyError("blah");

        listGenres.mockRejectedValueOnce(error);

        const actual = await getGenres();

        expect(listGenres).toHaveBeenCalledWith(/** nothing */);
        expect(listGenres).toHaveBeenCalledTimes(1);

        expect(logger.error).toHaveBeenCalledWith(error.message, error);
        expect(logger.error).toHaveBeenCalledTimes(1);

        expect(actual).toMatchObject({
          headers,
          statusCode: 400,
          body: error.message,
        });
      });
    });
    describe("encounters an unknown error", () => {
      it("re-throws the error", async () => {
        const error = new Error("blah");

        listGenres.mockRejectedValueOnce(error);

        const unknownError = await getGenres().catch(resolve);

        expect(listGenres).toHaveBeenCalledWith(/** nothing */);
        expect(listGenres).toHaveBeenCalledTimes(1);

        expect(logger.error).not.toHaveBeenCalled();

        expect(unknownError).toEqual(error);
      });
    });
  });
});
