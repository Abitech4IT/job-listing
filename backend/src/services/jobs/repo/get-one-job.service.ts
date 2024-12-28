import { Job } from "@models/job.model";

export const getJobById = async (id: string) => {
  return await Job.findById(id);
};
