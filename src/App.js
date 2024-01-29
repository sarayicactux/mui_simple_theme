import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { PwaUpdater } from "pwa-updater";
import Cookies from "js-cookie";
import DocumentMeta from "react-document-meta";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ErrorBoundary from "./components/common/ErrorHandler";
import Loading from "./components/layout/common/Loading";
import GetAdminInf from "./components/api/admin/GetAdminInf";
import AddLibrary from "./components/ui/jsLib";

import AllProsApi from "./components/api/common/AllPros";


import AppRoutes from "./components/AppRoutes";
import "bootstrap";

// redux seters
import { setAuth } from "./components/redux/reducers/admin";
import { setAllStates } from "./components/redux/reducers/page";

function App() {
  const [checked, setChecked] = React.useState(false);
  // redux hooks
  const { metaData } = useSelector((state) => state.page);
  const dispatch = useDispatch();
  Loading();

  // ساختن اطلاعات اولیه صفحه
  const inisializeLanding = async () => {
    // پیدا کردن استان ها
    const allStates = await AllProsApi();
    const theStates = allStates.data.map((state) => {
      return {
        id: state.id,
        cities: state.Cities,
        label: state.name,
      };
    });
    dispatch(setAllStates(theStates));
    // کنترل توکن ادمین
    const adminToken = Cookies.get("messengerAdminAdmin");
    if (adminToken && adminToken !== "undefined") {
      const adminResult = await GetAdminInf(adminToken);
      if (adminResult) {
        Cookies.set("messengerAdminAdmin", adminResult.data.token, {
          expires: 7,
        });
        dispatch(
          setAuth({
            token: adminResult.data.token,
            adminInfo: adminResult.data,
            isAuthenticated: true,
          })
        );
      }
    }

    setChecked(true);
  };

  React.useEffect(() => {
    AddLibrary(process.env.REACT_APP_STATIC_DIR + "js/popper.js");
    AddLibrary(process.env.REACT_APP_STATIC_DIR + "js/bootstrap.js");
    inisializeLanding();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ErrorBoundary>
      <PwaUpdater notify={true} />
      <DocumentMeta {...metaData}>
        <div id="mainContainer">{checked ? <AppRoutes /> : null}</div>
        <ToastContainer className="text-right" style={{ textAlign: "end" }} />
      </DocumentMeta>
    </ErrorBoundary>
  );
}

export default App;
