import axios from "axios";

const Update = async (token, id, title, description) => {
  let config = {
    headers: {
      jtoken: token,
    },
  };
  const data = {
    id,
    title,
    description,
  };
  try {
    const result = await axios.put(
      `${process.env.REACT_APP_HOST}admin/charge`,
      data,
      config
    );
    return result;
  } catch (error) {
    return error.request;
  }
};

export default Update;
