import React, { Component } from "react";
import SimpleReactValidator from "simple-react-validator";
import DealerCover from "./DealerCover.jsx";
import { register_dealer } from "../../../actions/dealerActions";
import TostarMessages from "../../../components/alertMessages/TostarMessages";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import NumberFormat from "react-number-format";
import { toastr } from "react-redux-toastr";
import { capitalize, capsProvince } from "./../_helpers/capitalize";

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 1,
      changePasswordField: false,
      dealerName: "",
      dealerOperatingName: "",
      streetAddress: "",
      city: "",
      postalCode: "",
      province: "",
      telephone: "",
      email: "",
      fax: "",
      full_name: "",
      password: "",
      numberOfOwners: "",
      checkDoc: null,
      checkDocName: "",
      insidePhoto: null,
      insidePhotoName: "",
      outsidePhoto: null,
      outsidePhotoName: "",
      licenseDoc: null,
      licenseDocName: "",
      dealerAgreement: false,
      user_type: this.props.user_type == undefined ? 2 : this.props.user_type,
      ownerIndex: 0,
      owner: [],
      dealer_type: "",
      confirmPassword: "",
      confirmPasswordError: false,
      delaerOptions: [
        {
          value: "Dealership Information",
          id: 1,
          current: true,
          complete: false,
        },
        {
          value: "Dealership Address",
          id: 2,
          current: false,
          complete: false,
        },
        {
          value: "Dealership ownership",
          id: 3,
          current: false,
          complete: false,
        },
        {
          value: "1st Owner’s information",
          id: 4,
          current: false,
          complete: false,
        },
        {
          value: "Dealer Verification",
          id: 5,
          current: false,
          complete: false,
        },
        {
          value: "Dealership Information",
          id: 6,
          current: false,
          complete: false,
        },
      ],
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
      return {
        step: prevState.step - 1,
        delaerOptions: this.state.delaerOptions.slice().map((item) => {
          if (item.id == prevState.step - 1) {
            return {
              ...item,
              complete: false,
              current: true,
            };
          }
          return { ...item, current: false };
        }),
      };
    });
  };

  _handleImageChange(e) {
    e.preventDefault();
    let file = e.target.files[0];
    if (
      file.type != "image/png" &&
      file.type != "image/jpg" &&
      file.type != "image/jpeg" &&
      file.type !=
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document" &&
      file.type != "application/pdf" &&
      file.type != "application/docs"
    ) {
      toastr.error(
        "Error",
        "File does not support. You must use pdf, docs, .png, jpeg or .jpg "
      );
      return false;
    }
    if (file.size > 2 * 1024 * 1024) {
      toastr.error("Error", "Please upload a file smaller than 2 MB");
      return false;
    }
    const name = e.target.name;
    const fileNameState = e.target.name + "Name";
    // let reader = new FileReader();
    const fileName = e.target.files[0].name;
    this.setState({
      ...this.state,
      [name]: file,
      [fileNameState]: fileName,
    });
    // reader.readAsDataURL(file)
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ ...this.state, [name]: value });
  };

  handleOnClickOwnerNext = (index) => {
    if (!this.validator.fieldValid(`owner_first_name_${index}`)) {
      this.validator.showMessageFor(`owner_first_name_${index}`);
      this.forceUpdate();
      return false;
    }
    if (!this.validator.fieldValid(`owner_last_name_${index}`)) {
      this.validator.showMessageFor(`owner_last_name_${index}`);
      this.forceUpdate();
      return false;
    }
    if (!this.validator.fieldValid(`owner_last_name_${index}`)) {
      this.validator.showMessageFor(`owner_last_name_${index}`);
      this.forceUpdate();
      return false;
    }
    if (!this.validator.fieldValid(`owner_full_address_${index}`)) {
      this.validator.showMessageFor(`owner_full_address_${index}`);
      this.forceUpdate();
      return false;
    }
    if (!this.validator.fieldValid(`owner_city_${index}`)) {
      this.validator.showMessageFor(`owner_city_${index}`);
      this.forceUpdate();
      return false;
    }
    if (!this.validator.fieldValid(`owner_province_${index}`)) {
      this.validator.showMessageFor(`owner_province_${index}`);
      this.forceUpdate();
      return false;
    }
    if (!this.validator.fieldValid(`owner_postal_code_${index}`)) {
      this.validator.showMessageFor(`owner_postal_code_${index}`);
      this.forceUpdate();
      return false;
    }
    if (!this.validator.fieldValid(`owner_telephone_${index}`)) {
      this.validator.showMessageFor(`owner_telephone_${index}`);
      this.forceUpdate();
      return false;
    }
    if (!this.validator.fieldValid(`percentage_of_ownership_${index}`)) {
      this.validator.showMessageFor(`percentage_of_ownership_${index}`);
      this.forceUpdate();
      return false;
    }

    this.setState({
      ...this.state,
      ownerIndex: index + 1,
      delaerOptions: this.state.delaerOptions.map((item) => {
        if (item.id == 4) {
          return {
            ...item,
            value:
              index + 1 == 1
                ? "2nd Owner’s information"
                : index + 1 == 2
                ? "3rd Owner’s information"
                : `${index + 1}th Owner’s information`,
          };
        }
        return item;
      }),
    });
  };
  handleOnClickOwnerBack = (index) => {
    this.setState({
      ...this.state,
      ownerIndex: index,
      delaerOptions: this.state.delaerOptions.map((item) => {
        if (item.id == 4) {
          return {
            ...item,
            value:
              index == 0
                ? "1st Owner’s information"
                : index == 1
                ? "2nd Owner’s information"
                : index == 2
                ? "3rd Owner’s information"
                : `${index + 1}th Owner’s information`,
          };
        }
        return item;
      }),
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.numberOfOwners !== this.state.numberOfOwners &&
      this.state.numberOfOwners !== undefined
    ) {
      const owner = [];
      if (this.state.owner.length < this.state.numberOfOwners) {
        for (
          let index = this.state.owner.length;
          index < this.state.numberOfOwners;
          index++
        ) {
          owner.push({
            first_name: "",
            last_name: "",
            full_address: "",
            owner_city: "",
            owner_province: "",
            owner_postal_code: "",
            telephone: "",
            percentage_of_ownership: "",
            date_of_birth: "",
          });
        }
        this.setState({
          ...this.state,
          owner: [...this.state.owner, ...owner],
        });
      } else {
        this.setState({
          ...this.state,
          owner: this.state.owner.slice(0, -1),
        });
      }
    }
    if (prevProps.dealer_register !== this.props.dealer_register) {
      this.setState({
        ...this.state,
        step: 7,
      });
    }
  }

  handleChangeOwner = (e, ownerIndex) => {
    if (e.target.value > 100 && e.target.name == "percentage_of_ownership") {
      this.setState((prevState) => ({
        ...this.state,
        owner: prevState.owner.slice().map((item, index) => {
          if (index === ownerIndex) {
            return {
              ...item,
              percentage_of_ownership: item.percentage_of_ownership,
            };
          }
          return item;
        }),
      }));
      return false;
    } else {
      this.setState({
        ...this.state,
        owner: this.state.owner.slice().map((item, index) => {
          if (index === ownerIndex) {
            return {
              ...item,
              [e.target.name]: e.target.value,
            };
          }
          return item;
        }),
      });
    }
  };

  // changeStep = e => {

  //   this.setState({
  //     ...this.state,
  //     step: e
  //   })
  // }
  changeStep = (e) => {
    this.setState({
      ...this.state,
      step: e,
      delaerOptions: this.state.delaerOptions.slice().map((item) => {
        return {
          ...item,
          current: item.id == e ? true : false,
        };
      }),
    });
  };
  changeStepButton = (prev, current) => {
    if (prev == 2) {
      if (
        typeof this.state.password !== "undefined" &&
        typeof this.state.confirmPassword !== "undefined"
      ) {
        if (this.state.password != this.state.confirmPassword) {
          this.setState({
            ...this.state,
            confirmPasswordError: true,
            confirmError: "Passwords do not match.",
          });
          return false;
        } else {
          this.setState({
            ...this.state,
            confirmPasswordError: false,
            confirmError: "",
          });
        }
      }
    }
    // if (prev === 1) {
    //   if (!this.validator.fieldValid('Dealer Name')) {
    //     this.validator.showMessageFor('Dealer Name')
    //     this.forceUpdate();
    //     return false
    //   }
    //   if (!this.validator.fieldValid('Dealer Operation Name')) {
    //     this.validator.showMessageFor('Dealer Operation Name')
    //     this.forceUpdate();
    //     return false
    //   }
    // }
    // if (prev === 2) {
    //   if (!this.validator.fieldValid('Street address')) {
    //     this.validator.showMessageFor('Street address')
    //     this.forceUpdate();
    //     return false
    //   }
    //   if (!this.validator.fieldValid('city')) {
    //     this.validator.showMessageFor('city')
    //     this.forceUpdate();
    //     return false
    //   }
    //   if (!this.validator.fieldValid('province')) {
    //     this.validator.showMessageFor('province')
    //     this.forceUpdate();
    //     return false
    //   }
    //   if (!this.validator.fieldValid('Postal Code')) {
    //     this.validator.showMessageFor('Postal Code')
    //     this.forceUpdate();
    //     return false
    //   }
    //   if (!this.validator.fieldValid('email')) {
    //     this.validator.showMessageFor('email')
    //     this.forceUpdate();
    //     return false
    //   }
    //   if (!this.validator.fieldValid('Full Name')) {
    //     this.validator.showMessageFor('Full Name')
    //     this.forceUpdate();
    //     return false
    //   }
    //   if (!this.validator.fieldValid('Password')) {
    //     this.validator.showMessageFor('Password')
    //     this.forceUpdate();
    //     return false
    //   }
    //   if (!this.validator.fieldValid('telephone')) {
    //     this.validator.showMessageFor('telephone')
    //     this.forceUpdate();
    //     return false
    //   }
    // }
    // if (prev === 3) {
    //   if (!this.validator.fieldValid('num_of_owner')) {
    //     this.validator.showMessageFor('num_of_owner')
    //     this.forceUpdate();
    //     return false
    //   }
    // }
    if (prev === 4) {
      if (
        !this.validator.fieldValid(
          `owner_first_name_${this.state.owner.length - 1}`
        )
      ) {
        this.validator.showMessageFor(
          `owner_first_name_${this.state.owner.length - 1}`
        );
        this.forceUpdate();
        return false;
      }
      if (
        !this.validator.fieldValid(
          `owner_last_name_${this.state.owner.length - 1}`
        )
      ) {
        this.validator.showMessageFor(
          `owner_last_name_${this.state.owner.length - 1}`
        );
        this.forceUpdate();
        return false;
      }
      if (
        !this.validator.fieldValid(
          `owner_last_name_${this.state.owner.length - 1}`
        )
      ) {
        this.validator.showMessageFor(
          `owner_last_name_${this.state.owner.length - 1}`
        );
        this.forceUpdate();
        return false;
      }
      if (
        !this.validator.fieldValid(
          `owner_full_address_${this.state.owner.length - 1}`
        )
      ) {
        this.validator.showMessageFor(
          `owner_full_address_${this.state.owner.length - 1}`
        );
        this.forceUpdate();
        return false;
      }
      if (
        !this.validator.fieldValid(`owner_city_${this.state.owner.length - 1}`)
      ) {
        this.validator.showMessageFor(
          `owner_city_${this.state.owner.length - 1}`
        );
        this.forceUpdate();
        return false;
      }
      if (
        !this.validator.fieldValid(
          `owner_province_${this.state.owner.length - 1}`
        )
      ) {
        this.validator.showMessageFor(
          `owner_province_${this.state.owner.length - 1}`
        );
        this.forceUpdate();
        return false;
      }
      if (
        !this.validator.fieldValid(
          `owner_postal_code_${this.state.owner.length - 1}`
        )
      ) {
        this.validator.showMessageFor(
          `owner_postal_code_${this.state.owner.length - 1}`
        );
        this.forceUpdate();
        return false;
      }
      if (
        !this.validator.fieldValid(
          `owner_telephone_${this.state.owner.length - 1}`
        )
      ) {
        this.validator.showMessageFor(
          `owner_telephone_${this.state.owner.length - 1}`
        );
        this.forceUpdate();
        return false;
      }
      if (
        !this.validator.fieldValid(
          `percentage_of_ownership_${this.state.owner.length - 1}`
        )
      ) {
        this.validator.showMessageFor(
          `percentage_of_ownership_${this.state.owner.length - 1}`
        );
        this.forceUpdate();
        return false;
      }
    }
    // if (prev === 5) {
    //   if (!this.validator.fieldValid('Check Document')) {
    //     this.validator.showMessageFor('Check Document')
    //     this.forceUpdate();
    //     return false
    //   }
    //   if (!this.validator.fieldValid('Interior Photo')) {
    //     this.validator.showMessageFor('Interior Photo')
    //     this.forceUpdate();
    //     return false
    //   }
    //   if (!this.validator.fieldValid('Back Photo')) {
    //     this.validator.showMessageFor('Back Photo')
    //     this.forceUpdate();
    //     return false
    //   }
    //   if (!this.validator.fieldValid('license Document')) {
    //     this.validator.showMessageFor('license Document')
    //     this.forceUpdate();
    //     return false
    //   }

    // }
    this.setState({
      ...this.state,
      step: current,
      delaerOptions: this.state.delaerOptions.slice().map((item) => {
        if (item.id == prev) {
          return {
            ...item,
            complete: true,
            current: false,
          };
        }
        return {
          ...item,
          current: item.id == current ? true : false,
        };
      }),
    });
  };

  checkBoxChange = (e) => {
    this.setState((prevState) => ({
      ...this.state,
      dealerAgreement: !prevState.dealerAgreement,
    }));
  };

  change_dealer_type = (e) => {
    this.setState({
      ...this.state,
      dealer_type: e,
    });
  };

  changePasswordField = () => {
    this.setState({
      ...this.state,
      changePasswordField: !this.state.changePasswordField,
    });
  };
  changeConfirmPasswordField = () => {
    this.setState({
      ...this.state,
      changeConfirmPasswordField: !this.state.changeConfirmPasswordField,
    });
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
      this.state.email.trim() == ""
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

    var formData = new FormData();
    formData.append("user_type", this.state.user_type);
    formData.append("business_name ", this.state.dealerName);
    formData.append("operating_name", this.state.dealerOperatingName);
    formData.append("street_address", this.state.streetAddress);
    formData.append("city", this.state.city);
    formData.append("province", this.state.province);
    formData.append("postal_code", this.state.postalCode);
    formData.append("phone", this.state.telephone);
    formData.append("fax", this.state.fax);
    formData.append("full_name", this.state.full_name);
    formData.append("password", this.state.password);
    formData.append("email", this.state.email);
    formData.append("owner", JSON.stringify(this.state.owner));
    formData.append("email", this.state.email);
    formData.append("years_in_business", 1);
    formData.append("no_of_owner", this.state.numberOfOwners);
    formData.append("void_check_path", this.state.checkDoc);
    formData.append("interior_business_path", this.state.insidePhoto);
    formData.append("exterior_business_path", this.state.outsidePhoto);
    formData.append("license_path", this.state.licenseDoc);
    formData.append("utillityBillDoc", this.state.utillityBillDoc);
    formData.append("dealerAgreement", this.state.dealerAgreement);
    formData.append("owner", JSON.stringify(this.state.owner));
    // const {name, email, password } = this.state;
    this.props.register_dealer(formData);
  };

  render() {
    if (this.state.dealer_type === "") {
      return <DealerCover change_dealer_type={this.change_dealer_type} />;
    }
    return (
      <React.Fragment>
        {this.state.step == 7 ? (
          <React.Fragment>
            <section class="Section-ListandGrid p-0">
              <div class="container-fluid">
                <div class="row">
                  <div class="col-lg-12 col-md-12 col-sm-12 col-12">
                    <div class="row">
                      <div class="col-lg-1 col-md-1 col-sm-12 col-12"></div>

                      <div class="col-lg-6 col-md-6 col-sm-12 col-12">
                        <div class="RegisterAccount-Container">
                          <div class="row">
                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                              <div class="BuyerSign-Congress">
                                <h1>Congratulations!</h1>
                                <h2>Hi, {this.state.dealerName}</h2>
                                <h3>
                                  You have successfully created your
                                  <br /> account.
                                </h3>
                                <p>
                                  We have sent you a link to confirm your email
                                  to gersam.adu@gmail.com
                                  <br />
                                  Once confirmed you will be able start buying
                                  and selling on Finance That.
                                </p>
                                <Link to="/">Go to home page</Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="col-lg-5 col-md-5 col-sm-12 col-12 pr-0">
                        <div class="Sec-SelectAccount">
                          <div class="SelectText">
                            <h1>
                              Buy, sell and get financing
                              <br /> with a click of a button.
                            </h1>
                          </div>
                          <img
                            src="/assets/image/select-img-1.png"
                            width="965"
                            height="1080"
                            alt=""
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <section className="Section-DealerInfo">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                    <div className="row">
                      {/* <div className="col-lg-1 col-md-1 col-sm-12 col-12"></div> */}

                      <div className="col-lg-7 col-md-7 col-sm-12 col-12">
                        <div className="DealerInfo-List Dealer-infopadd">
                          <ul>
                            {(this.state.delaerOptions || []).map(
                              (item, index) => (
                                <React.Fragment key={index}>
                                  <li
                                    className={
                                      item.complete == true ? "active" : null
                                    }
                                  >
                                    <a
                                      className={
                                        item.complete == true ||
                                        item.current == true
                                          ? "firstHead"
                                          : null
                                      }
                                      onClick={
                                        item.current == false &&
                                        item.complete == true
                                          ? () => this.changeStep(item.id)
                                          : item.current == true &&
                                            item.complete == false
                                          ? () => this.changeStep(item.id)
                                          : ""
                                      }
                                    >
                                      {item.id}
                                    </a>
                                  </li>
                                  {item.current ? (
                                    <React.Fragment>
                                      <li>
                                        <h1>{item.value}</h1>
                                      </li>
                                    </React.Fragment>
                                  ) : (
                                    ""
                                  )}
                                </React.Fragment>
                              )
                            )}
                          </ul>
                        </div>

                        <div className="col-lg-12 col-md-12 col-sm-12 col-12 pr-0 pl-0">
                          <div className="row Dealer-infoform">
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
                                      Lets upload some documents for
                                      verification
                                    </h4>
                                  ) : null}
                                </div>
                              </div>
                            ) : null}
                            {this.state.step == 1 ? (
                              <React.Fragment>
                                <div className="SignIn-Con">
                                  <div className="DealerForm">
                                    <label>Dealership Legal Name</label>
                                    <input
                                      className="form-control"
                                      type="text"
                                      name="dealerName"
                                      onChange={this.handleChange}
                                      value={this.state.dealerName}
                                      onBlur={() =>
                                        this.validator.showMessageFor(
                                          "Dealer Name"
                                        )
                                      }
                                    />
                                    {this.validator.message(
                                      "Dealer Name",
                                      this.state.dealerName,
                                      "required"
                                    )}
                                  </div>
                                </div>

                                <div className="SignIn-Con">
                                  <div className="DealerForm">
                                    <label>Dealership Operating Name</label>
                                    <input
                                      className="form-control"
                                      type="text"
                                      name="dealerOperatingName"
                                      onChange={this.handleChange}
                                      value={this.state.dealerOperatingName}
                                      onBlur={() =>
                                        this.validator.showMessageFor(
                                          "Dealer Operation Name"
                                        )
                                      }
                                    />
                                    {this.validator.message(
                                      "Dealer Operation Name",
                                      this.state.dealerOperatingName,
                                      "required"
                                    )}
                                  </div>
                                </div>
                              </React.Fragment>
                            ) : this.state.step == 2 ? (
                              <React.Fragment>
                                <div className="DealerShip-Con">
                                  <div className="DealerForm">
                                    <label>Street Address</label>
                                    <input
                                      className="form-control"
                                      type="text"
                                      name="streetAddress"
                                      onChange={this.handleChange}
                                      value={this.state.streetAddress}
                                      onBlur={() =>
                                        this.validator.showMessageFor(
                                          "Street address"
                                        )
                                      }
                                    />
                                    {this.validator.message(
                                      "Street address",
                                      this.state.streetAddress,
                                      "required"
                                    )}
                                  </div>
                                </div>

                                <div className="SignIn-Con">
                                  <div className="DealerForm">
                                    <label>City</label>
                                    <input
                                      className="form-control"
                                      type="text"
                                      name="city"
                                      onChange={this.handleChange}
                                      value={capitalize(this.state.city)}
                                      onBlur={() =>
                                        this.validator.showMessageFor("city")
                                      }
                                    />
                                    {this.validator.message(
                                      "city",
                                      this.state.city,
                                      "required"
                                    )}
                                  </div>
                                </div>

                                <div className="SignIn-Con">
                                  <div className="DealerForm">
                                    <label>Province</label>
                                    <select
                                      className="form-control"
                                      name="province"
                                      onChange={this.handleChange}
                                      value={capsProvince(this.state.province)}
                                      onBlur={() =>
                                        this.validator.showMessageFor(
                                          "province"
                                        )
                                      }
                                    >
                                      <option>Select</option>
                                      <option value="AB">Alberta</option>
                                      <option value="BC">
                                        British Columbia
                                      </option>
                                      <option value="MB">Manitoba</option>
                                      <option value="NB">New Brunswick</option>
                                      <option value="NL">
                                        Newfoundland and Labrador
                                      </option>
                                      <option value="NS">Nova Scotia</option>
                                      <option value="ON">Ontario</option>
                                      <option value="PE">
                                        Prince Edward Island
                                      </option>
                                      <option value="QC">Quebec</option>
                                      <option value="SK">Saskatchewan</option>
                                      <option value="NT">
                                        Northwest Territories
                                      </option>
                                      <option value="NU">Nunavut</option>
                                      <option value="YT">Yukon</option>
                                    </select>
                                    {/* <i className="icon-arrow-down ArrowDealer"></i> */}
                                    {this.validator.message(
                                      "province",
                                      this.state.province,
                                      "required"
                                    )}
                                  </div>
                                </div>

                                <div className="SignIn-Con">
                                  <div className="DealerForm">
                                    <label>Postal Code</label>
                                    <NumberFormat
                                      className="form-control"
                                      format="#####"
                                      onChange={this.handleChange}
                                      value={this.state.postalCode}
                                      name="postalCode"
                                      onBlur={() =>
                                        this.validator.showMessageFor(
                                          "Postal Code"
                                        )
                                      }
                                    />
                                    {/* <input className="form-control" type="number" name="postalCode" onChange={this.handleChange} value={this.state.postalCode} /> */}
                                    {this.validator.message(
                                      "Postal Code",
                                      this.state.postalCode,
                                      "required"
                                    )}
                                  </div>
                                </div>

                                <div className="SignIn-Con">
                                  <div className="DealerForm">
                                    <label>Email Address</label>
                                    <input
                                      className="form-control"
                                      type="text"
                                      name="email"
                                      onChange={this.handleChange}
                                      value={this.state.email}
                                      onBlur={() =>
                                        this.validator.showMessageFor("email")
                                      }
                                    />
                                    {this.validator.message(
                                      "email",
                                      this.state.email,
                                      "required|email"
                                    )}
                                  </div>
                                </div>

                                <div className="SignIn-Con">
                                  <div className="DealerForm">
                                    <label>Full Name</label>
                                    <input
                                      className="form-control"
                                      type="text"
                                      name="full_name"
                                      onChange={this.handleChange}
                                      value={this.state.full_name}
                                      onBlur={() =>
                                        this.validator.showMessageFor(
                                          "Full Name"
                                        )
                                      }
                                    />
                                    {this.validator.message(
                                      "Full Name",
                                      this.state.full_name,
                                      "required"
                                    )}
                                  </div>
                                </div>

                                <div className="SignIn-Con">
                                  <div className="Register-Form mb-0">
                                    <label>Password</label>
                                    <input
                                      type={
                                        this.state.changePasswordField
                                          ? "text"
                                          : "password"
                                      }
                                      className="form-control"
                                      name="password"
                                      onChange={this.handleChange}
                                      value={this.state.password}
                                      onBlur={() =>
                                        this.validator.showMessageFor(
                                          "Password"
                                        )
                                      }
                                    />
                                    {this.validator.message(
                                      "Password",
                                      this.state.password,
                                      "required|min:8"
                                    )}
                                    {this.state.confirmPasswordError ===
                                    true ? (
                                      <div
                                        className="srv-validation-message"
                                        style={{ color: "red" }}
                                      >
                                        {this.state.confirmError}
                                      </div>
                                    ) : (
                                      ""
                                    )}
                                    <div className="passicon">
                                      <i
                                        className="icon-pass-icon"
                                        onClick={this.changePasswordField}
                                      ></i>
                                    </div>
                                  </div>
                                </div>
                                <div className="SignIn-Con">
                                  <div className="Register-Form mb-0">
                                    <label>Confirm Password</label>
                                    <input
                                      type={
                                        this.state.changeConfirmPasswordField
                                          ? "text"
                                          : "password"
                                      }
                                      className="form-control"
                                      name="password"
                                      onChange={this.handleChange}
                                      value={this.state.confirmPassword}
                                      onBlur={() =>
                                        this.validator.showMessageFor(
                                          "Confirm Password"
                                        )
                                      }
                                    />
                                    {this.validator.message(
                                      "Confirm Password",
                                      this.state.confirmPassword,
                                      "required|min:8"
                                    )}
                                    {this.state.confirmPasswordError ===
                                    true ? (
                                      <div
                                        className="srv-validation-message"
                                        style={{ color: "red" }}
                                      >
                                        {this.state.confirmError}
                                      </div>
                                    ) : (
                                      ""
                                    )}
                                    <div className="passicon">
                                      <i
                                        className="icon-pass-icon"
                                        onClick={
                                          this.changeConfirmPasswordField
                                        }
                                      ></i>
                                    </div>
                                  </div>
                                </div>

                                <div className="SignIn-Con">
                                  <div className="DealerForm">
                                    <label>Telephone</label>
                                    <NumberFormat
                                      className="form-control"
                                      format="+1 (###) ###-####"
                                      onChange={this.handleChange}
                                      value={this.state.telephone}
                                      name="telephone"
                                      onBlur={() =>
                                        this.validator.showMessageFor(
                                          "telephone"
                                        )
                                      }
                                    />
                                    {/* <input className="form-control" type="text" name="telephone" onChange={this.handleChange} value={this.state.telephone} /> */}
                                    {this.validator.message(
                                      "telephone",
                                      this.state.telephone,
                                      "required"
                                    )}
                                  </div>
                                </div>

                                <div className="SignIn-Con">
                                  <div className="DealerForm">
                                    <label>Fax (optional)</label>
                                    <NumberFormat
                                      className="form-control"
                                      format="+1 (###) ###-####"
                                      onChange={this.handleChange}
                                      value={this.state.fax}
                                      name="fax"
                                    />
                                    {/* <input className="form-control" type="text" name="fax" onChange={this.handleChange} value={this.state.fax} /> */}
                                    {/* {this.validator.message('fax', this.state.fax, 'required')} */}
                                  </div>
                                </div>
                              </React.Fragment>
                            ) : this.state.step == 3 ? (
                              <React.Fragment>
                                <div className="SignIn-Con">
                                  <div className="DealerForm">
                                    <label>Number of Owners</label>
                                    <select
                                      className="form-control"
                                      name="numberOfOwners"
                                      onChange={this.handleChange}
                                      value={this.state.numberOfOwners}
                                      onBlur={() =>
                                        this.validator.showMessageFor(
                                          "num_of_owner"
                                        )
                                      }
                                    >
                                      <option>Select</option>
                                      <option value={1}>01</option>
                                      <option value={2}>02</option>
                                      <option value={3}>03</option>
                                      <option value={4}>04</option>
                                      <option value={5}>05</option>
                                      <option value={6}>06</option>
                                    </select>
                                    {/* <i className="icon-arrow-down ArrowDealer"></i> */}
                                    {this.validator.message(
                                      "num_of_owner",
                                      this.state.numberOfOwners,
                                      "required"
                                    )}
                                  </div>
                                </div>
                              </React.Fragment>
                            ) : this.state.step == 4 ? (
                              <React.Fragment>
                                {(this.state.owner || []).map((item, index) =>
                                  this.state.ownerIndex == index ? (
                                    <React.Fragment>
                                      <div className="SignIn-Con">
                                        <div className="DealerForm">
                                          <label>First Name</label>
                                          <input
                                            className="form-control"
                                            type="text"
                                            name="first_name"
                                            onChange={(e) =>
                                              this.handleChangeOwner(e, index)
                                            }
                                            value={item.first_name}
                                          />
                                          {this.validator.message(
                                            `owner_first_name_${index}`,
                                            item.first_name,
                                            "required"
                                          )}
                                        </div>
                                      </div>

                                      <div className="SignIn-Con">
                                        <div className="DealerForm">
                                          <label>Last Name</label>
                                          <input
                                            className="form-control"
                                            type="text"
                                            name="last_name"
                                            onChange={(e) =>
                                              this.handleChangeOwner(e, index)
                                            }
                                            value={item.last_name}
                                          />
                                          {this.validator.message(
                                            `owner_last_name_${index}`,
                                            item.last_name,
                                            "required"
                                          )}
                                        </div>
                                      </div>

                                      <div className="SignIn-Con">
                                        <div className="DealerForm">
                                          <label>Street address</label>
                                          <input
                                            className="form-control"
                                            type="text"
                                            name="full_address"
                                            onChange={(e) =>
                                              this.handleChangeOwner(e, index)
                                            }
                                            value={item.full_address}
                                          />
                                          {this.validator.message(
                                            `owner_full_address_${index}`,
                                            item.full_address,
                                            "required"
                                          )}
                                        </div>
                                      </div>

                                      <div className="SignIn-Con">
                                        <div className="DealerForm">
                                          <label>City</label>
                                          <input
                                            className="form-control"
                                            type="text"
                                            name="owner_city"
                                            onChange={(e) =>
                                              this.handleChangeOwner(e, index)
                                            }
                                            value={item.owner_city}
                                          />
                                          {this.validator.message(
                                            `owner_city_${index}`,
                                            item.owner_city,
                                            "required"
                                          )}
                                        </div>
                                      </div>

                                      <div className="SignIn-Con">
                                        <div className="DealerForm">
                                          <label>Province</label>
                                          <select
                                            className="form-control"
                                            name="owner_province"
                                            onChange={(e) =>
                                              this.handleChangeOwner(e, index)
                                            }
                                            value={item.owner_province}
                                          >
                                            <option>Select</option>
                                            <option value="AB">Alberta</option>
                                            <option value="BC">
                                              British Columbia
                                            </option>
                                            <option value="MB">Manitoba</option>
                                            <option value="NB">
                                              New Brunswick
                                            </option>
                                            <option value="NL">
                                              Newfoundland and Labrador
                                            </option>
                                            <option value="NS">
                                              Nova Scotia
                                            </option>
                                            <option value="ON">Ontario</option>
                                            <option value="PE">
                                              Prince Edward Island
                                            </option>
                                            <option value="QC">Quebec</option>
                                            <option value="SK">
                                              Saskatchewan
                                            </option>
                                            <option value="NT">
                                              Northwest Territories
                                            </option>
                                            <option value="NU">Nunavut</option>
                                            <option value="YT">Yukon</option>
                                          </select>
                                          {/* <i className="icon-arrow-down ArrowDealer"></i> */}
                                          {this.validator.message(
                                            `owner_province_${index}`,
                                            item.owner_province,
                                            "required"
                                          )}
                                        </div>
                                      </div>

                                      <div className="SignIn-Con">
                                        <div className="DealerForm">
                                          <label>Postal Code</label>
                                          <NumberFormat
                                            className="form-control"
                                            format="#####"
                                            onChange={(e) =>
                                              this.handleChangeOwner(e, index)
                                            }
                                            value={item.owner_postal_code}
                                            name="owner_postal_code"
                                          />
                                          {/* <input className="form-control" type="text" name="owner_postal_code" onChange={(e) => this.handleChangeOwner(e, index)} value={item.owner_postal_code} /> */}
                                          {this.validator.message(
                                            `owner_postal_code_${index}`,
                                            item.owner_postal_code,
                                            "required"
                                          )}
                                        </div>
                                      </div>

                                      <div className="SignIn-Con">
                                        <div className="DealerForm">
                                          <label>Telephone</label>
                                          <NumberFormat
                                            className="form-control"
                                            format="+1 (###) ###-####"
                                            onChange={(e) =>
                                              this.handleChangeOwner(e, index)
                                            }
                                            value={item.telephone}
                                            name="telephone"
                                          />
                                          {/* <input className="form-control" type="text" name="telephone" onChange={(e) => this.handleChangeOwner(e, index)} value={item.telephone} /> */}
                                          {this.validator.message(
                                            `owner_telephone_${index}`,
                                            item.telephone,
                                            "required"
                                          )}
                                        </div>
                                      </div>

                                      <div className="SignIn-Con">
                                        <div className="DealerForm">
                                          <label>Percentage of Ownership</label>
                                          <NumberFormat
                                            className="form-control"
                                            format="###"
                                            placeHolder="%"
                                            onChange={(e) =>
                                              this.handleChangeOwner(e, index)
                                            }
                                            value={item.percentage_of_ownership}
                                            name="percentage_of_ownership"
                                          />
                                          {/* <input className="form-control" type="text" name="percentage_of_ownership" onChange={(e) => this.handleChangeOwner(e, index)} value={item.percentage_of_ownership} /> */}
                                          {this.validator.message(
                                            `percentage_of_ownership_${index}`,
                                            item.percentage_of_ownership,
                                            "required"
                                          )}
                                        </div>
                                      </div>

                                      <div className="SignIn-Con">
                                        {/* <div className="DealerForm">
                                <label>Date of Birth</label>
                                <input className="form-control" type="date" name="date_of_birth" onChange={this.handleChangeOwner} value={this.state.owner[0].date_of_birth} />
                                {this.validator.message('date Of Birth', this.state.owner[0].date_of_birth, 'required')}
                              </div> */}
                                      </div>
                                    </React.Fragment>
                                  ) : null
                                )}
                              </React.Fragment>
                            ) : this.state.step == 5 ? (
                              <React.Fragment>
                                <div className="SignIn-Con">
                                  <div className="UploadBtn-Head">
                                    <label>Void Cheque/PAD Form Upload</label>
                                  </div>

                                  <div className="custom-file">
                                    <input
                                      type="file"
                                      className="custom-file-input"
                                      name="checkDoc"
                                      accept="image/png, image/jpeg, image/jpg"
                                      onChange={this._handleImageChange}
                                    />
                                    <label
                                      className="custom-file-label"
                                      htmlFor="customFile"
                                    >
                                      {this.state.checkDocName == ""
                                        ? "Upload File"
                                        : this.state.checkDocName}
                                    </label>
                                    {this.validator.message(
                                      "Check Document",
                                      this.state.checkDoc,
                                      "required"
                                    )}
                                  </div>
                                </div>

                                <div className="SignIn-Con">
                                  <div className="UploadBtn-Head">
                                    <label>Dealership Interior Photo</label>
                                  </div>

                                  <div className="custom-file">
                                    <input
                                      type="file"
                                      className="custom-file-input"
                                      name="insidePhoto"
                                      accept="image/png, image/jpeg, image/jpg"
                                      onChange={this._handleImageChange}
                                    />
                                    <label
                                      className="custom-file-label"
                                      htmlFor="customFile"
                                    >
                                      {this.state.insidePhotoName == ""
                                        ? "Upload File"
                                        : this.state.insidePhotoName}
                                    </label>
                                    {this.validator.message(
                                      "Interior Photo",
                                      this.state.insidePhoto,
                                      "required"
                                    )}
                                  </div>
                                </div>

                                <div className="SignIn-Con">
                                  <div className="UploadBtn-Head">
                                    <label>Dealership Exterior Photo</label>
                                  </div>

                                  <div className="custom-file">
                                    <input
                                      type="file"
                                      className="custom-file-input"
                                      name="outsidePhoto"
                                      accept="image/png, image/jpeg, image/jpg"
                                      onChange={this._handleImageChange}
                                    />
                                    <label
                                      className="custom-file-label"
                                      htmlFor="customFile"
                                    >
                                      {this.state.outsidePhotoName == ""
                                        ? "Upload File"
                                        : this.state.outsidePhotoName}
                                    </label>
                                    {this.validator.message(
                                      "Back Photo",
                                      this.state.outsidePhoto,
                                      "required"
                                    )}
                                  </div>
                                </div>

                                <div className="SignIn-Con">
                                  <div className="UploadBtn-Head">
                                    <label>
                                      Article of Incorporation or Master
                                      Business License
                                    </label>
                                  </div>

                                  <div className="custom-file">
                                    <input
                                      type="file"
                                      className="custom-file-input"
                                      name="licenseDoc"
                                      accept="image/png, image/jpeg, image/jpg"
                                      onChange={this._handleImageChange}
                                    />
                                    <label
                                      className="custom-file-label"
                                      htmlFor="customFile"
                                    >
                                      {this.state.licenseDocName == ""
                                        ? "Upload File"
                                        : this.state.licenseDocName}
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
                                <div className="DealerShip-Con">
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
                                      (If you need more information regarding
                                      our agreement, fell free to email us at)
                                    </h3>
                                  </div>
                                </div>
                              </React.Fragment>
                            ) : null}

                            {this.state.step > 1 && this.state.step <= 6 ? (
                              <React.Fragment>
                                {this.state.step == 3 ||
                                this.state.step == 4 ? (
                                  <div className="SignIn-Con"></div>
                                ) : null}

                                <div className="SignIn-Con">
                                  <div className="DealerForm">
                                    {this.state.step == 4 &&
                                    this.state.numberOfOwners > 0 &&
                                    this.state.ownerIndex > 0 ? (
                                      <button
                                        onClick={() =>
                                          this.handleOnClickOwnerBack(
                                            this.state.ownerIndex - 1
                                          )
                                        }
                                      >
                                        <i className="fa fa-angle-left"></i>{" "}
                                        Previous
                                      </button>
                                    ) : (
                                      <React.Fragment>
                                        <button onClick={this.back}>
                                          <i className="fa fa-angle-left"></i>{" "}
                                          Previous
                                        </button>
                                      </React.Fragment>
                                    )}
                                  </div>
                                </div>
                              </React.Fragment>
                            ) : null}
                            {this.state.step < 6 ? (
                              <div className="SignIn-Con">
                                <div className="DealerForm">
                                  {this.state.step == 4 &&
                                  this.state.ownerIndex + 1 <
                                    this.state.numberOfOwners ? (
                                    <button
                                      className="active"
                                      onClick={() =>
                                        this.handleOnClickOwnerNext(
                                          this.state.ownerIndex
                                        )
                                      }
                                    >
                                      {/* && this.state.numberOfOwners > 0  */}
                                      Next
                                      <i className="fa fa-angle-right"></i>
                                    </button>
                                  ) : (
                                    <React.Fragment>
                                      <button
                                        className="active"
                                        onClick={() =>
                                          this.changeStepButton(
                                            this.state.step,
                                            this.state.step + 1
                                          )
                                        }
                                      >
                                        Next
                                        <i className="fa fa-angle-right"></i>
                                      </button>
                                    </React.Fragment>
                                  )}
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
                            <img
                              src="/assets/image/dealerinfo-image.jpg"
                              alt=""
                            />
                          ) : this.state.step == 3 ? (
                            <img
                              src="/assets/image/dealerinfo-image.jpg"
                              alt=""
                            />
                          ) : this.state.step == 4 ? (
                            <img
                              src="/assets/image/dealerinfo-image.jpg"
                              alt=""
                            />
                          ) : this.state.step == 5 ? (
                            <img
                              src="/assets/image/dealerinfo-image.jpg"
                              alt=""
                            />
                          ) : this.state.step == 6 ? (
                            <img
                              src="/assets/image/dealerinfo-image.jpg"
                              alt=""
                            />
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <TostarMessages />
            </section>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    dealer_register: state.authReducer.registration.dealer_register,
  };
};
const actionCreators = {
  register_dealer,
};
export default connect(mapStateToProps, actionCreators)(Index);
