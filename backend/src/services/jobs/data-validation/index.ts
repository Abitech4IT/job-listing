import { transformGetJobResponse } from "./transform-get-job-response.service";
import { validateAddJobRequest } from "./validate-add-job-request.service";
import { validateGetAllJobsRequest } from "./validate-gat-jobs-request.service";
import { validateGetJobRequest } from "./validate-get-job-request.service";
import { validateUpdateJobRequest } from "./validate-update-job-request.service";

const dataValidation = {
  transformGetJobResponse,
  validateAddJobRequest,
  validateGetAllJobsRequest,
  validateGetJobRequest,
  validateUpdateJobRequest,
};

export default dataValidation;
