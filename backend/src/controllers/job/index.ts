import { add } from "./add.controller";
import { deleteJob } from "./delete.controller";
import { getAll } from "./get-jobs.controller";
import { getOne } from "./get-one-job.controller";
import { update } from "./update.controller";

const jobController = {
  add,
  getAll,
  getOne,
  update,
  deleteJob,
};

export default jobController;
