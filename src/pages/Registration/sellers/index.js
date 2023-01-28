import React, { Component } from "react";
import SimpleReactValidator from "simple-react-validator";
import { register_user } from "../../../actions/sellerActions";
import { connect } from "react-redux";
import MaskedInput from "react-text-mask";

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 1,
      firstName: "",
      lastName: "",
      streetAddress: "",
      city: "",
      province: "",
      postalCode: "",
      telephone: "",
      indentity: null,
      utillityBillDoc: null,
      dateOfBirth: "",
      checkDoc: "",
      insidePhoto: null,
      outsidePhoto: null,
      dealerAgreement: false,
    };
    this.validator = new SimpleReactValidator();
    this._handleImageChange = this._handleImageChange.bind(this);
  }

  componentDidMount() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
  next = (e) => {
    e.preventDefault();
    // if(this.state.step == 1){
    // if (!this.validator.allValid()) {
    //   this.validator.showMessages();
    //   this.forceUpdate();
    //   return false;
    // }
    // }
    // update state.step by adding to previous state
    this.setState((prevState) => {
      return { step: prevState.step + 1 };
    });
  };
  back = (e) => {
    e.preventDefault();
    // update state.step by minus 1 from previous state
    this.setState((prevState) => {
      return { step: prevState.step - 1 };
    });
  };
  handleChange = (e) => {
    console.log(e);
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  _handleImageChange(e) {
    e.preventDefault();
    const name = e.target.name;
    // let reader = new FileReader();
    let file = e.target.files[0];
    this.setState({
      [name]: file,
    });
    // reader.readAsDataURL(file)
  }
  updateStep = (step) => {
    if (!this.validator.allValid()) {
      this.validator.showMessages();
      this.forceUpdate();
      return false;
    }
    this.setState({
      ...this.state,
      step: step,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    var formData = new FormData();
    if (
      this.state.firstName.trim() == "" ||
      this.state.lastName.trim() == "" ||
      this.state.streetAddress.trim() == "" ||
      this.state.city.trim() == "" ||
      this.state.province.trim() == "" ||
      this.state.postalCode.trim() == "" ||
      this.state.telephone.trim() == "" ||
      this.state.dateOfBirth.trim() == ""
    ) {
      this.setState({
        ...this.state,
        step: 1,
      });
      this.validator.showMessages();
      return false;
    }
    if (
      this.state.indentity == null ||
      this.state.insidePhoto == null ||
      this.state.outsidePhoto == null
    ) {
      this.setState({
        ...this.state,
        step: 2,
      });
      this.validator.showMessages();
      return false;
    }
    if (this.state.utillityBillDoc == null || this.state.checkDoc == null) {
      this.setState({
        ...this.state,
        step: 3,
      });
      this.validator.showMessages();
      return false;
    }
    if (!this.validator.allValid()) {
      this.validator.showMessages();
      this.forceUpdate();
      return false;
    }
    formData.append(
      "dealerName",
      this.state.firstName + " " + this.state.lastName
    );
    formData.append("streetAddress", this.state.streetAddress);
    formData.append("city", this.state.city);
    formData.append("province", this.state.province);
    formData.append("postalCode", this.state.postalCode);
    formData.append("telephone", this.state.telephone);
    formData.append("checkDoc", this.state.checkDoc);
    formData.append("insidePhoto", this.state.insidePhoto);
    formData.append("outsidePhoto", this.state.outsidePhoto);
    formData.append("utillityBillDoc", this.state.utillityBillDoc);
    formData.append("indentity", this.state.indentity);
    formData.append("dealerAgreement", this.state.dealerAgreement);
    console.log("Form Submit", this.state);
    // const {name, email, password } = this.state;
    // this.props.register(formData);
  };
  render() {
    console.log(this.state);
    return (
      <React.Fragment>
        <section className="Section-DealerInfo">
          <form>
            <div className="container-fluid">
              <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                  <div className="row">
                    <div className="col-lg-1 col-md-1 col-sm-12 col-12"></div>

                    <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                      <div className="DealerInfo-List">
                        <ul>
                          <li className={this.state.step > 1 ? "active" : null}>
                            <a
                              className={
                                this.state.step == 1 ? "firstHead" : null
                              }
                              onClick={() => this.updateStep(1)}
                            >
                              1
                            </a>
                          </li>
                          {this.state.step == 1 ? (
                            <li>
                              <h1>Personal information</h1>
                            </li>
                          ) : null}
                          <li className={this.state.step > 2 ? "active" : null}>
                            <a
                              className={
                                this.state.step == 2 ? "firstHead" : null
                              }
                              onClick={() => this.updateStep(2)}
                            >
                              2
                            </a>
                          </li>
                          {this.state.step == 2 ? (
                            <li>
                              <h1>Account Verification</h1>
                            </li>
                          ) : null}
                          <li>
                            <a
                              className={
                                this.state.step == 3 ? "firstHead" : null
                              }
                              onClick={() => this.updateStep(3)}
                            >
                              3
                            </a>
                          </li>
                          {this.state.step == 3 ? (
                            <li>
                              <h1>Account Verification</h1>
                            </li>
                          ) : null}
                        </ul>
                      </div>

                      <div className="col-lg-12 col-md-12 col-sm-12 col-12 pr-0 pl-0">
                        <div className="row">
                          <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                            <div className="DealerHead">
                              {this.state.step == 1 ? (
                                <h4>Lets set your Personal information</h4>
                              ) : this.state.step == 2 ? (
                                <h4>
                                  Upload an identification for us to Verify your
                                  Indentity
                                </h4>
                              ) : (
                                <h4>
                                  Upload an identification for us to Verify your
                                  Indentity
                                </h4>
                              )}
                            </div>
                          </div>
                          {this.state.step == 1 ? (
                            <React.Fragment>
                              <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                                <div className="DealerForm">
                                  <label>First Name</label>
                                  <input
                                    className="form-control"
                                    type="text"
                                    name="firstName"
                                    onChange={this.handleChange}
                                  />
                                  {this.validator.message(
                                    "First Name",
                                    this.state.firstName,
                                    "required"
                                  )}
                                </div>
                              </div>

                              <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                                <div className="DealerForm">
                                  <label>Last Name</label>
                                  <input
                                    className="form-control"
                                    type="text"
                                    name="lastName"
                                    onChange={this.handleChange}
                                  />
                                  {this.validator.message(
                                    "last Name",
                                    this.state.lastName,
                                    "required"
                                  )}
                                </div>
                              </div>

                              <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                                <div className="DealerForm">
                                  <label>Street address</label>
                                  <input
                                    className="form-control"
                                    type="text"
                                    name="streetAddress"
                                    onChange={this.handleChange}
                                  />
                                  {this.validator.message(
                                    "Address",
                                    this.state.streetAddress,
                                    "required"
                                  )}
                                </div>
                              </div>

                              <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                                <div className="DealerForm">
                                  <label>City</label>
                                  <input
                                    className="form-control"
                                    type="text"
                                    name="city"
                                    onChange={this.handleChange}
                                  />
                                  {this.validator.message(
                                    "City",
                                    this.state.city,
                                    "required"
                                  )}
                                </div>
                              </div>

                              <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                                <div className="DealerForm">
                                  <label>Province</label>
                                  <select
                                    className="form-control"
                                    name="province"
                                    onChange={this.handleChange}
                                  >
                                    <option>Select</option>

                                    <option value="01">01</option>
                                    <option value="02">02</option>
                                    <option value="03">03</option>
                                  </select>
                                  {/* <i className="icon-arrow-down ArrowDealer"></i> */}
                                  {this.validator.message(
                                    "province",
                                    this.state.province,
                                    "required"
                                  )}
                                </div>
                              </div>

                              <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                                <div className="DealerForm">
                                  <label>Postal Code</label>
                                  <MaskedInput
                                    // mask={[/(?!.*[DFIOQU])[A-VXY]/i, /[0-9]/, /(?!.*[DFIOQU])[A-Z]/i, ' ', /[0-9]/, /(?!.*[DFIOQU])[A-Z]/i, /[0-9]/]}
                                    mask={[
                                      /[a-zA-Z0-9]/i,
                                      /[a-zA-Z0-9]/,
                                      /[a-zA-Z0-9]/i,
                                      " ",
                                      /[a-zA-Z0-9]/,
                                      /[a-zA-Z0-9]/i,
                                      /[a-zA-Z0-9]/,
                                    ]}
                                    className="form-control"
                                    guide={false}
                                    id="postalCode"
                                    name="postalCode"
                                    placeholder="A2A 2A2"
                                    // onBlur={() => this.validator.showMessageFor('Postal Code')}
                                    value={this.state.postalCode}
                                    onChange={this.handleChange}
                                  />
                                  {/* <input className="form-control" type="text" name="postalCode" onChange={this.handleChange}
                                  /> */}
                                  {this.validator.message(
                                    "Postal Code",
                                    this.state.postalCode,
                                    "required|max:7|regex:[a-zA-Z0-9][a-zA-Z0-9][a-zA-Z0-9] [a-zA-Z0-9][a-zA-Z0-9][a-zA-Z0-9]"
                                  )}
                                </div>
                              </div>

                              <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                                <div className="DealerForm">
                                  <label>Telephone</label>
                                  <input
                                    className="form-control"
                                    type="text"
                                    name="telephone"
                                    onChange={this.handleChange}
                                  />
                                  {this.validator.message(
                                    "telephone",
                                    this.state.telephone,
                                    "required"
                                  )}
                                </div>
                              </div>

                              <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                                <div className="DealerForm">
                                  <label>Date of Birth</label>
                                  <input
                                    className="form-control"
                                    type="date"
                                    name="dateOfBirth"
                                    onChange={this.handleChange}
                                  />
                                  {this.validator.message(
                                    "date Of birth",
                                    this.state.dateOfBirth,
                                    "required"
                                  )}
                                </div>
                              </div>
                            </React.Fragment>
                          ) : this.state.step == 2 ? (
                            <React.Fragment>
                              <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                                <div className="DealerForm">
                                  <label>Verify your Indentity</label>
                                  <select
                                    className="form-control"
                                    name="indentity"
                                    onChange={this.handleChange}
                                  >
                                    <option>Verify your Indentity</option>
                                    <option>Verify your Indentity</option>
                                    <option>Verify your Indentity</option>
                                  </select>
                                  {/* <i className="icon-arrow-down ArrowDealer"></i> */}
                                  {this.validator.message(
                                    "indentity",
                                    this.state.indentity,
                                    "required"
                                  )}
                                </div>
                              </div>

                              <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                                <div className="UploadBtn-Head">
                                  <label>Upload Front Side</label>
                                </div>

                                <div className="custom-file">
                                  <input
                                    type="file"
                                    className="custom-file-input"
                                    name="insidePhoto"
                                    onChange={this._handleImageChange}
                                  />
                                  <label
                                    className="custom-file-label"
                                    htmlFor="customFile"
                                  >
                                    Upload File
                                  </label>
                                  {this.validator.message(
                                    "Front Photo",
                                    this.state.insidePhoto,
                                    "required"
                                  )}
                                </div>
                              </div>
                              <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                                <div className="UploadBtn-Head">
                                  <label>Upload Back Side</label>
                                </div>

                                <div className="custom-file">
                                  {/* <input type="file" onChange={this._handleImageChange} /> */}

                                  <input
                                    type="file"
                                    className="custom-file-input"
                                    name="outsidePhoto"
                                    onChange={this._handleImageChange}
                                  />
                                  <label
                                    className="custom-file-label"
                                    htmlFor="customFile"
                                  >
                                    Upload File
                                  </label>
                                  {this.validator.message(
                                    "Back Photo",
                                    this.state.outsidePhoto,
                                    "required"
                                  )}
                                </div>
                              </div>
                            </React.Fragment>
                          ) : (
                            <React.Fragment>
                              <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                                <div className="UploadBtn-Head">
                                  <label>
                                    Upload Utility Bill with full name & address
                                    visible
                                  </label>
                                </div>
                                <div className="custom-file">
                                  <input
                                    type="file"
                                    className="custom-file-input"
                                    name="utillityBillDoc"
                                    onChange={this._handleImageChange}
                                  />
                                  <label
                                    className="custom-file-label"
                                    htmlFor="customFile"
                                  >
                                    Upload File
                                  </label>
                                  {this.validator.message(
                                    "Utillity Bill",
                                    this.state.utillityBillDoc,
                                    "required"
                                  )}
                                </div>
                              </div>
                              <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                                <div className="UploadBtn-Head">
                                  <label>
                                    Copy of a Void Cheque or pre-authorsed Debit
                                  </label>
                                </div>
                                <div className="custom-file">
                                  <input
                                    type="file"
                                    className="custom-file-input"
                                    name="checkDoc"
                                    onChange={this._handleImageChange}
                                  />
                                  <label
                                    className="custom-file-label"
                                    htmlFor="customFile"
                                  >
                                    Upload File
                                  </label>
                                  {this.validator.message(
                                    "Check",
                                    this.state.checkDoc,
                                    "required"
                                  )}
                                </div>
                              </div>
                              <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                                <label className="DealerBtn mt-0">
                                  I Have Read & Accept the
                                  <span style={{ color: "#2f80ed" }}>
                                    Private Seller Agreement
                                  </span>
                                  <input
                                    type="checkbox"
                                    name="dealerAgreement"
                                    onChange={this.handleChange}
                                  />
                                  <span className="BtnMark"></span>
                                </label>
                                <div className="DealerPara-Head">
                                  <h3>
                                    (If you need more information regarding our
                                    agreement, fell free to email us at)
                                  </h3>
                                </div>
                              </div>
                            </React.Fragment>
                          )}
                          {this.state.step == 2 ? (
                            <React.Fragment>
                              <div className="col-lg-6 col-md-6 col-sm-12 col-12"></div>
                              <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                                <div className="DealerForm">
                                  <button onClick={this.back}>
                                    <i className="fa fa-angle-left"></i>{" "}
                                    Previous
                                  </button>
                                </div>
                              </div>
                            </React.Fragment>
                          ) : null}
                          {this.state.step < 3 ? (
                            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                              <div className="DealerForm">
                                <button className="active" onClick={this.next}>
                                  Next
                                  <i className="fa fa-angle-right"></i>
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                              <div className="DealerForm">
                                <button
                                  type="submit"
                                  className="active"
                                  onClick={this.handleSubmit}
                                >
                                  Submit
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-5 col-md-5 col-sm-12 col-12 pr-0">
                      <div className="DealerHead-Image">
                        {this.state.step < 3 ? (
                          <img src="/assets/image/seller-image.jpg" alt="" />
                        ) : (
                          <img src="/assets/image/seller-image.jpg" alt="" />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </section>
      </React.Fragment>
    );
  }
}
const actionCreater = {
  register_user,
};
export default connect(null, actionCreater)(Index);
