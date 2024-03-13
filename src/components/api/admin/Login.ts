import axios from "axios";

const Login = async (username, password) => {
  try {
    const { data, status } = await axios.post(
      `${process.env.REACT_APP_HOST}admin`,
      {
        username,
        password,
      }
    );

    return { data, status };
  } catch (error) {
    return { data: error.request, status: error.request.status };
  }
};

export default Login;
