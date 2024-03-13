/* eslint-disable array-callback-return */
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
// API **************************************************
import Create from "../../../api/admin/charge/Create";

// MUI **************************************************
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import LoadingButton from "@mui/lab/LoadingButton";

// MUi Icon **************************************************
import CancelIcon from "@mui/icons-material/Cancel";
import SendIcon from "@mui/icons-material/Send";

// other package **************************************************
import { SuccessNotify, ErrorNotify } from "../../Toast";

// redux seters
import { setLogOut } from "../../../redux/reducers/admin";
import { RootState } from "../../../redux/reducers";

// STYLE MODAL
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 2,
};
const UpdateDesignModal = (props) => {
  // HOOKS CONST **************************************************
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  // redux
  const dispatch = useDispatch();
  const { auth } = useSelector((state: RootState) => state.adminAuth);
  const token = auth.token;
  const { openModal, setOpenModal, findCharges } = props;
  // HOOKS FORM **************************************************
  const [sending, setSending] = React.useState(false);

  // modal
  const handleClose = () => setOpenModal(false);

  const [title, setTitle] = React.useState(null);
  const [description, setDescription] = React.useState(null);
  const [price, setPrice] = React.useState(null);

  React.useEffect(() => {}, []);

  // SUBMIT **************************************************
  const submitForm = async () => {
    setSending(true);
    const result = await Create(token, price, title, description);
    if (result.status === 403) {
      ErrorNotify(JSON.parse(result.data).error);
      dispatch(setLogOut(null));
      return;
    }
    if (result.status === 400) {
      ErrorNotify(" مقادیر به درستی وارد نشده است ");

      setSending(false);
      return;
    }
    if (result.status !== 200) {
      ErrorNotify(JSON.parse(result.data).error);
      setSending(false);
      return;
    }
    if (result.status === 200) {
      SuccessNotify(`  تعرفه شارژ با موفقیت ایجاد شد `);
      findCharges();
      handleClose();
      setSending(false);
      return;
    }
  };

  return (
    <Modal
      open={openModal}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style} justifyContent="center" alignItems="center">
        <Grid item xs={12} md={12} alignItems="center">
          <Typography variant="h5" gutterBottom>
            ایجاد تعرفه شارژ جدید
          </Typography>
        </Grid>
        <hr />
        <form onSubmit={handleSubmit(submitForm)}>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={1}
              columns={{ xs: 12, sm: 12, md: 12 }}
            >
              <Grid item xs={6} sx={{ mx: "auto" }}>
                <TextField
                  margin="dense"
                  label="عنوان"
                  name="title"
                  size="small"
                  sx={{ width: "100%" }}
                  {...register("title", { required: true, minLength: 4 })}
                  onChange={(event) => {
                    setTitle(event.target.value);
                  }}
                />
                <div className="error-message">
                  {errors.title &&
                    errors.title.type === "required" &&
                    ` عنوان وارد نشده`}
                  {errors.title &&
                    errors.title.type === "minLength" &&
                    ` عنوان وارد معتبر نیست`}
                </div>
              </Grid>
              <Grid item xs={6} sx={{ mx: "auto" }}>
                <TextField
                  margin="dense"
                  label="قیمت (ريال)"
                  type="number"
                  name="price"
                  size="small"
                  sx={{ width: "100%" }}
                  {...register("price", { required: true, minLength: 4 })}
                  onChange={(event) => {
                    setPrice(event.target.value);
                  }}
                />
                <div className="error-message">
                  {errors.price &&
                    errors.price.type === "required" &&
                    ` قیمت وارد نشده`}
                  {errors.price &&
                    errors.price.type === "minLength" &&
                    `  قیمت وارد شده صحیح نیست `}
                </div>
              </Grid>

              <Grid item xs={12} sx={{ mx: "auto" }}>
                <TextField
                  margin="dense"
                  label="توضیحات "
                  name="Description"
                  size="small"
                  multiline
                  rows={3}
                  sx={{ width: "100%" }}
                  onChange={(event) => {
                    setDescription(event.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <LoadingButton
                  size="medium"
                  type="submit"
                  startIcon={<SendIcon />}
                  loading={sending}
                  loadingPosition="start"
                  variant="contained"
                  disabled={sending}
                >
                  ارسال
                </LoadingButton>
              </Grid>
              <Grid
                item
                xs={6}
                display="flex"
                justifyContent="flex-end"
                alignItems="flex-end"
              >
                <Button
                  className="float-left"
                  variant="contained"
                  endIcon={<CancelIcon />}
                  color="error"
                  onClick={() => {
                    handleClose();
                  }}
                >
                  انصراف
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Modal>
  );
};
export default UpdateDesignModal;
