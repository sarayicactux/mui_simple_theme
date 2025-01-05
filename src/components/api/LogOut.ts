import axios from 'axios';

const LogOut = async (token) => {
  const config = {
    headers: {
      unitUserToken: token,
    },
  };
  try {
    const { data, status } = await axios.get(
      `${process.env.REACT_APP_HOST}company/logOut`,
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

export default LogOut;
