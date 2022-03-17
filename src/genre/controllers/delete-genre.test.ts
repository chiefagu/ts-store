/* eslint-disable @typescript-eslint/no-explicit-any */
import { resolve } from "../../../__tests__/fixtures";
import { Id, InvalidPropertyError } from "../../utils";
import { makeDeleteGenre } from "./delete-genre";

describe("delete-genre controller", () => {
  const removeGenre = jest.fn();
  const logger = { error: jest.fn() };
  const headers = { "Content-Type": "application/json" };

  const deleteGenre = makeDeleteGenre({ removeGenre, logger } as any);

  describe("successfully deletes a genre", () => {
    it("responds with a 200 status code and the deleted genre", async () => {
      const genre = { id: Id.makeId(), name: "Drama" };

      const request = {
        params: {
          id: genre.id,
        },
      };

      removeGenre.mockResolvedValue(genre);

      const result = await deleteGenre(request as any);

      expect(removeGenre).toHaveBeenCalledWith(genre.id);
      expect(removeGenre).toHaveBeenCalledTimes(1);

      expect(result).toEqual({
        headers,
        statusCode: 200,
        body: genre,
      });
    });
  });

  describe("failed to delete genre", () => {
    describe("encounters a know error", () => {
      it("responds with the 400 status code and an error message", async () => {
        const genre = { id: Id.makeId(), name: "Drama" };

        const request = {
          params: {
            id: genre.id,
          },
        };
        const error = new InvalidPropertyError("bad");

        removeGenre.mockRejectedValue(error);

        const result = await deleteGenre(request as any);

        expect(removeGenre).toHaveBeenCalledWith(genre.id);
        expect(removeGenre).toHaveBeenCalledTimes(1);

        expect(logger.error).toHaveBeenCalledWith(error.message, error);
        expect(logger.error).toHaveBeenCalledTimes(1);

        expect(result).toEqual({
          headers,
          statusCode: 400,
          body: error.message,
        });
      });
    });

    describe("encounters an unknown error", () => {
      it("rethrows the error", async () => {
        const genre = { id: Id.makeId(), name: "Drama" };

        const request = {
          params: {
            id: genre.id,
          },
        };
        const error = "unknown";

        removeGenre.mockRejectedValue(error);

        const rethrownError = await deleteGenre(request as any).catch(resolve);

        expect(removeGenre).toHaveBeenCalledWith(genre.id);
        expect(removeGenre).toHaveBeenCalledTimes(1);

        expect(logger.error).not.toHaveBeenCalled();

        expect(rethrownError).toEqual(error);
      });
    });
  });
});
