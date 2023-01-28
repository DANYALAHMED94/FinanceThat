import React from "react";
import { Animated } from "react-animated-css";
import NumberFormat from "react-number-format";
import Select, { components } from "react-select";
import { Scrollbars } from "react-custom-scrollbars";

const EmploymentInformation2 = (props) => {
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
            <h1>Applicant Current Employer Address</h1>
          </div>
          <div className="clearfix">
            <form>
              <div className=" ApplicantInfo-Container">
                <div className="PostApp-Form">
                  <div className="clearfix">
                    <label>Employer Street Address</label>
                    <input
                      required
                      type="text"
                      id="employerStreetAddress"
                      name="employerStreetAddress"
                      placeholder=""
                      value={props.state.employerStreetAddress}
                      onChange={props.handleOnChange}
                      onBlur={() =>
                        props.validator.showMessageFor(
                          "Employer Street Address"
                        )
                      }
                    />
                    {props.validator.message(
                      "Employer Street Address",
                      props.state.employerStreetAddress,
                      "required"
                    )}
                  </div>
                </div>

                <div className="two-col-grid clearfix">
                  <div className="col-outer pt-0 pb-0">
                    <div className="PostApp-Form Applicantin-Btm">
                      <label>Employer City</label>
                      <input
                        required
                        type="text"
                        id="employerCity"
                        name="employerCity"
                        placeholder=""
                        value={props.state.employerCity}
                        onChange={props.handleOnChange}
                        onBlur={() =>
                          props.validator.showMessageFor(
                            "Employer Street Address"
                          )
                        }
                      />
                      {props.validator.message(
                        "Employer City",
                        props.state.employerCity,
                        "required"
                      )}
                    </div>
                  </div>
                  <div className="col-outer pt-0 pb-0">
                    <div className="PostApp-Form Applicantin-Btm">
                      <label>Employer Province</label>
                      <Select
                        required
                        placeholder="Select Province"
                        id="selectProvince"
                        name="selectedEmployerProvince"
                        options={props.state.provinces}
                        value={props.state.selectedEmployerProvince}
                        onChange={(e) =>{
                          props.changeSelect(e, "employerProvince", "selectedEmployerProvince")
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
                        id="employerProvince"
                        name="employerProvince"
                        placeholder=""
                        value={props.state.employerProvince}
                        onChange={props.handleOnChange}
                        onBlur={() =>
                          props.validator.showMessageFor(
                            "Employer Employer Province"
                          )
                        }
                      /> */}
                      {props.validator.message(
                        "Employer Province",
                        props.state.employerProvince,
                        "required"
                      )}
                    </div>
                  </div>
                  <div className="col-outer pt-0 pb-0">
                    <div className="PostApp-Form Applicantin-Btm">
                      <label>Employer Phone</label>
                      <NumberFormat
                        required
                        className="form-control"
                        format="+1 (###) ###-####"
                        placeholder="+1 (123) 456-7890"
                        value={props.state.employerPhone}
                        onChange={props.handleOnChange}
                        allowNegative={false}
                        id="employerPhone"
                        name="employerPhone"
                        onBlur={() =>
                          props.validator.showMessageFor("Employer Phone")
                        }
                      />
                      {props.validator.message(
                        "Employer Phone",
                        props.state.employerPhone,
                        "required"
                      )}
                    </div>
                  </div>
                  <div className="col-outer pt-0 pb-0">
                    <div className="PostApp-Form Applicantin-Btm">
                      <label>Employer Email (optional)</label>
                      <input
                        required
                        type="email"
                        id="employerEmail"
                        name="employerEmail"
                        placeholder=""
                        value={props.state.employerEmail}
                        onChange={props.handleOnChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
              {props.state.employmentSinceYear >= 2 && (
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
              )}
              <div className="clearfix"></div>
              <div className="row align-items-center">
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6">
                  <div className="PostApp-NextBtn previous-btn float-left">
                    <button
                      type="button"
                      onClick={() => props.changeEmployementInformation(0)}
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
                      onClick={
                        props.state.employmentSinceYear >= 2
                          ? props.state.coApplication === "yes"
                            ? () => props.changeStepButton(3, 4, Next)
                            : () => props.changeStepButton(3, 5, Next)
                          : () => props.changeEmployementInformation(2)
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

export default EmploymentInformation2;
