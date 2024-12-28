import {
  Avatar,
  Button,
  Chip,
  Paper,
  Stack,
  Typography,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import JobImage from "../../assets/image/jobImg.svg";
import { useNavigate } from "react-router-dom";
import { useDeleteJob, useJobs } from "../../services/jobsAPI";
import { JobsResponse } from "../../types";
import { useUser } from "../../services/signinAPI";
import { useState } from "react";
import EditJobModal from "../../components/EditJobModal";
import ConfirmDialog from "../../components/ConfirmDialog";

const AllJobs = () => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [jobIdToDelete, setJobIdToDelete] = useState<string | null>(null);
  const { jobs, isLoading } = useJobs({ tags: selectedTags });
  const { user } = useUser();
  const { deleteJob, isLoading: isDeleting } = useDeleteJob();

  const navigate = useNavigate();

  const jobsRes: JobsResponse | undefined = jobs;

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const clearTags = () => {
    setSelectedTags([]);
  };

  const handleEdit = (jobId: string) => {
    if (!jobId) {
      console.error("Invalid jobId:", jobId);
      return;
    }
    setSelectedJobId(jobId);
    setEditModalOpen(true);
  };

  const handleDelete = (jobId: string) => {
    setJobIdToDelete(jobId);
    setOpenDialog(true);
  };

  const handleConfirmDelete = () => {
    if (jobIdToDelete) {
      deleteJob(jobIdToDelete);
    }
    setOpenDialog(false);
    setJobIdToDelete(null);
  };

  const handleCancelDelete = () => {
    setOpenDialog(false);
    setJobIdToDelete(null);
  };

  const handleCloseModal = () => {
    setEditModalOpen(false);
    setSelectedJobId(null);
  };

  const renderSelectedTags = () => {
    if (selectedTags.length === 0) return null;

    return (
      <Paper
        sx={{
          padding: { xs: "10px", md: "20px" },
          marginBottom: "24px",
          backgroundColor: "white",
          boxShadow: "0px 15px 20px -5px rgba(13, 113, 130, 0.15)",
          borderRadius: "5px",
          position: "relative",
          top: { xs: "-110px", md: "-150px" },
          width: "100%",
          maxWidth: { xs: "calc(100% - 32px)", md: "100%" },
          margin: { xs: "0 16px", md: 0 },
          zIndex: 1,
        }}
        elevation={0}
      >
        <Stack
          direction="row"
          sx={{
            flexWrap: "wrap",
            gap: { xs: "12px", md: "16px" },
            alignItems: "center",
            justifyContent: "space-between",
            position: "relative",
            minHeight: { xs: "40px", md: "auto" },
          }}
        >
          <Stack
            direction="row"
            sx={{
              flexWrap: "wrap",
              gap: "12px",
              flex: 1,
              width: { xs: "calc(100% - 60px)", md: "auto" },
              paddingRight: { xs: "60px", md: 0 },
            }}
          >
            {selectedTags.map((tag) => (
              <Chip
                key={tag}
                label={tag}
                onDelete={() => toggleTag(tag)}
                sx={{
                  backgroundColor: "hsl(180, 31%, 95%)",
                  color: "#5CA5A5",
                  fontWeight: 700,
                  fontSize: { xs: "12px", md: "13px" },
                  height: { xs: "32px", md: "32px" },
                  borderRadius: "4px",
                  flex: { xs: "0 1 auto", md: "0 0 auto" },
                  maxWidth: { xs: "calc(50% - 6px)", md: "none" },
                  minWidth: { xs: "80px", md: "auto" },
                  "& .MuiChip-label": {
                    padding: "0 8px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  },
                  "& .MuiChip-deleteIcon": {
                    color: "#5CA5A5",
                    fontSize: { xs: "16px", md: "20px" },
                    marginRight: "8px",
                    marginLeft: "-4px",
                    "&:hover": {
                      color: "#2B3939",
                    },
                  },
                  "&:hover": {
                    backgroundColor: "#2B3939",
                    color: "white",
                    "& .MuiChip-deleteIcon": {
                      color: "white",
                    },
                  },
                }}
              />
            ))}
          </Stack>
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: "13px",
              color: "#7C8F8F",
              cursor: "pointer",
              position: { xs: "absolute", md: "relative" },
              top: { xs: "16px", md: "auto" },
              right: { xs: "16px", md: "0" },
              "&:hover": {
                color: "#5CA5A5",
                textDecoration: "underline",
              },
            }}
            onClick={clearTags}
          >
            Clear
          </Typography>
        </Stack>
      </Paper>
    );
  };

  const renderJobList = () => {
    if (isLoading) {
      return (
        <Stack alignItems="center" mt={4}>
          <Typography fontSize={16} fontWeight="bold">
            Loading...
          </Typography>
        </Stack>
      );
    }

    if (
      !jobs ||
      !jobs.data ||
      !Array.isArray(jobs.data) ||
      jobs.data.length === 0
    ) {
      console.log("No jobs condition met:", {
        jobsExists: !!jobs,
        dataExists: jobs && !!jobs.data,
        isArray: jobs && jobs.data && Array.isArray(jobs.data),
        length: jobs?.data?.length,
      });
      return (
        <Typography variant="h6" textAlign="center" mt={4}>
          No jobs found
        </Typography>
      );
    }

    return jobsRes?.data.map((item) => (
      <Paper
        key={item._id}
        sx={{
          padding: "20px",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: { xs: "flex-start", md: "center" },
          gap: "20px",
          borderLeft: item.postDate === "Today" ? "4px solid #5CA5A5" : "none",
          marginBottom: 3,
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          position: "relative",
          "&::after": {
            content: '""',
            position: { xs: "absolute", md: "unset" },
            bottom: { xs: -1, md: "unset" },
            left: 0,
            width: { xs: "100%", md: "unset" },
            height: { xs: "1px", md: "unset" },
            backgroundColor: { xs: "#7C8F8F", md: "transparent" },
            opacity: 0.5,
          },
        }}
      >
        <Avatar
          src={JobImage}
          alt="job image"
          sx={{
            width: { xs: 48, md: 80 },
            height: { xs: 48, md: 80 },
            marginTop: { xs: "-35px", md: 0 },
          }}
        />

        <Stack
          spacing={1}
          sx={{
            flexGrow: 1,
            width: { xs: "100%", md: "auto" },
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            flexWrap="wrap"
          >
            <Typography
              variant="h6"
              sx={{
                fontSize: "16px",
                fontWeight: "bold",
                color: "#5CA5A5",
              }}
            >
              {item.company}
            </Typography>
            {item.postDate === "Today" && (
              <Chip
                label="NEW!"
                sx={{
                  fontSize: "10px",
                  fontWeight: "bold",
                  color: "white",
                  backgroundColor: "#5CA5A5",
                  height: 22,
                  borderRadius: 10,
                }}
              />
            )}
            {item.postDate === "Today" && (
              <Chip
                label="FEATURED"
                sx={{
                  fontSize: "10px",
                  fontWeight: "bold",
                  color: "white",
                  backgroundColor: "black",
                  height: 22,
                  borderRadius: 10,
                }}
              />
            )}
          </Stack>

          <Typography
            variant="h5"
            sx={{
              fontSize: "18px",
              fontWeight: "bold",
              cursor: "pointer",
              "&:hover": { color: "#5CA5A5" },
            }}
          >
            {item.title}
          </Typography>

          <Stack
            direction="row"
            spacing={2}
            sx={{
              color: "#7C8F8F",
              flexWrap: "wrap",
            }}
          >
            <Typography variant="body2">{item.postDate}</Typography>
            <Typography variant="body2">• {item.type}</Typography>
            <Typography variant="body2">• {item.location}</Typography>
          </Stack>
        </Stack>

        <Stack
          direction="row"
          spacing={1}
          sx={{
            flexWrap: "wrap",
            gap: 1,
            mt: { xs: 2, md: 0 },
            pt: { xs: 2, md: 0 },
            borderTop: { xs: "1px solid #7C8F8F", md: "none" },
            width: { xs: "100%", md: "auto" },
          }}
        >
          {Array.isArray(item.tags) &&
            item.tags.map((tag) => (
              <Chip
                key={tag}
                label={tag}
                onClick={() => toggleTag(tag)}
                sx={{
                  backgroundColor: selectedTags.includes(tag)
                    ? "#5CA5A5"
                    : "hsl(180, 31%, 95%)",
                  color: selectedTags.includes(tag) ? "white" : "#5CA5A5",
                  fontWeight: "bold",
                  cursor: "pointer",
                  margin: "4px",
                }}
              />
            ))}
        </Stack>
        {user?.role === "admin" && (
          <Stack direction="row" spacing={1} sx={{ ml: "auto" }}>
            <IconButton onClick={() => handleEdit(item._id!)} color="secondary">
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => handleDelete(item._id!)} color="error">
              <DeleteIcon />
            </IconButton>
          </Stack>
        )}
      </Paper>
    ));
  };

  return (
    <>
      {user?.role === "admin" && (
        <Stack
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
          p={2}
        >
          <Button
            variant="contained"
            sx={{
              mt: 2,
              p: 1,
              borderRadius: "5px",
              fontSize: "16px",
              textTransform: "none",
              backgroundColor: "#5CA5A5",
              "&:hover": {
                backgroundColor: "#499393",
              },
            }}
            onClick={() => navigate("/jobs/create")}
          >
            Add New Post
          </Button>
        </Stack>
      )}
      {renderSelectedTags()}
      {renderJobList()}
      <EditJobModal
        open={editModalOpen}
        onClose={handleCloseModal}
        jobId={selectedJobId}
      />
      <ConfirmDialog
        openDialog={openDialog}
        handleCancelDelete={handleCancelDelete}
        handleConfirmDelete={handleConfirmDelete}
        isDeleting={isDeleting}
      />
    </>
  );
};

export default AllJobs;
