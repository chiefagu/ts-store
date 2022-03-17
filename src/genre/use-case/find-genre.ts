import { InvalidPropertyError } from "../../utils";
import { Id } from "../../utils/Id";
import { GenreDb } from "../data-access";

type FindGenreDeps = {
  genreDb: GenreDb;
  Id: Id;
};

export function makeFindGenre({ genreDb, Id }: FindGenreDeps) {
  return async function findGenre(id: string) {
    if (!(id && Id.validate(id))) {
      throw new InvalidPropertyError("You must supply a valid id");
    }

    const genre = await genreDb.findById(id);

    if (!genre) {
      throw new InvalidPropertyError("no genre found");
    }

    return genre;
  };
}
