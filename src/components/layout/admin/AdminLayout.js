import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import Cookies from "js-cookie";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import { CacheProvider } from "@emotion/react";
import Link from "@mui/material/Link";
import createCache from "@emotion/cache";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";

// import Badge from "@mui/material/Badge";
import Container from "@mui/material/Container";
// import Link from "@mui/material/Link";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

// redux seters
import { setLogOut } from "../../redux/reducers/admin";

// import NotificationsIcon from "@mui/icons-material/Notifications";
import Menu from "./Menu";
import LogOut from "../../api/admin/LogOut";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    anchor: "left",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));
const ContainerMain = styled(Container, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ open }) => ({
  marginLeft: 80,
  minWidth: `calc(100% - 80px)`,
  ...(open && {
    minWidth: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  }),
}));

const theme = createTheme({
  direction: "rtl", // Both here and <body dir="rtl">
});
// Create rtl cache
const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

function AdminLayout(props) {
  // const [openSpeed, setOpenSpeed] = React.useState(false);
  // const handleOpen = () => setOpenSpeed(!openSpeed);
  // const handleClose = () => setOpenSpeed(!openSpeed);

  const [open, setOpen] = React.useState(true);

  // redux
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state.adminAuth);

  const token = auth.token;
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const logOut = () => {
    LogOut(token);
    Cookies.remove("messengerAdminAdmin");
    dispatch(setLogOut());
  };
  // const actions = [
  //   {
  //     icon: <ExitToApp className="text-danger" onClick={logOut} />,
  //     name: "خروج از سیستم",
  //   },
  //   {
  //     icon: <PasswordIcon onClick={handleOpenModal} />,
  //     name: "ویرایش رمز ورود ورود",
  //   },
  //   // { icon: <PrintIcon />, name: 'Print' },
  //   // { icon: <ShareIcon />, name: 'Share' },
  // ];

  return (
    <CacheProvider value={cacheRtl}>
      {/* <Backdrop open={openSpeed} onClick={handleClose} /> */}
      <ThemeProvider theme={theme}>
        <div dir="rtl">
          <Box
            sx={{
              display: "flex",
              flexDirection: "row-reverse",
              textAlign: "right !important",
            }}
          >
            <CssBaseline />
            <AppBar position="absolute" open={open}>
              <Toolbar
                sx={{
                  pr: "24px", // keep right padding when drawer closed
                }}
              >
                <IconButton
                  edge="start"
                  color="inherit"
                  aria-label="open drawer"
                  onClick={toggleDrawer}
                  sx={{
                    marginRight: "-15px",
                    ...(open && { display: "none" }),
                  }}
                >
                  <MenuIcon />
                </IconButton>
                <Link
                  href="/"
                  className="no-hover"
                  underline="none"
                  color="inherit"
                  sx={{ color: "white" }}
                >
                  <Typography
                    component="h1"
                    variant="h6"
                    color="inherit"
                    className="me-4"
                    noWrap
                    sx={{ flexGrow: 1 }}
                  >
                    پنل مدیریت
                  </Typography>
                </Link>
              </Toolbar>
            </AppBar>

            <Drawer variant="permanent" open={open} className="menuBig">
              <Toolbar
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  px: [1],
                }}
              >
                <IconButton onClick={toggleDrawer}>
                  <ChevronRightIcon />
                </IconButton>
              </Toolbar>
              <Divider />

              <Menu Open={open} logOut={logOut} />
            </Drawer>
            <Box
              component="main"
              sx={{
                backgroundColor: (theme) =>
                  theme.palette.mode === "light"
                    ? theme.palette.grey[100]
                    : theme.palette.grey[900],
                flexGrow: 1,
                height: "100vh",
                overflow: "auto",
              }}
            >
              <Toolbar />
              <ContainerMain open={open} theme={theme}>
                <div className="col-12 dash-content mt-2">
                  {" "}
                  {props.children}
                </div>
              </ContainerMain>
            </Box>
          </Box>
        </div>
      </ThemeProvider>
      {/* <SpeedDial
        ariaLabel="دسترسی سریع"
        sx={{ position: "absolute", bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
        // onClose={handleClose}
        onClick={handleOpen}
        open={openSpeed}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            tooltipOpen
            onClick={handleClose}
          />
        ))}
      </SpeedDial> */}
    </CacheProvider>
  );
}

export default AdminLayout;
