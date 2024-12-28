import { Request } from "express";
import { z, ZodIssue } from "zod";

const querySchema = z.object({});

export const validateGetJobRequest = (req: Request): ValidateResponse => {
  const parsedQuery = querySchema.safeParse(req.query);
  const parsedId = z.coerce.string().safeParse(req.params.id);

  if (!parsedQuery.success || !parsedId.success) {
    return [
      null,
      [...(parsedQuery.error?.errors ?? []), ...(parsedId.error?.errors ?? [])],
    ];
  }

  return [{ id: parsedId.data, query: parsedQuery.data }, null];
};

type RequestQuery = z.infer<typeof querySchema>;
type SuccessResponse = { id: string; query: RequestQuery };

export type ValidateResponse = [SuccessResponse, null] | [null, ZodIssue[]];
