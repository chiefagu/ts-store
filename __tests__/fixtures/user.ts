import { Id } from "../../src/utils";

export function buildFakeUser(overrides?: object) {
  const user = {
    _id: Id.makeId(),
    name: "James",
    email: "james@email.com",
    password: "12345678",
  };

  return {
    ...user,
    ...overrides,
  };
}
