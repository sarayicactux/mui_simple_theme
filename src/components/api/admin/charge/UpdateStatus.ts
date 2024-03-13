import axios from "axios";

const UpdateStatus = async (token, id, active) => {
  const config = {
    headers: {
      jtoken: token,
    },
  };
  try {
    const { data, status } = await axios.patch(
      `${process.env.REACT_APP_HOST}admin/tariff`,
      { id, status: active },
      config
    );

    return { data, status };
  } catch (error) {
    return { data: error.request, status: error.request.status };
  }
};

export default UpdateStatus;
