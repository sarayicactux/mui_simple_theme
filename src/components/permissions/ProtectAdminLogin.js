import { useSelector } from "react-redux";

import Redirect from "../common/Redirect";

const ProtectAdminLogin = (props) => {
  // redux
  const { auth } = useSelector((state) => state.adminAuth);

  if (!auth.isAuthenticated) {
    return <props.component />;
  } else {
    return <Redirect />;
  }
};
export default ProtectAdminLogin;
