/* eslint-disable @typescript-eslint/no-explicit-any */
import { buildReq, buildRes } from "../../__tests__/fixtures/req-res";
import { makeNotFoundHandler } from "./not-found.middleware";

describe("middleware: not-found handler", () => {
  const logger = { log: jest.fn() };

  const notFoundHandler = makeNotFoundHandler(logger as any);

  it("responds with a 404 and a message", () => {
    const res = buildRes();
    const req = buildReq();

    notFoundHandler(req as any, res as any);

    expect(logger.log).toHaveBeenCalledTimes(1);
    expect(logger.log.mock.calls).toMatchInlineSnapshot(`
      Array [
        Array [
          "error",
          "Could not GET /a url",
        ],
      ]
    `);

    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(404);

    expect(res.send).toHaveBeenCalledTimes(1);
    expect(res.send.mock.calls[0][0]).toMatchInlineSnapshot(`
      Object {
        "message": "Could not GET /a url",
      }
    `);
  });
});
