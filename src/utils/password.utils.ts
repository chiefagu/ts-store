import { pbkdf2Sync } from "crypto";
import config from "config";

const salt = config.get<string>("salt");
const iterations = config.get("environment") === "development" ? 1 : 1000;

export function getHash(password: string) {
  return pbkdf2Sync(password, salt, iterations, 512, "sha512").toString("hex");
}

export function comparePassword(hash: string, password: string) {
  return (
    hash ===
    pbkdf2Sync(password, salt, iterations, 512, "sha512").toString("hex")
  );
}

export type GetHash = typeof getHash;
export type ComparePassword = typeof comparePassword;
