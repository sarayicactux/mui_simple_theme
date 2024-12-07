import React from 'react';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import logo from '../../../assets/image/logo.png';

const HeaderMobile = (props) => {
  return (
    <div className="row sticky-top header pt-2 pb-2">
      <div className="col-3 text-right my-auto">
        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          className="me-1"
          noWrap
          sx={{ flexGrow: 1, color: 'white' }}
        >
          {/* <MenuIcon onClick={() => props.setIsOpenMobileMenu(true)} /> */}
        </Typography>
      </div>
      <div className="col-6 text-center my-auto"></div>
      <div className="col-3 text-left">
        <img src={logo} className="rounded-circle" width={52} alt="logo" />
      </div>
    </div>
  );
};
export default HeaderMobile;
