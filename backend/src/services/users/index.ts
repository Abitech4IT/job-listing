import auth from "./auth.helpers.service";
import dataValidation from "./data-validation";
import repo from "./repo.helper.service";

const userService = {
  auth,
  dataValidation,
  repo,
};

export default userService;
