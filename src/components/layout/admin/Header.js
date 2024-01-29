import * as React from "react";
import { useDispatch, useSelector } from "react-redux";

import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import Modal from "@mui/material/Modal";
import $ from "jquery";

import ScorePassword from "../../helpers/ScorePassword";
import { SuccessNotify, ErrorNotify } from "../../ui/Toast";
import UpdatePasswordApi from "../../api/admin/UpdatePassword";
// redux seters
import { setLogOut } from "../../redux/reducers/admin";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "1px solid #080808",
  borderRadius: 1,
  boxShadow: 24,
  p: 4,
};
const Header = () => {
  const currentPasswordRef = React.useRef(null);
  const newPasswordRef = React.useRef(null);
  const confirmPasswordRef = React.useRef(null);

  // redux
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state.adminAuth);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [btnText, setBtnText] = React.useState("Update");
  const [sending, setSending] = React.useState(false);
  const updatePasswordHandler = async (event) => {
    event.preventDefault();
    const currentPassword = currentPasswordRef.current.value;
    const newPassword = newPasswordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;
    const token = auth.token;
    if (newPassword !== confirmPassword) {
      ErrorNotify("Passwords Not equal");
      return;
    }
    const score = ScorePassword(newPassword);
    if (score < 50) {
      ErrorNotify("The password is weak");
      return;
    }
    setBtnText("Sending...");
    setSending(true);
    const result = await UpdatePasswordApi(token, currentPassword, newPassword);
    if (result.status === 403) {
      dispatch(setLogOut());
      return;
    }
    if (result.status === 400) {
      ErrorNotify(JSON.parse(result.response).message[0]);
      setBtnText("Update");
      setSending(false);
      return;
    }
    if (result.status !== 200) {
      ErrorNotify(JSON.parse(result.response).error);
      setBtnText("Update");
      setSending(false);
      return;
    }
    currentPasswordRef.current.value = null;
    newPasswordRef.current.value = null;
    confirmPasswordRef.current.value = null;
    SuccessNotify("Password updated successfully.");
    setBtnText("Save");
    handleClose();
    setSending(false);
  };
  return (
    <div className="col-12 px-0">
      <header className="cd-main-header js-cd-main-header header-index position-fixed fixed-top">
        <div className="cd-logo-wrapper order-3">
          <div className="dropdown">
            <button
              className="bg-white profile_sidebar_icon border-0 pl-3 mr-0"
              type="button"
              id="dropdownMenu1"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="true"
            >
              <span className="fa-layers fa-fw fa-1x">
                <i className="fa-light fa-bell bell-style profile_sidebar_icon m-0"></i>
                <span className="fa-layers-counter notif_bell-redcircel">
                  ‌
                </span>
              </span>
              <span className="caret"></span>
            </button>
            <ul
              className="dropdown-menu notif_bell"
              aria-labelledby="dropdownMenu1"
            >
              <li>
                <Link onClick={handleOpen} to="">
                  Update Password
                </Link>
              </li>
              <li>
                <Link to="/">Another action</Link>
              </li>
              <li>
                <Link to="/">Something else here</Link>
              </li>
              <li>
                <Link to="/">Separated link</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="cd-search js-cd-search order-md-last order-2 ">
          <form>
            <input
              type="search"
              className="reset border-0 top_search-input"
              placeholder="Search By Contact Or Message"
            />
          </form>
        </div>

        <button
          className="reset cd-nav-trigger js-cd-nav-trigger order-1  ml-3"
          aria-label="Toggle menu"
          onClick={() => {
            if ($(".js-cd-side-nav").hasClass("cd-side-nav--is-visible")) {
              $(".js-cd-side-nav").removeClass("cd-side-nav--is-visible");
              $(".js-cd-nav-trigger").removeClass(
                "cd-nav-trigger--nav-is-visible"
              );
            } else {
              $(".js-cd-side-nav").addClass("cd-side-nav--is-visible");
              $(".js-cd-nav-trigger").addClass(
                "cd-nav-trigger--nav-is-visible"
              );
            }
          }}
        >
          <span></span>
        </button>
        <ul className="cd-nav__list js-cd-nav__list"></ul>
      </header>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="col-12">
            <div className="row">
              <div className="col-12 mb-4">
                <h4 className="text-center">Update Password</h4>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <form onSubmit={updatePasswordHandler}>
                  <div className="row">
                    <div className="col-12 order-0">
                      <div className="form-group">
                        <label htmlFor="name" className="input-lable">
                          Current Password
                          <span className="text-danger">*</span>
                        </label>
                        <input
                          type="password"
                          id="currentPassword"
                          ref={currentPasswordRef}
                          required
                          className="form-control profile_input-form"
                          placeholder=""
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 order-0">
                      <div className="form-group">
                        <label htmlFor="name" className="input-lable">
                          New Password
                          <span className="text-danger">*</span>
                        </label>
                        <input
                          type="password"
                          id="newPasswordRef"
                          ref={newPasswordRef}
                          required
                          className="form-control profile_input-form"
                          placeholder=""
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 order-0">
                      <div className="form-group">
                        <label htmlFor="name" className="input-lable">
                          Current Password{" "}
                          <span className="text-danger">*</span>
                        </label>
                        <input
                          type="password"
                          id="confirmPassword"
                          ref={confirmPasswordRef}
                          required
                          className="form-control profile_input-form"
                          placeholder=""
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-6 ">
                      <div className="form-group text-left">
                        <button
                          disabled={sending}
                          type="submit"
                          className="btn save_form-btn text-left"
                        >
                          {btnText}
                        </button>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="form-group text-right">
                        <button
                          onClick={handleClose}
                          className="btn close_form-btn "
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};
export default Header;
