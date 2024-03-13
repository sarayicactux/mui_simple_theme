import axios from "axios";

const GetAll = async (token) => {
  try {
    const { data, status } = await axios.get(
      `${process.env.REACT_APP_HOST}admin/tariff`,
      {
        params: {},
        headers: {
          jtoken: token,
        },
      }
    );
    return { data, status };
  } catch (error) {
    return { data: error.request, status: error.request.status };
  }
};

export default GetAll;
