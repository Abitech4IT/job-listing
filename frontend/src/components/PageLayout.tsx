import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import React from "react";

export interface PageLayoutProps {
  header?: React.ReactNode;
  title?: string;
}

const PageLayout = (props: PageLayoutProps) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {props.header && (
        <Box
          sx={{
            width: "100%",
          }}
        >
          {props.header}
        </Box>
      )}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: "100%",
          backgroundColor: "primary.main",
          overflow: "auto",
        }}
      >
        <Box
          sx={{
            width: "100%",
            minHeight: "100%",
            px: { xs: 2, sm: 3, md: 10 },
            py: { xs: 2, sm: 3, md: 10 },
            boxSizing: "border-box",
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default PageLayout;
