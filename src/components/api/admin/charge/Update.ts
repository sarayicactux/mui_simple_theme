import axios from "axios";

const Update = async (token, id, price, title, description) => {
  const config = {
    headers: {
      jtoken: token,
    },
  };
  try {
    const { data, status } = await axios.put(
      `${process.env.REACT_APP_HOST}admin/tariff`,
      {
        id,
        price,
        title,
        description,
      },
      config
    );
    return { data, status };
  } catch (error) {
    return { data: error.request, status: error.request.status };
  }
};

export default Update;
