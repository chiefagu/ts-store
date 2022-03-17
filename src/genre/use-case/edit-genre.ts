import { makeGenre } from "..";
import { InvalidPropertyError } from "../../utils";
import { Id } from "../../utils/Id";
import { GenreDb, GenreDetails } from "../data-access";

type EditGenreDeps = {
  genreDb: GenreDb;
  Id: Id;
};

export function makeEditGenre({ genreDb, Id }: EditGenreDeps) {
  return async function editGenre({ id, name }: GenreDetails & { id: string }) {
    if (!(id && Id.validate(id))) {
      throw new InvalidPropertyError("Invalid argument for id");
    }

    const exists = await genreDb.findById(id);

    if (!exists) {
      throw new InvalidPropertyError("no such genre exists");
    }

    const { getName } = makeGenre({ name });

    const genre = await genreDb.update(id, {
      name: getName(),
    });

    return genre;
  };
}
