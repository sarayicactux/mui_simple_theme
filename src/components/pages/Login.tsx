import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
// import logoPng from "../../assets/assets/img/logo.png";
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Cookies from 'js-cookie';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';


// Api
import LoginApi from '../api/Login';

// redux seters
import { setAuth } from '../redux/reducers/user';
import { RootState } from '../redux/reducers';
import { setMetaData, setIsLoading } from '../redux/reducers/page';


const Wating = () => (
  <CircularProgress size="24px" color="inherit" />

);

const theme = createTheme();
const Login = () => {
  const { firebaseToken } = useSelector((state: RootState) => state.page);

  const [loginBtnText, setLoginBtnText] = useState<string | JSX.Element>('ورود');
  const [password, setPassword] = useState('');
  const [mobile, setMobile] = useState('');
  // redux
  const dispatch = useDispatch();

  // handle change mobile
  const handleChangeMobile = (e) => {
    setMobile(e.target.value);
  };
  // handle change password
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const loginHandler = async (event) => {
    event.preventDefault();

    if (password.length < 3 || mobile.length < 3) {
      setLoginBtnText('شماره موبایل و رمز عبور صحیح نیست');
      setTimeout(() => setLoginBtnText('ورود'), 1500);
      return;
    }
    setLoginBtnText(<Wating />);

    const result = await LoginApi(mobile, password, firebaseToken);
    if (result.status === 200) {

      Cookies.set('transportCompanyUser', result.data.User.jwtToken, { expires: 7 });
      dispatch(
        setAuth({
          token: result.data.User.jwtToken,
          adminInfo: result.data,
          isAuthenticated: true,
        }),
      );
    } else {
      setLoginBtnText('شماره موبایل و رمز عبور صحیح نیست');
      setTimeout(() => setLoginBtnText('ورود'), 1500);
    }
  };

  React.useEffect(() => {
    dispatch(
      setMetaData({
        title: 'weighbridge :: ورود',
        description: 'ورود',
      }),
    );
    setTimeout(() => dispatch(setIsLoading(false)), 300);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <div className="p-5">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            ورود به پنل مدیریت
          </Typography>
          <Box
            component="form"
            onSubmit={loginHandler}
            noValidate
            sx={{ mt: 1, width: '340px' }}
          >
            <TextField
              dir="ltr"
              margin="normal"
              required
              fullWidth
              onChange={handleChangeMobile}
              id="mobile"
              label="شماره موبایل "
              name="mobile"
              autoFocus
            />
            <TextField
              dir="ltr"
              margin="normal"
              required
              fullWidth
              onChange={handleChangePassword}
              name="password"
              label="رمز عبور"
              type="password"
              id="password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {loginBtnText}
            </Button>
          </Box>
        </Box>
      </div>
    </ThemeProvider>
  );
};

export default Login;
