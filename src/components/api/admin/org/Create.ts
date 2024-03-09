import axios from "axios";

const Create = async (token, price, title, description) => {
  const config = {
    headers: {
      jtoken: token,
    },
  };
  const data = {
    price,
    title,
    description,
  };
  try {
    const result = await axios.post(
      `${process.env.REACT_APP_HOST}admin/charge`,
      data,
      config
    );

    return result;
  } catch (error) {
    return error.request;
  }
};

export default Create;
