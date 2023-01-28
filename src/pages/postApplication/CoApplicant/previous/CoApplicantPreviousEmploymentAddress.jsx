import React from "react";
import { Animated } from "react-animated-css";
import NumberFormat from "react-number-format";
import Select, { components } from "react-select";
import { Scrollbars } from "react-custom-scrollbars";

const CoApplicantPreviousEmploymentAddress = (props) => {
  const bar = props.state.startPerc / 2;
  const lastBar = props.state.startPerc * 1;
  const Next =
    props.state.backFromCo === ""
      ? props.state.startPerCo
      : lastBar + bar + props.state.startPerCo;
  const nextStep = props.state.backFromCo === "" ? 5 : 6;
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
  return (
    <React.Fragment>
      <Animated
        animationIn={props.state.animation}
        animationInDuration={500}
        animationOutDuration={500}
        animationOut="fadeOutUp"
        isVisible={true}
      >
        <div className="PostApp-SecThree">
          <div className="PostApp-Head">
            <h1>Previous Co Applicant Employer Address</h1>
          </div>
          <div className="clearfix">
            <form>
              <div className=" ApplicantInfo-Container">
                <div className="PostApp-Form">
                  <div className="clearfix">
                    <label>Previous Employer Street Address</label>
                    <input
                      required
                      type="text"
                      id="previousCoEmployerStreetAddress"
                      name="previousCoEmployerStreetAddress"
                      placeholder=""
                      value={props.state.previousCoEmployerStreetAddress}
                      onChange={props.handleOnChange}
                      onBlur={() =>
                        props.validator.showMessageFor(
                          "Previous Co Employer Street Address"
                        )
                      }
                    />
                    {props.validator.message(
                      "Previous Co Employer Street Address",
                      props.state.previousCoEmployerStreetAddress,
                      "required"
                    )}
                  </div>
                </div>

                <div className="two-col-grid clearfix">
                  <div className="col-outer pt-0 pb-0">
                    <div className="PostApp-Form Applicantin-Btm">
                      <label>Previous Employer City</label>
                      <input
                        required
                        type="text"
                        id="previousCoEmployerCity"
                        name="previousCoEmployerCity"
                        placeholder=""
                        value={props.state.previousCoEmployerCity}
                        onChange={props.handleOnChange}
                        onBlur={() =>
                          props.validator.showMessageFor(
                            "Previous Co Employer City"
                          )
                        }
                      />
                      {props.validator.message(
                        "Previous Co Employer City",
                        props.state.previousCoEmployerCity,
                        "required"
                      )}
                    </div>
                  </div>
                  <div className="col-outer pt-0 pb-0">
                    <div className="PostApp-Form Applicantin-Btm">
                      <label>Previous Employer Province</label>
                      <Select
                        required
                        placeholder="Select Province"
                        id="selectedPreviousCoEmployerProvince"
                        name="selectedPreviousCoEmployerProvince"
                        options={props.state.provinces}
                        value={props.state.selectedPreviousCoEmployerProvince}
                        onChange={(e) =>{
                          props.changeSelect(e, "previousCoEmployerProvince", "selectedPreviousCoEmployerProvince")
                        }
                      }
                        className="react-select-main"
                        classNamePrefix="react-select"
                        components={{
                          Option: renderOption,
                          MenuList: renderScrollbar,
                        }}
                        captureMenuScroll={false}
                      />
                      {/* <input
                        required
                        type="text"
                        id="previousCoEmployerProvince"
                        name="previousCoEmployerProvince"
                        placeholder=""
                        value={props.state.previousCoEmployerProvince}
                        onChange={props.handleOnChange}
                        onBlur={() =>
                          props.validator.showMessageFor(
                            "Previous Co Employer Province"
                          )
                        }
                      /> */}
                      {props.validator.message(
                        "Previous Co Employer Province",
                        props.state.previousCoEmployerProvince,
                        "required"
                      )}
                    </div>
                  </div>
                  <div className="col-outer pt-0 pb-0">
                    <div className="PostApp-Form Applicantin-Btm">
                      <label>Previous Employer Phone</label>
                      <NumberFormat
                        required
                        className="form-control"
                        value={props.state.previousCoEmployerPhone}
                        onChange={props.handleOnChange}
                        allowNegative={false}
                        id="previousCoEmployerPhone"
                        name="previousCoEmployerPhone"
                        format="+1 (###) ###-####"
                        placeholder="+1 (123) 456-7890"
                        onBlur={() =>
                          props.validator.showMessageFor(
                            "Previous Co Employer Phone"
                          )
                        }
                      />
                      {props.validator.message(
                        "Previous Co Employer Phone",
                        props.state.previousCoEmployerPhone,
                        "required"
                      )}
                    </div>
                  </div>
                  <div className="col-outer pt-0 pb-0">
                    <div className="PostApp-Form Applicantin-Btm">
                      <label>Previous Employer Email (optional)</label>
                      <input
                        required
                        type="email"
                        id="previousCoEmployerEmail"
                        name="previousCoEmployerEmail"
                        placeholder=""
                        value={props.state.previousCoEmployerEmail}
                        onChange={props.handleOnChange}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="clearfix"></div>
              <div className="row align-items-center">
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6">
                  <div className="PostApp-NextBtn previous-btn float-left">
                    <button
                      type="button"
                      onClick={() => props.changeCoEmploymentStep(2)}
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
                      onClick={() => props.changeStepButton(4, nextStep, Next)}
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

export default CoApplicantPreviousEmploymentAddress;
