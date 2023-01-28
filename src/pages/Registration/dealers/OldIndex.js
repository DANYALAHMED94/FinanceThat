import React, { Component } from "react";
import SimpleReactValidator from "simple-react-validator";
import { register_dealer } from "../../../actions/dealerActions";
import { capitalize, capsProvince } from "./../../../_helpers/capitalize";
import { connect } from "react-redux";
class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 1,
      dealerName: "",
      dealerOperatingName: "",
      streetAddress: "",
      city: "",
      province: "",
      telephone: "",
      email: "",
      fax: "",
      numberOfOwners: "",
      dealerOwnerProvince: "",
      dealerPostalCode: "",
      dealerTelephone: "",
      percentageOfOwner: "",
      dateOfBirth: "",
      checkDoc: null,
      insidePhoto: null,
      outsidePhoto: null,
      licenseDoc: null,
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
  next = () => {
    // update state.step by adding to previous state

    this.setState((prevState) => {
      return { step: prevState.step + 1 };
    });
  };
  back = () => {
    // update state.step by minus 1 from previous state
    this.setState((prevState) => {
      return { step: prevState.step - 1 };
    });
  };
  _handleImageChange(e) {
    e.preventDefault();
    const name = e.target.name;
    // let reader = new FileReader();
    let file = e.target.files[0];
    this.setState({
      ...this.state,
      [name]: file,
    });
    // reader.readAsDataURL(file)
  }
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ ...this.state, [name]: value });
  };
  changeStep = (e) => {
    this.setState({
      ...this.state,
      step: e,
    });
  };
  checkBoxChange = (e) => {
    this.setState((prevState) => ({
      ...this.state,
      dealerAgreement: !prevState.dealerAgreement,
    }));
  };
  handleSubmit = (e) => {
    e.preventDefault();
    if (
      this.state.dealerName.trim() == "" ||
      this.state.dealerOperatingName.trim() == ""
    ) {
      this.setState({
        ...this.state,
        step: 1,
      });
      this.validator.showMessages();
      return false;
    }
    if (
      this.state.streetAddress.trim() == "" ||
      this.state.city.trim() == "" ||
      this.state.province.trim() == "" ||
      this.state.postalCode.trim() == "" ||
      this.state.telephone.trim() == "" ||
      this.state.email.trim() == "" ||
      this.state.fax.trim() == ""
    ) {
      this.setState({
        ...this.state,
        step: 2,
      });
      this.validator.showMessages();
      return false;
    }
    if (this.state.numberOfOwners.trim() == "") {
      this.setState({
        ...this.state,
        step: 3,
      });
      this.validator.showMessages();
      return false;
    }
    if (
      this.state.dealerOwnerProvince.trim() == "" ||
      this.state.dealerPostalCode.trim() == "" ||
      this.state.dealerTelephone.trim() == "" ||
      this.state.dateOfBirth.trim() == "" ||
      this.state.percentageOfOwner.trim() == ""
    ) {
      this.setState({
        ...this.state,
        step: 4,
      });
      this.validator.showMessages();
      return false;
    }
    if (
      this.state.insidePhoto == null ||
      this.state.outsidePhoto == null ||
      this.state.licenseDoc == null ||
      this.state.checkDoc == null
    ) {
      this.setState({
        ...this.state,
        step: 5,
      });
      this.validator.showMessages();
      return false;
    }
    // if (!this.validator.allValid()) {
    //   this.validator.showMessages();
    //   this.forceUpdate();
    //   return false;
    // }
    var formData = new FormData();
    formData.append("business_name ", this.state.dealerName);
    formData.append("operating_name", this.state.dealerOperatingName);
    formData.append("street_address", this.state.streetAddress);
    formData.append("city", this.state.city);
    formData.append("province", this.state.province);
    formData.append("postal_code", this.state.postalCode);
    formData.append("phone", this.state.telephone);
    formData.append("fax", this.state.fax);
    formData.append("email", this.state.email);
    formData.append("years_in_business", 1);
    formData.append("no_of_owner", this.state.numberOfOwners);
    formData.append("dealerOwnerProvince", this.state.dealerOwnerProvince);
    formData.append("dealerPostalCode", this.state.dealerPostalCode);
    formData.append("dealerTelephone", this.state.dealerTelephone);
    formData.append("percentageOfOwner", this.state.percentageOfOwner);
    formData.append("dateOfBirth", this.state.dateOfBirth);
    formData.append("checkDoc", this.state.checkDoc);
    formData.append("interior_business_path", this.state.insidePhoto);
    formData.append("exterior_business_path", this.state.outsidePhoto);
    formData.append("license_path", this.state.licenseDoc);
    formData.append("utillityBillDoc", this.state.utillityBillDoc);
    formData.append("dealerAgreement", this.state.dealerAgreement);
    formData.append("void_check_path", this.state.indentity);
    console.log("Form Submit", this.state);
    // const {name, email, password } = this.state;
    // this.props.register_dealer(formData);
  };
  render() {
    return (
      <React.Fragment>
        <section className="Section-DealerInfo">
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
                            onClick={() => this.changeStep(1)}
                          >
                            1
                          </a>
                        </li>
                        {this.state.step == 1 ? (
                          <li>
                            <h1>Dealership Information</h1>
                          </li>
                        ) : null}
                        <li className={this.state.step > 2 ? "active" : null}>
                          <a
                            className={
                              this.state.step == 2 ? "firstHead" : null
                            }
                            onClick={() => this.changeStep(2)}
                          >
                            2
                          </a>
                        </li>
                        {this.state.step == 2 ? (
                          <li>
                            <h1>Dealership Address</h1>
                          </li>
                        ) : null}
                        <li className={this.state.step > 3 ? "active" : null}>
                          <a
                            className={
                              this.state.step == 3 ? "firstHead" : null
                            }
                            onClick={() => this.changeStep(3)}
                          >
                            3
                          </a>
                        </li>
                        {this.state.step == 3 ? (
                          <li>
                            <h1>Dealership ownership</h1>
                          </li>
                        ) : null}
                        <li className={this.state.step > 4 ? "active" : null}>
                          <a
                            className={
                              this.state.step == 4 ? "firstHead" : null
                            }
                            onClick={() => this.changeStep(4)}
                          >
                            4
                          </a>
                        </li>
                        {this.state.step == 4 ? (
                          <li>
                            <h1>1st Owner’s information</h1>
                          </li>
                        ) : null}
                        <li className={this.state.step > 5 ? "active" : null}>
                          <a
                            className={
                              this.state.step == 5 ? "firstHead" : null
                            }
                            onClick={() => this.changeStep(5)}
                          >
                            5
                          </a>
                        </li>
                        {this.state.step == 5 ? (
                          <li>
                            <h1>Dealer Verification</h1>
                          </li>
                        ) : null}
                        <li className={this.state.step > 6 ? "active" : null}>
                          <a
                            className={
                              this.state.step == 6 ? "firstHead" : null
                            }
                            onClick={() => this.changeStep(6)}
                          >
                            6
                          </a>
                        </li>
                        {this.state.step == 6 ? (
                          <li>
                            <h1>Dealership Information</h1>
                          </li>
                        ) : null}
                      </ul>
                    </div>

                    <div className="col-lg-12 col-md-12 col-sm-12 col-12 pr-0 pl-0">
                      <div className="row">
                        {this.state.step < 6 ? (
                          <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                            <div className="DealerHead">
                              {this.state.step == 1 ? (
                                <h4>Lets set your dealership identity!</h4>
                              ) : this.state.step == 2 ? (
                                <h4>Lets set your dealership address!</h4>
                              ) : this.state.step == 3 ? (
                                <h4>
                                  Lets set your dealership’s owner(s)
                                  information
                                </h4>
                              ) : this.state.step == 4 ? (
                                <h4>
                                  Lets set your dealership’s owner(s)
                                  information
                                </h4>
                              ) : this.state.step == 5 ? (
                                <h4>
                                  Lets upload some documents for verification
                                </h4>
                              ) : null}
                            </div>
                          </div>
                        ) : null}
                        {this.state.step == 1 ? (
                          <React.Fragment>
                            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                              <div className="DealerForm">
                                <label>Dealership Legal Name</label>
                                <input
                                  type="text"
                                  name="dealerName"
                                  onChange={this.handleChange}
                                  value={this.state.dealerName}
                                />
                                {this.validator.message(
                                  "Dealer Name",
                                  this.state.dealerName,
                                  "required"
                                )}
                              </div>
                            </div>

                            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                              <div className="DealerForm">
                                <label>Dealership Operating Name</label>
                                <input
                                  type="text"
                                  name="dealerOperatingName"
                                  onChange={this.handleChange}
                                  value={this.state.dealerOperatingName}
                                />
                                {this.validator.message(
                                  "Dealer operating Name",
                                  this.state.dealerOperatingName,
                                  "required"
                                )}
                              </div>
                            </div>
                          </React.Fragment>
                        ) : this.state.step == 2 ? (
                          <React.Fragment>
                            <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                              <div className="DealerForm">
                                <label>Street Address</label>
                                <input
                                  type="text"
                                  name="streetAddress"
                                  onChange={this.handleChange}
                                  value={this.state.streetAddress}
                                />
                                {this.validator.message(
                                  "Street address",
                                  this.state.streetAddress,
                                  "required"
                                )}
                                {/* <select name="" >
                                  <option>Street Address</option>
                                  <option>Street Address</option>
                                  <option>Street Address</option>
                                </select>
                                <i className="icon-arrow-down ArrowDealer"></i> */}
                              </div>
                            </div>

                            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                              <div className="DealerForm">
                                <label>City</label>
                                <input
                                  type="text"
                                  name="city"
                                  onChange={this.handleChange}
                                  value={capitalize(this.state.city)}
                                />
                                {this.validator.message(
                                  "city",
                                  this.state.city,
                                  "required"
                                )}
                              </div>
                            </div>

                            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                              <div className="DealerForm">
                                <label>Province</label>
                                <select
                                  name="province"
                                  onChange={this.handleChange}
                                  value={capsProvince(this.state.province)}
                                >
                                  <option>Select</option>
                                  <option value="01">Province 1</option>
                                  <option value="02">Province 1</option>
                                  <option value="03">Province 1</option>
                                </select>
                                <i className="icon-arrow-down ArrowDealer"></i>
                                {this.validator.message(
                                  "province",
                                  capsProvince(this.state.province),
                                  "required"
                                )}
                              </div>
                            </div>

                            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                              <div className="DealerForm">
                                <label>Postal Code</label>
                                <input
                                  type="text"
                                  name="postalCode"
                                  onChange={this.handleChange}
                                  value={this.state.postalCode}
                                />
                                {this.validator.message(
                                  "Postal Code",
                                  this.state.postalCode,
                                  "required"
                                )}
                              </div>
                            </div>

                            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                              <div className="DealerForm">
                                <label>Telephone</label>
                                <input
                                  type="text"
                                  name="telephone"
                                  onChange={this.handleChange}
                                  value={this.state.telephone}
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
                                <label>Email</label>
                                <input
                                  type="text"
                                  name="email"
                                  onChange={this.handleChange}
                                  value={this.state.email}
                                />
                                {this.validator.message(
                                  "email",
                                  this.state.email,
                                  "required"
                                )}
                              </div>
                            </div>

                            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                              <div className="DealerForm">
                                <label>Fax</label>
                                <input
                                  type="text"
                                  name="fax"
                                  onChange={this.handleChange}
                                  value={this.state.fax}
                                />
                                {this.validator.message(
                                  "fax",
                                  this.state.fax,
                                  "required"
                                )}
                              </div>
                            </div>
                          </React.Fragment>
                        ) : this.state.step == 3 ? (
                          <React.Fragment>
                            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                              <div className="DealerForm">
                                <label>Number of Owners</label>
                                <select
                                  name="numberOfOwners"
                                  onChange={this.handleChange}
                                  value={this.state.numberOfOwners}
                                >
                                  <option>Select</option>
                                  <option value="01">01</option>
                                  <option value="02">02</option>
                                  <option value="03">03</option>
                                </select>
                                <i className="icon-arrow-down ArrowDealer"></i>
                                {this.validator.message(
                                  "No Of Owner",
                                  this.state.numberOfOwners,
                                  "required"
                                )}
                              </div>
                            </div>
                          </React.Fragment>
                        ) : this.state.step == 4 ? (
                          <React.Fragment>
                            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                              <div className="DealerForm">
                                <label>State</label>
                                <select
                                  name="dealerOwnerProvince"
                                  onChange={this.handleChange}
                                  value={this.state.dealerOwnerProvince}
                                >
                                  <option>Select</option>
                                  <option value="01">State 1</option>
                                  <option value="02">State 1</option>
                                  <option value="03">State 1</option>
                                </select>
                                <i className="icon-arrow-down ArrowDealer"></i>
                                {this.validator.message(
                                  "dealer Owner Province",
                                  this.state.dealerOwnerProvince,
                                  "required"
                                )}
                              </div>
                            </div>

                            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                              <div className="DealerForm">
                                <label>Postal Code</label>
                                <input
                                  type="text"
                                  name="dealerPostalCode"
                                  onChange={this.handleChange}
                                  value={this.state.dealerPostalCode}
                                />
                                {this.validator.message(
                                  "dealer postalcode",
                                  this.state.dealerPostalCode,
                                  "required"
                                )}
                              </div>
                            </div>

                            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                              <div className="DealerForm">
                                <label>Telephone</label>
                                <input
                                  type="text"
                                  name="dealerTelephone"
                                  onChange={this.handleChange}
                                  value={this.state.dealerTelephone}
                                />
                                {this.validator.message(
                                  "dealer telephone",
                                  this.state.dealerTelephone,
                                  "required"
                                )}
                              </div>
                            </div>

                            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                              <div className="DealerForm">
                                <label>Percentage of Ownership</label>
                                <input
                                  type="text"
                                  name="percentageOfOwner"
                                  onChange={this.handleChange}
                                  value={this.state.percentageOfOwner}
                                />
                                {this.validator.message(
                                  "percentage Of Owner",
                                  this.state.percentageOfOwner,
                                  "required"
                                )}
                              </div>
                            </div>

                            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                              <div className="DealerForm">
                                <label>Date of Birth</label>
                                <input
                                  type="date"
                                  name="dateOfBirth"
                                  onChange={this.handleChange}
                                  value={this.state.dateOfBirth}
                                />
                                {this.validator.message(
                                  "date Of Birth",
                                  this.state.dateOfBirth,
                                  "required"
                                )}
                              </div>
                            </div>
                          </React.Fragment>
                        ) : this.state.step == 5 ? (
                          <React.Fragment>
                            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                              <div className="UploadBtn-Head">
                                <label>Void Cheque/PAD Form Upload</label>
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
                                  "Check Document",
                                  this.state.checkDoc,
                                  "required"
                                )}
                              </div>
                            </div>

                            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                              <div className="UploadBtn-Head">
                                <label>Dealership Interior Photo</label>
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
                                  "Interior Photo",
                                  this.state.insidePhoto,
                                  "required"
                                )}
                              </div>
                            </div>

                            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                              <div className="UploadBtn-Head">
                                <label>Dealership Exterior Photo</label>
                              </div>

                              <div className="custom-file">
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

                            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                              <div className="UploadBtn-Head">
                                <label>
                                  Article of Incorporation or Master Business
                                  License
                                </label>
                              </div>

                              <div className="custom-file">
                                <input
                                  type="file"
                                  className="custom-file-input"
                                  name="licenseDoc"
                                  onChange={this._handleImageChange}
                                />
                                <label
                                  className="custom-file-label"
                                  htmlFor="customFile"
                                >
                                  Upload File
                                </label>
                                {this.validator.message(
                                  "license Document",
                                  this.state.licenseDoc,
                                  "required"
                                )}
                              </div>
                            </div>
                          </React.Fragment>
                        ) : this.state.step == 6 ? (
                          <React.Fragment>
                            <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                              <label className="DealerBtn">
                                Read and accept the <b>dealer agreement</b>
                                <input
                                  type="checkbox"
                                  name="dealerAgreement"
                                  onChange={this.checkBoxChange}
                                  checked={this.state.dealerAgreement}
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
                        ) : null}

                        {this.state.step > 1 && this.state.step <= 6 ? (
                          <React.Fragment>
                            {this.state.step == 3 || this.state.step == 4 ? (
                              <div className="col-lg-6 col-md-6 col-sm-12 col-12"></div>
                            ) : null}

                            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                              <div className="DealerForm">
                                <button onClick={this.back}>
                                  <i className="fa fa-angle-left"></i> Previous
                                </button>
                              </div>
                            </div>
                          </React.Fragment>
                        ) : null}
                        {this.state.step < 6 ? (
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
                      {this.state.step == 1 || this.state.step == 2 ? (
                        <img src="/assets/image/dealerinfo-image.jpg" alt="" />
                      ) : this.state.step == 3 ? (
                        <img src="/assets/image/dealerinfo-image.jpg" alt="" />
                      ) : this.state.step == 4 ? (
                        <img src="/assets/image/dealerinfo-image.jpg" alt="" />
                      ) : this.state.step == 5 ? (
                        <img src="/assets/image/dealerinfo-image.jpg" alt="" />
                      ) : this.state.step == 6 ? (
                        <img src="/assets/image/dealerinfo-image.jpg" alt="" />
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </React.Fragment>
    );
  }
}

const actionCreators = {
  register_dealer,
};
export default connect(null, actionCreators)(Index);
