import { Request } from "express";
import { z, ZodIssue } from "zod";

const rString = z.string().trim().min(1);
const roleEnum = z.enum(["user", "admin"]).default("user");

const bodySchema = z.object({
  email: rString,
  password: rString,
  firstName: rString,
  lastName: rString,
  role: roleEnum,
});

export const validateUserSignUpRequest = (req: Request): ValidateResponse => {
  const parsedBody = bodySchema.safeParse(req.body);

  if (!parsedBody.success) {
    return [null, [...(parsedBody.error?.errors ?? [])]];
  }

  return [{ body: parsedBody.data }, null];
};

type RequestBody = z.infer<typeof bodySchema>;
type SuccessResponse = { body: RequestBody };

export type ValidateResponse = [SuccessResponse, null] | [null, ZodIssue[]];
