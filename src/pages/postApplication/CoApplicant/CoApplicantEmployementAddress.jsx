import React from "react";
import { Animated } from "react-animated-css";
import NumberFormat from "react-number-format";
import Select, { components } from "react-select";
import { Scrollbars } from "react-custom-scrollbars";

const CoApplicantEmploymentInformation = (props) => {
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
            <h1>Co Applicant Employer Address</h1>
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
                      id="coEmployerStreetAddress"
                      name="coEmployerStreetAddress"
                      placeholder=""
                      value={props.state.coEmployerStreetAddress}
                      onChange={props.handleOnChange}
                      onBlur={() =>
                        props.validator.showMessageFor(
                          "Co Employer Street Address"
                        )
                      }
                    />
                    {props.validator.message(
                      "Co Employer Street Address",
                      props.state.coEmployerStreetAddress,
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
                        id="coEmployerCity"
                        name="coEmployerCity"
                        placeholder=""
                        value={props.state.coEmployerCity}
                        onChange={props.handleOnChange}
                        onBlur={() =>
                          props.validator.showMessageFor("Co Employer City")
                        }
                      />
                      {props.validator.message(
                        "Co Employer City",
                        props.state.coEmployerCity,
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
                        id="selectedCoEmployerProvince"
                        name="selectedCoEmployerProvince"
                        options={props.state.provinces}
                        value={props.state.selectedCoEmployerProvince}
                        onChange={(e) =>{
                          props.changeSelect(e, "coEmployerProvince", "selectedCoEmployerProvince")
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
                        id="coEmployerProvince"
                        name="coEmployerProvince"
                        placeholder=""
                        value={props.state.coEmployerProvince}
                        onChange={props.handleOnChange}
                        onBlur={() =>
                          props.validator.showMessageFor("Co Employer Province")
                        }
                      /> */}
                      {props.validator.message(
                        "Co Employer Province",
                        props.state.coEmployerProvince,
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
                        value={props.state.coEmployerPhone}
                        onChange={props.handleOnChange}
                        allowNegative={false}
                        id="coEmployerPhone"
                        name="coEmployerPhone"
                        format="+1 (###) ###-####"
                        placeholder="+1 (123) 456-7890"
                        onBlur={() =>
                          props.validator.showMessageFor("Co Employer Phone")
                        }
                      />
                      {props.validator.message(
                        "Co Employer Phone",
                        props.state.coEmployerPhone,
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
                        id="coEmployerEmail"
                        name="coEmployerEmail"
                        placeholder=""
                        value={props.state.coEmployerEmail}
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
                      onClick={() => props.changeCoEmploymentStep(0)}
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
                        props.state.coEmploymentSinceYear >= 2
                          ? props.changeStepButton(4, nextStep, Next)
                          : props.changeCoEmploymentStep(2)
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

export default CoApplicantEmploymentInformation;
