import { InvalidPropertyError } from "../utils";
import { GenreDetails } from "./data-access";

export function buildGenre() {
  return function makeGenre({ name }: GenreDetails) {
    if (!name) {
      throw new InvalidPropertyError("You must supply a name");
    }

    if (name.length <= 2) {
      throw new InvalidPropertyError(
        "too short, name must be 3 characters or more"
      );
    }

    if (name.length > 30) {
      throw new InvalidPropertyError(
        "too long, name must be 30 characters or less"
      );
    }

    return Object.freeze({
      getName: () => name,
    });
  };
}
