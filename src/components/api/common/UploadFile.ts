import axios from "axios";
interface ServerResponse {
  data: ServerData;
}

interface ServerData {
  id: number;
}
const UploadFile = async (token, formData) => {
  const config = {
    headers: {
      jtoken: token,
      "Content-Type": "multipart/form-data",
    },
  };
  try {
    const { data, status } = await axios.post<ServerData>(
      `${process.env.REACT_APP_HOST}commons/uploadFile`,
      formData,
      config
    );
    return { data, status };
  } catch (error) {
    return { data: error.request, status: error.request.status };
  }
};

export default UploadFile;
