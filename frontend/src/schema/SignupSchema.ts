import * as Yup from "yup";

export const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(3, "Minimum of 3 characters.")
    .required("First Name is required"),
  lastName: Yup.string()
    .min(3, "Minimum of 3 characters.")
    .required("Last Name is required"),
  email: Yup.string().email().required("Please enter a valid email"),
  password: Yup.string().required("Please enter a valid email"),
});
