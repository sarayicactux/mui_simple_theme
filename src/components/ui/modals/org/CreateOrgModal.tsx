/* eslint-disable array-callback-return */
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
// API **************************************************
import Create from "../../../api/admin/org/Create";

// MUI **************************************************
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import LoadingButton from "@mui/lab/LoadingButton";
import Autocomplete from "@mui/material/Autocomplete";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import FormControl from "@mui/material/FormControl";

// MUi Icon **************************************************
import CancelIcon from "@mui/icons-material/Cancel";
import SendIcon from "@mui/icons-material/Send";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

// other package **************************************************
import { SuccessNotify, ErrorNotify } from "../../Toast";

// redux seters
import { setLogOut } from "../../../redux/reducers/admin";

// STYLE MODAL
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 620,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 2,
};
const UpdateDesignModal = (props) => {
  // HOOKS CONST **************************************************
  // redux
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state.adminAuth);
  const { allStates } = useSelector((state) => state.page);
  const token = auth.token;
  const { openModal, setOpenModal, findOrgs } = props;
  // HOOKS FORM **************************************************
  const [sending, setSending] = React.useState(false);

  const proCities = [];
  for (const state of allStates) {
    for (const city of state.cities) {
      proCities.push({
        value: { provinceId: state.id, cityId: city.id },
        label: `${city.name} : ${state.label}`,
      });
    }
  }

  // modal
  const handleClose = () => setOpenModal(false);

  // states
  const [character, setCharacter] = React.useState("REAL");
  const [orgName, setOrgName] = React.useState(null);
  const [name, setName] = React.useState(null);
  const [lastName, setLastName] = React.useState(null);
  const [fatherName, setFatherName] = React.useState(null);
  const [nCode, setNCode] = React.useState(null);
  const [tel, setTel] = React.useState(null);
  const [mobile, setMobile] = React.useState(null);
  const [email, setEmail] = React.useState(null);
  const [proId, setProId] = React.useState(null);
  const [cityId, setCityId] = React.useState(null);
  const [zipCode, setZipCode] = React.useState(null);
  const [registerAt, setRegisterAt] = React.useState(null);
  const [medias, setMedias] = React.useState([]);
  const datePickerRef = React.useRef();
  const handleSelectDate = (date) => {
    setRegisterAt(date.format?.("YYYY-MM-DD").toString());
  };
  React.useEffect(() => {}, []);
  // SUBMIT **************************************************
  const submitForm = async (event) => {
    event.preventDefault();

    if (character === "REAL") {
      if (!name || name.length < 3) {
        ErrorNotify(" نام وارد نشده یا معتبر نیست  ");
        return;
      }
      if (!lastName || lastName.length < 3) {
        ErrorNotify(" نام خانوادگی وارد نشده یا معتبر نیست  ");
        return;
      }
      if (!nCode || nCode.length !== 10) {
        ErrorNotify(" کد ملی وارد نشده یا معتبر نیست  ");
        return;
      }
      if (!tel || tel.length !== 10) {
        ErrorNotify(" کد ملی وارد نشده یا معتبر نیست  ");
        return;
      }
    }

    setSending(true);
    const result = await Create(
      token,
      character,
      orgName,
      name,
      lastName,
      fatherName,
      nCode,
      tel,
      mobile,
      email,
      proId,
      cityId,
      zipCode,
      registerAt,
      medias
    );
    if (result.status === 403) {
      ErrorNotify(JSON.parse(result.response).error);
      dispatch(setLogOut());
      return;
    }
    if (result.status === 400) {
      ErrorNotify(" مقادیر به درستی وارد نشده است ");

      setSending(false);
      return;
    }
    if (result.status !== 200) {
      ErrorNotify(JSON.parse(result.response).error);
      setSending(false);
      return;
    }
    if (result.status === 200) {
      SuccessNotify(`  تعرفه شارژ با موفقیت به روز رسانی شد `);
      findOrgs();
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
      <Box
        sx={style}
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={12} md={12} alignItems="center">
          <Typography variant="h5" gutterBottom>
            ایجاد سازمان/ارگان جدید
          </Typography>
        </Grid>
        <hr />
        <form onSubmit={submitForm}>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={3}
            columns={{ xs: 12, sm: 12, md: 12 }}
          >
            <Grid item xs={3}>
              <Autocomplete
                disablePortal
                size="small"
                id="orientations"
                name="orientations"
                options={[
                  {
                    value: "REAL",
                    label: "حقیقی",
                  },
                  {
                    value: "LEGAL",
                    label: "حقوقی",
                  },
                ]}
                onChange={(event, item) => {
                  setCharacter(item.value);
                }}
                renderInput={(params) => (
                  <TextField
                    id="orientation"
                    name="orientation"
                    size="small"
                    type="text"
                    {...params}
                    label="نوع کاربری"
                  />
                )}
              />
            </Grid>
            <Grid item xs={4.5}>
              <TextField
                margin="dense"
                label="نام پدر"
                name="fatherName"
                size="small"
                sx={{ width: "100%" }}
                onChange={(event) => {
                  setFatherName(event.target.value);
                }}
              />
            </Grid>
            <Grid item xs={4.5} sx={{ mx: "auto" }}>
              <TextField
                margin="dense"
                label="نام خانوادگی"
                name="lastName"
                size="small"
                sx={{ width: "100%" }}
                onChange={(event) => {
                  setLastName(event.target.value);
                }}
              />
            </Grid>
          </Grid>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={3}
            columns={{ xs: 12, sm: 12, md: 12 }}
          >
            <Grid item xs={3} sx={{ mx: "auto" }}>
              <TextField
                margin="dense"
                label="کد ملی"
                name="nCode"
                size="small"
                type="number"
                sx={{ width: "100%" }}
                onChange={(event) => {
                  setNCode(event.target.value);
                }}
                onInput={(e) => {
                  e.target.value = e.target.value.toString().slice(0, 10);
                }}
              />
            </Grid>

            <Grid item xs={4.5}>
              <Autocomplete
                disablePortal
                size="small"
                id="states"
                name="states"
                options={proCities}
                onChange={(event, item) => {
                  setProId(item.value.provinceId);
                  setCityId(item.value.cityId);
                }}
                renderInput={(params) => (
                  <TextField
                    margin="dense"
                    id="provinceId"
                    name="provinceId"
                    size="small"
                    type="text"
                    {...params}
                    label="*شهرستان/استان "
                  />
                )}
              />
            </Grid>
            <Grid item xs={4.5} sx={{ mx: "auto" }}>
              <FormControl className="mt-2 w-100">
                <InputLabel size="small"> تاریخ خرید </InputLabel>
                <OutlinedInput
                  value={registerAt || ""}
                  onClick={() => datePickerRef.current.openCalendar()}
                  size="small"
                  margin="dense"
                  sx={{ width: "100%" }}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => datePickerRef.current.openCalendar()}
                        edge="end"
                      >
                        <CalendarMonthIcon />
                      </IconButton>
                    </InputAdornment>
                  }
                  label=" تاریخ خرید "
                >
                  {" "}
                </OutlinedInput>
                <DatePicker
                  onChange={(date) => {
                    handleSelectDate(date);
                  }}
                  ref={datePickerRef}
                  calendar={persian}
                  locale={persian_fa}
                  format="MM/DD/YYYY"
                  // plugins={[<TimePicker position="bottom" />]}
                />
              </FormControl>
            </Grid>
          </Grid>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={3}
            columns={{ xs: 12, sm: 12, md: 12 }}
          >
            <Grid item xs={3} sx={{ mx: "auto" }}>
              <TextField
                margin="dense"
                label="تلفن ثابت"
                name="tel"
                size="small"
                type="number"
                sx={{ width: "100%" }}
                onChange={(event) => {
                  setTel(event.target.value);
                }}
                onInput={(e) => {
                  e.target.value = e.target.value.toString().slice(0, 11);
                }}
              />
            </Grid>
            <Grid item xs={3} sx={{ mx: "auto" }}>
              <TextField
                margin="dense"
                label="شماره همراه"
                name="mobile"
                size="small"
                type="number"
                sx={{ width: "100%" }}
                onChange={(event) => {
                  setMobile(event.target.value);
                }}
                onInput={(e) => {
                  e.target.value = e.target.value.toString().slice(0, 11);
                }}
              />
            </Grid>
            <Grid item xs={3} sx={{ mx: "auto" }}>
              <TextField
                margin="dense"
                label="ایمیل"
                name="mobile"
                size="small"
                sx={{ width: "100%" }}
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
              />
            </Grid>
            <Grid item xs={3} sx={{ mx: "auto" }}>
              <TextField
                margin="dense"
                label="کد پستی"
                name="zipCode"
                size="small"
                type="number"
                sx={{ width: "100%" }}
                onChange={(event) => {
                  setZipCode(event.target.value);
                }}
                onInput={(e) => {
                  e.target.value = e.target.value.toString().slice(0, 8);
                }}
              />
            </Grid>
          </Grid>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            className="mt-4"
            columns={{ xs: 12, sm: 12, md: 12 }}
          >
            <Grid item xs={6}>
              <LoadingButton
                size="normal"
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
        </form>
      </Box>
    </Modal>
  );
};
export default UpdateDesignModal;
