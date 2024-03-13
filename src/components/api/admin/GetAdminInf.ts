import axios from "axios";

const GetAdminInf = async (token) => {
 
  const config = {
    headers: {
      jtoken: token,
    },
  };
  try {
    const { data, status } = await axios.get(
      `${process.env.REACT_APP_HOST}admin`,
      config
    );

    return { data, status };
  } catch (error) {
    return { data: error.request, status: error.request.status };
  }
};

export default GetAdminInf;