import { IJob, Job } from "@models/job.model";

type requestBodyTypes = {
  title: string;
  type: string;
  tags: string[];
  location: string;
};

const add = async (requestBody: requestBodyTypes) => {
  const job = await Job.create(requestBody);

  return job;
};

export default add;
