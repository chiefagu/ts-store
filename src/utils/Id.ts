import { isValidObjectId, Types } from "mongoose";

export const Id = {
  makeId: () => new Types.ObjectId().toString(),
  validate: (id: string) => isValidObjectId(id),
};

export type Id = typeof Id;
