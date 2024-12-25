import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LoginSchema } from "../../schema/LoginSchema";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useUser } from "../../services/signinAPI";

type ErrorResponse = {
  message: string;
};

const SignIn = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { signin } = useUser();

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
          Log in your account
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
              email: "",
              password: "",
            }}
            validationSchema={LoginSchema}
            validateOnChange={false}
            onSubmit={(values, { setSubmitting }) => {
              signin(values, {
                onSuccess: () => {
                  toast.success("User login successful!");
                  const from = location.state?.from || "/jobs";
                  navigate(from, { replace: true });
                },
                onError: (error: unknown) => {
                  const err = error as AxiosError<ErrorResponse>;
                  const errorMessage =
                    err.response?.data?.message ||
                    err.response?.statusText ||
                    "An unexpected error occurred!";
                  if (err.response?.status === 401) {
                    toast.error("Invalid credentials. Please try again.");
                  } else if (err.response?.status === 429) {
                    toast.error("Too many attempts. Please try again later.");
                  } else {
                    toast.error(errorMessage);
                  }
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
                      Email
                    </Typography>
                    <TextField
                      type="email"
                      size="small"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      error={!!errors.email}
                      helperText={errors.email}
                      fullWidth
                    />
                  </Box>

                  <Box>
                    <Typography
                      variant="body1"
                      sx={{ mb: 1, fontWeight: "bold" }}
                    >
                      Password
                    </Typography>
                    <TextField
                      type="password"
                      size="small"
                      name="password"
                      value={values.password}
                      onChange={handleChange}
                      error={!!errors.password}
                      helperText={errors.password}
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
                  <Typography
                    variant="body2"
                    sx={{
                      mt: 2,
                      textAlign: "center",
                      color: "#5CA5A5",
                    }}
                  >
                    Don't have an account?{" "}
                    <Link
                      to="/signup"
                      style={{
                        textDecoration: "none",
                        color: "#499393",
                        fontWeight: "bold",
                        cursor: "pointer",
                      }}
                    >
                      Sign up here
                    </Link>
                  </Typography>
                </Box>
              </Form>
            )}
          </Formik>
        </Box>
      </Container>
    </Box>
  );
};

export default SignIn;
