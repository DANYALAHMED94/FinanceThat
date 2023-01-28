import React, { Component } from "react";
import NumberFormat from "react-number-format";
import {
  change_profile_input,
  get_user_profile_data,
  update_user_password,
  get_dealer_profile_data,
  update_user_profile,
  update_dealer_profile,
} from "../../actions/userProfileActions";
import { connect } from "react-redux";
import SimpleReactValidator from "simple-react-validator";
import MaskedInput from "react-text-mask";
import Select, { components } from "react-select";
import { Scrollbars } from "react-custom-scrollbars";
import DealerProfile from "./DealerProfile";
import { Helmet } from "react-helmet";
import { capitalize } from "./../../_helpers/capitalize";

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      firstName: "",
      lastName: "",
      streetAddress: "",
      postalCode: "",
      city: "",
      country: "",
      email: "",
      telephone: "",
      provinces: [
        { value: "AB", label: "Alberta" },
        { value: "BC", label: "British Columbia" },
        { value: "MB", label: "Manitoba" },
        { value: "NB", label: "New Brunswick" },
        { value: "NL", label: "Newfoundland and Labrador" },
        { value: "NS", label: "Nova Scotia" },
        { value: "ON", label: "Ontario" },
        { value: "PE", label: "Prince Edward Island" },
        { value: "QC", label: "Quebec" },
        { value: "SK", label: "Saskatchewan" },
        { value: "NT", label: "Northwest Territories" },
        { value: "NU", label: "Nunavut" },
        { value: "YT", label: "Yukon" },
      ],
      province: "",
      selectProvince: [],
    };
    this.validator = new SimpleReactValidator({ autoForceUpdate: this });
  }

  componentDidMount() {
    //   if (this.props.user_id && Number(localStorage.getItem('user_type')) == 2) {
    //     this.props.get_dealer_profile_data(this.props.user_id)
    //   }
    //   if (this.props.user_id && Number(localStorage.getItem('user_type')) == 1) {
    //     this.props.get_user_profile_data(this.props.user_id)
    //   }
    if (
      this.props.get_user_profile !== null &&
      this.props.get_user_profile !== "" &&
      this.props.get_user_profile !== undefined &&
      Object.keys(this.props.get_user_profile).length > 0
    ) {
      // const firstName = this.props.get_user_profile.first_name !== undefined ? this.props.get_user_profile.first_name : this.props.get_user_profile.business_name
      const firstName = this.props.get_user_profile.first_name
        ? this.props.get_user_profile.first_name
        : "";
      // const name = this.props.get_user_profile.name !== undefined ? this.props.get_user_profile.name : this.props.get_user_profile.business_name
      const name = this.props.get_user_profile.name
        ? this.props.get_user_profile.name
        : "";
      // const lastName = this.props.get_user_profile.last_name !== undefined ? this.props.get_user_profile.last_name : this.props.get_user_profile.operating_name
      const lastName = this.props.get_user_profile.last_name
        ? this.props.get_user_profile.last_name
        : "";
      // const streetAddress = this.props.get_user_profile.street !== undefined ? this.props.get_user_profile.street : this.props.get_user_profile.street_address
      const streetAddress = this.props.get_user_profile.street
        ? this.props.get_user_profile.street
        : "";
      // const postalCode = this.props.get_user_profile.postal_code !== undefined ? this.props.get_user_profile.postal_code : this.props.get_user_profile.postal_code
      const postalCode = this.props.get_user_profile.postal_code
        ? this.props.get_user_profile.postal_code
        : "";
      // const city = this.props.get_user_profile.city !== undefined ? this.props.get_user_profile.city : this.props.get_user_profile.city
      const city = this.props.get_user_profile.city
        ? this.props.get_user_profile.city
        : "";
      // const country = this.props.get_user_profile.country !== undefined ? this.props.get_user_profile.country : this.props.get_user_profile.country
      const country = this.props.get_user_profile.country
        ? this.props.get_user_profile.country
        : "";
      // const email = this.props.get_user_profile.email === undefined ? this.props.get_user_profile.user_id !== undefined && this.props.get_user_profile.user_id !== null ? this.props.get_user_profile.user_id.email !== undefined && this.props.get_user_profile.user_id.email !== null ? this.props.get_user_profile.user_id.email : '' : '' : this.props.get_user_profile.email
      const email = !this.props.get_user_profile.email
        ? this.props.get_user_profile.user_id
          ? this.props.get_user_profile.user_id.email
            ? this.props.get_user_profile.user_id.email
            : ""
          : ""
        : this.props.get_user_profile.email;
      const telephone = this.props.get_user_profile.telephone
        ? this.props.get_user_profile.telephone
        : "";
      const province = this.props.get_user_profile.province
        ? this.props.get_user_profile.province
        : "";
      let selectedProvince = this.state.provinces.filter(
        (item) => item.value === province
      );
      if (
        selectedProvince !== undefined &&
        selectedProvince !== null &&
        selectedProvince.length > 0
      ) {
        selectedProvince = selectedProvince[0];
      } else {
        selectedProvince = "";
      }
      this.setState({
        ...this.state,
        firstName: firstName,
        lastName: lastName,
        streetAddress: streetAddress,
        postalCode: postalCode,
        city: city,
        country: country,
        email: email,
        telephone: telephone,
        province: province,
        selectProvince: selectedProvince,
        name: name,
      });
    }
  }

  handleOnchange = (e) => {
    const { name, value } = e.target;
    this.props.change_profile_input(name, value);
    this.setState({
      ...this.state,
      [name]: value,
    });
  };

  componentDidUpdate(prevProps, prevState) {
    // this.props.get_user_profile.length > 0
    if (
      prevProps.get_user_profile !== this.props.get_user_profile &&
      this.props.get_user_profile !== undefined &&
      Object.keys(this.props.get_user_profile).length > 0
    ) {
      // const firstName = this.props.get_user_profile.first_name !== undefined ? this.props.get_user_profile.first_name : this.props.get_user_profile.business_name
      const firstName = this.props.get_user_profile.first_name
        ? this.props.get_user_profile.first_name
        : "";
      // const name = this.props.get_user_profile.name !== undefined ? this.props.get_user_profile.name : this.props.get_user_profile.business_name
      const name = this.props.get_user_profile.name
        ? this.props.get_user_profile.name
        : "";
      // const lastName = this.props.get_user_profile.last_name !== undefined ? this.props.get_user_profile.last_name : this.props.get_user_profile.operating_name
      const lastName = this.props.get_user_profile.last_name
        ? this.props.get_user_profile.last_name
        : "";
      // const streetAddress = this.props.get_user_profile.street !== undefined ? this.props.get_user_profile.street : this.props.get_user_profile.street_address
      const streetAddress = this.props.get_user_profile.street
        ? this.props.get_user_profile.street
        : "";
      // const postalCode = this.props.get_user_profile.postal_code !== undefined ? this.props.get_user_profile.postal_code : this.props.get_user_profile.postal_code
      const postalCode = this.props.get_user_profile.postal_code
        ? this.props.get_user_profile.postal_code
        : "";
      // const city = this.props.get_user_profile.city !== undefined ? this.props.get_user_profile.city : this.props.get_user_profile.city
      const city = this.props.get_user_profile.city
        ? this.props.get_user_profile.city
        : "";
      // const country = this.props.get_user_profile.country !== undefined ? this.props.get_user_profile.country : this.props.get_user_profile.country
      const country = this.props.get_user_profile.country
        ? this.props.get_user_profile.country
        : "";
      // const email = this.props.get_user_profile.email === undefined ? this.props.get_user_profile.user_id !== undefined && this.props.get_user_profile.user_id !== null ? this.props.get_user_profile.user_id.email !== undefined && this.props.get_user_profile.user_id.email !== null ? this.props.get_user_profile.user_id.email : '' : '' : this.props.get_user_profile.email
      const email = !this.props.get_user_profile.email
        ? this.props.get_user_profile.user_id
          ? this.props.get_user_profile.user_id.email
            ? this.props.get_user_profile.user_id.email
            : ""
          : ""
        : this.props.get_user_profile.email;
      const telephone = this.props.get_user_profile.telephone
        ? this.props.get_user_profile.telephone
        : "";
      const province = this.props.get_user_profile.province
        ? this.props.get_user_profile.province
        : "";
      let selectedProvince = this.state.provinces.filter(
        (item) => item.value === province
      );
      if (
        selectedProvince !== undefined &&
        selectedProvince !== null &&
        selectedProvince.length > 0
      ) {
        selectedProvince = selectedProvince[0];
      } else {
        selectedProvince = "";
      }
      this.setState({
        ...this.state,
        firstName: firstName,
        lastName: lastName,
        streetAddress: streetAddress,
        postalCode: postalCode,
        city: city,
        country: country,
        email: email,
        telephone: telephone,
        province: province,
        selectProvince: selectedProvince,
        name: name,
      });
    }
  }

  changeSelect = (e, formName, name) => {
    this.setState({
      ...this.state,
      [name]: e,
      [formName]: e ? (e.value ? e.value : "") : "",
    });
  };

  update_Profile = (e) => {
    e.preventDefault();
    // if (!this.validator.fieldValid('Name')) {
    //   this.validator.showMessageFor('Name')
    //   this.forceUpdate();
    //   return false
    // }
    if (!this.validator.fieldValid("First Name")) {
      this.validator.showMessageFor("First Name");
      this.forceUpdate();
      return false;
    }
    if (!this.validator.fieldValid("Last Name")) {
      this.validator.showMessageFor("Last Name");
      this.forceUpdate();
      return false;
    }
    if (this.props.user_id && Number(localStorage.getItem("user_type")) === 1) {
      var formData = new FormData();
      // formData.append("name ", this.state.name);
      formData.append("street ", this.state.streetAddress);
      formData.append("postal_code ", this.state.postalCode);
      formData.append("city ", this.state.city);
      formData.append("country ", this.state.country);
      formData.append("telephone ", this.state.telephone);
      formData.append("province ", this.state.province);
      formData.append("first_name", this.state.firstName);
      formData.append("last_name", this.state.lastName);
      if (this.props.preview !== null) {
        formData.append("photo ", this.props.preview);
      }
      this.props.update_user_profile(formData, this.props.user_id);
    }
  };

  render() {
    const { Option } = components;

    const renderScrollbar = (props) => {
      return (
        <div style={{ height: 260 }}>
          <Scrollbars>{props.children}</Scrollbars>
        </div>
      );
    };

    const renderOption = (props) => {
      return (
        <Option {...props}>
          <div>{props.data.label}</div>
        </Option>
      );
    };
    if (this.props.user_id && Number(localStorage.getItem("user_type")) === 2) {
      return <DealerProfile {...this.props} />;
    } else {
      return (
        <React.Fragment>
          <Helmet>
            <title>Seller - Profile</title>
            <meta name="description" content="" />
          </Helmet>
          <div className="col-xl-9 col-lg-9 col-md-7 col-sm-12 col-12">
            <div className="UserProfile-Container user-profile-container">
              <form>
                <div className="row">
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                    <div className="Input-UserForm">
                      <label>First Name</label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={this.state.firstName}
                        onChange={this.handleOnchange}
                        onBlur={() =>
                          this.validator.showMessageFor("First Name")
                        }
                      />
                      {this.validator.message(
                        "First Name",
                        this.state.firstName,
                        "required"
                      )}
                    </div>
                  </div>

                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                    <div className="Input-UserForm">
                      <label>Last Name</label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={this.state.lastName}
                        onChange={this.handleOnchange}
                        onBlur={() =>
                          this.validator.showMessageFor("Last Name")
                        }
                      />
                      {this.validator.message(
                        "Last Name",
                        this.state.lastName,
                        "required"
                      )}
                    </div>
                  </div>
                </div>
                <div className="row">
                  {/* <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                    <div className="Input-UserForm">
                      <label>Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={this.state.name}
                        onChange={this.handleOnchange}
                        onBlur={() => this.validator.showMessageFor('Name')}
                      />
                      {this.validator.message('Name', this.state.name, 'required')}
                    </div>
                  </div> */}

                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                    <div className="Input-UserForm">
                      <label>Email</label>
                      <input
                        type="text"
                        id="email"
                        name="email"
                        disabled
                        value={this.state.email}
                      />
                      {/* {this.validator.message('Email', this.state.email, 'required|email')} */}
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                    <div className="Input-UserForm">
                      <label>phone</label>
                      <NumberFormat
                        className="form-control"
                        format="+1 (###) ###-####"
                        onChange={this.handleOnchange}
                        value={this.state.telephone}
                        name="telephone"
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <div className="Input-UserForm">
                      <label>Street address</label>
                      <input
                        type="text"
                        id="streetAddress"
                        name="streetAddress"
                        value={this.state.streetAddress}
                        onChange={this.handleOnchange}
                        // onBlur={() => this.validator.showMessageFor('Street Address')}
                      />
                      {/* {this.validator.message('Street Address', this.state.streetAddress, 'required')} */}
                    </div>
                  </div>

                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                    <div className="Input-UserForm">
                      <label>City</label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={capitalize(this.state.city)}
                        onChange={this.handleOnchange}
                        // onBlur={() => this.validator.showMessageFor('City')}
                      />
                      {/* {this.validator.message('City', this.state.city, 'required')} */}
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                    <div className="Input-UserForm">
                      <label>Province</label>
                      <Select
                        required
                        placeholder="Select Province"
                        id="selectProvince"
                        name="selectProvince"
                        options={this.state.provinces}
                        onChange={(e) =>
                          this.changeSelect(e, "province", "selectProvince")
                        }
                        value={this.state.selectProvince}
                        className="react-select-main"
                        classNamePrefix="react-select"
                        components={{
                          Option: renderOption,
                          MenuList: renderScrollbar,
                        }}
                      />
                      {/* {this.validator.message('Province', this.state.province, 'required')} */}
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                    <div className="Input-UserForm">
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
                        placeholder="A2A 2A2"
                        id="postalCode"
                        name="postalCode"
                        // onBlur={() => this.validator.showMessageFor('Postal Code')}
                        value={this.state.postalCode}
                        onChange={this.handleOnchange}
                      />
                      {/* {this.validator.message('Postal Code', this.state.postalCode, 'required|max:7|regex:[a-zA-Z0-9][a-zA-Z0-9][a-zA-Z0-9] [a-zA-Z0-9][a-zA-Z0-9][a-zA-Z0-9]')} */}
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                    <div className="Input-UserForm">
                      <label>Country</label>
                      <input
                        type="text"
                        id="country"
                        name="country"
                        value={this.state.country}
                        onChange={this.handleOnchange}
                        // onBlur={() => this.validator.showMessageFor('Country')}
                      />
                      {/* {this.validator.message('Country', this.state.country, 'required')} */}
                    </div>
                  </div>
                </div>

                {/* <div className="row">
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                    <div className="Input-UserForm">
                      <label>phone</label>
                      <NumberFormat
                        className='form-control'
                        format='+1 (###) ###-####'
                        onChange={this.handleOnchange} value={this.state.telephone}
                        name='telephone'
                      // onBlur={() => this.validator.showMessageFor('Telephone')}
                      />
                      {/* {this.validator.message('Telephone', this.state.telephone, 'required')}

            </div>
          </div>

        </div> */}

                <div className="row">
                  <div className="col-md-12 col-sm-12 col-12">
                    <div className="ChangePass-Btn">
                      <button
                        type="button"
                        onClick={this.update_Profile}
                        disabled={this.props.profile_update_loading}
                      >
                        {this.props.profile_update_loading === true ? (
                          <i
                            class="fa fa-circle-o-notch fa-spin"
                            aria-hidden="true"
                          ></i>
                        ) : (
                          "Save Changes"
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </React.Fragment>
      );
    }
  }
}
const mapStateToProps = (state) => {
  return {
    user_id: state.authReducer.authentication.user.user_id,
    get_user_profile: state.userProfileReducer.get_user_profile,
    preview: state.userProfileReducer.preview,
    profile_update_loading: state.userProfileReducer.profile_update_loading,
    profile_password_update_loading:
      state.userProfileReducer.profile_password_update_loading,
  };
};
export default connect(mapStateToProps, {
  change_profile_input,
  get_user_profile_data,
  update_user_password,
  get_dealer_profile_data,
  update_user_profile,
  update_dealer_profile,
})(UserProfile);
