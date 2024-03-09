import axios from "axios";

const LogOut = async (token) => {
  const config = {
    headers: {
      jtoken: token,
    },
  };
  try {
    const result = await axios.get(
      `${process.env.REACT_APP_HOST}admin/logOut`,
      config
    );
    return result;
  } catch (error) {
    return false;
  }
};

export default LogOut;
