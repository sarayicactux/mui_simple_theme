import axios from "axios";

const LogOut = async (token) => {
  const config = {
    headers: {
      jtoken: token,
    },
  };
  try {
    const { data, status } = await axios.get(
      `${process.env.REACT_APP_HOST}admin/logOut`,
      config
    );
    return { data, status };
  } catch (error) {
    return { data: error.request, status: error.request.status };
  }
};

export default LogOut;
