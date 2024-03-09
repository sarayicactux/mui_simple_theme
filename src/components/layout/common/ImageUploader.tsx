import React from "react";
import Button from "@mui/material/Button";

import UploadFile from "../../api/common/UploadFile";
import DeleteFile from "../../api/common/DeleteFile";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import Grid from "@mui/material/Grid";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";

const ImageUploader = (props) => {
  const uploadInputRef = React.useRef();
  const [selectedFile, setSelectedFile] = React.useState();
  const [mediaId, setMediaId] = React.useState(null);
  const [notUploaded, setNotUploaded] = React.useState(true);
  const [btnUpload, setBtnUpload] = React.useState(
    <CloudUploadIcon sx={{ width: 40, height: 40 }} />
  );
  const [tooltipTxt, setTooltipTxt] = React.useState("آپلود تصویر");
  const [preview, setPreview] = React.useState(null);
  React.useEffect(() => {
    if (props.uploadedFile) {
      setSelectedFile(props.uploadedFile);
      setMediaId(props.uploadedFile.id);
      setNotUploaded(false);
      setPreview(props.uploadedFile.mediaUrl);
    } else {
      if (!selectedFile) {
        setPreview(undefined);
        return;
      }
      try {
        const objectUrl = URL.createObjectURL(selectedFile);
        setPreview(objectUrl);

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl);
      } catch {
        setSelectedFile(null);
        setMediaId(null);
        setNotUploaded(true);
        setPreview(undefined);
        return;
      }
    }
  }, [selectedFile, props.uploadedFile]);
  const handleUpload = async () => {
    if (!selectedFile) return;
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("dist", props.dist);
    try {
      setBtnUpload(<HourglassBottomIcon sx={{ width: 40, height: 40 }} />);
      setTooltipTxt("در حال ارسال");
      const response = await UploadFile(props.token, formData);
      props.setUploadedFile(response.data);
      setMediaId(response.data.id);
      setNotUploaded(false);
      setBtnUpload(<CloudUploadIcon sx={{ width: 40, height: 40 }} />);
      setTooltipTxt("آپلود تصویر");
    } catch (error) {
      console.log(error);
    }
  };

  const handleFileSelect = async (event) => {
    if (!event.target.files || event.target.files.length === 0) {
      setSelectedFile(null);
      return;
    }
    setSelectedFile(event.target.files[0]);
  };

  const removeUploadedFile = () => {
    if (mediaId) {
      DeleteFile(props.token, mediaId);
    }
    props.setUploadedFile(null);
    setSelectedFile(null);
    setMediaId(null);
    setNotUploaded(true);
    setBtnUpload(<CloudUploadIcon sx={{ width: 40, height: 40 }} />);
    setTooltipTxt("آپلود تصویر");
  };

  const imagePreview = (
    <>
      <Grid item md={2}>
        <Avatar src={preview} sx={{ width: 60, height: 60 }} />
      </Grid>
      <Grid item md={2}>
        {notUploaded && (
          <Tooltip title={tooltipTxt} arrow className="pointer">
            <Avatar
              sx={{ bgcolor: "green", width: 60, height: 60 }}
              onClick={handleUpload}
            >
              {btnUpload}
            </Avatar>
          </Tooltip>
        )}
      </Grid>
      <Grid item md={1}>
        <Tooltip title={"حذف"} arrow className="pointer">
          <Avatar
            sx={{ bgcolor: "red", width: 60, height: 60 }}
            onClick={removeUploadedFile}
          >
            <DeleteForeverIcon sx={{ width: 40, height: 40 }} />
          </Avatar>
        </Tooltip>
      </Grid>
    </>
  );
  const uploadBtn = (
    <>
      <input
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        id="contained-button-file"
        ref={uploadInputRef}
        onChange={handleFileSelect}
      />
      <label htmlFor="contained-button-file">
        <Button variant="contained" color="primary" component="span">
          {props.title}
        </Button>
      </label>
    </>
  );
  return <div className="row "> {selectedFile ? imagePreview : uploadBtn}</div>;
};
export default ImageUploader;
