import React from 'react';
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

// redux seters
import { setAuth } from '../redux/reducers/admin';
import { setMetaData, setIsLoading } from '../redux/reducers/page';

const theme = createTheme();
const Login = () => {
  const [btnText, setBtnText] = React.useState('ورود');
  const usernameRef = React.useRef(null);
  const passwordRef = React.useRef(null);
  // redux
  const dispatch = useDispatch();

  const loginHandler = async (event) => {
    event.preventDefault();
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;
    if (password.length < 3 || username.length < 3) {
      setBtnText('نام کاربری و رمز عبور صحیح نیست');
      setTimeout(() => setBtnText('ورود'), 1500);
      return;
    }

    dispatch(setIsLoading(true));
    Cookies.set('weighbridgeAdmin', 'result.data.jwtToken', { expires: 7 });
    dispatch(
      setAuth({
        token: 'result.data.jwtToken',
        adminInfo: { info: 'result.data' },
        isAuthenticated: true,
      }),
    );
    dispatch(setIsLoading(false));
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
              inputRef={usernameRef}
              id="username"
              label="نام کاربری"
              name="username"
              autoFocus
            />
            <TextField
              dir="ltr"
              margin="normal"
              required
              fullWidth
              inputRef={passwordRef}
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
              {btnText}
            </Button>
          </Box>
        </Box>
      </div>
    </ThemeProvider>
  );
};

export default Login;
