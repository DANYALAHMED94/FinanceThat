import React, { useState } from 'react'
import TostarMessages from '../../components/alertMessages/TostarMessages'
import PhoneInput from "react-phone-input-2";
import { useDispatch } from 'react-redux';
import "react-phone-input-2/lib/style.css";
import { CHANGE_OTP_PHONE_NO } from '../../_constants/constants';
const Verification = (props) => {

  const dispatch = useDispatch()

  const resendCode = () => {
    const data = {
      phone: phoneNum,
      via: "sms",
    };
    props.send_otp(data, true);
  };

  const [verificationCode, setVerificationCode] = useState("");
  const [phoneNum, setCell] = useState("");

  const handleOnChange = (e) => {
    setVerificationCode(e.target.value);
  };

  // on Change Number
  const onChangeNumber = () => {
    dispatch({ type: CHANGE_OTP_PHONE_NO });
    setCell("+1");
    props.updateTelephone("+1")
  };

  const submitVerification = (e) => {
    e.preventDefault();
    if (!props.validator.fieldValid("Verification")) {
      props.validator.showMessageFor("Verification");
      return false;
    }
    const data = {
      code: verificationCode,
      phone: phoneNum,
    };
    props.verify_otp(data);
    // props.verify_user(data)
  };
  const sendCode = () => {
    if (!props.validator.fieldValid("phoneNum")) {
      props.validator.showMessageFor("phoneNum");
      return false;
    } else {
      const data = {
        phone: phoneNum,
        via: "sms",
      };

      props.send_otp(data);
    }
  };
  return (
    <React.Fragment>
      <section className="Section-ListandGrid p-0">
        <div className="Addpost-responsiveimg bannerhide-mobile">
          <img
            className="w-100"
            src="/assets/image/signup-responsive-img.png"
            alt=""
          />
          <div className="UserRegister-SignUp-r">
            <h1>
              Buy, sell and get financing
              <br /> with a click of a button.
            </h1>
          </div>
        </div>

        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-12">
              <div className="row">
                {/* <div className="col-lg-1 col-md-1 col-sm-12 col-12"></div> */}

                <div className="col-xl-7 col-lg-7 col-md-12 col-sm-12 col-12">
                  <div className="Modal-SignInForm">
                    <div className="clearfix pl-5">
                      <div className="Verification-Head">
                        {/* <h1>Verification Code</h1> */}
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
                          value={phoneNum}
                          disableDropdown={true}
                          countryCodeEditable={false}
                          onChange={(e) => {
                            console.log(e)
                            setCell(e)
                            props.updateTelephone(e)
                          }}
                       
                        />
                      </div>
                      <div className="col-12">
                        {props.validator.message(
                          "phoneNum",
                          phoneNum,
                          "required"
                        )}
                      </div>

                      {props.otp_send && (
                        <div className="CodeAgain-Head my-3">
                          <h4>
                            Change Phone Number ?
                            <button onClick={onChangeNumber}>click here</button>
                          </h4>
                        </div>
                      )}
                    </div>

                    {/* <form> */}
                    {/* <div className="RadioBtn-Con verification-options" >  */}
                    {props.otp_send || <div className="mt-2 pl-5">

                      <div className="VerifyBtn">
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
                          ) : (
                            "Send Code"
                          )}
                        </button>
                      </div>
                    </div>}

                    {props.otp_send ? (
                      <>
                        <div className="d-flex align-items-center mt-2 ml-2 ml-sm-5 ">
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
                        </div>

                        <div className="CodeAgain-Head mt-3 mb-5 ml-2 ml-sm-5">
                          <h4>
                            Code Again?{" "}
                            <button onClick={resendCode}>Resend</button>
                          </h4>
                        </div>
                        <div className="CodeAgain-Head mt-3 mb-5 ml-2 ml-sm-5">
                        <div className="VerifyBtn">
                            <button type="button" onClick={submitVerification}>
                              Confirm
                            </button>
                          </div>
                        </div>
                      </>
                    ) : null}
                  </div>
                </div>
                <div className="col-lg-5 col-md-5 col-sm-12 col-12 pr-0 Dealer-Mobileimg">
                  <div className="Sec-SelectAccount">
                    <div className="SelectText">
                      <h1>
                        Buy, sell and get financing
                        <br /> with a click of a button.
                      </h1>
                    </div>
                    <img src="/assets/image/select-img-1.png" alt="" />
                  </div>
                </div>

              </div>


            </div>
          </div>
        </div>

        <TostarMessages />
      </section>
    </React.Fragment>
  );
}
export default Verification