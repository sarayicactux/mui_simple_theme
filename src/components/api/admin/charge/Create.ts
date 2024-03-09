import axios from "axios";

const Create = async (token, price, title, description) => {
  const config = {
    headers: {
      jtoken: token,
    },
  };
  try {
    const { data, status } = await axios.post(
      `${process.env.REACT_APP_HOST}admin/charge`,
      {
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

export default Create;
