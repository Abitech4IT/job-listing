import { Button, Stack } from "@mui/material";

const BackgroundImage = () => {
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
        <Button variant="outlined">Logout</Button>
      </Stack>
    </div>
  );
};

export default BackgroundImage;
