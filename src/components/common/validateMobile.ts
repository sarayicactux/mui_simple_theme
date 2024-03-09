function validateMobile(mobile): boolean{
  if (!mobile) {
    return false;
  } else {
    if (
      (mobile.indexOf('+98') > -1 &&
        (mobile.length !== 13 ||
          !/^[0-9]+$/.test(mobile.substring(1, mobile.length)))) ||
      (mobile.indexOf('+98') === -1 &&
        (mobile.length !== 11 || !/^[0-9]+$/.test(mobile)))
    ) {
      return false;
    }
    if (
      (mobile.length === 13 && mobile.substring(0, 4) !== '+989') ||
      (mobile.length === 11 && mobile.substring(0, 2) !== '09')
    ) {
      return false;
    }
    return true;
  }
}

export default validateMobile;
