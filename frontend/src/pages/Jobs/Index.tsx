import { Avatar, Button, Chip, Paper, Stack, Typography } from "@mui/material";
import JobImage from "../../assets/image/jobImg.svg";
import { useNavigate } from "react-router-dom";

const AllJobs = () => {
  const navigate = useNavigate();

  return (
    <>
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
      <Paper
        sx={{
          padding: "20px",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: { xs: "flex-start", md: "center" },
          gap: "20px",
          borderLeft: "4px solid #5CA5A5",
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
        {/* Job Image */}
        <Avatar
          src={JobImage}
          alt="job image"
          sx={{
            width: { xs: 48, md: 80 },
            height: { xs: 48, md: 80 },
            marginTop: { xs: "-35px", md: 0 },
          }}
        />

        {/* Job Details */}
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
              Photosnap
            </Typography>
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
            Senior Frontend Developer
          </Typography>

          <Stack
            direction="row"
            spacing={2}
            sx={{
              color: "#7C8F8F",
              flexWrap: "wrap",
            }}
          >
            <Typography variant="body2">1d ago</Typography>
            <Typography variant="body2">• Full Time</Typography>
            <Typography variant="body2">• USA only</Typography>
          </Stack>
        </Stack>

        {/* Tags */}
        <Stack
          direction="row"
          spacing={1}
          sx={{
            flexWrap: "wrap",
            gap: 1,
            mt: { xs: 2, md: 0 },
            pt: { xs: 2, md: 0 },
            borderTop: { xs: "1px solid #7C8F8F", md: "none" },
            // opacity: { xs: 0.5, md: 1 },
            width: { xs: "100%", md: "auto" },
          }}
        >
          {["Frontend", "Senior", "HTML", "CSS", "JavaScript"].map((tag) => (
            <Chip
              key={tag}
              label={tag}
              sx={{
                backgroundColor: "hsl(180, 31%, 95%)",
                color: "#5CA5A5",
                fontWeight: "bold",
                margin: "4px",
              }}
            />
          ))}
        </Stack>
      </Paper>
    </>
  );
};

export default AllJobs;
