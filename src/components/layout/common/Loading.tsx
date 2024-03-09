import $ from "jquery";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/reducers";

const Loading = () => {
  const { isLoading } = useSelector((state: RootState) => state.page);
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
