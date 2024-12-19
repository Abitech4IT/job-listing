import { Job } from "@models/job.model";

export const getJobs = async (queryObj: Record<string, any>) => {
  const queryParams = { ...queryObj };

  const sortParam = queryParams.sort;

  //Filtering
  const excludedFields = ["page", "sort", "limit", "fields"];
  excludedFields.forEach((field) => delete queryParams[field]);

  for (const key in queryParams) {
    if (Array.isArray(queryParams[key]) && queryParams[key].length > 0) {
      queryParams[key] = { $in: queryParams[key] };
    } else if (Array.isArray(queryParams[key])) {
      delete queryParams[key];
    }
  }

  let query = Job.find(queryParams);

  // Sorting
  if (sortParam) {
    const sortCriteria = sortParam.split(",").join(" ");
    query = query.sort(sortCriteria);
  } else {
    query = query.sort("-createdAt");
  }

  const jobs = await query;
  return jobs;
};
