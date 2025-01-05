import axios from 'axios';

const RecoverPasswordApi = async (
  token: string,
  code: number,
  newPassword: string,
) => {
  const config = {
    headers: {
      recover_pass_token: token,
    },
  };
  try {
    const { data, status } = await axios.patch(
      `${process.env.REACT_APP_HOST}company/recoverPass`,
      {
        code,
        newPassword,
      },
      config,
    );
    return { data, status };
  } catch (error) {
    return {
      data: (error as any).request,
      status: (error as any).request.status,
    };
  }
};

export default RecoverPasswordApi;
