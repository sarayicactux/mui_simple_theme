import $ from "jquery";
import { useSelector } from "react-redux";

const Loading = () => {
  const { isLoading } = useSelector((state) => state.page);
  if (isLoading) {
    $("#mainContainer").addClass("blur");
    $("#loading").removeClass("d-none");
  } else {
    setTimeout(() => {
      $("#mainContainer").removeClass("blur");
    }, 50);
    $("#loading").addClass("d-none");
  }
};
export default Loading;
