import { Request } from "express";

import { IUserDocument } from "@models/user.model";

export interface CustomRequest extends Request {
  user?: IUserDocument;
}
