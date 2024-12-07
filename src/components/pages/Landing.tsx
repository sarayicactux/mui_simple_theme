import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import APIs

//import UIs
import { ErrorNotify } from '../ui/Toast';

// redux seters
import { RootState } from './../redux/reducers';
import { setIsLoading, setMetaData } from '../redux/reducers/page';

//import skeletons
import LandingCardSkeleton from '../ui/skeletons/LandingCard';

//import Enums

// helpers **************************************************
import { jalaliDate } from './../helpers/convertDate.helper';
import { FromInt } from './../helpers/NumberTools';

const Landing = () => {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [fromDate, setFromDate] = React.useState(null);
  const [toDate, setTodDate] = React.useState(null);
  const [landingData, setLandingData] = React.useState([]);

  // redux
  const dispatch = useDispatch();
  const { auth } = useSelector((state: RootState) => state.adminAuth);
  const token = auth.token;

  // catch data **************************************************


  React.useEffect(() => {
    dispatch(setIsLoading(false));
    dispatch(
      setMetaData({
        title: 'weighbridge : صفحه اصلی',
        description: 'weighbridge:  صفحه اصلی',
      }),
    );
    setIsLoaded(true);
  }, []);

  return (
    <>
      <b></b>
      <div className="col-12 col-md-12  col-lg-10 col-xl-8  justify-content-center mt-4">
        {isLoaded ? (
          <div className="row  mb-5">
            {/* <div className="col-12 col-md-10 p-2 mb-2">
              <p>
                {' '}
                {`خلاصه وضعیت از تاریخ   ${FromInt(
                  jalaliDate(fromDate),
                )} تا    ${FromInt(jalaliDate(toDate))} `}
              </p>
            </div> */}

          </div>
        ) : (
          <LandingCardSkeleton />
        )}
      </div>
    </>
  );
};

export default Landing;
