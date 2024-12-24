import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import { SignupSchema } from "../../schema/SignupSchema";
import { Link } from "react-router-dom";

const SignUp = () => {
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
          Sign up your account
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
              firstName: "",
              lastName: "",
              email: "",
              password: "",
            }}
            validationSchema={SignupSchema}
            onSubmit={(values, { setSubmitting }) => {
              console.log(values);
              setSubmitting(false); // For now, to prevent spamming
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
                  {/* First Name */}
                  <Box>
                    <Typography
                      variant="body1"
                      sx={{ mb: 1, fontWeight: "bold" }}
                    >
                      First Name
                    </Typography>
                    <TextField
                      type="text"
                      size="small"
                      name="firstName"
                      value={values.firstName}
                      onChange={handleChange}
                      error={!!errors.firstName}
                      helperText={errors.firstName}
                      fullWidth
                    />
                  </Box>

                  {/* Last Name */}
                  <Box>
                    <Typography
                      variant="body1"
                      sx={{ mb: 1, fontWeight: "bold" }}
                    >
                      Last Name
                    </Typography>
                    <TextField
                      type="text"
                      size="small"
                      name="lastName"
                      value={values.lastName}
                      onChange={handleChange}
                      error={!!errors.lastName}
                      helperText={errors.lastName}
                      fullWidth
                    />
                  </Box>

                  {/* Email */}
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

                  {/* Password */}
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

                  {/* Submit Button */}
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
                    Already have an account?{" "}
                    <Link
                      to="/signin"
                      style={{
                        textDecoration: "none",
                        color: "#499393",
                        fontWeight: "bold",
                        cursor: "pointer",
                      }}
                    >
                      Log in here
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

export default SignUp;
