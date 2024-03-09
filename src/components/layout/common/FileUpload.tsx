import React from "react";
import Button from "@mui/material/Button";

import UploadFile from "../../api/common/UploadFile";
import DeleteFile from "../../api/common/DeleteFile";
import DownloadOutlined from "@mui/icons-material/DownloadOutlined";

const ImageUploader = (props) => {
  const uploadInputRef = React.useRef(null);
  const btnUpload = "ارسال";
  const [selectedFile, setSelectedFile] = React.useState(null);
  const handleUpload = async () => {
    if (!selectedFile) return;
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("dist", props.dist);

    try {
      const response = await UploadFile(props.token, formData);
      addUploadedFiles(response);
      setSelectedFile(null);
      uploadInputRef.current.value = null;
    } catch (error) {
      console.log(error);
    }
  };

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const removeUploadedFiles = (itemId) => {
    DeleteFile(props.token, itemId);
    props.setUploadedFiles((prevUploadedFiles) => {
      return prevUploadedFiles.filter((item) => item.id !== itemId);
    });
  };

  const addUploadedFiles = (item) => {
    props.setUploadedFiles((prevUploadedFiles) => {
      return prevUploadedFiles.concat(item);
    });
  };
  return (
    <div className="">
      <h4 className=" mt-3">پیوست ها</h4>

      <div className="row text-right ">
        <div className="card card--inverted  border-0 mt-3 col-12 col-md-5 order-2 order-md-2 ">
          <label className="input ">
            <input
              className="input__field form-control attachmentInput "
              id="file"
              type="file"
              ref={uploadInputRef}
              onChange={handleFileSelect}
            />
          </label>
        </div>
        <div className="pointer  border-none mt-3 col-12 col-md-2 order-3 order-md-3 ">
          <div className="attachment d-flex align-items-center justify-content-center">
            <br />
            <Button
              onClick={handleUpload}
              variant="contained"
              color="success"
              component="span"
            >
              {btnUpload}
            </Button>
          </div>
        </div>
      </div>

      <div className="col-12  mt-3" dir="rtl">
        {props.uploadedFiles
          ? props.uploadedFiles.map((uploadedFile, index) => {
              return (
                <div className="row " key={index}>
                  <div className="col-12">
                    <i
                      className="fa fa-remove ml-5 pointer"
                      onClick={() => {
                        removeUploadedFiles(uploadedFile.id);
                      }}
                    ></i>

                    <a
                      className=" text-decoration-none "
                      href={`${uploadedFile.mediaUrl}`}
                      target="_blank"
                      download
                      rel="noreferrer"
                    >
                      <DownloadOutlined className="text-dark mx-2 " />
                      پیوست {index + 1}
                    </a>
                  </div>
                </div>
              );
            })
          : ""}
      </div>
    </div>
  );
};
export default ImageUploader;
