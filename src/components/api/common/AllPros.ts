import axios from "axios";

const AllPros = async () => {
  try {
    // const result = await axios.get(`${process.env.REACT_APP_HOST}commons/states`);
    const { data, status } = await axios.get(
      `https://api.meshirt.ir/commons/states`
    );
    return { data, status };
  } catch (error) {
    return { status: error.response.status };
  }
};

export default AllPros;
