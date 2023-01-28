import React, { useState, useRef } from "react";
import PasswordStrengthBar from "react-password-strength-bar";

const SignUpModel = (props) => {
  const [state, setState] = useState({
    registerEmail: "",
    registerEmailError: false,
    confirmEmail: "",
    confirmEmailError: false,
    registeName: "",
    registerNameError: false,
    registerPassword: "",
    registerConfirmPassword: "",
    confirmPasswordError: false,
    changeConformPasswordField: false,
    changePasswordField: false,
    confirmError: "",
    showStrong: false,
    showPasswordStrongMessage: "",
    sameEmailError: false,
    emailConfirmError: "",
    first_name: '',
    firstNameError: false,
    last_name: '',
    lastNameError: false
  });
  const changeConformPasswordField = () => {
    setState({
      ...state,
      changeConformPasswordField: !state.changeConformPasswordField,
    });
  };
  const changePasswordField = () => {
    setState({
      ...state,
      changePasswordField: !state.changePasswordField,
    });
  };
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value,
    });
  };
  const onBlurRemoveMessage = (name) => {
    setState({
      ...state,
      [name]: false,
    });
  };
  const signUpUser = () => {
    setState({
      ...state,
      registerEmailError: false,
      registerNameError: false,
      confirmPasswordError: false,
      confirmEmail: "",
      confirmEmailError: false,
      confirmError: "",
      showStrong: false,
      showPasswordStrongMessage: "",
      sameEmailError: false,
      emailConfirmError: "",
      firstNameError: false,
      lastNameError: false
    });
    const {
      registeName,
      confirmEmail,
      registerEmail,
      registerPassword,
      registerConfirmPassword,
      first_name,
      last_name
    } = state;
    if (!first_name.match("[a-zA-Z0-9s]+")) {
      this.setState({
        ...this.state,
        firstNameError: true
      })
      return false
    }
    if (!last_name.match("[a-zA-Z0-9s]+")) {
      this.setState({
        ...this.state,
        lastNameError: true
      })
      return false
    }
    if (typeof registerEmail !== "undefined") {
      if (!registerEmail.match("[a-zA-Z0-9s]+")) {
        setState({
          ...state,
          registerEmailError: true,
        });
        return false;
      } else {
        let lastAtPos = registerEmail.lastIndexOf("@");
        let lastDotPos = registerEmail.lastIndexOf(".");
        if (
          !(
            lastAtPos < lastDotPos &&
            lastAtPos > 0 &&
            registerEmail.indexOf("@@") == -1 &&
            lastDotPos > 2 &&
            registerEmail.length - lastDotPos > 2
          )
        ) {
          setState({
            ...state,
            registerEmailError: true,
          });
          return false;
        }
      }
    }
    if (typeof confirmEmail !== "undefined") {
      if (!confirmEmail.match("[a-zA-Z0-9s]+")) {
        setState({
          ...state,
          confirmEmailError: true,
          emailConfirmError: "Please enter a valid email address.",
        });
        return false;
      } else {
        let lastAtPos = confirmEmail.lastIndexOf("@");
        let lastDotPos = confirmEmail.lastIndexOf(".");
        if (
          !(
            lastAtPos < lastDotPos &&
            lastAtPos > 0 &&
            confirmEmail.indexOf("@@") == -1 &&
            lastDotPos > 2 &&
            confirmEmail.length - lastDotPos > 2
          )
        ) {
          setState({
            ...state,
            confirmEmailError: true,
            emailConfirmError: "Please enter a valid email address.",
          });
          return false;
        }
      }
    }

    if (
      typeof registerEmail !== "undefined" &&
      typeof confirmEmail !== "undefined"
    ) {
      if (registerEmail != confirmEmail) {
        setState({
          ...state,
          confirmEmailError: true,
          emailConfirmError: "Email do not match.",
        });
        return false;
        // errors["password"] = "Passwords don't match.";
      } else {
        setState({
          ...state,
          confirmEmailError: false,
          emailConfirmError: "",
        });
      }
    }

    const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[0-9])(?=.{8,})");
    if (strongRegex.test(registerPassword) === false) {
      setState({
        ...state,
        showStrong: true,
        showPasswordStrongMessage:
          "Password must be alphanumeric with minimum length of 8 characters",
        confirmPasswordError: false,
        confirmError: "",
      });
      return false;
    }

    if (
      typeof registerPassword !== "undefined" &&
      typeof registerConfirmPassword !== "undefined"
    ) {
      if (registerPassword != registerConfirmPassword) {
        setState({
          ...state,
          confirmPasswordError: true,
          confirmError: "Passwords do not match.",
          showStrong: false,
          showPasswordStrongMessage: "",
        });
        return false;
        // errors["password"] = "Passwords don't match.";
      } else {
        setState({
          ...state,
          confirmPasswordError: false,
          confirmError: "",
          showStrong: false,
          showPasswordStrongMessage: "",
        });
      }
    }
    const data = {
      full_name: "",
      email: registerEmail,
      password: registerPassword,
      user_type: 1,
      redirect: false,
      first_name: first_name,
      last_name: last_name,
      otp_login:true
    };
    props.register(data, true);
  };
  const modelClose = () => {
    setState({
      ...state,
      registerEmail: "",
      registerEmailError: false,
      registeName: "",
      registerNameError: false,
      registerPassword: "",
      registerConfirmPassword: "",
      confirmPasswordError: false,
      changeConformPasswordField: false,
      changePasswordField: false,
      confirmError: "",
      showStrong: false,
      showPasswordStrongMessage: "",
      sameEmailError: false,
      emailConfirmError: "",
    });
    props.modelClose();
  };
  return (
    <React.Fragment>
      <div className="ModalPopup-Container">
        <div
          className="modal fade"
          id="signUpModel"
          tabIndex="-1"
          data-backdrop="static"
          role="dialog"
          aria-labelledby="signUpModelLabel"
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
                      onClick={modelClose}
                    >
                      <img src="/assets/image/close-outline.svg" alt="" />
                    </button>
                  </div>

                  <div className="clearfix"></div>

                  <div className="Modal-RegisterHead">
                    <h1>Register an account</h1>
                    <p>
                      Create an account to be able to message sellers, apply for
                      financing and much more.
                    </p>
                    <h3>
                      Already have a Finance That account?{" "}
                      <a onClick={() => props.toggleModel("signIn")}>Sign In</a>
                    </h3>
                  </div>

                  <div className="clearfix"></div>

                  <div className="Modal-SignInForm">
                    <div className="Modal-SignForm-Container">
                      <div className="SignForm-Left">
                        <label>First Name</label>
                        <input
                          type="text"
                          className="form-control"
                          name="first_name"
                          placeholder="First Name"
                          onChange={handleOnChange}
                          value={state.first_name}
                          onBlur={() =>
                            onBlurRemoveMessage("firstNameError")
                          }
                        />
                        {state.firstNameError === true ? (
                          <div
                            className="srv-validation-message"
                            style={{ color: "red" }}
                          >
                            {"Please enter first name."}
                          </div>
                        ) : (
                          ""
                        )}
                      </div>

                      <div className="SignForm-Right">
                        <label>Last Name</label>
                        <input
                          type="text"
                          id="last_name"
                          name="last_name"
                          placeholder="Last Name"
                          onChange={handleOnChange}
                          value={state.last_name}
                          onBlur={() =>
                            onBlurRemoveMessage("lastNameError")
                          }
                        />
                        {state.lastNameError === true ? (
                          <div
                            className="srv-validation-message"
                            style={{ color: "red" }}
                          >
                            {'Please enter last name'}
                          </div>
                        ) : (
                          ""
                        )}
                      </div>

                      <div className="SignForm-Left">
                        <label>Email address</label>
                        <input
                          type="text"
                          id="registerEmail"
                          name="registerEmail"
                          placeholder="Enter email address"
                          onChange={handleOnChange}
                          value={state.registerEmail}
                          onBlur={() =>
                            onBlurRemoveMessage("registerEmailError")
                          }
                        />
                        {state.registerEmailError === true ? (
                          <div
                            className="srv-validation-message"
                            style={{ color: "red" }}
                          >
                            {"Please enter a valid email address."}
                          </div>
                        ) : (
                          ""
                        )}
                      </div>

                      <div className="SignForm-Right">
                        <label>Confirm Email</label>
                        <input
                          type="text"
                          id="confirmEmail"
                          name="confirmEmail"
                          placeholder="Enter email address"
                          onChange={handleOnChange}
                          value={state.confirmEmail}
                          onBlur={() =>
                            onBlurRemoveMessage("confirmEmailError")
                          }
                        />
                        {state.confirmEmailError === true ? (
                          <div
                            className="srv-validation-message"
                            style={{ color: "red" }}
                          >
                            {state.emailConfirmError}
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>

                    <div className="clearfix"></div>

                    <div
                      className="Modal-SignForm-Container"
                      style={{ marginTop: "30px" }}
                    >
                      <div className="SignForm-Left">
                        <label>Password</label>
                        <input
                          type={state.changePasswordField ? "text" : "password"}
                          className="form-control"
                          id="registerPassword"
                          name="registerPassword"
                          placeholder="Password"
                          value={state.registerPassword}
                          onChange={handleOnChange}
                          style={{
                            fontSize:
                              state.registerPassword &&
                                !state.changePasswordField
                                ? "24px"
                                : "16px",
                          }}
                        />
                        <i
                          className="icon-pass-icon"
                          onClick={changePasswordField}
                        ></i>
                        {state.registerPassword.length > 0 ? (
                          <PasswordStrengthBar
                            className="password-strenght"
                            password={state.registerPassword}
                          />
                        ) : null}
                        {state.confirmPasswordError === true ? (
                          <div className="srv-validation-message">
                            {state.confirmError}
                          </div>
                        ) : (
                          ""
                        )}
                        {state.showStrong === true ? (
                          <div
                            className="srv-validation-message"
                            style={{ color: "red" }}
                          >
                            {state.showPasswordStrongMessage}
                          </div>
                        ) : (
                          ""
                        )}
                      </div>

                      <div className="SignForm-Right">
                        <label>Confirm Password</label>
                        <input
                          type={
                            state.changeConformPasswordField
                              ? "text"
                              : "password"
                          }
                          id="registerConfirmPassword"
                          name="registerConfirmPassword"
                          placeholder="Password"
                          value={state.registerConfirmPassword}
                          onChange={handleOnChange}
                          style={{
                            fontSize:
                              state.registerConfirmPassword &&
                                !state.changeConformPasswordField
                                ? "24px"
                                : "16px",
                          }}
                        />
                        {state.confirmPasswordError === true ? (
                          <div className="srv-validation-message">
                            {state.confirmError}
                          </div>
                        ) : (
                          ""
                        )}
                        <i
                          className="icon-pass-icon"
                          onClick={changeConformPasswordField}
                        ></i>
                      </div>
                    </div>

                    <div className="clearfix"></div>

                    <div className="Modal-ByClicked">
                      <h1>
                        By clicking "Create account", you agree to our{" "}
                        <a>Terms of Use</a> & <a>Privacy Policy</a>
                      </h1>
                    </div>

                    <div className="clearfix"></div>

                    <div className="SignIn-Container mt-0">
                      <button type="button" onClick={signUpUser}>
                        Sign Up
                      </button>
                      {/* <p>or</p> */}
                    </div>

                    <div className="clearfix"></div>

                    <div className="SignIn-SocialMedia">
                      {/* 
                                            <div className="GooglePlus">
                                                <img src="/assets/image/sprite-icon/google-icon.svg" alt="" />
                                                <h1>Sign in with Google</h1>
                                            </div> */}
                      {/* 
                                            <div className="Sign-Facebook">
                                                <img src="/assets/image/sprite-icon/facebook-icon.svg" alt="" />
                                                <h1>Sign in with Facebook</h1>
                                            </div> */}

                      {/* <div className="Sign-Linkedin">
                                                <img src="/assets/image/sprite-icon/icon-instagram.svg" alt="" />
                                                <h1>Sign in with Linkedin</h1>
                                            </div> */}
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

export default SignUpModel;
