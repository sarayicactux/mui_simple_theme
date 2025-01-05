// @ts-nocheck
import React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import { Outlet, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useSelector, useDispatch } from 'react-redux';

import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';

// import Badge from "@mui/material/Badge";
import Container from '@mui/material/Container';
// import Link from "@mui/material/Link";
import MenuIcon from '@mui/icons-material/Menu';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

// import NotificationsIcon from "@mui/icons-material/Notifications";
import TopNav from './TopNav';
import MobileMenu from './MobileMenu';
import Footer from '../../common/Footer';
import HeaderMobile from '../../common/HeaderMobile';
import { FromInt } from '../../../helpers/NumberTools';

// redux seters
import { setAuth } from '../../../redux/reducers/user';
import { RootState } from '../../../redux/reducers';

import PageSize from '../../../helpers/PageSize';

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  '& .MuiDrawer-paper': {
    anchor: 'left',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: 'border-box',
    ...(!open && {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9),
      },
    }),
  },
}));
const ContainerMain = styled(Container, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ open }) => ({
  marginLeft: 80,
  minWidth: `calc(100% - 80px)`,
  ...(open && {
    minWidth: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  }),
}));

const theme = createTheme({
  direction: 'rtl', // Both here and <body dir="rtl">
});
// Create rtl cache
const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});

// import Header from "../../common/Header";

function PublicLayout() {
  const navigate = useNavigate();

  // const { height, width } = PageSize();
  const { width } = PageSize();
  // redux hooks
  const { auth } = useSelector((state: RootState) => state.userAuth);
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(true);
  const [mobileView, setMobileView] = React.useState(false);
  const [isOpenMobileMenu, setIsOpenMobileMenu] = React.useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };
  const logOut = () => {
    Cookies.remove('transportCompanyUser');
    dispatch(
      setAuth({
        token: null,
        adminInfo: null,
        isAuthenticated: false,
      }),
    );
    navigate('/');
  };
  React.useEffect(() => {
    width < 768 ? setMobileView(true) : setMobileView(false);
  }, [width]);
  return (
    <>
      {mobileView ? (
        <>
          <MobileMenu
            setIsOpenMobileMenu={setIsOpenMobileMenu}
            isOpenMobileMenu={isOpenMobileMenu}
            logOut={logOut}
          />
          <div className="container-fluid d-md-none d-block" id="page-wrap">
            <div className="row">
              <div className="col-12 ">
                <HeaderMobile setIsOpenMobileMenu={setIsOpenMobileMenu} />
                <div className="row">
                  <div className="col-sm-1 d-sm-block d-none"></div>
                  <div className="col-12 col-sm-10 mt-2 mb-5 pb-5" dir="rtl">
                    <CacheProvider value={cacheRtl}>
                      <Outlet />
                    </CacheProvider>
                  </div>
                  <div className="col-sm-1 d-sm-block d-none"></div>
                </div>
              </div>
            </div>
            <Footer logOut={logOut} setIsOpenMobileMenu={setIsOpenMobileMenu} />
          </div>
        </>
      ) : (
        <div className="d-md-block d-none">
          <CacheProvider value={cacheRtl}>
            <ThemeProvider theme={theme}>
              <div dir="rtl">
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row-reverse',
                    textAlign: 'right !important',
                  }}
                >
                  <CssBaseline />
                  <AppBar className="fixed fixed-top" open={open}>
                    <Toolbar
                      sx={{
                        pr: '24px', // keep right padding when drawer closed
                      }}
                    >
                      <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={toggleDrawer}
                        sx={{
                          marginRight: '-15px',
                          ...(open && { display: 'none' }),
                        }}
                      >
                        <MenuIcon />
                      </IconButton>
                      <div className="col-6">

                      </div>
                    </Toolbar>
                  </AppBar>

                  <Drawer variant="permanent" open={open} className="menuBig">
                    <Toolbar
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        px: [1],
                      }}
                    >
                      <IconButton onClick={toggleDrawer}>
                        <ChevronRightIcon />
                      </IconButton>
                    </Toolbar>
                    <Divider />

                    <TopNav Open={open} logOut={logOut} />
                  </Drawer>
                  <Box
                    component="main"
                    sx={{
                      backgroundColor: '#fff',
                      flexGrow: 1,
                      height: '100vh',
                    }}
                  >
                    <ContainerMain open={open} theme={theme}>
                      <div className="row  justify-content-center dash-content mt-5 pt-5">
                        <Outlet />
                      </div>
                    </ContainerMain>
                  </Box>
                </Box>
              </div>
            </ThemeProvider>
          </CacheProvider>
        </div>
      )}
    </>
  );
}

export default PublicLayout;
