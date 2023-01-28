import React, { useState,useRef } from 'react'
import TostarMessages from '../../../../components/alertMessages/TostarMessages'
import PhoneInput from "react-phone-input-2";
import { useDispatch, useSelector } from 'react-redux';
import "react-phone-input-2/lib/style.css";
import { CHANGE_OTP_PHONE_NO } from '../../../../_constants/constants';
import SimpleReactValidator from 'simple-react-validator';
import {
     dealer_verify_with_phone, verfiy_dealer_telephone
  } from '../../../../actions/authActions';
import { Link } from 'react-router-dom';
const Login = (props) => {
    const simpleValidator = useRef(new SimpleReactValidator())
    const [, forceUpdate] = useState();
const {otp_send, otp_loading} = useSelector(({authReducer})=> {
    return {
        otp_send: authReducer.authentication.otp_send,
        otp_loading: authReducer.authentication.otp_loading,
    }
})
  const dispatch = useDispatch()

  

  const [verificationCode, setVerificationCode] = useState("");
  const [phoneNum, setCell] = useState("");
const [userId, setUserId] = useState("")
  const handleOnChange = (e) => {
    setVerificationCode(e.target.value);
  };

  // on Change Number
  const onChangeNumber = () => {
    dispatch({ type: CHANGE_OTP_PHONE_NO });
    setCell("+1");
  };
  const resendCode = () => {
    const data = {
      phone: phoneNum,
      via: "sms",
    };
    dispatch(verfiy_dealer_telephone(data, true,setUserId))

  };

  const submitVerification = (e) => {
    e.preventDefault();
    if (!simpleValidator.current.fieldValid("Verification")) {
      simpleValidator.current.showMessageFor("Verification");
      forceUpdate(1)
      return false;
    }
    const data = {
      code: verificationCode,
      phone: phoneNum,
    };
    dispatch(dealer_verify_with_phone(data, userId));
  };
  const sendCode = () => {
      if (!simpleValidator.current.fieldValid("phoneNum")) {
              simpleValidator.current.showMessageFor("phoneNum");
      forceUpdate(1)
      return false;
    } else {
      const data = {
        phone: phoneNum,
        via: "sms",
      };

      dispatch(verfiy_dealer_telephone(data, false, setUserId))
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
                        <h1>Sign In</h1>
                        <p style={{width:"439px", fontSize:'18px'}}>
                        Don't have an account? <Link to="/register/seller-signup" style={{textDecoration:"none"}}><b>Sign Up</b></Link>
                        </p>
                        <p style={{width:"439px", fontSize:'18px', marginTop:"40px "}}>
                        Please enter the phone number you used to register and we will send you a verification code via SMS.
                        </p>
                      </div>

                      <div
                        className="input-field"
                        style={{ marginTop: "20px", marginBottom: "20px" }}
                      >
                        <PhoneInput
                          className="outline_none"
                          name="phoneNum"
                          inputExtraProps={{
                            name: "phoneNum",
                            required: false,
                            autoFocus: false,
                            placeholder: "#####",
                          }}
                          country={"ca"}
                          onlyCountries={["ca"]}
                          value={phoneNum}
                          disableDropdown={true}
                          countryCodeEditable={false}
                          onChange={(e) => setCell(e)}
                        />
                      </div>
                      <div className="col-12">
                        {simpleValidator.current.message(
                          "phoneNum",
                          phoneNum,
                          "required"
                        )}
                      </div>

                      {otp_send && (
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
                    {otp_send || <div className="mt-2 pl-5">

                      <div className="VerifyBtn">
                        <button
                          disabled={otp_loading}
                          type="button"
                          onClick={sendCode}
                        >
                          {otp_loading ? (
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

                    {otp_send ? (
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
                                simpleValidator.current.showMessageFor("Verification")
                              }
                            />
                            {simpleValidator.current.message(
                              "Verification",
                              verificationCode,
                              "required"
                            )}{" "}
                          </div>

                          <div className="VerifyBtn my-0 mt-4">
                            <button type="button" onClick={submitVerification}>
                              Confirm
                            </button>
                          </div>
                        </div>

                        <div className="CodeAgain-Head mt-3 mb-5 ml-2 ml-sm-5">
                          <h4>
                            Code Again?{" "}
                            <button onClick={resendCode}>Resend</button>
                          </h4>
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
export default Login