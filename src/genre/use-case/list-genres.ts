import { GenreDb } from "../data-access";

type ListGenresDeps = {
  genreDb: GenreDb;
};

export function makeListGenres({ genreDb }: ListGenresDeps) {
  return async function ListGenres() {
    const genres = await genreDb.findAll();

    return genres;
  };
}
