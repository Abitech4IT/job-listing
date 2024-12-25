import { login } from "./login.controller";
import { logout } from "./logout.controller";
import { signUp } from "./signup.controller";
import { verify } from "./verify-user.controller";

const authController = {
  signUp,
  login,
  logout,
  verify,
};

export default authController;
