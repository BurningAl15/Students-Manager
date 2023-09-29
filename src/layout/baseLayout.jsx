// import { Navbar, SideBar } from "../components";
import { Box } from "@mui/material";

// const drawerWidth = 240;

export const BaseLayout = ({ children }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        mt: 2,
      }}
    >
      {/* Navbar drawerWidth*/}
      {/* <Navbar drawerWidth={drawerWidth} /> */}

      {/* Sidebar drawerWidth*/}
      {/* <SideBar drawerWidth={drawerWidth} /> */}

      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, display: "flex", flexDirection: "column" }}
      >
        {/* Toolbar */}

        {children}
      </Box>
    </Box>
  );
};
