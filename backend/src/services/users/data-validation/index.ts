import { validateLoginRequest } from "./validate-login-request.service";
import { validateUserSignUpRequest } from "./validate-user-signup-request.service";

const dataValidation = {
  validateUserSignUpRequest,
  validateLoginRequest,
};

export default dataValidation;
