import { useRoutes } from "react-router-dom";

// project import
import LoginRoutes from "./LoginRoutes";
import MainRoutes from "./MainRoutes";

// ==============================|| ROUTING RENDER ||============================== //

const ThemeRoutes = () => {
  return useRoutes([MainRoutes, LoginRoutes]);
};
export default ThemeRoutes;
