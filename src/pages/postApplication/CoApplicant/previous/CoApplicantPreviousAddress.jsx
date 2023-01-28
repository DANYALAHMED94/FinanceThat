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
const CoApplicantPreviousAddress = (props) => {
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
            <h1>Co Applicant Previous Address</h1>
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
                    id="coApplicantPreviousStreetAddress"
                    name="coApplicantPreviousStreetAddress"
                    placeholder="Previous Street Address"
                    value={props.state.coApplicantPreviousStreetAddress}
                    onChange={props.handleOnChange}
                    onBlur={() =>
                      props.validator.showMessageFor(
                        "Co Previous Street Address"
                      )
                    }
                  />
                  {props.validator.message(
                    "Co Previous Street Address",
                    props.state.coApplicantPreviousStreetAddress,
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
                    id="coApplicantPreviousStreetAddress2"
                    name="coApplicantPreviousStreetAddress2"
                    placeholder="Previous Street Address Line 2 (Suite, unit etc.)"
                    value={props.state.coApplicantPreviousStreetAddress2}
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
                        id="coPreviousCity"
                        name="coPreviousCity"
                        placeholder="Previous City"
                        onChange={props.handleOnChange}
                        value={props.state.coPreviousCity}
                        onBlur={() =>
                          props.validator.showMessageFor("Co Previous City")
                        }
                      />
                      {props.validator.message(
                        "Co Previous City",
                        props.state.coPreviousCity,
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
                            "coPreviousProvince",
                            "selectCoPreviousProvince"
                          )
                        }
                        value={props.state.selectCoPreviousProvince}
                        className="react-select-main"
                        classNamePrefix="react-select"
                        components={{
                          Option: renderOption,
                          MenuList: renderScrollbar,
                        }}
                        captureMenuScroll={false}
                        onBlur={() =>
                          props.validator.showMessageFor("Co Previous Province")
                        }
                      />
                      {props.validator.message(
                        "Co Previous Province",
                        props.state.coPreviousProvince,
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
                        id="coPreviousPostalCode"
                        name="coPreviousPostalCode"
                        onBlur={() =>
                          props.validator.showMessageFor(
                            "Co Previous Postal Code"
                          )
                        }
                        value={props.state.coPreviousPostalCode}
                        onChange={props.handleOnChange}
                      />
                      {props.validator.message(
                        "Co Previous Postal Code",
                        props.state.coPreviousPostalCode,
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
                        id="coApplicantPreviousCountry"
                        name="coApplicantPreviousCountry"
                        placeholder="Previous Country"
                        value={props.state.coApplicantPreviousCountry}
                        onChange={props.handleOnChange}
                        onBlur={() =>
                          props.validator.showMessageFor(
                            "Co Applicant Previous Country"
                          )
                        }
                      />
                      {props.validator.message(
                        "Co Applicant Previous Country",
                        props.state.coApplicantPreviousCountry,
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
                        props.changeCoAddress(
                          1,
                          "coApplicantAddressChild",
                          2,
                          -props.state.startPerCo
                        )
                      }
                    >
                      <i className="fa fa-angle-left"></i> Previous
                    </button>
                  </div>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6">
                  <div className="PostApp-NextBtn float-right">
                    <button
                      type="button"
                      onClick={() =>
                        props.changeCoAddress(
                          3,
                          "coApplicantAddressChild",
                          3,
                          props.state.startPerCo
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
export default CoApplicantPreviousAddress;
