import { Id } from "../../src/utils";

export function buildFakeGenre(overrides = {}) {
  return {
    _id: Id.makeId(),
    name: "Comedy",
    ...overrides,
  };
}
