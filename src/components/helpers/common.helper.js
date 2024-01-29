export function checkMime(filename) {
  const i = filename.lastIndexOf(".");
  const memeType = filename.substr(i + 1);
  const imgList = ["jpg", "jpeg", "png", "gif", "JPG", "JPEG", "PNG", "GIF"];
  const videoList = ["mp4", "MP4"];
  const musicList = ["mp3", "MP3"];
  const fileList = ["xls", "pdf", "doc", "docx", "apk"];
  const xlsFiles = ["xlsx"];
  if (imgList.indexOf(memeType) !== -1) {
    return 1;
  } else if (videoList.indexOf(memeType) !== -1) {
    return 3;
  } else if (fileList.indexOf(memeType) !== -1) {
    return 0;
  } else if (musicList.indexOf(memeType) !== -1) {
    return 2;
  } else if (xlsFiles.indexOf(memeType) !== -1) {
    return 4;
  }
  return 1000;
}
