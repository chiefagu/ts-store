/* eslint-disable @typescript-eslint/no-explicit-any */
import { genreModel } from ".";
import { buildFakeGenre } from "../../../__tests__/fixtures";
import { Id } from "../../utils";
import { makeGenreDb } from "./genre-db";

describe("data-access: make genre db", () => {
  const genreDb = makeGenreDb(genreModel);

  describe("findAll", () => {
    it("returns all genres", async () => {
      const genres = [buildFakeGenre(), buildFakeGenre({ name: "Action" })];

      jest.spyOn(genreModel, "find").mockResolvedValueOnce(genres);

      const actual = await genreDb.findAll();

      expect(genreModel.find).toHaveBeenCalledWith(/**nothing */);
      expect(genreModel.find).toHaveBeenCalledTimes(1);

      expect(actual).toEqual(genres);
    });
  });

  describe("findById", () => {
    it("returns a genre with a given id", async () => {
      const genre = buildFakeGenre();

      jest.spyOn(genreModel, "findById").mockResolvedValueOnce(genre);

      const actual = await genreDb.findById(genre._id);

      expect(genreModel.findById).toHaveBeenCalledWith(genre._id);
      expect(genreModel.findById).toHaveBeenCalledTimes(1);

      expect(actual).toEqual(genre);
    });
  });

  describe("findByName", () => {
    it("finds a genre with a given name", async () => {
      const genre = buildFakeGenre();

      jest.spyOn(genreModel, "findOne").mockResolvedValueOnce(genre);

      const actual = await genreDb.findByName(genre.name);

      expect(genreModel.findOne).toHaveBeenCalledWith({ name: genre.name });
      expect(genreModel.findOne).toHaveBeenCalledTimes(1);

      expect(actual).toEqual(genre);
    });
  });

  describe("save a genre", () => {
    it("returns the saved genre", async () => {
      const genreModel = { create: jest.fn() };
      const genreDb = makeGenreDb(genreModel as any);

      const genreInput = { id: Id.makeId(), name: "Action" };

      const genre = buildFakeGenre({ name: genreInput.name });

      genreModel.create.mockResolvedValueOnce(genre);

      const actual = await genreDb.insert(genreInput as any);

      expect(genreModel.create).toHaveBeenCalledWith(genreInput);
      expect(genreModel.create).toHaveBeenCalledTimes(1);

      expect(actual).toEqual(genre);
    });
  });

  describe("update genre", () => {
    it("updates the genre", async () => {
      const genre = buildFakeGenre();

      jest.spyOn(genreModel, "findByIdAndUpdate").mockResolvedValueOnce(genre);

      const actual = await genreDb.update(genre._id, genre);

      expect(genreModel.findByIdAndUpdate).toHaveBeenCalledWith(
        genre._id,
        { $set: genre },
        { new: true }
      );
      expect(genreModel.findByIdAndUpdate).toHaveBeenCalledTimes(1);

      expect(actual).toEqual(genre);
    });
  });

  describe("remove genre", () => {
    it("deletes the genre", async () => {
      const genre = buildFakeGenre();

      jest.spyOn(genreModel, "findByIdAndRemove").mockResolvedValueOnce(genre);

      const actual = await genreDb.remove(genre._id);

      expect(genreModel.findByIdAndRemove).toHaveBeenCalledWith(genre._id);
      expect(genreModel.findByIdAndRemove).toHaveBeenCalledTimes(1);

      expect(actual).toEqual(genre);
    });
  });
});
