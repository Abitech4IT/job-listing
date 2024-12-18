import { transformGetJobResponse } from "./transform-get-job-response.service";
import { validateAddJobRequest } from "./validate-add-job-request.service";
import { validateGetAllJobsRequest } from "./validate-gat-jobs-request.service";

const dataValidation = {
  transformGetJobResponse,
  validateAddJobRequest,
  validateGetAllJobsRequest,
};

export default dataValidation;
