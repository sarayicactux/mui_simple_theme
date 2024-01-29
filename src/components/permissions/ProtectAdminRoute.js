import { useSelector } from "react-redux";

import Redirect from "../common/Redirect";
import AdminPage from "../layout/admin/AdminPage";

const ProtectAdminRoute = (props) => {
  // redux
  const { auth } = useSelector((state) => state.adminAuth);
  if (!auth.isAuthenticated) {
    return <Redirect route="/login" />;
  } else {
    return (
      <AdminPage>
        <props.component />
      </AdminPage>
    );
  }
};
export default ProtectAdminRoute;
