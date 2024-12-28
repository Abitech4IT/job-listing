import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Box,
  Typography,
  Stack,
} from "@mui/material";
import { Form, Formik } from "formik";
import { JobSchema } from "../schema/JobSchema";
import { useEditJob, useJobById } from "../services/jobsAPI";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { ErrorResponse } from "../types";

interface EditJobModalProps {
  open: boolean;
  onClose: () => void;
  jobId: string | null;
}

const EditJobModal: React.FC<EditJobModalProps> = ({
  open,
  onClose,
  jobId,
}) => {
  const { job, isLoading } = useJobById(jobId ?? "");
  const { editJob } = useEditJob();

  if (!jobId || !job || isLoading) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <Stack
        direction="row"
        sx={{ display: "flex", justifyContent: "flex-end" }}
      >
        <span
          style={{ fontSize: "24px", margin: "10px", cursor: "pointer" }}
          onClick={onClose}
        >
          &times;
        </span>
      </Stack>
      <DialogTitle textAlign="center">Edit Job</DialogTitle>
      <DialogContent>
        {/* <Stack spacing={2} sx={{ mt: 2 }}>
          <TextField
            name="title"
            label="Job Title"
            value={editedJob.title}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            name="company"
            label="Company"
            value={editedJob.company}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            name="location"
            label="Location"
            value={editedJob.location}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            name="type"
            label="Job Type"
            value={editedJob.type}
            onChange={handleInputChange}
            fullWidth
          />
          <Stack direction="row" spacing={1} alignItems="center">
            <TextField
              label="Add Tag"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              fullWidth
            />
            <Button onClick={handleAddTag} variant="contained">
              Add
            </Button>
          </Stack>
          <Stack direction="row" spacing={1} flexWrap="wrap">
            {editedJob.tags.map((tag) => (
              <Chip
                key={tag}
                label={tag}
                onDelete={() => handleRemoveTag(tag)}
                sx={{ margin: "4px" }}
              />
            ))}
          </Stack>
        </Stack> */}
        <Formik
          initialValues={{
            title: job.data.title,
            type: job.data.type,
            company: job.data.company,
            location: job.data.location,
            tags: job.data.tags,
          }}
          enableReinitialize={true}
          validationSchema={JobSchema}
          validateOnChange={false}
          onSubmit={(values, { setSubmitting }) => {
            const updatedData = {
              title: values.title,
              type: values.type,
              company: values.company,
              location: values.location,
              tags: values.tags,
            };
            editJob(
              { id: jobId, updateJob: updatedData },
              {
                onSuccess: () => {
                  toast.success("Job updated successful!");
                  onClose();
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
              }
            );
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
                          value: inputValue.split(",").map((tag) => tag.trim()),
                        },
                      });
                    }}
                    error={!!errors.tags}
                    helperText={errors.tags || "Enter tags separated by commas"}
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
      </DialogContent>
    </Dialog>
  );
};

export default EditJobModal;
