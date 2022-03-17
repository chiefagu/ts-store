import { logger } from "../../logger";
import {
  addGenre,
  editGenre,
  findGenre,
  listGenres,
  removeGenre,
} from "../use-case";
import { makeDeleteGenre } from "./delete-genre";
import { makeGetGenre } from "./get-genre";
import { makeGetGenres } from "./get-genres";
import { makePostGenre } from "./post-genre";
import { makePutGenre } from "./put-genre";

export const postGenre = makePostGenre({ addGenre, logger });
export const getGenres = makeGetGenres({ listGenres, logger });
export const getGenre = makeGetGenre({ findGenre, logger });
export const putGenre = makePutGenre({ editGenre, logger });
export const deleteGenre = makeDeleteGenre({ removeGenre, logger });

export type PostGenre = typeof postGenre;
export type GetGenres = typeof getGenres;
export type PutGenre = typeof putGenre;
export type DeleteGenre = typeof deleteGenre;
