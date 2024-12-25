import { Request } from "express";

import { IUserDocument } from "@models/user.model";

export interface CustomRequest extends Request {
  user?: IUserDocument;
}

export interface DecodedToken {
  id: string;
  iat?: number;
  exp?: number;
}
