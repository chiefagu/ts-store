import { GenreDetails, GenreModel } from ".";

export function makeGenreDb(genreModel: GenreModel) {
  return Object.freeze({
    findAll,
    findById,
    findByName,
    insert,
    update,
    remove,
  });

  async function findAll() {
    return await genreModel.find();
  }

  async function findById(id: string) {
    return await genreModel.findById(id);
  }

  async function findByName(name: string) {
    return await genreModel.findOne({ name });
  }

  async function insert(payload: GenreDetails) {
    return await genreModel.create(payload);
  }

  async function update(id: string, payload: GenreDetails) {
    return await genreModel.findByIdAndUpdate(
      id,
      { $set: payload },
      { new: true }
    );
  }

  async function remove(id: string) {
    return await genreModel.findByIdAndRemove(id);
  }
}
