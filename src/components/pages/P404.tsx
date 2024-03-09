import React from "react";
import { useDispatch } from "react-redux";

//redux seters
import { setIsLoading } from "../redux/reducers/page";
const P404 = () => {
  // redux
  const dispatch = useDispatch();
  dispatch(setIsLoading(false));
  return (
    <div className="row">
      <div className="col-12 text-center">
        <h1> صفحه مورد نظر وجود ندارد</h1>
      </div>
    </div>
  );
};
export default P404;
