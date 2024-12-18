import { Job } from "@models/job.model";

export const getJobs = async () => {
  const jobs = await Job.find();
  return jobs;
};
