import { UserModel } from ".";
import { UserDetails } from "../user";

export function makeUserDb(userModel: UserModel) {
  return Object.freeze({
    findByEmail,
    findById,
    insert,
    update,
    remove,
  });

  async function findByEmail(email: string) {
    return await userModel.findOne({ email });
  }
  async function findById(id: string) {
    return await userModel.findById(id);
  }
  async function insert(payload: UserDetails) {
    return await userModel.create(payload);
  }
  async function update(id: string, payload: UserDetails) {
    return await userModel.findByIdAndUpdate(
      id,
      { $set: payload },
      { new: true }
    );
  }
  async function remove(id: string) {
    return await userModel.findByIdAndRemove(id);
  }
}
