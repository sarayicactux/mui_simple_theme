import React from "react";
import { useDispatch } from "react-redux";

//redux seters
import { setIsLoading, setMetaData } from "../redux/reducers/page";
const Dash = () => {
  // redux
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(
      setMetaData({
        title: "پیام خوان :    داشبورد",
        description: "پیام خوان :  داشبورد",
      })
    );
    dispatch(setIsLoading(false));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);
  return <div className="row m-2"></div>;
};
export default Dash;
