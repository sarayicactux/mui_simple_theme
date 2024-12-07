import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

// API **************************************************

// MUI **************************************************
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LoadingButton from '@mui/lab/LoadingButton';
import Switch from '../../ui/formElement/Switch';
import TextField from '../../ui/formElement/TextField';
import TextArea from '../../ui/formElement/TextArea';

import Autocomplete from '../../ui/formElement/Autocomplete';
import DatePickerInputWithTime from '../../ui/formElement/DatePickerInputWithTime';
import SendIcon from '@mui/icons-material/Send';
import CancelIcon from '@mui/icons-material/Cancel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

// component **************************************************

// other package **************************************************
import { ErrorNotify, SuccessNotify } from '../../ui/Toast';

// redux seters
import { RootState } from '../../redux/reducers';
import { setIsLoading, setMetaData } from '../../redux/reducers/page';

const dischargeDates = [
  { value: 'register_Date', label: 'تاریخ ثبت', time: 'register_Time' },
  {
    value: 'parking_date',
    label: 'تاریخ  ورود به پارکینگ',
    time: 'parking_time',
  },
  { value: 'lastDate', label: 'تاریخ توزین ثانویه', time: 'secTime' },
];
const Forms = (props) => {
  // redux
  const dispatch = useDispatch();
  const [date_type, setDateType] = React.useState('lastDate');
  const [createdAt_from, setCreatedAt_from] = React.useState(null);
  const [sending, setSending] = React.useState(false);


  // END FUNCTION **********

  // USE EFFECT **********
  React.useEffect(() => {
    dispatch(setIsLoading(true));
    dispatch(
      setMetaData({
        title: ' فره ها',
        description: ' فرم ها',
      }),
    );
    setTimeout(() => dispatch(setIsLoading(false)), 300);

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
              justifyContent="right"
              alignItems="right"
            >
              <Grid
                item
                md={12}
                xs={12}
                sx={{ mx: 'auto', p: 1, m: 2, border: 1, borderRadius: 1 }}
              >
                <Grid item md={3} xs={12} sx={{ mx: 'auto', p: 1 }}>
                  <Autocomplete
                    options={dischargeDates}
                    defaultValue={null}
                    name="priority"
                    label=" نوع بازه زمانی "
                    setValue={setDateType}
                  />
                </Grid>
                <Grid item xs={3} sx={{ mx: 'auto', p: 1 }}>
                  <DatePickerInputWithTime
                    setSelectedDate={setCreatedAt_from}
                    selectedDate={createdAt_from}
                    label="تاریخ ثبت از"
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
                    تایید
                  </LoadingButton>
                
                  <Button
                    className="float-left"
                    variant="contained"
                    endIcon={<CancelIcon />}
                    color="error"
                    onClick={() => {

                    }}
                  >
                    انصراف
                  </Button>
                </Grid>

                <Grid item xs={9} sx={{ mx: 'auto', p: 1 }}>
                  <Switch

                    checked={false}
                  ></Switch>
                  <Typography component={'span'} color="text.secondary">
                    عملیات تخلیه
                  </Typography>
                </Grid>
                <Grid item md={4} xs={4} sx={{ mx: 'auto', p: 1 }}>
                  <TextField
                    margin="dense"
                    type="number"
                    label=" شناسه محصول"
                    name="product_id"
                    size="small"
                    sx={{ width: '100%' }}
                    onChange={(event) => {

                    }}
                  />
                </Grid>
                <Grid item md={8} xs={8} sx={{ mx: 'auto', p: 1 }}>
                  <TextArea
                    margin="dense"
                    type="number"
                    label=" شناسه محصول"
                    name="product_id"
                    size="small"
                    rows={4}
                    multiline={true}
                    sx={{ width: '100%' }}
                    onChange={(event) => {

                    }}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
};
export default Forms;
