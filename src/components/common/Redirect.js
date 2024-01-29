import { useNavigate } from "react-router-dom";
import React from "react";


const Redirect = (props) => {
    let navigate = useNavigate();
    let target = props.route? props.route: -1
    React.useEffect(() => {
      navigate(target);
    });
  };
  export default Redirect;