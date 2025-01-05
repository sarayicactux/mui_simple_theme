import axios from 'axios';

const UpdateStatus = async (id: number, token: string) => {
  const config = {
    headers: {
      unitUserToken: token,
    },
  };
  try {
    const { data, status } = await axios.patch(
      `${process.env.REACT_APP_HOST}unituser/unit/${id}`,
      null,
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

export default UpdateStatus;
