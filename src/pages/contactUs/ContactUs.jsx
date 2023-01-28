import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import SimpleReactValidator from "simple-react-validator";
import ReCAPTCHA from "react-google-recaptcha";
import { connect } from "react-redux";
import { submit_contact_us } from "../../actions/contactUsAction";
import { Captcha_key } from "../../constant";
class ContactUs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      telephone: "",
      reasonOfInquiry: "Customer Service",
      message: "",
      firstNameError: false,
      firstNameMessage: "",
      lastNameError: false,
      lastNameMessage: "",
      reason: false,
      reasonMessage: "",
      email_error: false,
      emailMessage: "",
      captchaError: false,
      captchaMessage: "",
      reCaptcha: "",
    };
    this.validator = new SimpleReactValidator();
    this._reCaptchaRef = React.createRef();
  }
  componentDidMount() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
  handleOnChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      ...this.state,
      [name]: value,
    });
  };
  onBlurRemoveMessage = (name, messageName) => {
    this.setState({
      ...this.state,
      [name]: false,
      [messageName]: "",
    });
  };
  hnadleOnSubmit = (e) => {
    e.preventDefault();
    if (!this.state.firstName || !this.state.firstName.trim()) {
      this.setState({
        ...this.state,
        firstNameError: true,
        firstNameMessage: "Please enter your first name",
      });
      return false;
    }
    if (!this.state.lastName || !this.state.lastName.trim()) {
      this.setState({
        ...this.state,
        lastNameError: true,
        lastNameMessage: "Please enter your last name",
      });
      return false;
    }
    if (typeof this.state.email !== "undefined") {
      if (!this.state.email.match("[a-zA-Z0-9s]+")) {
        this.setState({
          ...this.state,
          email_error: true,
          emailMessage: "Please enter your email address",
        });
        return false;
      } else {
        let lastAtPos = this.state.email.lastIndexOf("@");
        let lastDotPos = this.state.email.lastIndexOf(".");
        if (
          !(
            lastAtPos < lastDotPos &&
            lastAtPos > 0 &&
            this.state.email.indexOf("@@") == -1 &&
            lastDotPos > 2 &&
            this.state.email.length - lastDotPos > 2
          )
        ) {
          this.setState({
            ...this.state,
            email_error: true,
            emailMessage: "Please enter a valid email address",
          });
          return false;
        }
      }
    }
    if (!this.state.reasonOfInquiry || !this.state.reasonOfInquiry.trim()) {
      this.setState({
        ...this.state,
        reason: true,
        reasonMessage: "Please enter your reason",
      });
      return false;
    }
    // if (!this.state.reCaptcha) {
    //   this.setState({
    //     ...this.state,
    //     captchaError: true,
    //     captchaMessage: "Please check Re captcha",
    //   });
    //   return false;
    // }
    const data = {
      first_name: this.state.firstName,
      last_name: this.state.lastName,
      email_address: this.state.email,
      telephone_contact: this.state.telephone,
      inquiry_reason: this.state.reasonOfInquiry,
      message: this.state.message,
      g_recaptcha_response: this.state.reCaptcha,
    };
    console.log(data);
    this.props.submit_contact_us(data);
  };
  handleChange = (value) => {
    console.log("onChange prop - Captcha value:", value);
    this.setState({
      ...this.state,
      reCaptcha: value,
      captchaError: false,
      captchaMessage: "",
    });
  };
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.submit !== this.props.submit && this.props.submit === true) {
      this.setState({
        firstName: "",
        lastName: "",
        email: "",
        telephone: "",
        reasonOfInquiry: "",
        message: "",
        firstNameError: false,
        firstNameMessage: "",
        lastNameError: false,
        lastNameMessage: "",
        reason: false,
        reasonMessage: "",
        email_error: false,
        emailMessage: "",
        captchaError: false,
        captchaMessage: "",
        reCaptcha: "",
      });
    }
  }
  render() {
    console.log(this.state.reasonOfInquiry)
    return (
      <React.Fragment>
        <Helmet>
          <title>
            Contact Us - Finance That – #1 Marketplace to buy and sell
            Automotive and Powersports vehicles with Online Instant Financing.
          </title>
          <meta
            name="description"
            content="Finance That is a marketplace for all your powersports and automotive buying, selling and financing needs under the same roof."
          />
        </Helmet>
        <section class="SecAboutUs-Banner">
          <div class="container-fluid d-none d-sm-block">
            <div class="row">
              <div class="col-xl-1 col-lg-0 col-md-0 col-sm-12 col-12"></div>

              <div class="col-xl-10 col-lg-12 col-md-12 col-sm-12 col-12">
                <div class="row">
                  <div class="col-xl-7 col-lg-7 col-md-7 col-sm-12 col-12">
                    <div class="AboutUs-HeadLeft">
                      <h1>
                        Our agents are here to assist
                        <br /> you if you need help
                      </h1>
                      <p>
                        We are here to help you in many ways. You are free to
                        Call our
                        <br /> Customer service at 1-844-354-5454,
                        <br />
                        Email us at
                        <a
                          href="mailto:info@financethat.ca"
                          rel="noopener noreferrer"
                        >
                          info@financethat.ca
                        </a>{" "}
                        fill out the form below or start live
                        <br /> chat with one of our agents.
                      </p>
                    </div>
                  </div>

                  <div class="col-xl-5 col-lg-5 col-md-5 col-sm-12 col-12">
                    <div class="AboutUs-HeadRight">
                      <img src="/assets/image/contact-img.png" alt="" />
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-xl-1 col-lg-0 col-md-0 col-sm-12 col-12"></div>
            </div>
          </div>

          <div class="container-fluid d-block d-sm-none">
            <div class="row">
              <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 pr-0 pl-0">
                <div class="row">
                  <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 pr-0 pl-0">
                    <div class="AboutUs-HeadRight">
                      <img
                        src="/assets/image/contact-img-responsive.png"
                        alt=""
                      />
                    </div>
                  </div>

                  <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <div class="AboutUs-HeadLeft">
                      <h1>
                        Our agents are here to assist
                        <br /> you if you need help
                      </h1>
                      <p>
                        We are here to help you in many ways. You are free to
                        Call our
                        <br /> Customer service at 1-844-354-5454,
                        <br />
                        Email us at
                        <a href="mailto:info@financethat.ca">
                          info@financethat.ca
                        </a>{" "}
                        fill out the form below or start live
                        <br /> chat with one of our agents.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section class="ContactUs-Section">
          <div class="container-fluid">
            <div class="row">
              <div class="col-xl-2 col-lg-1 col-md-1 col-sm-12 col-12"></div>

              <div class="col-xl-8 col-lg-10 col-md-10 col-sm-12 col-12">
                <div class="SimplyFill-Container">
                  <form onSubmit={this.hnadleOnSubmit}>
                    <div class="row">
                      <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                        <div class="SimplyFill-Head">
                          <h2>
                            Simply fill out the form and we’ll make sure your
                            message
                            <br />
                            gets into the right hands.
                          </h2>
                        </div>
                      </div>

                      <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                        <div class="SimplyFill-Form">
                          <label>First Name</label>
                          <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            placeholder="First Name"
                            onChange={this.handleOnChange}
                            value={this.state.firstName}
                            onBlur={() =>
                              this.onBlurRemoveMessage(
                                "firstNameError",
                                "firstNameMessage"
                              )
                            }
                          />
                          {this.state.firstNameError === true ? (
                            <div
                              className="srv-validation-message"
                              style={{ color: "red" }}
                            >
                              {this.state.firstNameMessage}
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>

                      <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                        <div class="SimplyFill-Form">
                          <label>Last Name</label>
                          <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            placeholder="Last Name"
                            onChange={this.handleOnChange}
                            value={this.state.lastName}
                            onBlur={() =>
                              this.onBlurRemoveMessage(
                                "lastNameError",
                                "lastNameMessage"
                              )
                            }
                          />
                          {this.state.lastNameError === true ? (
                            <div
                              className="srv-validation-message"
                              style={{ color: "red" }}
                            >
                              {this.state.lastNameMessage}
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>

                      <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                        <div class="SimplyFill-Form">
                          <label>Email</label>
                          <input
                            type="text"
                            id="email"
                            name="email"
                            placeholder="Email"
                            onChange={this.handleOnChange}
                            value={this.state.email}
                            onBlur={() =>
                              this.onBlurRemoveMessage(
                                "email_error",
                                "emailMessage"
                              )
                            }
                          />
                          {this.state.email_error === true ? (
                            <div
                              className="srv-validation-message"
                              style={{ color: "red" }}
                            >
                              {this.state.emailMessage}
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>

                      <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                        <div class="SimplyFill-Form">
                          <label>Telephone</label>
                          <input
                            type="text"
                            id="telephone"
                            name="telephone"
                            placeholder="+1 111 111 1111"
                            onChange={this.handleOnChange}
                            value={this.state.telephone}
                          />
                        </div>
                      </div>

                      <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                        <div class="SimplyFill-Form">
                          <label>Reason for Inquiry*</label>
                          <input
                            type="text"
                            id="reasonOfInquiry"
                            name="reasonOfInquiry"
                            placeholder="Please enter your reason"
                            onChange={this.handleOnChange}
                            value={this.state.reasonOfInquiry}
                            onBlur={() =>
                              this.onBlurRemoveMessage(
                                "reason",
                                "reasonMessage"
                              )
                            }
                          />
                          {this.state.reason === true ? (
                            <div
                              className="srv-validation-message"
                              style={{ color: "red" }}
                            >
                              {this.state.reasonMessage}
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                      <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                        <div class="SimplyFill-Form">
                          <textarea
                            id="message"
                            name="message"
                            placeholder="Your Message"
                            onChange={this.handleOnChange}
                            value={this.state.message}
                          ></textarea>
                        </div>
                      </div>

                      <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                        <div class="SimplyFill-Form">
                          <ReCAPTCHA
                            ref={this._reCaptchaRef}
                            sitekey={"6Lf1z1keAAAAAPooTbU1w7xpYvygFpFUEci8rDqw"}
                            onChange={this.handleChange}
                          />
                          {this.state.captchaError === true ? (
                            <div
                              className="srv-validation-message"
                              style={{ color: "red" }}
                            >
                              {this.state.captchaMessage}
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                      <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                        <div class="SimplyFill-Form mb-0">
                          <button type="submit" disabled={this.props.loading}>
                            {this.props.loading === true ? (
                              <i
                                class="fa fa-circle-o-notch fa-spin"
                                aria-hidden="true"
                              ></i>
                            ) : (
                              "Submit"
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>

              <div class="col-xl-2 col-lg-1 col-md-1 col-sm-12 col-12"></div>
            </div>
          </div>
        </section>

        <section class="Section-GeneralInquiry">
          <div class="container-fluid">
            <div class="row">
              <div class="col-xl-2 col-lg-1 col-md-1 col-sm-12 col-12"></div>

              <div class="col-xl-8 col-lg-10 col-md-10 col-sm-12 col-12">
                <div class="GeneralInquiry">
                  <div class="row">
                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                      <div class="GeneralInquiry-Head">
                        <h1>General Inquiries</h1>
                        <p>9AM-5PM EST, Monday to Friday</p>

                        <div class="GeneralCon-List">
                          <ul>
                            <li>
                              <h1>1-844-354-5454</h1>
                            </li>
                            {/* <li><h1>1-844-354-5454</h1></li> */}
                            <li>
                              <a
                                href="mailto:info@financethat.ca"
                                rel="noopener noreferrer"
                              >
                                info@financethat.ca
                              </a>
                            </li>
                          </ul>
                        </div>

                        <div class="CenterLine"></div>
                      </div>
                    </div>

                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                      <div class="GeneralInquiry-Head">
                        <h1>Financing Help</h1>
                        <p>9AM-5PM EST, Monday to Friday</p>

                        <div class="GeneralCon-List float-right">
                          <ul>
                            <li>
                              <h1>1-844-354-5454</h1>
                            </li>
                            {/* <li><h1>1-844-354-5454</h1></li> */}
                            <li>
                              <a
                                href="mailto:info@financethat.ca"
                                rel="noopener noreferrer"
                              >
                                info@financethat.ca
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-xl-2 col-lg-1 col-md-1 col-sm-12 col-12"></div>
            </div>
          </div>
        </section>
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    loading: state.contactUs.loading,
    submit: state.contactUs.submit,
  };
};
export default connect(mapStateToProps, { submit_contact_us })(ContactUs);
