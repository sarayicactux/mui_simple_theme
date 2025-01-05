import axios from 'axios';

const Create = async (
  name: string,
  companyId: number | 0,
  phones: string,
  description: string,
  token: string,
) => {
  const config = {
    headers: {
      unitUserToken: token,
    },
  };
  try {
    const { data, status } = await axios.post(
      `${process.env.REACT_APP_HOST}unituser/unit`,
      {
        name,
        companyId,
        phones,
        description,
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

export default Create;
