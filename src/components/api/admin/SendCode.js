import axios from "axios";


const SendCode = async (mobile) => {
  let data = {
    mobile,
  };
  try {
  const result = await axios.put(`${process.env.REACT_APP_HOST}admin/forgetPass`,  data);
  
  return result;
} catch (error) {
  return error.request;
}
};

export default SendCode;
