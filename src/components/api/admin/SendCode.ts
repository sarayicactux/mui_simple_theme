import axios from "axios";


const SendCode = async (mobile) => {

  try {
    const { data, status } = await axios.put(
      `${process.env.REACT_APP_HOST}admin/forgetPass`,
      {
        mobile,
      }
    );

    return { data, status };
  } catch (error) {
    return { data: error.request, status: error.request.status };
  }
};

export default SendCode;
