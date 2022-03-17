import { InvalidPropertyError } from "../../utils";
import { Id } from "../../utils/Id";
import { GenreDb } from "../data-access";

type RemoveGenreDeps = {
  genreDb: GenreDb;
  Id: Id;
};

export function makeRemoveGenre({ genreDb, Id }: RemoveGenreDeps) {
  return async function removeGenre(id: string) {
    if (!(id && Id.validate(id))) {
      throw new InvalidPropertyError("Invalid id argument");
    }

    const exists = await genreDb.findById(id);

    if (!exists) {
      throw new InvalidPropertyError("no such genre exists");
    }

    return await genreDb.remove(id);
  };
}
