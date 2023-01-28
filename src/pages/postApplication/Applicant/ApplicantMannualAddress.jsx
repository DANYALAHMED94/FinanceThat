import React from "react";
import { Animated } from "react-animated-css";
import Select, { components } from "react-select";
import { Scrollbars } from "react-custom-scrollbars";
import MaskedInput from "react-text-mask";

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
const ApplicantAddress = (props) => {
  return (
    <React.Fragment>
      <Animated
        animationIn={props.state.animation}
        animationInDuration={500}
        animationOutDuration={500}
        animationOut="fadeOutUp"
        isVisible={true}
      >
        <div className="PostApp-SecTwo">
          <div className="PostApp-Head Dura-ApplicantHead">
            <h1>Applicant Current Address</h1>
          </div>

          <div className="clearfix">
            <form>
              <div className="ApplicantAddress">
                <div className="PostApp-Form">
                  <label>Street Address</label>
                  <input
                    required
                    type="text"
                    id="applicantStreetAddress"
                    name="applicantStreetAddress"
                    placeholder=""
                    value={props.state.applicantStreetAddress}
                    onChange={props.handleOnChange}
                    onBlur={() =>
                      props.validator.showMessageFor("Street Address")
                    }
                  />
                  {props.validator.message(
                    "Street Address",
                    props.state.applicantStreetAddress,
                    "required"
                  )}
                </div>
              </div>
              <div className="ApplicantAddress">
                <div className="PostApp-Form">
                  <label>Street Address Line 2</label>
                  <input
                    required
                    type="text"
                    id="applicantStreetAddress2"
                    name="applicantStreetAddress2"
                    placeholder="Street Address Line 2 (Suite, unit etc.)"
                    value={props.state.applicantStreetAddress2}
                    onChange={props.handleOnChange}
                    onBlur={() =>
                      props.validator.showMessageFor("Street Address")
                    }
                  />
                  {props.validator.message(
                    "Street Address Line 2",
                    props.state.applicantStreetAddress2,
                    "required"
                  )}
                </div>
              </div>

              <div className="ApplicantAddress">
                <div className="two-col-grid clearfix">
                  <div className="col-outer pt-0 pb-0">
                    <div className="PostApp-Form Applicantin-Btm">
                      <label>City</label>
                      <input
                        required
                        type="text"
                        id="city"
                        name="city"
                        onChange={props.handleOnChange}
                        value={props.state.city}
                        onBlur={() => props.validator.showMessageFor("City")}
                      />
                      {props.validator.message(
                        "City",
                        props.state.city,
                        "required"
                      )}
                    </div>
                  </div>
                  <div className="col-outer pt-0 pb-0">
                    <div className="PostApp-Form Applicantin-Btm">
                      <label>Province</label>
                      <Select
                        required
                        placeholder="Select Seating"
                        id="selectProvince"
                        name="selectProvince"
                        options={props.state.provinces}
                        onChange={(e) =>
                          props.changeSelect(e, "province", "selectProvince")
                        }
                        value={props.state.selectProvince}
                        className="react-select-main"
                        classNamePrefix="react-select"
                        components={{
                          Option: renderOption,
                          MenuList: renderScrollbar,
                        }}
                        captureMenuScroll={false}
                        onBlur={() =>
                          props.validator.showMessageFor("Province")
                        }
                      />
                      {props.validator.message(
                        "Province",
                        props.state.province,
                        "required"
                      )}
                    </div>
                  </div>
                  <div className="col-outer pt-0 pb-0">
                    <div className="PostApp-Form">
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
                        onBlur={() =>
                          props.validator.showMessageFor("Postal Code")
                        }
                        value={props.state.postalCode}
                        onChange={props.handleOnChange}
                      />
                      {/* <input required type="text" id="postalCode" name='postalCode' onChange={props.handleOnChange}
                                                value={props.state.postalCode}
                                                onBlur={() => props.validator.showMessageFor('Postal Code')} /> */}
                      {props.validator.message(
                        "Postal Code",
                        props.state.postalCode,
                        "required|max:7|regex:[a-zA-Z0-9][a-zA-Z0-9][a-zA-Z0-9] [a-zA-Z0-9][a-zA-Z0-9][a-zA-Z0-9]"
                      )}
                    </div>
                  </div>
                  <div className="col-outer pt-0 pb-0">
                    <div className="PostApp-Form">
                      <label>Country</label>
                      <input
                        required
                        type="text"
                        id="applicantCountry"
                        name="applicantCountry"
                        placeholder=""
                        value={props.state.applicantCountry}
                        onChange={props.handleOnChange}
                        onBlur={() =>
                          props.validator.showMessageFor("Applicant Country")
                        }
                      />
                      {props.validator.message(
                        "Applicant Country",
                        props.state.applicantCountry,
                        "required"
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="row align-items-center">
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6">
                  <div className="PostApp-NextBtn previous-btn float-left">
                    <button
                      type="button"
                      onClick={() =>
                        props.changeMannualAddress(0, "applicantMannualAddress")
                      }
                    >
                      {" "}
                      <i className="fa fa-angle-left"></i> Previous{" "}
                    </button>
                  </div>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6">
                  <div className="PostApp-NextBtn float-right">
                    <button
                      type="button"
                      onClick={() =>
                        props.changeAddress(
                          1,
                          "addressChild",
                          0,
                          props.state.startAddress
                        )
                      }
                    >
                      Next <i className="fa fa-angle-right"></i>
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </Animated>
    </React.Fragment>
  );
};
export default ApplicantAddress;
