import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fakerFA as faker } from '@faker-js/faker'


// API **************************************************
// MUI **************************************************
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import Tooltip from '@mui/material/Tooltip';

// MUi Icon **************************************************
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';

// helpers **************************************************

import { FromInt } from '../../helpers/NumberTools';

// component **************************************************
import DataGrid from '../../ui/grid/DataGrid';

// modals *******************************************************
import CreateCarModal from '../../ui/modals/car/CreateCarModal';

// other package **************************************************
import { ErrorNotify, SuccessNotify } from '../../ui/Toast';

// redux seters
import { RootState } from '../../redux/reducers';
import { setIsLoading, setMetaData } from '../../redux/reducers/page';
import { setLogOut } from '../../redux/reducers/user';
import {
  jalaliDate,
  jalaliDateWithTime,
  jalaliTime,
} from '../../helpers/convertDate.helper';
// COLUMNS FOR GRID **************************************************
const carColumns = [
  {
    name: 'id',
    title: 'ردیف',
    type: 'number',
    sortable: true,
    searchable: false,
    width: '5%',
  },
  {
    name: 'plak1',
    title: ' سری ',
    type: 'text',
    sortable: false,
    searchable: true,
    width: '10%',
  },
  {
    name: 'plak2',
    title: 'سری حرفی',
    type: 'text',
    sortable: false,
    searchable: true,
    width: '10%',
  },
  {
    name: 'plak3',
    title: ' شماره سه رقمی',
    type: 'text',
    sortable: false,
    searchable: true,
    width: '10%',
  },
  {
    name: 'plak4',
    title: 'کد شهر',
    type: 'text',
    sortable: false,
    searchable: true,
    width: '10%',
  },
  {
    name: 'name',
    title: 'نام ',
    type: 'text',
    sortable: false,
    searchable: true,
    width: '25%',
  },

  {
    name: 'status',
    title: 'وضعیت',
    type: 'text',
    sortable: false,
    searchable: false,
    width: '10%',
  },
  {
    name: 'options',
    title: 'عملیات',
    type: 'text',
    sortable: false,
    searchable: false,
    width: '5%',
  },
  {
    name: 'registered_at',
    title: 'تاریخ ثبت',
    type: 'text',
    sortable: false,
    searchable: false,
    width: '15%',
  },
];

const createRandomUser = () => {
  return {
    plak1: faker.number.int({ min: 10, max: 99 }), // before version 9.1.0, use userName()
    plak2: faker.person.firstName('male')[0], // before version 9.1.0, use userName()
    plak3: faker.number.int({ min: 111, max: 999 }), // before version 9.1.0, use userName()
    plak4: faker.number.int({ min: 11, max: 99 }), // before version 9.1.0, use userName()
    status: faker.number.int({ min: 0, max: 1 }),
    name: faker.person.fullName(),
    birthdate: faker.date.birthdate(),
    registered_at: faker.date.past(),
  };
}
const CarDriver = (props) => {
  // redux
  const dispatch = useDispatch();
  const { auth } = useSelector((state: RootState) => state.userAuth);
  const token = auth.token;

  const [findCars, setFindCars] = React.useState([]);
  const [defCarVals, setDefCarVals] = React.useState(null);
  // modal
  const [openCarModal, setOpenCarModal] = React.useState(false);

  // QUERY*********************************************************
  // update load set icon

  // get list
  const getCars = async () => {
    const cars = faker.helpers.multiple(createRandomUser, {
      count: 195,
    });

    setFindCars(createCarDataGridJson(cars));
    dispatch(setIsLoading(false));
  };
  const createCarDataGridJson = (data) => {
    return data.map((item, index) => {
      return {
        id: index + 1,
        plak1: FromInt(item.plak1),
        plak2: FromInt(item.plak2),
        plak3: FromInt(item.plak3),
        plak4: FromInt(item.plak4),
        name: FromInt(item.name),
        registered_at: <Tooltip
          title={FromInt(jalaliDateWithTime(item.register_Date))}
          arrow
        >
          <span>{FromInt(jalaliDate(item.register_Date))}</span>
        </Tooltip>,
        status: (
          <Switch
            defaultChecked={item.block === 0 ? true : false}
            onChange={(e) => {

            }}
          />
        ),
        options: (
          <Tooltip title={'ویرایش '} arrow>
            <span
              className="pointer"
              onClick={() => {
                setDefCarVals(item);
                setOpenCarModal(true);
              }}
            >
              <ModeEditOutlinedIcon
                fontSize="small"
                sx={{ m: 0.5, cursor: 'pointer' }}
              />
            </span>
          </Tooltip>
        ),
      };
    });
  };

  // END FUNCTION **********

  // USE EFFECT **********
  React.useEffect(() => {
    dispatch(setIsLoading(true));
    dispatch(
      setMetaData({
        title: ' راننده - تانکر ',
        description: ' راننده - تانکر ',
      }),
    );

    getCars();
  }, []);

  // RETURN **************************************************
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Card
        variant="outlined"
        sx={{ mt: 0 }}
        style={{ backgroundColor: props.frame ? '#2e3349' : '' }}
      >
        {/* <Grid container className={props.frame ? 'd-none' : 'd-block'}> */}
        <Grid container className="d-none d-md-block">
          <Grid item sx={{ py: 5, pt: 2, p: 3, mt: 1 }} sm={12}>
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              <Grid
                item
                md={12}
                xs={12}
                sx={{ mx: 'auto', p: 1, m: 2, border: 1, borderRadius: 1 }}
              >
                <div className="row row justify-content-center p-0 m-0">
                  <div
                    className="col-12 text-center "
                    style={{ marginBottom: '10px' }}
                  >
                    <h5 className={'text-white bg-secondary rounded p-1 m-0'}>
                      لیست تانکرها
                    </h5>

                    <Button
                      onClick={() => {
                        setOpenCarModal(true);
                      }}
                      sx={{ m: 1, mb: 0 }}
                      variant="contained"
                      disableElevation
                      endIcon={<AddCircleOutlineIcon />}
                    >
                      تانکر جدید
                    </Button>
                    <CreateCarModal
                      openModal={openCarModal}
                      setOpenModal={setOpenCarModal}
                      findAll={getCars}
                      defVals={defCarVals}
                      setDefVals={setDefCarVals}
                    />
                  </div>
                </div>
                <DataGrid
                  fixedHeader={true}
                  columns={carColumns}
                  data={findCars}
                  fileName="AllNews"
                  exportCsv={false}
                  sx={{ width: '100%' }}
                  fixedHeaderScrollHeight="710"
                  paginationPerPage={20}
                />
              </Grid>

            </Grid>
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
};
export default CarDriver;