import axios from "axios";

const UpdatePasswordApi = async (token, oldPassword, newPassword) => {
  const data = {
    oldPassword,
    newPassword,
  };
  const config = {
    headers: {
      jtoken: token,
    },
  };
  try {
    const result = await axios.put(
      `${process.env.REACT_APP_HOST}admin/updatePassword`,
      data,
      config
    );
    return result;
  } catch (error) {
    return error.request;
  }
};

export default UpdatePasswordApi;
