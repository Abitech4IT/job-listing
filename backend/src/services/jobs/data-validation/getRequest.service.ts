import { z } from "zod";

const nNumber = z.coerce.number().optional().catch(undefined);
const nString = z.string().optional().catch(undefined);
const arrString = z
  .string()
  .optional()
  .transform((e) =>
    e == null
      ? []
      : e
          .toString()
          .split(",")
          .map((e) => e.trim())
  )
  .optional();

export const requestBaseSchema = {
  sort: nString,
  searchStrings: arrString,
  _id: nString,
};
const schema = z.object(requestBaseSchema);

export type GetRequestParams = z.infer<typeof schema>;
