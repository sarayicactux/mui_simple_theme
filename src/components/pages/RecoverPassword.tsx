import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SuccessNotify, ErrorNotify } from "../ui/Toast";

import SendCode from "../api/admin/SendCode";
import RecoverPass from "../api/admin/RecoverPass";
import ScorePassword from "../helpers/scorePassword.helper";

const RecoverAdminPassword = () => {
  const navigate = useNavigate();
  const mobileRef = React.useRef(null);
  const mobile2Ref = React.useRef(null);
  const codeRef = React.useRef(null);
  const newPasswordRef = React.useRef(null);
  const confirmPasswordRef = React.useRef(null);
  const [isCodeSended, setIsCodeSended] = React.useState(false);
  const [updatePass, setUpdatePass] = React.useState(false);
  const [recoverPassToken, setTecoverPassToken] = React.useState(null);
  const [btnText, setBtnText] = React.useState("Update");
  const sendCodeHandler = async (event) => {
    event.preventDefault();
    const mobile = mobileRef.current.value;
    const result = await SendCode(mobile);
    if (result.status === 200) {
      setIsCodeSended(true);
      setTecoverPassToken(result.data.recoverPassToken);
      // mobile2Ref.current.value = mobile;
    } else {
      setIsCodeSended(false);
      ErrorNotify("Invalide Phone Number");
    }
  };
  const updatePasswordHandler = async (event) => {
    event.preventDefault();
    setUpdatePass(true);
    const code = codeRef.current.value;
    const newPassword = newPasswordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;
    if (!code || code.length < 6) {
      setUpdatePass(false);
      ErrorNotify("Please fill in Code Correctly");
      return;
    }
    if (newPassword !== confirmPassword) {
      setUpdatePass(false);
      ErrorNotify("Passwords Not equal");
      return;
    }
    const score = ScorePassword(newPassword);
    if (score < 50) {
      setUpdatePass(false);
      ErrorNotify("The password is weak");
      return;
    }
    setBtnText("Sending...");
    const result = await RecoverPass(
      parseInt(code),
      newPassword,
      recoverPassToken
    );
    if (result.status === 200) {
      SuccessNotify("Password updated successfully");
      setTimeout(() => {
        navigate("/panel");
      }, 3200);
    } else {
      setBtnText("Update");
      ErrorNotify("something went wrong");
      return;
    }
  };
  const sendCode = (
    <form onSubmit={sendCodeHandler}>
      <div className="user-box">
        <input ref={mobileRef} maxLength={12} type="number" name="" required />
        <label>Phone Number</label>
      </div>
      <div className="row">
        <div className="col-12">
          <Link to="/panel/login" className="forgot-pass">
            I have Password!
          </Link>
        </div>
      </div>
      <button disabled={isCodeSended} className="login-btn">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        Send Code
      </button>
    </form>
  );
  const updatePassword = (
    <form onSubmit={updatePasswordHandler}>
      <div className="user-box">
        <input
          readOnly={true}
          ref={mobile2Ref}
          type="number"
          name="mobile"
          required
        />
      </div>
      <div className="user-box">
        <input ref={codeRef} maxLength={6} type="number" name="code" required />
        <label>Received Code</label>
      </div>
      <div className="user-box">
        <input ref={newPasswordRef} type="password" name="password" required />
        <label>New Password</label>
      </div>
      <div className="user-box">
        <input
          ref={confirmPasswordRef}
          type="password"
          name="password2"
          required
        />
        <label>Confirm Password</label>
      </div>
      <div className="row mt-3 mb-3">
        <div
          className="col-12 pointer text-white"
          onClick={() => {
            setIsCodeSended(false);
          }}
        >
          Change Phone Number!
        </div>
      </div>
      <button disabled={updatePass} className="login-btn">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        {btnText}
      </button>
    </form>
  );
  return (
    <div className="login-body">
      <div className="login-box">
        {isCodeSended ? updatePassword : sendCode}
      </div>
      <ToastContainer className="text-left" />
    </div>
  );
};

export default RecoverAdminPassword;
