import axios from "axios";

const RecoverPass = async (code, newPassword, recover_pass_token) => {
  const config = {
    headers: {
      recover_pass_token,
    },
  };
  try {
    const { data, status } = await axios.patch(
      `${process.env.REACT_APP_HOST}admin/recoverPass`,
      {
        code,
        newPassword,
      },
      config
    );

    return { data, status };
  } catch (error) {
    return { data: error.request, status: error.request.status };
  }
};

export default RecoverPass;
