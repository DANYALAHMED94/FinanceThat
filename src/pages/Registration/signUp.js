import React, { Component } from "react";
import { Link } from "react-router-dom";
import SimpleReactValidator from 'simple-react-validator';
import {
  register, resend_email,
  verify_user, verify_otp, send_otp
} from '../../actions/authActions';
import { history } from '../../_helpers/history'
import { connect } from 'react-redux';
import TostarMessages from '../../components/alertMessages/TostarMessages'
import FacebookLogin from '../../components/socialLogins/FacbookLogin'
import GoogleLogin from '../../components/socialLogins/GoogleLogin'
import Verification from './Verification'
import PasswordStrengthBar from 'react-password-strength-bar';
import { Helmet } from 'react-helmet';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      full_name: "",
      full_name_error: false,
      first_name: '',
      last_name: '',
      email: "",
      email_error: false,
      password: "",
      confirmPassword: "",
      submitted: false,
      confirmPasswordError: false,
      confirmError: "",
      user_type: this.props.user_type == undefined ? 1 : this.props.user_type,
      changePasswordField: false,
      changeConformPasswordField: false,
      showVerifyScreen: false,
      showStrong: false,
      showPasswordStrongMessage: "",
      confirmEmailError: false,
      emailConfirmError: '',
      firstNameError: false,
      lastNameError: false,
      telephone:''
    };
    this.validator = new SimpleReactValidator({
      autoForceUpdate: this,
      messages: {
        required: "Please enter a name to register an account.",
        // Name: 'Please enter a name to register an account.'
        // OR
      },
      messages: {
        email: "Please enter a valid email address.",
        // Name: 'Please enter a name to register an account.'
        // OR
      },
    });
  }
  componentDidMount() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.registering !== this.props.registering &&
      this.props.registering === true
    ) {
      this.setState({
        ...this.state,
        showVerifyScreen: true,
      });
    }
    if (
      prevProps.isVerify !== this.props.isVerify &&
      this.props.isVerify === true
    ) {
      const full_name = localStorage.getItem("new_user_name")
        ? localStorage.getItem("new_user_name")
        : this.state.email;
      history.push(`/seller/sign-up-confirm/${full_name}`);
    }
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  changePasswordField = () => {
    this.setState({
      ...this.state,
      changePasswordField: !this.state.changePasswordField,
    });
  };
  changeConformPasswordField = () => {
    this.setState({
      ...this.state,
      changeConformPasswordField: !this.state.changeConformPasswordField,
    });
  };
  onBlurRemoveMessage = (name) => {
    this.setState({
      ...this.state,
      [name]: false,
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("new_user_name", this.state.full_name);
    const { full_name, email, password, confirmPassword, confirmEmail, confirmEmailError,
      emailConfirmError, first_name, last_name } = this.state;
    // if (!full_name.match("[a-zA-Z0-9s]+")) {
    //   this.setState({
    //     ...this.state,
    //     full_name_error: true,
    //   });
    //   return false;
    // }
    console.log(first_name, "first_name")
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
    if (typeof email !== "undefined") {
      if (!email.match("[a-zA-Z0-9s]+")) {
        this.setState({
          ...this.state,
          email_error: true,
        });
        return false;
      } else {
        let lastAtPos = email.lastIndexOf("@");
        let lastDotPos = email.lastIndexOf(".");
        if (
          !(
            lastAtPos < lastDotPos &&
            lastAtPos > 0 &&
            email.indexOf("@@") == -1 &&
            lastDotPos > 2 &&
            email.length - lastDotPos > 2
          )
        ) {
          this.setState({
            ...this.state,
            email_error: true,
          });
          return false;
        }
      }
    }
    if (typeof confirmEmail !== "undefined") {
      if (!confirmEmail.match("[a-zA-Z0-9s]+")) {
        this.setState({
          ...this.state,
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
          this.setState({
            ...this.state,
            confirmEmailError: true,
            emailConfirmError: "Please enter a valid email address.",
          });
          return false;
        }
      }
    }

    if (
      typeof email !== "undefined" &&
      typeof confirmEmail !== "undefined"
    ) {
      if (email != confirmEmail) {
        this.setState({
          ...this.state,
          confirmEmailError: true,
          emailConfirmError: "Email do not match.",
        });
        return false;
        // errors["password"] = "Passwords don't match.";
      } else {
        this.setState({
          ...this.state,
          confirmEmailError: false,
          emailConfirmError: "",
        });
      }
    }
    const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[0-9])(?=.{8,})");

    // if (strongRegex.test(password) === false) {
    //   this.setState({
    //     ...this.state,
    //     showStrong: true,
    //     showPasswordStrongMessage:
    //       "Password must be alphanumeric with minimum length of 8 characters",
    //     confirmPasswordError: false,
    //     confirmError: "",
    //   });
    //   return false;
    // }
    // if (
    //   typeof password !== "undefined" &&
    //   typeof confirmPassword !== "undefined"
    // ) {
    //   if (password != confirmPassword) {
    //     this.setState({
    //       ...this.state,
    //       confirmPasswordError: true,
    //       confirmError: "Passwords do not match.",
    //       showStrong: false,
    //       showPasswordStrongMessage: "",
    //     });
    //     return false;
        // errors["password"] = "Passwords don't match.";
    //   } else {
    //     this.setState({
    //       ...this.state,
    //       confirmPasswordError: false,
    //       confirmError: "",
    //       showStrong: false,
    //       showPasswordStrongMessage: "",
    //     });
    //   }
    // }
    const data = {
      full_name: full_name,
      first_name: first_name,
      last_name: last_name,
      email: email,
      password: password,
      user_type: this.state.user_type,
      otp_login:true
    };
    this.props.register(data, true);
  };
  responseFacebook = (response) => {
    console.log(response);
    this.setState({
      ...this.state,
      full_name: response.name,
      email: response.email,
      login_type: 1,
      first_name: '',
      last_name: '',
      user_type: this.props.user_type == undefined ? 1 : this.props.user_type,
    });
    const data = {
      full_name: response.name,
      email: response.email,
      access_token: response.accessToken,
      login_type: 1,
      first_name: '',
      last_name: '',
      user_type: this.props.user_type == undefined ? 1 : this.props.user_type,
      otp_login:true
    };

    this.props.register(data);
    // accessToken: "EAAJ7cveabggBAMRZAay6IQMRIZAOlRILsiyXB08Mc0jitBONFiosGBBjL0pAPvwJsjqwXxagjr4R1PioQJTepgUY1qJ4CtIZAOZAYBONBLYrZBsnkoKfKpY6myFlRfFRkjw1Ac2xEHtrOgcrOP8CUKMW5c0z1FLKz18fE0ZAl4aXJ4aC7br36p4JGgdaa0x5hbdpOPbEprpAZDZD"
    // data_access_expiration_time: 1623238264
    // email: "muhammadhaziq341@gmail.com"
    // expiresIn: 5336
    // graphDomain: "facebook"
    // id: "3902310956491742"
    // name: "Muhammad Haziq"
    // picture: { data: { … } }
    // signedRequest: "Yh1KqZppDinc4gRQnoazDPCQPmy5RzFuShFYHGkzjsw.eyJ1c2VyX2lkIjoiMzkwMjMxMDk1NjQ5MTc0MiIsImNvZGUiOiJBUUJTcnVSMjQ5dDlTekh4SDhsd2xub0picV9oazJfeGt5N0UxeG9ILUNfTTJBYWp1RTJxcVdxSk43VFJOT0diZk9BMk5mbFZnR28tYVEyeUwtSU52bkRTeldMS2FBeXh3TmJRMTNJakswN3pmRFlXX0NOQVdBdUNsTzB2bm5udnNKVU41V0wzUDJlQmxzMzNqMGZFTnNGeW9zVmxLY1loSlotamVBcU9Gc1Y2MmtUMmNCcEo2eWhRT2M2b1JFekdJSEhXb0p5V3ZlUlhRS2M2OTJxcFRjM0JCWlVEeEUzeTE3M3hLRTk5OUNhamtnUEJfSUFVakQwNERVZms3LTZJMjFDVTRyWnk4b3JtVXlwTEVkRHVOcFdoc3ZFT3VIOF9Ea3dURlpXWHBZUno4TzFGZHoyR25tdTNXWGZwU0xGVzNDZ1BuQUNkUnVDRDlYdFdQTlpCQmdoWSIsImFsZ29yaXRobSI6IkhNQUMtU0hBMjU2IiwiaXNzdWVkX2F0IjoxNjE1NDYyMjY0fQ"
    // userID: "3902310956491742"
  };

  updateTelephone = (value) => {
    this.setState({
      ...this.state,
      telephone:value
    })
  }
  
  render() {
    return this.state.showVerifyScreen === true ? (
      <>
        <Verification
        updateTelephone={this.updateTelephone}
          email={this.state.email}
          {...this.props}
          validator={this.validator}
        />
      </>
    ) : (
      <React.Fragment>
        <Helmet>
          <title>
            Finance That – #1 Marketplace to buy and sell Automotive and
            Powersports vehicles with Online Instant Financing.
          </title>
          <meta
            name="description"
            content="Finance That is a marketplace for all your powersports and automotive buying, selling and financing needs under the same roof."
          />
        </Helmet>
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
                  <div className="RegisterAccount-Container RegMt">
                    <div className="Register-Head">
                      <h1>Register an account</h1>
                      <p>
                        Create an account to be able to message sellers, apply
                        for financing and much more.
                      </p>
                    </div>

                    <div className="DealerHead pt-0">
                      {/* <h3>Dealer Partner click Below to Register</h3>
                        <Link to="/dealer/register">Dealer Registration</Link> */}
                      <p>
                        Already have an Finance That account?{" "}
                        <Link to="/login">Sign In</Link>
                      </p>
                    </div>

                    <div className="row MobileSignUp-Container">

                      <div className="SignIn-Con">
                        <div className="Register-Form">
                          <label>First Name</label>
                          <input
                            type="text"
                            className="form-control"
                            name="first_name"
                            placeholder="First Name"
                            onChange={this.handleChange}
                            value={this.state.first_name}
                            onBlur={() =>
                              this.onBlurRemoveMessage("firstNameError")
                            }
                          />
                          {this.state.firstNameError === true ? (
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
                      </div>

                      <div className="SignIn-Con">
                        <div className="Register-Form">
                          <label>Last Name</label>
                          <input
                            type="text"
                            id="last_name"
                            name="last_name"
                            placeholder="Last Name"
                            onChange={this.handleChange}
                            value={this.state.last_name}
                            onBlur={() =>
                              this.onBlurRemoveMessage("lastNameError")
                            }
                          />
                          {this.state.lastNameError === true ? (
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
                      </div>


                      <div className="SignIn-Con">
                        <div className="Register-Form">
                          <label>Email address</label>
                          <input
                            type="email"
                            className="form-control"
                            name="email"
                            placeholder="Email address"
                            onChange={this.handleChange}
                            onBlur={() =>
                              this.onBlurRemoveMessage("email_error")
                            }
                          />
                          {this.state.email_error === true ? (
                            <div
                              className="srv-validation-message"
                              style={{ color: "red" }}
                            >
                              {"Please enter a valid email address."}
                            </div>
                          ) : (
                            ""
                          )}
                          {/* <label>Your Name</label>
                          <input
                            type="text"
                            className="form-control"
                            name="full_name"
                            placeholder="Your Name"
                            onChange={this.handleChange}
                            onBlur={() =>
                              this.onBlurRemoveMessage("full_name_error")
                            }
                          // onBlur={() => this.validator.showMessageFor('Name')}
                          />
                          {this.state.full_name_error === true ? (
                            <div
                              className="srv-validation-message"
                              style={{ color: "red" }}
                            >
                              {"Please enter a name to register an account."}
                            </div>
                          ) : (
                            ""
                          )} */}
                          {/* {this.validator.message('Name', this.state.full_name, 'required')} */}
                        </div>
                      </div>

                      <div className="SignIn-Con">
                        <div className="Register-Form">
                          <label>Confirm Email</label>
                          <input
                            type="text"
                            id="confirmEmail"
                            name="confirmEmail"
                            placeholder="Confirm email address"
                            onChange={this.handleChange}
                            value={this.state.confirmEmail}
                            onBlur={() =>
                              this.onBlurRemoveMessage("confirmEmailError")
                            }
                          />
                          {this.state.confirmEmailError === true ? (
                            <div
                              className="srv-validation-message"
                              style={{ color: "red" }}
                            >
                              {this.state.emailConfirmError}
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>

                      {/* <div className="SignIn-Con">
                        <div className="Register-Form">
                          <label>Password</label>
                          <input
                            type={
                              this.state.changePasswordField
                                ? "text"
                                : "password"
                            }
                            className="form-control"
                            name="password"
                            placeholder="Password"
                            onChange={this.handleChange}
                            style={{
                              fontSize:
                                this.state.password &&
                                  !this.state.changePasswordField
                                  ? "24px"
                                  : "16px",
                            }}
                          />
                          <div className="passicon">
                            <i
                              className="icon-pass-icon"
                              onClick={this.changePasswordField}
                            ></i>
                          </div>
                          {this.state.password.length > 0 ? (
                            <PasswordStrengthBar
                              className="password-strenght"
                              password={this.state.password}
                            />
                          ) : null}{" "}
                          {this.state.confirmPasswordError === true ? (
                            <div className="srv-validation-message">
                              {this.state.confirmError}
                            </div>
                          ) : (
                            ""
                          )}
                          {this.state.showStrong === true ? (
                            <div
                              className="srv-validation-message"
                              style={{ color: "red" }}
                            >
                              {this.state.showPasswordStrongMessage}
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      </div> */}

                      {/* <div className="SignIn-Con">
                        <div className="Register-Form">
                          <label>Confirm Password</label>
                          <input
                            type={
                              this.state.changeConformPasswordField
                                ? "text"
                                : "password"
                            }
                            className="form-control"
                            id="confirmPassword"
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            onChange={this.handleChange}
                            style={{
                              fontSize:
                                this.state.confirmPassword &&
                                  !this.state.changeConformPasswordField
                                  ? "24px"
                                  : "16px",
                            }}
                          />
                          {this.state.confirmPasswordError === true ? (
                            <div className="srv-validation-message">
                              {this.state.confirmError}
                            </div>
                          ) : (
                            ""
                          )}
                          <div className="passicon">
                            <i
                              className="icon-pass-icon"
                              onClick={this.changeConformPasswordField}
                            ></i>
                          </div>
                        </div>
                      </div> */}

                      <div className="col-lg-12 col-md-12 col-sm-12 col-12 p-0">
                        <div className="ByClick-Head ByClick-mt">
                          <h4 className="ml-4">
                            By clicking "Sign up", you agree to our{" "}
                            <Link to="/terms">Terms of Use</Link> &{" "}
                            <Link to="/privacy">Privacy Policy</Link>
                          </h4>
                        </div>

                        <div className="CreatAccount-Btn Create-Padd">
                          <button className="ml-3"
                            onClick={this.handleSubmit}
                            type="submit"
                            disabled={this.props.isLoading}
                          >
                            {this.props.isLoading === true ? (
                              <i
                                class="fa fa-circle-o-notch fa-spin"
                                aria-hidden="true"
                              ></i>
                            ) : (
                              "Sign up"
                            )}
                          </button>
                          {/* <span>or</span> */}
                        </div>
                      </div>
                      {/* <GoogleLogin />
                      <FacebookLogin responseFacebook={this.responseFacebook} /> */}
                    </div>

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
        {/* </section> */}
      </React.Fragment>
    );
  }
}

const actionCreators = {
  register,
  resend_email,
  verify_user,
  verify_otp,
  send_otp
};
const mapStateToProps = (state) => {
  return {
    isLoading: state.authReducer.registration.isLoading,
    registering: state.authReducer.registration.registering,
    isVerify: state.authReducer.registration.isVerify,
    otp_send: state.authReducer.authentication.otp_send,
    otp_loading: state.authReducer.authentication.otp_loading,
  };
};
export default connect(mapStateToProps, actionCreators)(SignUp);
