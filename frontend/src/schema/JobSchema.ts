import * as Yup from "yup";

export const JobSchema = Yup.object().shape({
  title: Yup.string().required("Please enter the job title"),
  type: Yup.string().required("Please enter the job type"),
  tags: Yup.array()
    .of(Yup.string().required("Each tag must be a string"))
    .min(1, "Please enter at least one tag")
    .required("Please enter the job tags"),
  location: Yup.string().required("Please enter your location"),
});
