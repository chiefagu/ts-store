/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/*.test.*"],
  moduleDirectories: ["<rootDir>/src", "node_modules"],
  moduleFileExtensions: ["ts", "js", "mjs", "tsx"],
  collectCoverageFrom: ["**/src/**/*.ts"],
  verbose: true,
  clearMocks: true,
  restoreMocks: true,
  resetMocks: true,
};
