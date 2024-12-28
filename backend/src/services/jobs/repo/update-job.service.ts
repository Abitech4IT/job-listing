import { Job } from "@models/job.model";

type requestBodyTypes = {
  title?: string;
  type?: string;
  company?: string;
  tags?: string[];
  location?: string;
};

export const update = async (id: string, data: requestBodyTypes) => {
  const updatedJob = await Job.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
  return updatedJob;
};
