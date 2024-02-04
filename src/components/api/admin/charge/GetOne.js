import axios from "axios";

const GetOne = async (token, chargeId) => {
  let config = {
    headers: {
      jtoken: token,
    },
  };
  try {
    const result = await axios.get(
      `${process.env.REACT_APP_HOST}admin/charge/detail/${chargeId}`,
      config
    );

    return result;
  } catch (error) {
    return error.request;
  }
};

export default GetOne;
