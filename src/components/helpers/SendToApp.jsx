import * as React from 'react';
import Tooltip from '@mui/material/Tooltip';
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined';

const SendToApp = (props) => {
  const handleClick = () => {
    try {
      CefSharp.BindObjectAsync('boundAsync');
      boundAsync.add(+props.id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Tooltip title={' دریافت قبض باسکول'} arrow>
      <AttachFileOutlinedIcon
        onClick={handleClick}
        fontSize="small"
        sx={{ m: 0.5, cursor: 'pointer' }}
      />
    </Tooltip>
  );
};

export default SendToApp;
