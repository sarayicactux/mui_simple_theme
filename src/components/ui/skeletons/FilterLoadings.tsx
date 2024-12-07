import React from 'react';
import Skeleton from '@mui/material/Skeleton';

export const TotalGrid = () => {
  const row = (
    <div className="row">
      <div className="col-3 p-0">
        <div className="row p-0 m-0">
          <div className="col-2 p-1">
            <Skeleton
              sx={{ marginTop: '0px' }}
              animation="wave"
              variant="rounded"
              width={'100%'}
              height={34}
            />
          </div>
          <div className="col-10 p-1">
            <Skeleton
              sx={{ marginTop: '0px' }}
              animation="wave"
              variant="rounded"
              width={'100%'}
              height={34}
            />
          </div>
        </div>
      </div>
      <div className="col-1 p-1">
        <Skeleton
          sx={{ marginTop: '0px' }}
          animation="wave"
          variant="rounded"
          width={'100%'}
          height={34}
        />{' '}
      </div>
      <div className="col-1 p-1">
        <Skeleton
          sx={{ marginTop: '0px' }}
          animation="wave"
          variant="rounded"
          width={'100%'}
          height={34}
        />
      </div>
      <div className="col-2 p-1">
        <Skeleton
          sx={{ marginTop: '0px' }}
          animation="wave"
          variant="rounded"
          width={'100%'}
          height={34}
        />
      </div>
      <div className="col-2 p-1">
        <Skeleton
          sx={{ marginTop: '0px' }}
          animation="wave"
          variant="rounded"
          width={'100%'}
          height={34}
        />{' '}
      </div>
      <div className="col-2 p-1">
        <Skeleton
          sx={{ marginTop: '0px' }}
          animation="wave"
          variant="rounded"
          width={'100%'}
          height={34}
        />
      </div>
      <div className="col-1 p-1">
        <Skeleton
          sx={{ marginTop: '0px' }}
          animation="wave"
          variant="rounded"
          width={'100%'}
          height={34}
        />
      </div>
    </div>
  );
  const rows = [];
  for (let i = 0; i < 25; i++) {
    rows.push(row);
  }
  return (
    <div className="row  mb-5 justify-content-center">
      <div className="col-12 mt-3 mb-2  ">
        <Skeleton
          sx={{ marginTop: '0px' }}
          animation="wave"
          variant="rounded"
          width={'100%'}
          height={34}
        />
      </div>
      <div>
        {rows.map((row, index) => (
          <div key={index}>{row}</div>
        ))}
      </div>
      <div>
        <div className="row">
          <div className="col-9 p-1"></div>
          <div className="col-2 p-1">
            <Skeleton
              sx={{ marginTop: '0px' }}
              animation="wave"
              variant="rounded"
              width={'100%'}
              height={34}
            />
          </div>
          <div className="col-1 p-1">
            <Skeleton
              sx={{ marginTop: '0px' }}
              animation="wave"
              variant="rounded"
              width={'100%'}
              height={34}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default TotalGrid;
