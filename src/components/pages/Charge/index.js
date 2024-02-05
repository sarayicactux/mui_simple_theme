import React from "react";
import { useDispatch, useSelector } from "react-redux";

// API **************************************************
import GetAll from "../../api/admin/charge/GetAll";
import Status from "../../api/admin/charge/UpdateStatus";

// MUI **************************************************
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Switch from "@mui/material/Switch";
// MUi Icon **************************************************
import AddIcon from "@mui/icons-material/Add";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";

import Tooltip from "@mui/material/Tooltip";

// helpers **************************************************
import {
  jalaliDate,
  jalaliDateWithTime,
} from "../../helpers/convertDate.helper";
import { FromInt, numberComify } from "../../helpers/numberTools.helper";
// component **************************************************
import DataGrid from "../../ui/grid/DataGrid";

// modals *******************************************************
import CreateChargeModal from "../../ui/modals/charge/CreateChargeModal";
import UpdateChargeModal from "../../ui/modals/charge/UpdateChargeModal";

// other package **************************************************
import { SuccessNotify, ErrorNotify } from "../../ui/Toast";

// redux seters
import { setLogOut } from "../../redux/reducers/admin";
import { setIsLoading, setMetaData } from "../../redux/reducers/page";

// COLUMNS FOR GRID **************************************************
const columns = [
  {
    name: "id",
    title: "ردیف",
    type: "number",
    sortable: true,
    searchable: false,
    width: "60px",
  },
  {
    name: "created_at",
    title: "تاریخ ثبت",
    type: "text",
    sortable: false,
    searchable: false,
    width: "100px",
  },
  {
    name: "title",
    title: "عنوان",
    type: "text",
    sortable: false,
    searchable: true,
    width: "180px",
    maxWidth: "180px",
  },
  {
    name: "price",
    title: "تعرفه",
    type: "text",
    sortable: false,
    searchable: true,
    width: "180px",
    maxWidth: "180px",
  },
  {
    name: "description",
    title: "توضیحات",
    type: "text",
    sortable: false,
    searchable: false,
    width: "250px",
    maxWidth: "250px",
  },
  {
    name: "active_text",
    title: "وضعیت انتشار",
    type: "text",
    sortable: false,
    searchable: false,
    width: "120px",
    maxWidth: "120px",
  },
  {
    name: "updated_at",
    title: "تاریخ آخرین ویرایش",
    type: "text",
    sortable: false,
    searchable: false,
    width: "140px",
  },
  {
    name: "action",
    title: "عملیات",
    type: "text",
    sortable: true,
    searchable: false,
  },
];

// COMPONENT **************************************************
const Charges = () => {
  // redux
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state.adminAuth);
  const token = auth.token;

  // HOOKS PAGE **************************************************
  const [charge, setCharge] = React.useState(false);
  const [detail, setDetail] = React.useState(false);

  // modal
  const [openCreateModal, setOpenCreateModal] = React.useState(false);
  const [openUpdateModal, setOpenUpdateModal] = React.useState(false);
  const [openDetailModal, setOpenDetailModal] = React.useState(false);

  // get list
  const [charges, setCharges] = React.useState([]);

  // QUERY*********************************************************
  // update load set icone
  const updateIcon = (item) => {
    return (
      <>
        <Tooltip title={"ویرایش "} arrow>
          <span
            className="pointer"
            onClick={() => {
              setCharge(item);
              setOpenUpdateModal(true);
            }}
          >
            <ModeEditOutlinedIcon
              fontSize="small"
              sx={{ m: 0.5, cursor: "pointer" }}
            />
          </span>
        </Tooltip>
      </>
    );
  };

  // get list
  const findCharges = async () => {
    const result = await GetAll(token);
    if (result.status === 403) {
      dispatch(setLogOut());
      return;
    }
    if (result.status !== 200) {
      ErrorNotify(JSON.parse(result.response).error);
      return;
    }

    setCharges(createDataGridJson(result.data.charges));
    dispatch(setIsLoading(false));
  };

  const createDataGridJson = (data) => {
    return data.map((item, index) => {
      const publishStatus = (
        <Switch
          defaultChecked={item.status === 1 ? true : false}
          onChange={(e) => {
            updateActiveStatus(item.id, item.status === 1 ? 0 : 1);
          }}
        />
      );
      return {
        id: index + 1,
        created_at: (
          <Tooltip title={FromInt(jalaliDateWithTime(item.createdAt))} arrow>
            <span>{FromInt(jalaliDate(item.createdAt))}</span>
          </Tooltip>
        ),
        title: item.title,
        price: FromInt(numberComify(item.price)),
        description: (
          <Tooltip title={item.description} arrow>
            <span>{item.description}</span>
          </Tooltip>
        ),
        active_text: publishStatus,
        updated_at: (
          <Tooltip title={FromInt(jalaliDateWithTime(item.updatedAt))} arrow>
            <span>{FromInt(jalaliDate(item.updatedAt))}</span>
          </Tooltip>
        ),
        action: updateIcon(item),
      };
    });
  };

  // upadate Status
  const updateActiveStatus = async (id, active) => {
    SuccessNotify(" وضعیت با موفقیت به روز رسانی شد ");
    return;
    const result = await Status(token, id, active);
    if (result.status === 403) {
      dispatch(setLogOut());

      return;
    }
    if (result.status === 406) {
      ErrorNotify(JSON.parse(result.response).error);
      return;
    }
    if (result.status === 404) {
      ErrorNotify(JSON.parse(result.response).error);
      return;
    }
    if (result.status !== 200) {
      ErrorNotify(JSON.parse(result.response).error);
      return;
    }
    SuccessNotify(" وضعیت با موفقیت به روز رسانی شد ");
  };

  // END FUNCTION **********

  // USE EFFECT **********
  React.useEffect(() => {
    dispatch(
      setMetaData({
        title: "پیام خوان :    مدیریت شارژها",
        description: "پیام خوان :  مدیریت شارژها",
      })
    );

    findCharges();
  }, []);

  // RETURN **************************************************
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Card variant="outlined" sx={{ mt: 5 }}>
        <>
          <Button
            onClick={() => {
              setOpenCreateModal(true);
            }}
            sx={{ m: 1, mb: 0 }}
            variant="contained"
            disableElevation
            endIcon={<AddIcon />}
          >
            تعرفه جدید
          </Button>
        </>

        <Grid container>
          <Grid item sx={{ py: 5, pt: 2 }} sm={12}>
            <DataGrid
              fixedHeader={true}
              columns={columns}
              data={charges}
              fileName="AllNews"
              exportCsv={false}
              sx={{ width: "100%" }}
            />
          </Grid>
        </Grid>
      </Card>
      <CreateChargeModal
        openModal={openCreateModal}
        setOpenModal={setOpenCreateModal}
        findCharges={findCharges}
      />
      <UpdateChargeModal
        openModal={openUpdateModal}
        setOpenModal={setOpenUpdateModal}
        findCharges={findCharges}
        charge={charge}
      />
    </Box>
  );
};
export default Charges;
