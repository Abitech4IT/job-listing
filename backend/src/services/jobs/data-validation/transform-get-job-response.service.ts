import { IJob } from "@models/job.model";
import { ObjectId } from "mongodb";
import { z } from "zod";

const objectIdSchema = z.custom<typeof ObjectId>(
  (id) => id instanceof ObjectId,
  { message: "Invalid ObjectId" }
);

const nString = z.string().nullable().catch(null);
const nDate = z.coerce.date().nullable().catch(null);
const arrString = z.array(nString).nullable().catch(null);

export const transformGetJobResponse = async (value: IJob) => {
  try {
    const response = await responseSchema.safeParseAsync(value);

    if (!response.success) {
      console.error("Error transforming job:", response.error.format());
      return null;
    }

    return response.data; // Keep _id as ObjectId
  } catch (error) {
    console.error("Unexpected error during transformation:", error);
    return null;
  }
};

const responseSchema = z.object({
  _id: objectIdSchema,
  title: nString,
  type: nString,
  location: nString,
  imageUrl: nString,
  tags: arrString,
  createdAt: nDate,
});
