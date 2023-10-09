// import { Navbar, SideBar } from "../components";
import { useState, useEffect } from "react";
import {
  Box,
  Drawer,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import MenuIcon from "@mui/icons-material/Menu";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";

import { styled, useTheme } from "@mui/material/styles";
import { listNavigation, getNavigationData } from "../utils/listNavigationInfo";

import {shallow} from "zustand/shallow";
import { useNavIndex } from "../store/navIndex";

const drawerWidth = 240;

const getIcon = (iconName) => {
  switch (iconName) {
    default:
    case "persons":
      return <PeopleAltIcon />;
    case "book":
      return <LibraryBooksIcon />;
  }
};

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export const BaseLayout = ({ children }) => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const { navIndex } = useNavIndex(
    (state) => ({
      navIndex: state.navIndex,
    }),
    shallow
  );

  const { changeNavIndex } = useNavIndex();

  useEffect(() => {
    localStorage.setItem("navIndex", JSON.stringify(navIndex));
  }, [navIndex]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

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

      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {getNavigationData(navIndex).navIndex}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {listNavigation.map((value) => (
            <ListItem key={value.id} disablePadding>
              <ListItemButton onClick={() => changeNavIndex(value.id)}>
                <ListItemIcon>{getIcon(value.icon)}</ListItemIcon>
                <ListItemText primary={value.navIndex} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Main open={open} sx={{ paddingLeft: "250px" }}>
        <Box
          component="main"
          disablegutters
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            width: "100%",
            maxWidth: `100%`,
          }}
        >
          <DrawerHeader />
          {children}
        </Box>
      </Main>
    </Box>
  );
};
