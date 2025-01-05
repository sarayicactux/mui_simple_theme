import axios from 'axios';

const Update = async (
  name: string,
  companyId: number | 0,
  phones: string,
  description: string,
  id: number,
  token: string,
) => {
  const config = {
    headers: {
      unitUserToken: token,
    },
  };
  try {
    const { data, status } = await axios.put(
      `${process.env.REACT_APP_HOST}unituser/unit`,
      {
        name,
        companyId,
        phones,
        description,
        id,
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

export default Update;
