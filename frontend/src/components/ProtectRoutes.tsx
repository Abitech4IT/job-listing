import { ReactNode, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useUser } from "../services/signinAPI";
import { CircularProgress, Box } from "@mui/material";

type ProtectRoutesProps = {
  children: ReactNode;
};

const ProtectRoutes = ({ children }: ProtectRoutesProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoading, user } = useUser();

  useEffect(() => {
    if (!isLoading && !user) {
      navigate("/signin", {
        state: { from: location.pathname },
        replace: true,
      });
    }
  }, [user, isLoading, navigate, location]);

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (user) {
    return <>{children}</>;
  }

  return null;
};

export default ProtectRoutes;
