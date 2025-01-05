import axios from 'axios';

const Login = async (
  mobile: string,
  password: string,
  fireBaseToken: string = null,
) => {
  try {
    const { data, status } = await axios.post(
      `${process.env.REACT_APP_HOST}company`,
      {
        mobile,
        password,
        fireBaseToken,
      },
    );

    return { data, status };
  } catch (error) {
    return {
      data: (error as any).request,
      status: (error as any).request.status,
    };
  }
};

export default Login;
