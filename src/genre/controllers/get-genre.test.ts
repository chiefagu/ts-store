/* eslint-disable @typescript-eslint/no-explicit-any */
import { buildFakeGenre, resolve } from "../../../__tests__/fixtures";
import { InvalidPropertyError } from "../../utils";
import { makeGetGenre } from "./get-genre";

describe("controllers: get single genre", () => {
  const logger = { error: jest.fn() };
  const findGenre = jest.fn();

  const getGenre = makeGetGenre({ findGenre, logger } as any);

  describe("successfully gets a single genre", () => {
    it("returns a genre", async () => {
      const genre = buildFakeGenre();

      const headers = { "Content-Type": "application/json" };

      const request = {
        body: { name: genre.name },
        params: { id: genre._id },
      };

      findGenre.mockResolvedValueOnce(genre);

      const actual = await getGenre(request as any);

      expect(findGenre).toHaveBeenCalledWith(request.params.id);
      expect(findGenre).toHaveBeenCalledTimes(1);

      expect(actual).toMatchObject({
        headers,
        statusCode: 200,
        body: genre,
      });
    });
  });

  describe("failed to get one genre", () => {
    describe("encounters a known error", () => {
      it("returns a 400 status and an error message", async () => {
        const genre = buildFakeGenre();

        const headers = { "Content-Type": "application/json" };

        const error = new InvalidPropertyError("blah");

        const request = {
          body: { name: genre.name },
          params: { id: genre._id },
        };

        findGenre.mockRejectedValueOnce(error);

        const actual = await getGenre(request as any);

        expect(findGenre).toHaveBeenCalledWith(request.params.id);
        expect(findGenre).toHaveBeenCalledTimes(1);

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
        const genre = buildFakeGenre();

        const error = new Error("blah");

        findGenre.mockRejectedValueOnce(error);

        const request = {
          body: { name: genre.name },
          params: { id: genre._id },
        };

        const unknownError = await getGenre(request as any).catch(resolve);

        expect(findGenre).toHaveBeenCalledWith(request.params.id);
        expect(findGenre).toHaveBeenCalledTimes(1);

        expect(logger.error).not.toHaveBeenCalled();

        expect(unknownError).toEqual(error);
      });
    });
  });
});
