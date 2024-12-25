import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import { JobSchema } from "../../schema/JobSchema";
import { useCreateJob } from "../../services/jobsAPI";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { ErrorResponse } from "../../types";

const CreatePost = () => {
  const { create } = useCreateJob();
  const navigate = useNavigate();

  return (
    <Box p={0} m={0}>
      <Container
        maxWidth="sm"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          backgroundColor: "#ffffff",
          padding: "20px",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            mb: 3,
            textAlign: "center",
            fontWeight: "bold",
            color: "#333",
          }}
        >
          Create New Job Post
        </Typography>

        <Box
          sx={{
            width: "100%",
            maxWidth: "100%",
            padding: "30px",
          }}
        >
          <Formik
            initialValues={{
              title: "",
              type: "",
              company: "",
              location: "",
              tags: [],
            }}
            validationSchema={JobSchema}
            validateOnChange={false}
            onSubmit={(values, { setSubmitting }) => {
              create(values, {
                onSuccess: () => {
                  toast.success("Job created successful!");
                  navigate("/jobs");
                },
                onError: (error: unknown) => {
                  const err = error as AxiosError<ErrorResponse>;
                  const errorMessage =
                    err.response?.data?.message ||
                    "An unexpected error occurred!";
                  toast.error(errorMessage);
                },
                onSettled: () => {
                  setSubmitting(false);
                },
              });
            }}
          >
            {({ isSubmitting, values, errors, handleChange }) => (
              <Form>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px",
                  }}
                >
                  <Box>
                    <Typography
                      variant="body1"
                      sx={{ mb: 1, fontWeight: "bold" }}
                    >
                      Job Title
                    </Typography>
                    <TextField
                      type="text"
                      size="small"
                      name="title"
                      value={values.title}
                      onChange={handleChange}
                      error={!!errors.title}
                      helperText={errors.title}
                      fullWidth
                    />
                  </Box>
                  <Box>
                    <Typography
                      variant="body1"
                      sx={{ mb: 1, fontWeight: "bold" }}
                    >
                      Company
                    </Typography>
                    <TextField
                      type="text"
                      size="small"
                      name="company"
                      value={values.company}
                      onChange={handleChange}
                      error={!!errors.company}
                      helperText={errors.company}
                      fullWidth
                    />
                  </Box>

                  <Box>
                    <Typography
                      variant="body1"
                      sx={{ mb: 1, fontWeight: "bold" }}
                    >
                      Job Type
                    </Typography>
                    <TextField
                      type="text"
                      size="small"
                      name="type"
                      value={values.type}
                      onChange={handleChange}
                      error={!!errors.type}
                      helperText={errors.type}
                      fullWidth
                    />
                  </Box>

                  <Box>
                    <Typography
                      variant="body1"
                      sx={{ mb: 1, fontWeight: "bold" }}
                    >
                      Location
                    </Typography>
                    <TextField
                      type="text"
                      size="small"
                      name="location"
                      value={values.location}
                      onChange={handleChange}
                      error={!!errors.location}
                      helperText={errors.location}
                      fullWidth
                    />
                  </Box>

                  <Box>
                    <Typography
                      variant="body1"
                      sx={{ mb: 1, fontWeight: "bold" }}
                    >
                      Tags
                    </Typography>
                    <TextField
                      type="text"
                      size="small"
                      name="tags"
                      value={values.tags.join(", ")}
                      onChange={(e) => {
                        const inputValue = e.target.value;
                        handleChange({
                          target: {
                            name: "tags",
                            value: inputValue
                              .split(",")
                              .map((tag) => tag.trim()),
                          },
                        });
                      }}
                      error={!!errors.tags}
                      helperText={
                        errors.tags || "Enter tags separated by commas"
                      }
                      fullWidth
                    />
                  </Box>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    variant="contained"
                    sx={{
                      mt: 2,
                      p: 1.5,
                      borderRadius: "5px",
                      fontSize: "16px",
                      textTransform: "none",
                      backgroundColor: "#5CA5A5",
                      "&:hover": {
                        backgroundColor: "#499393",
                      },
                    }}
                    fullWidth
                  >
                    Submit
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
        </Box>
      </Container>
    </Box>
  );
};

export default CreatePost;
