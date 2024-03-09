import React from "react";
import { useDispatch, useSelector } from "react-redux";

// API **************************************************
import GetAll from "../../api/admin/org/GetAll";
import Status from "../../api/admin/org/UpdateStatus";

// MUI **************************************************
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Switch from "@mui/material/Switch";
// MUi Icon **************************************************
import AddIcon from "@mui/icons-material/Add";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import GroupIcon from "@mui/icons-material/Group";

import Tooltip from "@mui/material/Tooltip";

// helpers **************************************************
import {
  jalaliDate,
  jalaliDateWithTime,
} from "../../helpers/convertDate.helper";
import { FromInt } from "../../helpers/numberTools.helper";
// component **************************************************
import DataGrid from "../../ui/grid/DataGrid";

// modals *******************************************************
import CreateOrgModal from "../../ui/modals/org/CreateOrgModal";
import UpdateOrgModal from "../../ui/modals/org/UpdateOrgModal";

// other package **************************************************
import { SuccessNotify, ErrorNotify } from "../../ui/Toast";

// redux seters
import { setLogOut } from "../../redux/reducers/admin";
import { setIsLoading, setMetaData } from "../../redux/reducers/page";
import { RootState } from "../../redux/reducers";

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
    name: "name",
    title: "نام",
    type: "text",
    sortable: false,
    searchable: true,
    width: "180px",
    maxWidth: "180px",
  },
  {
    name: "n_code",
    title: "شماره/شناسه ملی",
    type: "text",
    sortable: false,
    searchable: true,
    width: "180px",
    maxWidth: "180px",
  },
  {
    name: "agency",
    title: "نام نماینده",
    type: "text",
    sortable: false,
    searchable: true,
    width: "170px",
    maxWidth: "170px",
  },
  {
    name: "state",
    title: "استان",
    type: "text",
    sortable: false,
    searchable: false,
    width: "120px",
    maxWidth: "120px",
  },
  {
    name: "active_text",
    title: "وضعیت فعالیت",
    type: "text",
    sortable: false,
    searchable: false,
    width: "120px",
    maxWidth: "120px",
  },
  {
    name: "expire_at",
    title: "تاریخ  انقضا",
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
const Orgs = () => {
  // redux
  const dispatch = useDispatch();
  const { auth } = useSelector((state: RootState) => state.adminAuth);
  const token = auth.token;

  // HOOKS PAGE **************************************************
  const [org, setOrg] = React.useState(false);

  // modal
  const [openCreateModal, setOpenCreateModal] = React.useState(false);
  const [openUpdateModal, setOpenUpdateModal] = React.useState(false);

  // get list
  const [orgs, setOrgs] = React.useState([]);

  // QUERY*********************************************************
  // update load set icone
  const updateIcon = (item) => {
    return (
      <>
        <Tooltip title={"ویرایش "} arrow>
          <span
            className="pointer"
            onClick={() => {
              setOrg(item);
              setOpenUpdateModal(true);
            }}
          >
            <ModeEditOutlinedIcon
              fontSize="small"
              sx={{ m: 0.5, cursor: "pointer" }}
            />
          </span>
        </Tooltip>
        <Tooltip title={"کاربران"} arrow>
          <span
            className="pointer"
            onClick={() => {
              setOrg(item);
              setOpenUpdateModal(true);
            }}
          >
            <GroupIcon fontSize="small" sx={{ m: 0.5, cursor: "pointer" }} />
          </span>
        </Tooltip>
      </>
    );
  };

  // get list
  const findOrgs = async () => {
    const result = await GetAll(token);
    if (result.status === 403) {
      dispatch(setLogOut(null));
      return;
    }
    if (result.status !== 200) {
      ErrorNotify(JSON.parse(result.response).error);
      return;
    }

    setOrgs(createDataGridJson(result.data.orgs));
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
        name: item.name,
        n_code: FromInt(item.n_code),
        description: (
          <Tooltip title={item.agency} arrow>
            <span>{item.agency}</span>
          </Tooltip>
        ),
        state: item.state,
        agency: item.agency,
        active_text: publishStatus,
        expire_at: (
          <Tooltip title={FromInt(jalaliDateWithTime(item.expire_at))} arrow>
            <span>{FromInt(jalaliDate(item.expire_at))}</span>
          </Tooltip>
        ),
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
      dispatch(setLogOut(null));

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
        title: "پیام خوان :    مدیریت سازمان/ارگان ها",
        description: "پیام خوان :  مدیریت سازمان/ارگان ها",
      })
    );

    findOrgs();
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
            رکورد جدید
          </Button>
        </>

        <Grid container>
          <Grid item sx={{ py: 5, pt: 2 }} sm={12}>
            <DataGrid
              fixedHeader={true}
              columns={columns}
              data={orgs}
              fileName="AllNews"
              exportCsv={false}
              sx={{ width: "100%" }}
            />
          </Grid>
        </Grid>
      </Card>
      <CreateOrgModal
        openModal={openCreateModal}
        setOpenModal={setOpenCreateModal}
        findOrgs={findOrgs}
      />
      <UpdateOrgModal
        openModal={openUpdateModal}
        setOpenModal={setOpenUpdateModal}
        findOrgs={findOrgs}
        org={org}
      />
    </Box>
  );
};
export default Orgs;
