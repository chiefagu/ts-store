import { Document, model, Schema } from "mongoose";
import { makeGenreDb } from "./genre-db";

export interface GenreDetails {
  name: string | null;
}

export interface GenreDocument extends Document, GenreDetails {}

export const genreSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 30,
  },
});

export const genreModel = model<GenreDocument>("Genre", genreSchema);
export const genreDb = makeGenreDb(genreModel);

export type GenreDb = typeof genreDb;
export type GenreModel = typeof genreModel;
