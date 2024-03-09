import React from "react";
import { useNavigate } from "react-router-dom";

const Redirect = (props) => {
  const navigate = useNavigate();
  const target = props.route ? props.route : -1;
  React.useEffect(() => {
    navigate(target);
  });
};
export default Redirect;
