import { formatDate } from "@helpers/formatDate";
import { IJob } from "@models/job.model";
import { ObjectId } from "mongodb";
import { z } from "zod";

const objectIdSchema = z.custom<typeof ObjectId>(
  (id) => id instanceof ObjectId,
  { message: "Invalid ObjectId" }
);

const nString = z.string().nullable().catch(null);
const nBoolean = z.boolean().catch(true);
const nDate = z.coerce.date().nullable().catch(null);
const arrString = z.array(nString).nullable().catch(null);

export const transformGetJobResponse = async (
  value: IJob,
  locale: string = "en-NG"
) => {
  try {
    const response = await responseSchema.safeParseAsync(value);

    if (!response.success) {
      console.error("Error transforming job:", response.error.format());
      return null;
    }

    // Format the postDate using the formatDate function
    const formattedResponse = {
      ...response.data,
      postDate: response.data.postDate
        ? formatDate(response.data.postDate, locale)
        : null,
      createdAt: response.data.createdAt?.toISOString() || null,
    };

    return formattedResponse;
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
  company: nString,
  imageUrl: nString,
  tags: arrString,
  postDate: nDate,
  createdAt: nDate,
});
