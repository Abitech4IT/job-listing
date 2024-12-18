import dataValidation from "./data-validation";
import { getJobs } from "./get-jobs.service";
import repo from "./repo";

const jobService = {
  dataValidation,
  getJobs,
  repo,
};

export default jobService;
