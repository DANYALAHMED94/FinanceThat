import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { CHANGE_OTP_PHONE_NO } from '../../_constants/constants';
import { useDispatch } from 'react-redux';

const VerificationModel = (props) => {
  const dispatch = useDispatch()
  const emailSplit =
    props.email !== undefined || props.email !== null || props.email !== ""
      ? props.email.split("@")[0]
      : "";
  const firstEmail = emailSplit.substring(0, 1);
  const lastEmail = emailSplit.substring(emailSplit.length - 1);
  const endEmail =
    props.email !== undefined || props.email !== null || props.email !== ""
      ? props.email.split("@")[1]
      : "";
  //   const [cell, setCell] = useState('');

  const resendCode = () => {
    const data = {
      phone: props.phoneNum,
      via:
        props.verificationOption === "code" ? "sms" : props.verificationOption,
    };
    props.send_otp(data);
  };

  const [verificationCode, setVerificationCode] = useState("");

  const handleOnChange = (e) => {
    if (e.target.value.length <= 6) {
      setVerificationCode(e.target.value);
    }
  };
  const onChangeNumber = () => {
    dispatch({ type: CHANGE_OTP_PHONE_NO });
    props.setCell("+1");
  };


  const submitVerification = (e) => {
    e.preventDefault();
    if (!props.validator.fieldValid("Verification")) {
      props.validator.showMessageFor("Verification");
      return false;
    }
    const data = {
      code: verificationCode,
      phone: props.phoneNum,
    };
    props.verify_otp(data);
  };

  const closeModel = () => {
    setVerificationCode("");
    props.modelClose();
  };

  const sendCode = () => {
    if (!props.validator.fieldValid("phoneNum")) {
      props.validator.showMessageFor("phoneNum");
      return false;
    } else if (!props.validator.fieldValid("verificationOption")) {
      props.validator.showMessageFor("verificationOption");
      return false;
    } else {
      const data = {
        phone: props.phoneNum,
        via:
          props.verificationOption === "code"
            ? "sms"
            : props.verificationOption,
      };

      props.send_otp(data);
    }
  };

  return (
    <React.Fragment>
      <div className="ModalPopup-Container">
        <div
          className="modal fade"
          id="verificationModel"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="verificationModelLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-body">
                <div className="Admin-SignInLeft">
                  <div className="Mdp-SignBtn">
                    <button
                      type="button"
                      data-dismiss="modal"
                      aria-label="Close"
                      onClick={closeModel}
                    >
                      <img src="/assets/image/close-outline.svg" alt="" />
                    </button>
                  </div>

                  <div className="clearfix"></div>

                  <div className="Modal-SignInForm">
                    <div className="clearfix pl-5">
                      <div className="Verification-Head">
                        {/* <h1>Verification Code</h1> */}
                        <h1>Phone Verification</h1>
                        {/* <p>There may be a delay before receiving your code</p> */}
                        {/* <p>
                                                We have sent a verification code to your email 
                                                <b>{props.email ? props.email : ''}</b>
                                                </p>
                                            <p>Please enter the code in the box below to confirm your identity.</p> */}
                        <p>
                          Please take a moment to verify{" "}
                          <b>your phone number.</b>
                        </p>
                        <p>
                          This help us confirm your identity and secure your
                          account.
                        </p>
                      </div>

                      {/* <div className="CodeSent-Con">

                                                <div className="CodeSent-Left">
                                                    <img src="/assets/image/security-icon.svg" alt="" />
                                                </div>

                                                <div className="CodeSent-Right">
                                                    <h1>Code Sent to</h1>
                                                    <h2>{firstEmail}....{lastEmail}@{endEmail}</h2>
                                                </div>

                                            </div> */}
                      <div
                        className="input-field"
                        style={{ marginTop: "100px !important" }}
                      >
                        <PhoneInput
                          className="outline_none"
                          name="cell_number"
                          inputExtraProps={{
                            name: "cell_number",
                            required: false,
                            autoFocus: false,
                            placeholder: "#####",
                          }}
                          country={"ca"}
                          onlyCountries={["ca"]}
                          value={props.phoneNum}
                          disableDropdown={true}
                          countryCodeEditable={false}
                          onChange={(e) => props.setCell(e)}
                        />
                      </div>

                      {/* <form> */}
                      {/* <div className="RadioBtn-Con verification-options" >  */}
                      <div className="mt-2 ">
                        <div className="RadioBtn-Con">
                          <div className="col-12">
                            <label className="FeatureRadio-Btn">
                              Send code by text message.
                              <input
                                type="radio"
                                name="confirmOptions"
                                id="confirmOptions"
                                value="code"
                                onChange={() =>
                                  props.toggleHandleOnChangeVerification("code")
                                }
                                checked={
                                  props.verificationOption === "code"
                                    ? "checked"
                                    : ""
                                }
                              />
                              <span className="FeatureMark"></span>
                            </label>
                            {props.otp_send && (
                              <div className="CodeAgain-Head my-3">
                                <h4>
                                  Change Phone Number ?
                                  <button onClick={onChangeNumber}>click here</button>
                                </h4>
                              </div>
                            )}
                          </div>
                          {/* <div className="col-12">
                            <label className="FeatureRadio-Btn">
                              Call me with a code.
                              <input
                                type="radio"
                                name="confirmOptions"
                                id="confirmOptions"
                                value="call"
                                onChange={() =>
                                  props.toggleHandleOnChangeVerification("call")
                                }
                                checked={
                                  props.verificationOption === "call"
                                    ? "checked"
                                    : ""
                                }
                              />
                              <span className="FeatureMark"></span>
                            </label>
                          </div> */}
                        </div>
                        <div className="col-12">
                          {props.validator.message(
                            "verificationOption",
                            props.verificationOption,
                            "required"
                          )}
                          {props.validator.message(
                            "phoneNum",
                            props.phoneNum,
                            "required"
                          )}
                        </div>
                        <div className="VerifyBtn">
                          <button type="button" onClick={sendCode}>
                            {props.verificationOption === "call"
                              ? "Call Me"
                              : "Send Code"}
                          </button>
                        </div>
                      </div>

                      {/* </div> */}

                      {/* </form> */}
                      {props.otp_send ? (
                        <>
                          <div className="VerifyCode-Form mt-3">
                            <label>Verification Code</label>
                            <input
                              type="text"
                              id="verificationCode"
                              name="verificationCode"
                              placeholder="_ _ _ _ _ _ _"
                              value={verificationCode}
                              onChange={handleOnChange}
                              max={6}
                              onBlur={() =>
                                props.validator.showMessageFor("Verification")
                              }
                            />
                            {props.validator.message(
                              "Verification",
                              verificationCode,
                              "required"
                            )}
                          </div>

                          <div className="CodeAgain-Head">
                            <h4>
                              Code Again?{" "}
                              <button onClick={resendCode}>Resend</button>
                            </h4>
                          </div>

                          <div className="VerifyBtn">
                            <button type="button" onClick={submitVerification}>
                              Confirm
                            </button>
                          </div>
                        </>
                      ) : null}
                    </div>
                  </div>

                </div>

                <div className="Admin-SignInRight">
                  <h4>
                    Buy, sell and get financing
                    <br /> with a click of a button.
                  </h4>
                  <img
                    src="/assets/image/select-img-2.png"
                    width="739"
                    height="1080"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default VerificationModel;
