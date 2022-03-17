/* eslint-disable @typescript-eslint/no-explicit-any */
import { buildFakeGenre, resolve } from "../../../__tests__/fixtures";
import { InvalidPropertyError } from "../../utils";
import { makePostGenre } from "./post-genre";

describe("controllers: post genre", () => {
  const logger = { error: jest.fn() };
  const addGenre = jest.fn();

  const postGenre = makePostGenre({ addGenre, logger } as any);

  describe("successfully posts a genre", () => {
    it("returns a genre to the user", async () => {
      const genre = buildFakeGenre();
      const headers = { "Content-Type": "application/json" };

      addGenre.mockResolvedValueOnce(genre);

      const actual = await postGenre({ body: genre } as any);

      expect(addGenre).toHaveBeenCalledTimes(1);
      expect(addGenre).toHaveBeenCalledWith(genre);

      expect(actual).toEqual({
        headers,
        statusCode: 201,
        body: genre,
      });
    });
  });

  describe("failed to post a genre", () => {
    describe("encounters a known error", () => {
      it("responds with 400 status code and an error message", async () => {
        const genre = buildFakeGenre();
        const headers = { "Content-Type": "application/json" };

        const error = new InvalidPropertyError("oh no!");

        addGenre.mockRejectedValueOnce(error);

        const actual = await postGenre({ body: genre } as any);

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

        const error = "oh no!";

        addGenre.mockRejectedValueOnce(error);

        const unknownError = await postGenre({ body: genre } as any).catch(
          resolve
        );

        expect(logger.error).not.toHaveBeenCalled();

        expect(unknownError).toBeDefined();
        expect(unknownError).toEqual(error);
      });
    });
  });
});
