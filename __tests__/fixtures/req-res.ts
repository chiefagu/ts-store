/* eslint-disable @typescript-eslint/no-explicit-any */

export function buildRes(overrides?: Record<string, jest.Mock>) {
  const res: Record<string, jest.Mock> = {
    status: jest.fn(() => res).mockName("status"),
    send: jest.fn(() => res).mockName("send"),
    json: jest.fn(() => res).mockName("json"),
    sendStatus: jest.fn(() => res).mockName("sendStatus"),
  };

  return {
    ...res,
    ...overrides,
  };
}

export function buildReq(overrides = {}) {
  const req = {
    method: "GET",
    url: "/a url",
    params: {},
  };

  return {
    ...req,
    ...overrides,
  };
}
