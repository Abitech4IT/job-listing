import { Request } from "express";
import { z, ZodIssue } from "zod";

const rString = z.string().trim().min(1);
const arrString = z.array(rString);

const bodySchema = z.object({
  title: rString,
  type: rString,
  tags: arrString,
  location: rString,
});

export const validateAddJobRequest = (req: Request): ValidateResponse => {
  const parsedBody = bodySchema.safeParse(req.body);

  if (!parsedBody.success) {
    return [null, [...(parsedBody.error?.errors ?? [])]];
  }

  return [{ body: parsedBody.data }, null];
};

type RequestBody = z.infer<typeof bodySchema>;
type SuccessResponse = { body: RequestBody };

export type ValidateResponse = [SuccessResponse, null] | [null, ZodIssue[]];
