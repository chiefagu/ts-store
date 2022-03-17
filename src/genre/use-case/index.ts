import { Id } from "../../utils/Id";
import { genreDb } from "../data-access";
import { makeAddGenre } from "./add-genre";
import { makeEditGenre } from "./edit-genre";
import { makeFindGenre } from "./find-genre";
import { makeListGenres } from "./list-genres";
import { makeRemoveGenre } from "./remove-genre";

export const addGenre = makeAddGenre({ genreDb });
export const listGenres = makeListGenres({ genreDb });
export const findGenre = makeFindGenre({ genreDb, Id });
export const editGenre = makeEditGenre({ genreDb, Id });
export const removeGenre = makeRemoveGenre({ genreDb, Id });

export type AddGenre = typeof addGenre;
export type ListGenres = typeof listGenres;
export type FindGenre = typeof findGenre;
export type EditGenre = typeof editGenre;
export type RemoveGenre = typeof removeGenre;
