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
const ApplicantPreviousAddress = (props) => {
  // const bar = props.state.startPerc / 2
  const lastBar = props.state.startPerc * 4;
  const Next = props.state.backTo === "" ? props.state.startAddress : lastBar;

  // main return
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
            <h1>Applicant Previous Address</h1>
            <div className="textErrorMessage">
              We require this information because your current address is less
              than 2 years old
            </div>
          </div>
          <div className="clearfix">
            <form>
              <div className="ApplicantAddress">
                <div className="PostApp-Form">
                  <label>Previous Street Address</label>
                  <input
                    required
                    type="text"
                    id="applicantPreviousStreetAddress"
                    name="applicantPreviousStreetAddress"
                    placeholder="Previous Street Address"
                    value={props.state.applicantPreviousStreetAddress}
                    onChange={props.handleOnChange}
                    onBlur={() =>
                      props.validator.showMessageFor("Previous Street Address")
                    }
                  />
                  {props.validator.message(
                    "Previous Street Address",
                    props.state.applicantPreviousStreetAddress,
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
                    id="applicantPreviousStreetAddress2"
                    name="applicantPreviousStreetAddress2"
                    placeholder="Previous Street Address Line 2 (Suite, unit etc.)"
                    value={props.state.applicantPreviousStreetAddress2}
                    onChange={props.handleOnChange}
                  />
                </div>
              </div>

              <div className="ApplicantAddress">
                <div className="two-col-grid clearfix">
                  <div className="col-outer pt-0 pb-0">
                    <div className="PostApp-Form Applicantin-Btm">
                      <label>Previous City</label>
                      <input
                        required
                        type="text"
                        id="previousCity"
                        name="previousCity"
                        placeholder="Previous City"
                        onChange={props.handleOnChange}
                        value={props.state.previousCity}
                        onBlur={() =>
                          props.validator.showMessageFor("Previous City")
                        }
                      />
                      {props.validator.message(
                        "Previous City",
                        props.state.previousCity,
                        "required"
                      )}
                    </div>
                  </div>
                  <div className="col-outer pt-0 pb-0">
                    <div className="PostApp-Form Applicantin-Btm">
                      <label>Previous Province</label>
                      <Select
                        required
                        placeholder="Select Province"
                        id="selectPreviousProvince"
                        name="selectPreviousProvince"
                        options={props.state.provinces}
                        onChange={(e) =>
                          props.changeSelect(
                            e,
                            "previousProvince",
                            "selectPreviousProvince"
                          )
                        }
                        value={props.state.selectPreviousProvince}
                        className="react-select-main"
                        classNamePrefix="react-select"
                        components={{
                          Option: renderOption,
                          MenuList: renderScrollbar,
                        }}
                        captureMenuScroll={false}
                        onBlur={() =>
                          props.validator.showMessageFor("Previous Province")
                        }
                      />
                      {props.validator.message(
                        "Previous Province",
                        props.state.previousProvince,
                        "required"
                      )}
                    </div>
                  </div>
                  <div className="col-outer pt-0 pb-0">
                    <div className="PostApp-Form">
                      <label>Previous Postal Code</label>
                      <MaskedInput
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
                        id="previousPostalCode"
                        name="previousPostalCode"
                        onBlur={() =>
                          props.validator.showMessageFor("Previous Postal Code")
                        }
                        value={props.state.previousPostalCode}
                        onChange={props.handleOnChange}
                      />
                      {props.validator.message(
                        "Previous Postal Code",
                        props.state.previousPostalCode,
                        "required|max:7|regex:[a-zA-Z0-9][a-zA-Z0-9][a-zA-Z0-9] [a-zA-Z0-9][a-zA-Z0-9][a-zA-Z0-9]"
                      )}
                    </div>
                  </div>
                  <div className="col-outer pt-0 pb-0">
                    <div className="PostApp-Form">
                      <label>Previous Country</label>
                      <input
                        required
                        type="text"
                        id="applicantPreviousCountry"
                        name="applicantPreviousCountry"
                        placeholder="Previous Country"
                        value={props.state.applicantPreviousCountry}
                        onChange={props.handleOnChange}
                        onBlur={() =>
                          props.validator.showMessageFor(
                            "Applicant Previous Country"
                          )
                        }
                      />
                      {props.validator.message(
                        "Applicant Previous Country",
                        props.state.applicantPreviousCountry,
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
                      onClick={() => props.changeAddressChild(1)}
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
                        props.changeAddress(3, "addressChild", 2, 0)
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
export default ApplicantPreviousAddress;
