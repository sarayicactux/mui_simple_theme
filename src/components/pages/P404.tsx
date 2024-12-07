import React from 'react';
import { useDispatch } from 'react-redux';

import { setIsLoading } from '../redux/reducers/page';
const P404 = () => {
  // redux
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(setIsLoading(false));
  }, []);
  return <div>Page Not Found</div>;
};
export default P404;
