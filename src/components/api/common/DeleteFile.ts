import axios from "axios";


const DeleteFile = async (token, id) => {
  const config = {
    headers: {
      jtoken: token,
    },
  };
  try {
  const result = await axios.delete(`${process.env.REACT_APP_HOST}commons/${id}`,  config);
  
  return result;
} catch (error) {
  return false;
}
};

export default DeleteFile;
