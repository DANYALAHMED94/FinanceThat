import React from "react";
import { Animated } from "react-animated-css";
import NumberFormat from "react-number-format";
import Select, { components } from "react-select";
import { Scrollbars } from "react-custom-scrollbars";
const EmploymentPreviousInformation2 = (props) => {
  const bar = props.state.startPerc / 2;
  const lastBar = props.state.startPerc * 3;
  const stockProps =
    props.match.params !== undefined && props.match.params.id !== undefined;
  const nextNo =
    stockProps === true
      ? props.state.startPerc * 2 + props.state.startPerc / 2
      : props.state.startPerc * 2;
  const Next =
    props.state.backTo === ""
      ? props.state.coApplication === "yes"
        ? props.state.startPerc
        : nextNo
      : lastBar + bar;

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
            <h1>Applicant Previous Employement Address</h1>
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
                      id="previousEmployerStreetAddress"
                      name="previousEmployerStreetAddress"
                      placeholder=""
                      value={props.state.previousEmployerStreetAddress}
                      onChange={props.handleOnChange}
                      onBlur={() =>
                        props.validator.showMessageFor(
                          "Previous Employer Street Address"
                        )
                      }
                    />
                    {props.validator.message(
                      "Previous Employer Street Address",
                      props.state.previousEmployerStreetAddress,
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
                        id="previousEmployerCity"
                        name="previousEmployerCity"
                        placeholder=""
                        value={props.state.previousEmployerCity}
                        onChange={props.handleOnChange}
                        onBlur={() =>
                          props.validator.showMessageFor(
                            "Previous Employer City"
                          )
                        }
                      />
                      {props.validator.message(
                        "Previous Employer City",
                        props.state.previousEmployerCity,
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
                        id="selectedPreviousEmployerProvince"
                        name="selectedPreviousEmployerProvince"
                        options={props.state.provinces}
                        value={props.state.selectedPreviousEmployerProvince}
                        onChange={(e) =>{
                          props.changeSelect(e, "previousEmployerProvince", "selectedPreviousEmployerProvince")
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
                        id="previousEmployerProvince"
                        name="previousEmployerProvince"
                        placeholder=""
                        value={props.state.previousEmployerProvince}
                        onChange={props.handleOnChange}
                        onBlur={() =>
                          props.validator.showMessageFor(
                            "Previous Employer Province"
                          )
                        }
                      /> */}
                      {props.validator.message(
                        "Previous Employer Province",
                        props.state.previousEmployerProvince,
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
                        format="+1 (###) ###-####"
                          placeholder="+1 (123) 456-7890"
                        value={props.state.previousEmployerPhone}
                        onChange={props.handleOnChange}
                        allowNegative={false}
                        id="previousEmployerPhone"
                        name="previousEmployerPhone"
                        onBlur={() =>
                          props.validator.showMessageFor(
                            "Previous Employer Phone"
                          )
                        }
                      />
                      {props.validator.message(
                        "Previous Employer Phone",
                        props.state.previousEmployerPhone,
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
                        id="previousEmployerEmail"
                        name="previousEmployerEmail"
                        placeholder=""
                        value={props.state.previousEmployerEmail}
                        onChange={props.handleOnChange}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="PostApp-Coapplicant">
                <h1>Do you want to add a co-applicant?</h1>
                <ul>
                  <li>
                    <label className="Applicant-Btn">
                      Yes
                      <input
                        type="radio"
                        id="coApplication"
                        name="coApplication"
                        onChange={props.handleOnChange}
                        value="yes"
                        checked={props.state.coApplication === "yes"}
                      />
                      <span className="Appmark"></span>
                    </label>
                  </li>
                  <li>
                    <label className="Applicant-Btn">
                      No
                      <input
                        type="radio"
                        id="coApplication"
                        name="coApplication"
                        onChange={props.handleOnChange}
                        value="no"
                        checked={props.state.coApplication === "no"}
                      />
                      <span className="Appmark"></span>
                    </label>
                  </li>
                  {props.validator.message(
                    "Co Applicant",
                    props.state.coApplication,
                    "required"
                  )}
                </ul>
              </div>

              <div className="clearfix"></div>
              <div className="row align-items-center">
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6">
                  <div className="PostApp-NextBtn previous-btn float-left">
                    <button
                      type="button"
                      onClick={() => props.changeEmployementInformation(2)}
                    >
                      <i className="fa fa-angle-left"></i> Previous{" "}
                    </button>
                  </div>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6">
                  <div className="PostApp-NextBtn float-right">
                    <button
                      type="button"
                      onClick={
                        props.state.coApplication === "yes"
                          ? () => props.changeStepButton(3, 4, Next)
                          : () => props.changeStepButton(3, 5, Next)
                      }
                    >
                      Next <i className="fa fa-angle-right"></i>
                    </button>
                    {/* <button type="button" onClick={props.state.coApplication === 'yes' ? () => props.changeStepCoApplicant(1, props.state.startPerCo) : () => props.changeStepButton(3, 5, (Next))}>Next <i className="fa fa-angle-right"></i></button> */}
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

export default EmploymentPreviousInformation2;
