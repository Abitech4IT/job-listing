import { Button, Stack } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { baseURL } from "../constant";

const BackgroundImage = () => {
  const navigate = useNavigate();

  const { mutate: logout } = useMutation({
    mutationFn: async () => {
      return await axios.get(`${baseURL}/auth/logout`, {
        withCredentials: true,
      });
    },
    onSuccess: () => {
      navigate("/signin");
    },
  });

  return (
    <div
      style={{
        backgroundImage: `url('public/background.svg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "156px",
        width: "100%",
      }}
    >
      <Stack
        direction="row"
        justifyContent="flex-end"
        alignItems="center"
        p={2}
      >
        <Button
          variant="outlined"
          sx={{ textTransform: "capitalize" }}
          onClick={() => logout()}
        >
          Logout
        </Button>
      </Stack>
    </div>
  );
};

export default BackgroundImage;
