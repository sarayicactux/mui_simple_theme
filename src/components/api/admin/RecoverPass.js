import axios from "axios";

const RecoverPass = async (code, newPassword, recover_pass_token) => {
  const data = {
    code,
    newPassword,
  };
  const config = {
    headers: {
      recover_pass_token,
    },
  };
  try {
    const result = await axios.patch(
      `${process.env.REACT_APP_HOST}admin/recoverPass`,
      data,
      config
    );

    return result;
  } catch (error) {
    return error.request;
  }
};

export default RecoverPass;
