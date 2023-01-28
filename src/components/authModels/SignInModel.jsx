import React, { useState, useRef } from "react";
import { useGoogleLogin } from "react-google-login";
const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

const SignInModel = (props) => {
  const [state, setState] = useState({
    userEmail: "",
    email_error: false,
    emailMessage: "",
    userPassword: "",
    password_error: false,
    passwordMessage: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value,
    });
  };
  const login_user = (e) => {
    e.preventDefault();
    const { userEmail, userPassword } = state;
    if (typeof userEmail !== "undefined") {
      if (!userEmail.match("[a-zA-Z0-9s]+")) {
        setState({
          ...state,
          email_error: true,
          emailMessage: "Please enter your email address",
        });
        return false;
      } else {
        let lastAtPos = userEmail.lastIndexOf("@");
        let lastDotPos = userEmail.lastIndexOf(".");
        if (
          !(
            lastAtPos < lastDotPos &&
            lastAtPos > 0 &&
            userEmail.indexOf("@@") == -1 &&
            lastDotPos > 2 &&
            userEmail.length - lastDotPos > 2
          )
        ) {
          setState({
            ...state,
            email_error: true,
            emailMessage: "Please enter a valid email address",
          });
          return false;
        }
      }
    }
    if (typeof userPassword !== "undefined") {
      if (!userPassword.match("[a-zA-Z0-9s]+")) {
        setState({
          ...state,
          password_error: true,
          passwordMessage: "Please enter your password",
        });
        return false;
      }
    }
    if (userEmail && userPassword) {
      const data = {
        email: userEmail,
        password: userPassword,
        redirect: false,
      };
      props.login(data);
    }
  };
  const onBlurRemoveMessage = (name, messageName) => {
    setState({
      ...state,
      [name]: false,
      [messageName]: "",
    });
  };
  const modelClose = () => {
    setState({
      ...state,
      userEmail: "",
      email_error: false,
      emailMessage: "",
      userPassword: "",
      password_error: false,
      passwordMessage: "",
    });
    props.modelClose();
  };
  const onSuccess = (res) => {
    console.log("Login Success: currentUser:", res.profileObj);
    props.responseGoogle(res);
  };

  const onFailure = (res) => {
    console.log("Login failed: res:", res);
    // alert(
    //   `Failed to login. 😢 Please ping this to repo owner twitter.com/sivanesh_fiz`
    // );
  };

  const { signIn } = useGoogleLogin({
    onSuccess,
    onFailure,
    clientId,
    // isSignedIn: true,
    accessType: "offline",
    // responseType: 'code',
    // prompt: 'consent',
  });
  console.log(props, "Sigin In Model");
  return (
    <React.Fragment>
      <div className="ModalPopup-Container">
        <div
          className="modal fade"
          id="signInModel"
          tabIndex="-1"
          role="dialog"
          data-backdrop="static"
          aria-labelledby="signInModelLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-body">
                <form onSubmit={login_user}>
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

                    <div className="Modal-SignInHead">
                      <h1>Sign In</h1>
                      <p>
                        Don't have an account?{" "}
                        <a onClick={() => props.toggleModel("signUp")}>
                          Sign Up
                        </a>
                      </p>
                    </div>

                    <div className="clearfix"></div>

                    <div className="Modal-SignInForm">
                      <div className="Modal-SignForm-Container">
                        <div className="SignForm-Left">
                          <label>Email address</label>
                          <input
                            type="text"
                            id="userEmail"
                            name="userEmail"
                            placeholder="Enter email address"
                            onChange={handleOnChange}
                            onBlur={() =>
                              onBlurRemoveMessage("email_error", "emailMessage")
                            }
                            value={state.userEmail}
                          />
                          {state.email_error === true ? (
                            <div
                              className="srv-validation-message"
                              style={{ color: "red" }}
                            >
                              {state.emailMessage}
                            </div>
                          ) : (
                            ""
                          )}
                        </div>

                        <div className="SignForm-Right">
                          <label>Password</label>
                          <input
                            type="password"
                            id="userPassword"
                            name="userPassword"
                            placeholder="Password"
                            onChange={handleOnChange}
                            value={state.userPassword}
                            onBlur={() =>
                              onBlurRemoveMessage(
                                "password_error",
                                "passwordMessage"
                              )
                            }
                            style={{
                              fontSize:
                                state.userPassword !== "" ? "24px" : "16px",
                            }}
                          />
                          {state.password_error === true ? (
                            <div
                              className="srv-validation-message"
                              style={{ color: "red" }}
                            >
                              {state.passwordMessage}
                            </div>
                          ) : (
                            ""
                          )}
                          {/* <a >Forgot password?</a> */}
                        </div>
                      </div>

                      <div className="clearfix"></div>

                      <div className="SignIn-Container">
                        <button type="submit">Sign In</button>
                        {/* <p>or</p> */}
                      </div>

                      <div className="clearfix"></div>

                      <div className="SignIn-SocialMedia">
                        {/* 
                                              <div className="GooglePlus" onClick={signIn}>
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
                </form>

                <div className="Admin-SignInRight">
                  <h4>
                    Buy, sell and get financing
                    <br /> with a click of a button.
                  </h4>
                  <img
                    src="/assets/image/Modal-img.png"
                    width="636"
                    height="863"
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

export default SignInModel;
