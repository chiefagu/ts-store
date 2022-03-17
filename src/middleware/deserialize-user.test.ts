/* eslint-disable @typescript-eslint/no-explicit-any */
import { buildRes } from "../../__tests__/fixtures/req-res";
import { makeDeserializeUser } from "./deserialize-user";
import config from "config";

describe("middleware: deserialize user", () => {
  const verifyJwt = jest.fn();
  const reIssueAccessToken = jest.fn();
  const logger = { warn: jest.fn() };

  const deserializeUser = makeDeserializeUser({
    verifyJwt,
    reIssueAccessToken,
    logger,
  } as any);

  describe("request is missing access token", () => {
    it("responds with 400 and a message", async () => {
      const res = buildRes();
      const req = { get: jest.fn() };
      const next = jest.fn();

      // const accessToken = 'ATK'
      // const refreshToken = 'RTK'

      req.get.mockReturnValueOnce(null);

      deserializeUser(req as any, res as any, next as any);

      expect(res.status).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(400);

      expect(res.json).toHaveBeenCalledTimes(1);
      expect(res.json.mock.calls[0]).toMatchInlineSnapshot(`
        Array [
          Object {
            "message": "Missing access token",
          },
        ]
      `);

      expect(next).not.toHaveBeenCalled();
      expect(verifyJwt).not.toHaveBeenCalled();
    });
  });

  describe("request contains an expired access-token and no refresh-token", () => {
    it("responds with 401 and a message", async () => {
      const res = buildRes();
      const req = { get: jest.fn() };
      const next = jest.fn();

      const accessToken = "expired";
      const refreshToken = null;

      req.get.mockReturnValueOnce(accessToken);
      req.get.mockReturnValueOnce(refreshToken);

      verifyJwt.mockReturnValueOnce({
        decode: null,
        expired: true,
        valid: false,
      });

      deserializeUser(req as any, res as any, next as any);

      expect(res.status).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(401);

      expect(res.json).toHaveBeenCalledTimes(1);
      expect(res.json.mock.calls[0]).toMatchInlineSnapshot(`
        Array [
          Object {
            "message": "Expired access token. Seems you are missing a refresh token",
          },
        ]
      `);

      expect(verifyJwt).toHaveBeenCalled();
      expect(verifyJwt).toHaveBeenCalledWith({
        token: accessToken,
        secret: config.get("accessKey"),
      });

      expect(next).not.toHaveBeenCalled();
    });
  });

  describe("request has an invalid access-token", () => {
    it("responds with 401 and a message", async () => {
      const res = buildRes();
      const req = { get: jest.fn() };
      const next = jest.fn();

      const accessToken = "expired";
      const refreshToken = null;

      req.get
        .mockReturnValueOnce(accessToken)
        .mockReturnValueOnce(refreshToken);

      verifyJwt.mockReturnValueOnce({
        decode: null,
        expired: false,
        valid: true,
      });

      deserializeUser(req as any, res as any, next as any);

      expect(res.status).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(401);

      expect(res.json).toHaveBeenCalledTimes(1);
      expect(res.json.mock.calls[0]).toMatchInlineSnapshot(`
        Array [
          Object {
            "message": "Invalid access token",
          },
        ]
      `);

      expect(verifyJwt).toHaveBeenCalled();
      expect(verifyJwt).toHaveBeenCalledWith({
        token: accessToken,
        secret: config.get("accessKey"),
      });

      expect(logger.warn.mock.calls[0]).toMatchInlineSnapshot(`
        Array [
          "deserialize-user: Invalid access token",
        ]
      `);

      expect(next).not.toHaveBeenCalled();
    });
  });

  describe("request has an expired access-token and a valid refresh token", () => {
    describe("fails to generates a new token", () => {
      it("responds with 500 and a message", async () => {
        const res = buildRes({ setHeader: jest.fn() });
        const req = { get: jest.fn(), jwtPayload: null };
        const next = jest.fn();

        const accessToken = "ATK";
        const refreshToken = "RTK";

        req.get
          .mockReturnValueOnce(accessToken)
          .mockReturnValueOnce(refreshToken);

        const payload = { _id: "id" };

        verifyJwt
          .mockReturnValueOnce({
            decoded: true,
            expired: true,
            valid: false,
          })
          .mockReturnValueOnce({
            decoded: payload,
            expired: true,
            valid: false,
          });

        reIssueAccessToken.mockResolvedValueOnce(null);

        await deserializeUser(req as any, res as any, next as any);

        expect(verifyJwt).toHaveBeenCalledWith({
          token: accessToken,
          secret: config.get("accessKey"),
        });

        expect(verifyJwt).toHaveBeenCalledTimes(1);
        expect(verifyJwt).toHaveBeenCalledWith({
          token: accessToken,
          secret: expect.any(String),
        });

        expect(reIssueAccessToken).toHaveBeenCalledTimes(1);
        expect(reIssueAccessToken).toHaveBeenCalledWith(refreshToken);

        expect(res.status).toHaveBeenCalledTimes(1);
        expect(res.status).toHaveBeenCalledWith(500);

        expect(res.json).toHaveBeenCalledTimes(1);
        expect(res.json.mock.calls[0][0]).toMatchInlineSnapshot(`
          Object {
            "message": "something went wrong",
          }
        `);

        expect(res.setHeader).not.toHaveBeenCalled();

        expect(req.jwtPayload).toBeNull();

        expect(next).not.toHaveBeenCalled();
      });
    });

    describe("successfully generated a new token", () => {
      it("calls next", async () => {
        const res = buildRes({ setHeader: jest.fn() });
        const req = { get: jest.fn(), jwtPayload: null };
        const next = jest.fn();

        const accessToken = "ATK";
        const refreshToken = "RTK";
        const newToken = "new";

        req.get
          .mockReturnValueOnce(accessToken)
          .mockReturnValueOnce(refreshToken);

        const payload = { _id: "id" };

        verifyJwt
          .mockReturnValueOnce({
            decoded: true,
            expired: true,
            valid: false,
          })
          .mockReturnValueOnce({
            decoded: payload,
            expired: true,
            valid: false,
          });

        reIssueAccessToken.mockResolvedValueOnce(newToken);

        await deserializeUser(req as any, res as any, next as any);

        expect(res.status).not.toHaveBeenCalled();
        expect(res.json).not.toHaveBeenCalled();

        expect(verifyJwt).toHaveBeenCalledWith({
          token: accessToken,
          secret: config.get("accessKey"),
        });
        expect(logger.warn).not.toHaveBeenCalled();

        expect(verifyJwt).toHaveBeenCalledTimes(2);

        expect(reIssueAccessToken).toHaveBeenCalledTimes(1);
        expect(reIssueAccessToken).toHaveBeenCalledWith(refreshToken);

        expect(res.setHeader).toHaveBeenCalledTimes(1);
        expect(res.setHeader).toHaveBeenCalledWith("x-access-token", newToken);

        expect(req.jwtPayload).toEqual(payload);

        expect(next).toHaveBeenCalledTimes(1);
        expect(next).toHaveBeenCalledWith(/** nothing */);
      });
    });
  });

  describe("request token was successfully decoded", () => {
    it("attach the decoded data to the request and calls next", async () => {
      const res = buildRes({ setHeader: jest.fn() });
      const req = { get: jest.fn(), jwtPayload: null };
      const next = jest.fn();

      const accessToken = "ATK";
      const refreshToken = "RTK";
      const newToken = "new";

      req.get
        .mockReturnValueOnce(accessToken)
        .mockReturnValueOnce(refreshToken);

      const payload = { _id: "id" };

      verifyJwt.mockReturnValueOnce({
        decoded: payload,
        expired: false,
        valid: true,
      });

      reIssueAccessToken.mockResolvedValueOnce(newToken);

      await deserializeUser(req as any, res as any, next as any);

      expect(res.status).not.toHaveBeenCalled();
      expect(res.json).not.toHaveBeenCalled();

      expect(verifyJwt).toHaveBeenCalledWith({
        token: accessToken,
        secret: config.get("accessKey"),
      });
      expect(verifyJwt).toHaveBeenCalledTimes(1);

      expect(logger.warn).not.toHaveBeenCalled();

      expect(reIssueAccessToken).not.toHaveBeenCalled();

      expect(res.setHeader).not.toHaveBeenCalled();

      expect(req.jwtPayload).toEqual(payload);

      expect(next).toHaveBeenCalledTimes(1);
      expect(next).toHaveBeenCalledWith(/** nothing */);
    });
  });
});
