import { InvalidPropertyError } from "../utils";

export interface UserDetails {
  name: string;
  email: string;
  password: string;
}

export function buildUser() {
  return function makeUser({ name, email, password }: UserDetails) {
    if (!name) {
      throw new InvalidPropertyError("You must supply a name");
    }

    if (name.length <= 2) {
      throw new InvalidPropertyError(
        "too short, name must be 3 characters or more"
      );
    }

    if (name.length > 20) {
      throw new InvalidPropertyError(
        "too long, name must be 20 characters or less"
      );
    }

    if (!email) {
      throw new InvalidPropertyError("You must supply an email");
    }

    if (!password) {
      throw new InvalidPropertyError("You must supply a password");
    }

    if (password.length <= 5) {
      throw new InvalidPropertyError(
        "too short, password must be 6 characters or more"
      );
    }

    if (password.length > 30) {
      throw new InvalidPropertyError(
        "too long, password must be 30 characters or less"
      );
    }

    return Object.freeze({
      getName: () => name,
      getEmail: () => email,
      getPassword: () => password,
    });
  };
}
