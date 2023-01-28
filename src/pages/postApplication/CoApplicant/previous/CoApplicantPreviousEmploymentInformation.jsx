import React from "react";
import NumberFormat from "react-number-format";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getMonth, getYear } from "date-fns";
import range from "lodash/range";
import { Animated } from "react-animated-css";
import Select, { components } from "react-select";
import { Scrollbars } from "react-custom-scrollbars";
import MonthlyIncomeOptions from "../../../../components/MonthlyIncomeOptions";

const { Option } = components;

const renderScrollbar = (props) => {
  return (
    <div style={{ height: 200 }}>
      <Scrollbars>{props.children}</Scrollbars>
    </div>
  );
};
const renderScrollbarTypeEmployee = (props) => {
  return (
    <div style={{ height: 150 }}>
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
const CoApplicantPreviousEmploymentInformation = (props) => {
  const bar = props.state.startPerc / 2;
  const lastBar = props.state.startPerc * 1;
  const Next =
    props.state.backFromCo === ""
      ? props.state.startPerCo
      : lastBar + bar + props.state.startPerCo;
  const nextStep = props.state.backFromCo === "" ? 5 : 6;
  const years = range(1990, getYear(new Date()) + 1, 1);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
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
            <h1>Co Applicant Previous Employment Information</h1>
            <div className="textErrorMessage">
              We require this information because your current employment
              duration is less than 2 years old
            </div>
          </div>

          <div className="clearfix">
            <form>
              <div className="ApplicantInfo-Container">
                <div className="two-col-grid clearfix">
                  <div className="col-outer pt-0 pb-0">
                    <div className="PostApp-Form">
                      <label>Previous Employment Status</label>
                      <Select
                        required
                        placeholder=""
                        id="selectPreviousCoEmploymentStatus"
                        name="selectPreviousCoEmploymentStatus"
                        options={props.state.employmentStatuses}
                        onChange={(e) =>
                          props.changeSelect(
                            e,
                            "previousCoEmploymentStatus",
                            "selectPreviousCoEmploymentStatus"
                          )
                        }
                        value={props.state.selectPreviousCoEmploymentStatus}
                        className="react-select-main"
                        classNamePrefix="react-select"
                        placeHolder="Select Employment Status"
                        components={{
                          Option: renderOption,
                          MenuList: renderScrollbar,
                        }}
                        captureMenuScroll={false}
                        onBlur={() =>
                          props.validator.showMessageFor(
                            "Co Applicant Previous Employement Status"
                          )
                        }
                      />
                      {props.validator.message(
                        "Co Applicant Previous Employement Status",
                        props.state.previousCoEmploymentStatus,
                        "required"
                      )}
                    </div>
                  </div>
                  <div
                    className={
                      props.state.previousCoEmploymentStatus === "Unemployed" ||
                      props.state.previousCoEmploymentStatus === "Retired" ||
                      props.state.previousCoEmploymentStatus === "Self employed"
                        ? "col-outer pt-0 pb-0 display-none"
                        : "col-outer pt-0 pb-0"
                    }
                  >
                    <div className="PostApp-Form">
                      <label>Previous Type of Employment</label>
                      <Select
                        required
                        placeholder=""
                        id="selectPreviousCoTypeOfEmployment"
                        name="selectPreviousCoTypeOfEmployment"
                        options={props.state.typeOfEmployments}
                        onChange={(e) =>
                          props.changeSelect(
                            e,
                            "previousCoTypeOfEmployment",
                            "selectPreviousCoTypeOfEmployment"
                          )
                        }
                        value={props.state.selectPreviousCoTypeOfEmployment}
                        className="react-select-main"
                        classNamePrefix="react-select"
                        placeHolder="Select Employment Type"
                        components={{
                          Option: renderOption,
                          MenuList: renderScrollbarTypeEmployee,
                        }}
                        captureMenuScroll={false}
                        onBlur={() =>
                          props.validator.showMessageFor(
                            "Co Applicant Previous Type Of Employee"
                          )
                        }
                      />
                      {props.validator.message(
                        "Co Applicant Previous Type Of Employee",
                        props.state.previousCoTypeOfEmployment,
                        "required"
                      )}
                    </div>
                  </div>

                  <div
                    className={
                      props.state.previousCoEmploymentStatus !== "Self employed"
                        ? "col-outer pt-0 pb-0 display-none"
                        : "col-outer pt-0 pb-0"
                    }
                  >
                    <div className="PostApp-Form Applicantin-Btm">
                      <div className="PostApp-Form Applicantin-Btm">
                        <label>Previous Business Name</label>
                        <input
                          required
                          type="text"
                          id="previousCoEmployeeBusinessName"
                          name="previousCoEmployeeBusinessName"
                          placeHolder="Enter Business Name Here"
                          value={props.state.previousCoEmployeeBusinessName}
                          onChange={props.handleOnChange}
                          onBlur={() =>
                            props.validator.showMessageFor(
                              "Co Applicant Previous Business Name"
                            )
                          }
                        />
                        {props.validator.message(
                          "Co Applicant PreviousBusiness Name",
                          props.state.previousCoEmployeeBusinessName,
                          "required"
                        )}
                      </div>
                    </div>
                  </div>
                  <div
                    className={
                      props.state.previousCoEmploymentStatus === "Unemployed" ||
                      props.state.previousCoEmploymentStatus === "Retired" ||
                      props.state.previousCoEmploymentStatus === "Self employed"
                        ? "col-outer pt-0 pb-0 display-none"
                        : "col-outer pt-0 pb-0"
                    }
                  >
                    <div className="PostApp-Form">
                      <label>Previous Employer Name</label>
                      <input
                        required
                        type="text"
                        id="previousCoEmployerName"
                        name="previousCoEmployerName"
                        value={props.state.previousCoEmployerName}
                        placeHolder="Enter Employer Name Here"
                        onChange={props.handleOnChange}
                        onBlur={() =>
                          props.validator.showMessageFor(
                            "Co Applicant Previous Employer Name"
                          )
                        }
                      />
                      {props.validator.message(
                        "Co Applicant Previous Employer Name",
                        props.state.previousCoEmployerName,
                        "required"
                      )}
                    </div>
                  </div>
                  <div
                    className={
                      props.state.previousCoEmploymentStatus === "Unemployed" ||
                      props.state.previousCoEmploymentStatus === "Retired" ||
                      props.state.previousCoEmploymentStatus === "Self employed"
                        ? "col-outer pt-0 pb-0 display-none"
                        : "col-outer pt-0 pb-0"
                    }
                  >
                    <div className="PostApp-Form">
                      <label>Previous Occupation</label>
                      <input
                        required
                        type="text"
                        id="previousCoOccupation"
                        name="previousCoOccupation"
                        placeHolder="Occupation"
                        onChange={props.handleOnChange}
                        value={props.state.previousCoOccupation}
                        onBlur={() =>
                          props.validator.showMessageFor(
                            "Co Applicant Previous Employer Occupation"
                          )
                        }
                      />
                      {props.validator.message(
                        "Co Applicant Previous Employer Occupation",
                        props.state.previousCoOccupation,
                        "required"
                      )}
                    </div>
                  </div>
                  <div
                    className={
                      props.state.previousCoEmploymentStatus === "Unemployed"
                        ? "col-outer pt-0 pb-0 display-none"
                        : "col-outer pt-0 pb-0"
                    }
                  >
                    <div className="PostApp-Form Applicantin-Btm">
                    <label>Previous Monthly income</label>
                      <MonthlyIncomeOptions 
                      value={props.state.previousCoGrossIncome}
                      getDuration={(e) =>{
                          let ee = {target:{ name: "previousCoGrossIncome", value:  e.value}};
                          props.handleOnChange(ee)
                          }} />
                      {/* <label>Previous Gross Annual income</label>
                      <NumberFormat
                        required
                        className="form-control"
                        decimalScale={2}
                        onChange={props.handleOnChange}
                        thousandSeparator={true}
                        prefix={"$"}
                        id="previousCoGrossIncome"
                        name="previousCoGrossIncome"
                        placeholder="Enter Your Gross Annual income Here"
                        value={props.state.previousCoGrossIncome}
                        onBlur={() =>
                          props.validator.showMessageFor(
                            "Co Applicant Previous Gross Income"
                          )
                        }
                      /> */}
                      {props.validator.message(
                        "Co Applicant Previous Monthly Income",
                        props.state.previousCoGrossIncome,
                        "required"
                      )}
                    </div>
                  </div>

                  <div
                    className={
                      props.state.previousCoEmploymentStatus === "Unemployed" ||
                      props.state.previousCoEmploymentStatus === "Retired"
                        ? "col-outer pt-0 pb-0 display-none"
                        : "col-outer pt-0 pb-0"
                    }
                  >
                    <div className="PostApp-Form Applicantin-Btm">
                      <label>
                        {/* {props.state.employmentStatus === "Self employed"
                          ? "Business start date"
                          : "Employment since"} */}
                        Duration
                      </label>
                      <div className="flexCenter">
                        <div className="flexCenter mr-3">
                          <NumberFormat
                            required
                            className="form-control"
                            value={props.state.previousCoEmploymentSinceYear}
                            onChange={props.handleOnChange}
                            allowNegative={false}
                            id="previousCoEmploymentSinceYear"
                            name="previousCoEmploymentSinceYear"
                            style={{ width: "50px" }}
                            onBlur={() =>
                              props.validator.showMessageFor(
                                "Co Applicant Previous Employment Since Year"
                              )
                            }
                          />
                          <label
                            className="mb-0 ml-2"
                            style={{ color: "#828385" }}
                          >
                            Years
                          </label>
                        </div>
                        <div className="flexCenter">
                          <NumberFormat
                            required
                            className="form-control"
                            value={props.state.previousCoEmploymentSinceMonth}
                            onChange={props.handleOnChange}
                            allowNegative={false}
                            id="previousCoEmploymentSinceMonth"
                            name="previousCoEmploymentSinceMonth"
                            style={{ width: "50px" }}
                            onBlur={() =>
                              props.validator.showMessageFor(
                                "Co Applicant Previous Employment Since Month"
                              )
                            }
                          />
                          <label
                            className="mb-0 ml-2"
                            style={{ color: "#828385" }}
                          >
                            Month
                          </label>
                        </div>
                      </div>

                      <div className="flexCenter mt-3">
                        {props.validator.message(
                          "Co Applicant Previous Employment Since Year",
                          props.state.previousCoEmploymentSinceYear,
                          "required"
                        )}
                        {props.state.previousCoEmploymentSinceYear &&
                          props.validator.message(
                            "Co Applicant Previous Employment Since Month",
                            props.state.previousCoEmploymentSinceMonth,
                            "required"
                          )}
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className={
                    props.state.previousCoEmploymentStatus !== "Self employed"
                      ? "col-outer pt-0 pb-0 display-none"
                      : "col-outer pt-0 pb-0"
                  }
                >
                  <div className="PostApp-Form Applicantin-Btm">
                    <div className="PostApp-Form Applicantin-Btm">
                      <label>Previous Type of Business</label>
                      <input
                        required
                        type="text"
                        id="previousCoEmployeeTypeOfBusiness"
                        name="previousCoEmployeeTypeOfBusiness"
                        placeHolder="Enter Business Type Here"
                        value={props.state.previousCoEmployeeTypeOfBusiness}
                        onChange={props.handleOnChange}
                        onBlur={() =>
                          props.validator.showMessageFor(
                            "Co Applicant Previous Business Type"
                          )
                        }
                      />
                      {props.validator.message(
                        "Co Applicant Previous Business Type",
                        props.state.previousCoEmployeeTypeOfBusiness,
                        "required"
                      )}
                    </div>
                  </div>
                </div>
                <div
                  className={
                    props.state.previousCoEmploymentStatus === "Unemployed"
                      ? "col-outer pt-0 pb-0 display-none"
                      : "col-outer pt-0 pb-0"
                  }
                ></div>
              </div>
              <div className="row align-items-center">
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6">
                  <div className="PostApp-NextBtn previous-btn float-left">
                    <button
                      type="button"
                      onClick={() => props.changeCoEmploymentStep(1)}
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
                        ["Unemployed", "Retired"].includes(
                          props.state.previousCoEmploymentStatus
                        )
                          ? () => props.changeStepButton(4, nextStep, Next)
                          : () => props.changeCoEmploymentStep(3)
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
export default CoApplicantPreviousEmploymentInformation;
