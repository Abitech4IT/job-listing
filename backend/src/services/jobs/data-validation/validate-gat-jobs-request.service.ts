import { Request } from "express";
import { z, ZodIssue } from "zod";
import { requestBaseSchema } from "./getRequest.service";

const querySchema = z.object({
  ...requestBaseSchema,
  tags: z
    .string()
    .optional()
    .transform((value) =>
      value ? value.split(",").map((tag) => tag.trim()) : []
    ),
});

export const validateGetAllJobsRequest = (req: Request): ValidateResponse => {
  const parsedQuery = querySchema.safeParse(req.query);

  if (!parsedQuery.success) {
    return [null, parsedQuery.error?.errors];
  }

  return [{ query: parsedQuery.data }, null];
};

type RequestQuery = z.infer<typeof querySchema>;
type SuccessResponse = { query: RequestQuery };

export type ValidateResponse = [SuccessResponse, null] | [null, ZodIssue[]];
