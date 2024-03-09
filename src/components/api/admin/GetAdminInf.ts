// import axios from "axios";

const GetAdminInf = async (token) => {
  return {
    data: {
      id: 1,
      username: "admin",
      name: "admin",
      lastName: "admin",
      mobile: "01",
      email: "sfsdfsffs@ss.co",
      roleId: 1,
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjoxLCJ0eXBlIjoiYWRtaW4iLCJpYXQiOjE3MDY0NTc0NTQsImV4cCI6MTczNzk5MzQ1NH0.Xct0BGJrEWKYsBSdHTCMKYNHVEVBkw2XtRhvd_kIZAs",
      avatar: null,
    },
  };
  // let config = {
  //   headers: {
  //     jtoken: token,
  //   },
  // };
  // try {
  //   const result = await axios.get(
  //     `${process.env.REACT_APP_HOST}admin`,
  //     config
  //   );

  //   return result;
  // } catch (error) {
  //   return false;
  // }
};

export default GetAdminInf;
