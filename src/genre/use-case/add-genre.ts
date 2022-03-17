import { makeGenre } from "..";
import { GenreDb, GenreDetails } from "../data-access";

type AddGenreDeps = {
  genreDb: GenreDb;
};

export function makeAddGenre({ genreDb }: AddGenreDeps) {
  return async function addGenre(genreDetails: GenreDetails) {
    const { getName } = makeGenre(genreDetails);

    const exists = await genreDb.findByName(getName());

    if (exists) {
      return exists;
    }

    const genre = await genreDb.insert({ name: getName() });

    return genre;
  };
}
