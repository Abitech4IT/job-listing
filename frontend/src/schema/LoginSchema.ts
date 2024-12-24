import * as Yup from "yup";

export const LoginSchema = Yup.object().shape({
  email: Yup.string().email().required("Please enter a valid email"),
  password: Yup.string().required("Please enter a valid email"),
});
