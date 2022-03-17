import { NextFunction, Request, Response } from "express";

export interface HttpResponse {
  headers: Record<string, string>;
  body: object | string;
  statusCode: number;
}

export interface HttpRequest {
  body: Request["body"];
  params: Request["params"];
  query: Request["query"];
  headers: Request["headers"];
}

export type Controller = {
  (httpRequest: HttpRequest): Promise<HttpResponse>;
};

export function expressCallBack(controller: Controller) {
  return function (req: Request, res: Response, next: NextFunction) {
    const httpRequest = {
      body: req.body,
      params: req.params,
      query: req.query,
      headers: {
        "Content-Type": req.get("Content-Type"),
        Referer: req.get("Referer"),
      },
    };

    controller(httpRequest)
      .then((httpResponse: HttpResponse) => {
        if (httpResponse.headers) res.set(httpResponse.headers);

        res
          .status(httpResponse.statusCode)
          .send({ message: httpResponse.body });
      })
      .catch((err) => {
        next(err);
      });
  };
}
