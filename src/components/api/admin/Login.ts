// import axios from "axios";

const Login = async (username, password) => {
  // let data = {
  //   username,
  //   password,
  // };
  try {
    // const result = await axios.post(`${process.env.REACT_APP_HOST}admin`,  data);
    const result = {
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
    return result;
  } catch (error) {
    return false;
  }
};

export default Login;
