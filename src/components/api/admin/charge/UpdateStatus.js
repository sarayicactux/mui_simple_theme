import axios from "axios";

const UpdateStatus = async (token, id, active) => {
  let config = {
    headers: {
      jtoken: token,
    },
  };
  try {
    const result = await axios.patch(
      `${process.env.REACT_APP_HOST}admin/charge`,
      { id, active },
      config
    );

    return result;
  } catch (error) {
    return error.request;
  }
};

export default UpdateStatus;
