/* eslint-disable @typescript-eslint/no-explicit-any */
import { buildRes } from "../../__tests__/fixtures/req-res";
import { makeErrorHandler } from "./error.middleware";

describe("middleware: errorHandler", () => {
  const logger = { error: jest.fn() };

  const errorHandler = makeErrorHandler(logger as any);

  it("logs the error, returns a 500 code and message", () => {
    const err = new Error("666");

    const res = buildRes();

    errorHandler(err, res as any);

    expect(logger.error).toHaveBeenCalledTimes(1);
    expect(logger.error.mock.calls[0]).toMatchInlineSnapshot(`
      Array [
        "666",
        [Error: 666],
      ]
    `);

    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(500);

    expect(res.send).toHaveBeenCalledTimes(1);
    expect(res.send.mock.calls[0][0]).toMatchInlineSnapshot(`
      Object {
        "message": "Something went wrong",
      }
    `);
  });
});
