import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import React from 'react';

import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ExitToApp from '@mui/icons-material/ExitToApp';
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import FactoryIcon from '@mui/icons-material/Factory';
import Collapse from '@mui/material/Collapse';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


// import APIs

// redux seters
import { RootState } from './../../../redux/reducers';

function TopNav(props) {
  // redux hooks
  const { auth } = useSelector((state: RootState) => state.userAuth);
  const token = auth.token;

  const location = useLocation();
  const logOut = props.logOut;
  const [openFilter, setOpenFilter] = React.useState(false);
  const [openTransport, setOpenTransport] = React.useState(false);
  const [openLoadings, setOpenLoadings] = React.useState(false);
  const openMenu = props.Open;

  const styleList = !openMenu
    ? { alignItems: 'center', display: 'contents' }
    : { alignItems: '', display: '' };

  const selectedMenu = (route) => {
    return location.pathname === route ? `panel-link-row` : null;
  };
  const handleClickFilter = () => {
    setOpenFilter(!openFilter);
  };
  const handleClickTransport = () => {
    setOpenTransport(!openTransport);
  };
  const handleClickLoadings = () => {
    setOpenLoadings(!openLoadings);
  };

  // catch data **************************************************

  React.useEffect(() => {
  }, []);
  return (
    <>
      {' '}
      <List
        sx={{
          width: '100%',
          maxWidth: 360,
          bgcolor: 'background.paper',
        }}
        component="nav"
        dir="ltr"
        aria-labelledby="nested-list-subheader"
      >
        <Link to="/" className="panel-link">
          <ListItemButton className={selectedMenu('/')}>
            {openMenu ? <ListItemText primary="خانه" /> : ''}
            <ListItemIcon style={styleList}>
              <HomeIcon className="ms-auto" />
            </ListItemIcon>
          </ListItemButton>
        </Link>
        <Link to="/froms" className="panel-link">
          <ListItemButton className={selectedMenu('/forms')}>
            {openMenu ? <ListItemText primary="فرم ها" /> : ''}
            <ListItemIcon style={styleList}>
              <SettingsIcon className="ms-auto" />
            </ListItemIcon>
          </ListItemButton>
        </Link>

        <ListItemButton onClick={handleClickTransport}>
          {openMenu ? (
            openTransport ? (
              <ExpandLessIcon />
            ) : (
              <ExpandMoreIcon />
            )
          ) : (
            ''
          )}
          {openMenu ? <ListItemText primary="المنت های صفحه" /> : ''}

          <ListItemIcon style={styleList}>
            <LocalShippingIcon className="ms-auto" />
          </ListItemIcon>
        </ListItemButton>
        {openMenu ? (
          <Collapse in={openTransport} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <Link to="/datagrid" className="panel-link">
                <ListItemButton
                  sx={{ pr: 4 }}
                  className={selectedMenu('/datagrid')}
                >
                  <ListItemText>
                    <div className="sub-menu"> دیتا گرید</div>
                  </ListItemText>
                </ListItemButton>
              </Link>
              <Link to="/modal" className="panel-link">
                <ListItemButton
                  sx={{ pr: 4 }}
                  className={selectedMenu('/modal')}
                >
                  <ListItemText>
                    <div className="sub-menu"> مودال</div>
                  </ListItemText>
                </ListItemButton>
              </Link>

            </List>
          </Collapse>
        ) : (
          ''
        )}
        <ListItemButton className="text-danger" onClick={logOut}>
          {openMenu ? <ListItemText primary="خروج" /> : ''}

          <ListItemIcon style={styleList}>
            <ExitToApp className="ms-auto text-danger" />
          </ListItemIcon>
        </ListItemButton>
      </List>
    </>
  );
}

export default TopNav;
