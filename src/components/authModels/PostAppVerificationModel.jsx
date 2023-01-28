import React, { useState } from "react";
import { useDispatch } from "react-redux";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { CHANGE_OTP_PHONE_NO } from "../../_constants/constants";

const PostAppVerificationModel = (props) => {
  const dispatch = useDispatch();

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
    props.send_otp(data, true);
  };

  const [verificationCode, setVerificationCode] = useState("");

  const handleOnChange = (e) => {
    if (e.target.value.length <= 6) {
      setVerificationCode(e.target.value);
    }
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
    props.verify_otp(data, props.onSuccess);
    // props.verify_otp(data);
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

  // on Change Number
  const onChangeNumber = () => {
    dispatch({ type: CHANGE_OTP_PHONE_NO });
    props.setCell("+1");
  };

  // main return

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
                    <div className="clearfix px-2 pl-sm-5 pr-sm-0">
                      <div className="Verification-Head">
                        <h1>Phone Verification</h1>
                        <p>
                          Please take a moment to verify{" "}
                          <b>your phone number.</b>
                        </p>
                        <p>
                          This help us confirm your identity and secure your
                          account.
                        </p>
                      </div>
                      <div
                        className="input-field"
                        style={{ marginTop: "20px", marginBottom: "20px" }}
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

                        {props.otp_send && (
                          <div className="CodeAgain-Head my-3">
                            <h4>
                              Change Phone Number ?
                              <button onClick={onChangeNumber}>
                                click here
                              </button>
                            </h4>
                          </div>
                        )}
                      </div>

                      {/* <form> */}
                      {/* <div className="RadioBtn-Con verification-options" >  */}
                      {props.otp_send || (
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
                                    props.toggleHandleOnChangeVerification(
                                      "code"
                                    )
                                  }
                                  checked={
                                    props.verificationOption === "code"
                                      ? "checked"
                                      : ""
                                  }
                                />
                                <span className="FeatureMark"></span>
                              </label>
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
                                    props.toggleHandleOnChangeVerification(
                                      "call"
                                    )
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
                          <div className="VerifyBtn" style={{ float: "none" }}>
                            <button
                              disabled={props.otp_loading}
                              type="button"
                              onClick={sendCode}
                            >
                              {props.otp_loading ? (
                                <i
                                  class="fa fa-circle-o-notch fa-spin"
                                  aria-hidden="true"
                                ></i>
                              ) : props.verificationOption === "call" ? (
                                "Call Me"
                              ) : (
                                "Send Code"
                              )}
                            </button>
                          </div>
                        </div>
                      )}

                      {/* </div> */}

                      {/* </form> */}
                      {props.otp_send ? (
                        <>
                          <div className="d-flex align-items-center mt-2 ">
                            <div
                              className="VerifyCode-Form "
                              style={{ width: "fit-content" }}
                            >
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
                              )}{" "}
                            </div>

                            <div className="VerifyBtn my-0 mt-4">
                              <button
                                type="button"
                                onClick={submitVerification}
                              >
                                Confirm
                              </button>
                            </div>
                          </div>

                          <div className="CodeAgain-Head mt-3 mb-5">
                            <h4>
                              Code Again?{" "}
                              <button onClick={resendCode}>Resend</button>
                            </h4>
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

export default PostAppVerificationModel;
