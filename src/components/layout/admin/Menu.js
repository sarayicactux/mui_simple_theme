// import { Link } from "react-router-dom";
// import { useLocation } from "react-router-dom";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ExitToApp from "@mui/icons-material/ExitToApp";
import PasswordIcon from "@mui/icons-material/Password";

// redux seters
import { setLogOut } from "../../redux/reducers/admin";
// import ScorePassword from "../../helpers/ScorePassword";
import { SuccessNotify, ErrorNotify } from "../../ui/Toast";
import UpdatePasswordApi from "../../api/admin/UpdatePassword";
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from "@mui/icons-material/Send";
import CancelIcon from "@mui/icons-material/Cancel";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
// import Collapse from "@mui/material/Collapse";

// import PrintIcon from '@mui/icons-material/Print';
// import ShareIcon from '@mui/icons-material/Share';

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

function Menu(props) {
  // redux
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state.adminAuth);
  // const location = useLocation();
  const logOut = props.logOut;

  const openMenu = props.Open;
  // const [open, setOpen] = React.useState(false);

  const styleList = !openMenu
    ? { alignItems: "center", display: "contents" }
    : { alignItems: "", display: "" };

  const currentPasswordRef = React.useRef(null);
  const newPasswordRef = React.useRef(null);
  const confirmPasswordRef = React.useRef(null);
  // const handleClick = () => {
  //   setOpen(!open);
  // };

  const [openModal, setOpenModal] = React.useState(false);

  // const selectedMenu = (route) => {
  //   return location.pathname === route ? `panel-link-row` : null;
  // };
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const [sending, setSending] = React.useState(false);
  const updatePasswordHandler = async (event) => {
    event.preventDefault();
    const currentPassword = currentPasswordRef.current.value;
    const newPassword = newPasswordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;
    const token = auth.token;
    if (newPassword !== confirmPassword) {
      ErrorNotify("رمز ورود و تکرار، برابر نیستند");
      return;
    }
    // const score = ScorePassword(newPassword);
    // if (score < 50) {
    //   ErrorNotify("رمز انتخاب شده،ضعیف است");
    //   return;
    // }
    setSending(true);
    const result = await UpdatePasswordApi(token, currentPassword, newPassword);
    if (result.status === 403) {
      dispatch(setLogOut());
      return;
    }
    if (result.status === 400) {
      ErrorNotify(JSON.parse(result.response).message[0]);
      setSending(false);
      return;
    }
    if (result.status !== 200) {
      ErrorNotify(JSON.parse(result.response).error);
      setSending(false);
      return;
    }
    currentPasswordRef.current.value = null;
    newPasswordRef.current.value = null;
    confirmPasswordRef.current.value = null;
    SuccessNotify("رمز ورود با موفقیت به روز شد");
    handleCloseModal();
    setSending(false);
  };
  return (
    <>
      {" "}
      <List
        sx={{
          width: "100%",
          maxWidth: 360,
          bgcolor: "background.paper",
        }}
        component="nav"
        dir="ltr"
        aria-labelledby="nested-list-subheader"
      >
        <ListItemButton onClick={handleOpenModal}>
          {openMenu ? <ListItemText primary="ویرایش رمز ورود" /> : ""}

          <ListItemIcon style={styleList}>
            <PasswordIcon className="ms-auto " />
          </ListItemIcon>
        </ListItemButton>
        <ListItemButton className="text-danger" onClick={logOut}>
          {openMenu ? <ListItemText primary="خروج" /> : ""}

          <ListItemIcon style={styleList}>
            <ExitToApp className="ms-auto text-danger" />
          </ListItemIcon>
        </ListItemButton>
      </List>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="col-12">
            <div className="row">
              <div className="col-12 mb-4">
                <h4 className="text-center">ویرایش رمز ورود </h4>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <form onSubmit={updatePasswordHandler}>
                  <div className="row">
                    <div className="col-12 order-0">
                      <div className="form-group">
                        <TextField
                          margin="normal"
                          required
                          fullWidth
                          id="currentPassword"
                          label="رمز ورود فعلی"
                          name="currentPassword"
                          size="normal"
                          type="password"
                          inputRef={currentPasswordRef}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 order-0 mt-2">
                      <div className="form-group">
                        <TextField
                          margin="normal"
                          required
                          fullWidth
                          id="newPassword"
                          label="رمز ورود جدید"
                          name="newPassword"
                          size="normal"
                          type="password"
                          inputRef={newPasswordRef}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 order-0 mt-2">
                      <div className="form-group">
                        <TextField
                          margin="normal"
                          required
                          fullWidth
                          id="confirmPassword"
                          label="تکرار رمز ورود جدید"
                          name="confirmPassword"
                          size="normal"
                          type="password"
                          inputRef={confirmPasswordRef}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-6 ">
                      <LoadingButton
                        size="normal"
                        type="submit"
                        startIcon={<SendIcon />}
                        loading={sending}
                        loadingPosition="start"
                        variant="contained"
                      >
                        ذخیره
                      </LoadingButton>
                    </div>
                    <div className="col-6 text-left">
                      <Button
                        className="float-right"
                        variant="contained"
                        endIcon={<CancelIcon />}
                        color="error"
                        onClick={handleCloseModal}
                      >
                        انصراف
                      </Button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </>
  );
}

export default Menu;
