import { NextFunction, Request, Response } from "express";

export type HttpMethod = "get" | "post" | "put" | "delete";
export const HttpMethod = {
  GET: "get" as const,
  POST: "post" as const,
  PUT: "put" as const,
  DELETE: "delete" as const,
} as const;
export interface Controller {
  getHandler(): (
    request: Request,
    response: Response,
    next: NextFunction
  ) => Promise<void>;

  getMiddlewares?(): Array<
    (request: Request, response: Response, next: NextFunction) => void
  >;
  getPath(): string;
  getMethod(): HttpMethod;
}

