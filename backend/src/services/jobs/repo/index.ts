import add from "./add.service";
import { deleteJob } from "./delete-job.service";
import { getJobById } from "./get-one-job.service";
import { update } from "./update-job.service";

const repo = {
  add,
  getJobById,
  update,
  deleteJob,
};

export default repo;
