import { Job } from "@models/job.model";

export const deleteJob = async (id: string) => {
  return await Job.findByIdAndDelete(id);
};
