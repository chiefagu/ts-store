/* eslint-disable @typescript-eslint/no-explicit-any */
import { buildReq, buildRes } from "../../__tests__/fixtures/req-res";
import { makeRequireUser } from "./require-user";

describe("middleware: require user", () => {
  const logger = { log: jest.fn() };
  const requireUser = makeRequireUser(logger as any);

  describe("user object is missing from request", () => {
    it("responds with a 403 message", () => {
      const req = buildReq();
      const res = buildRes();
      const next = jest.fn();

      requireUser(req as any, res as any, next);

      expect(logger.log).toHaveBeenCalledTimes(1);
      expect(logger.log.mock.calls[0]).toMatchInlineSnapshot(`
        Array [
          "error",
          "missing jwt payload",
        ]
      `);

      expect(res.sendStatus).toHaveBeenCalledTimes(1);
      expect(res.sendStatus).toHaveBeenCalledWith(403);
    });
  });

  describe("user object is present on request", () => {
    it("calls next", () => {
      const payload = { _id: "id" };
      const req = buildReq({ jwtPayload: payload });
      const res = buildRes();
      const next = jest.fn();

      requireUser(req as any, res as any, next);

      expect(logger.log).not.toHaveBeenCalled();

      expect(res.sendStatus).not.toHaveBeenCalled();

      expect(next).toHaveBeenCalledTimes(1);
      expect(next).toHaveBeenCalledWith(/** nothing */);
    });
  });
});
