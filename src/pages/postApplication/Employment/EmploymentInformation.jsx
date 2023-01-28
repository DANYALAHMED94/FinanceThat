import React from "react";
import NumberFormat from "react-number-format";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getMonth, getYear } from "date-fns";
import range from "lodash/range";
import Select, { components } from "react-select";
import { Scrollbars } from "react-custom-scrollbars";
import { Animated } from "react-animated-css";
import MonthlyIncomeOptions from "../../../components/MonthlyIncomeOptions";

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
const EmploymentInformation = (props) => {
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
            <h1>Applicant Current Employment</h1>
          </div>
          <div className="clearfix">
            <form>
              <div className="ApplicantInfo-Container">
                <div className="two-col-grid clearfix">
                  <div className="col-outer pt-0 pb-0">
                    <div className="PostApp-Form Applicantin-Btm">
                      <label>Employment Status</label>
                      <Select
                        required
                        placeholder=""
                        id="selectEmploymentStatus"
                        name="selectEmploymentStatus"
                        options={props.state.employmentStatuses}
                        onChange={(e) =>
                          props.changeSelect(
                            e,
                            "employmentStatus",
                            "selectEmploymentStatus"
                          )
                        }
                        value={props.state.selectEmploymentStatus}
                        className="react-select-main"
                        classNamePrefix="react-select"
                        components={{
                          Option: renderOption,
                          MenuList: renderScrollbar,
                        }}
                        captureMenuScroll={false}
                        onBlur={() =>
                          props.validator.showMessageFor("Employement Status")
                        }
                      />

                      {props.validator.message(
                        "Employement Status",
                        props.state.employmentStatus,
                        "required"
                      )}
                    </div>
                  </div>
                  <div
                    className={
                      props.state.employmentStatus === "Unemployed" ||
                      props.state.employmentStatus === "Retired" ||
                      props.state.employmentStatus === "Self employed"
                        ? "col-outer pt-0 pb-0 display-none"
                        : "col-outer pt-0 pb-0"
                    }
                  >
                    <div className="PostApp-Form Applicantin-Btm">
                      <label>Employment Type</label>
                      <Select
                        required
                        placeholder=""
                        id="selectTypeOfEmployment"
                        name="selectTypeOfEmployment"
                        options={props.state.typeOfEmployments}
                        onChange={(e) =>
                          props.changeSelect(
                            e,
                            "typeOfEmployment",
                            "selectTypeOfEmployment"
                          )
                        }
                        value={props.state.selectTypeOfEmployment}
                        className="react-select-main"
                        classNamePrefix="react-select"
                        components={{
                          Option: renderOption,
                          MenuList: renderScrollbarTypeEmployee,
                        }}
                        captureMenuScroll={false}
                        onBlur={() =>
                          props.validator.showMessageFor("Type Of Employee")
                        }
                      />
                      {props.validator.message(
                        "Type Of Employee",
                        props.state.typeOfEmployment,
                        "required"
                      )}
                    </div>
                  </div>
                  <div
                    className={
                      props.state.employmentStatus !== "Self employed"
                        ? "col-outer pt-0 pb-0 display-none"
                        : "col-outer pt-0 pb-0"
                    }
                  >
                    <div className="PostApp-Form Applicantin-Btm">
                      <div className="PostApp-Form Applicantin-Btm">
                        <label>Business Name</label>
                        <input
                          required
                          type="text"
                          id="employeeBusinessName"
                          name="employeeBusinessName"
                          placeholder="Enter Business Name Here"
                          value={props.state.employeeBusinessName}
                          onChange={props.handleOnChange}
                          onBlur={() =>
                            props.validator.showMessageFor("Business Name")
                          }
                        />
                        {props.validator.message(
                          "Business Name",
                          props.state.employeeBusinessName,
                          "required"
                        )}
                      </div>
                    </div>
                  </div>
                  <div
                    className={
                      props.state.employmentStatus === "Unemployed" ||
                      props.state.employmentStatus === "Retired" ||
                      props.state.employmentStatus === "Self employed"
                        ? "col-outer pt-0 pb-0 display-none"
                        : "col-outer pt-0 pb-0"
                    }
                  >
                    <div className="PostApp-Form Applicantin-Btm">
                      <div className="PostApp-Form Applicantin-Btm">
                        <label>Employer Name</label>
                        <input
                          required
                          type="text"
                          id="employerName"
                          name="employerName"
                          value={props.state.employerName}
                          placeholder="Enter Employer Name Here"
                          onChange={props.handleOnChange}
                          onBlur={() =>
                            props.validator.showMessageFor("Employer Name")
                          }
                        />
                        {props.validator.message(
                          "Employer Name",
                          props.state.employerName,
                          "required"
                        )}
                      </div>
                    </div>
                  </div>
                  <div
                    className={
                      props.state.employmentStatus === "Unemployed" ||
                      props.state.employmentStatus === "Retired" ||
                      props.state.employmentStatus === "Self employed"
                        ? "col-outer pt-0 pb-0 display-none"
                        : "col-outer pt-0 pb-0"
                    }
                  >
                    <div className="PostApp-Form Applicantin-Btm">
                      <div className="PostApp-Form Applicantin-Btm">
                        <label>Occupation</label>
                        <input
                          required
                          type="text"
                          id="occupation"
                          name="occupation"
                          value={props.state.occupation}
                          placeholder="Occupation"
                          onChange={props.handleOnChange}
                          onBlur={() =>
                            props.validator.showMessageFor(
                              "Employer Occupation"
                            )
                          }
                        />
                        {props.validator.message(
                          "Employer Occupation",
                          props.state.occupation,
                          "required"
                        )}
                      </div>
                    </div>
                  </div>
                  <div
                    className={
                      props.state.employmentStatus === "Unemployed"
                        ? "col-outer pt-0 pb-0 display-none"
                        : "col-outer pt-0 pb-0"
                    }
                  >
                    <div className="PostApp-Form Applicantin-Btm">
                    <label>Monthly income</label>
                      <MonthlyIncomeOptions 
                      value={props.state.grossIncome}
                      getDuration={(e) =>{
                          let ee = {target:{ name: "grossIncome", value:  e.value}};
                          props.handleOnChange(ee)
                          }} />
                      {/* <label>Gross Annual income</label>
                      <NumberFormat
                        required
                        className="form-control"
                        value={props.state.grossIncome}
                        decimalScale={2}
                        prefix={"$"}
                        onChange={props.handleOnChange}
                        thousandSeparator={true}
                        id="grossIncome"
                        name="grossIncome"
                        placeholder="Enter Your Gross Annual income Here"
                        onBlur={() =>
                          props.validator.showMessageFor("Gross Income")
                        }
                      /> */}
                      {props.validator.message(
                        "Monthly Income",
                        props.state.grossIncome,
                        "required"
                      )}
                    </div>
                  </div>

                  <div
                    className={
                      props.state.employmentStatus === "Unemployed" ||
                      props.state.employmentStatus === "Retired"
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
                            value={props.state.employmentSinceYear}
                            onChange={props.handleOnChange}
                            allowNegative={false}
                            id="employmentSinceYear"
                            name="employmentSinceYear"
                            style={{ width: "50px" }}
                            onBlur={() =>
                              props.validator.showMessageFor(
                                "Employment Since Year"
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
                            value={props.state.employmentSinceMonth}
                            onChange={props.handleOnChange}
                            allowNegative={false}
                            id="employmentSinceMonth"
                            name="employmentSinceMonth"
                            style={{ width: "50px" }}
                            onBlur={() =>
                              props.validator.showMessageFor(
                                "Employment Since Month"
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
                          "Employment Since Year",
                          props.state.employmentSinceYear,
                          "required"
                        )}
                        {props.state.employmentSinceYear &&
                          props.validator.message(
                            "Employment Since Month",
                            props.state.employmentSinceMonth,
                            "required"
                          )}
                      </div>
                    </div>
                  </div>
                  <div
                    className={
                      props.state.employmentStatus !== "Self employed"
                        ? "col-outer pt-0 pb-0 display-none"
                        : "col-outer pt-0 pb-0"
                    }
                  >
                    <div className="PostApp-Form Applicantin-Btm">
                      <div className="PostApp-Form Applicantin-Btm">
                        <label>Type of Business</label>
                        <input
                          required
                          type="text"
                          id="employeeTypeOfBusiness"
                          name="employeeTypeOfBusiness"
                          placeholder="Business Type"
                          value={props.state.employeeTypeOfBusiness}
                          onChange={props.handleOnChange}
                          onBlur={() =>
                            props.validator.showMessageFor("Business Type")
                          }
                        />
                        {props.validator.message(
                          "Business Type",
                          props.state.employeeTypeOfBusiness,
                          "required"
                        )}
                      </div>
                    </div>
                  </div>

                  {["Unemployed", "Retired"].includes(
                    props.state.employmentStatus
                  ) && (
                    <>
                      <div
                        className={
                          props.state.employmentStatus === "Unemployed"
                            ? "col-outer pt-0 pb-0"
                            : "col-outer pt-0 pb-0 display-none"
                        }
                      >
                        <div class="PostApp-Form Applicantin-Btm">
                          <label style={{ opacity: "0" }}>
                            Gross Annual income
                          </label>
                          <input
                            required=""
                            class="form-control"
                            id="grossIncome"
                            name="grossIncome"
                            placeholder="Enter Your Gross Annual income Here"
                            type="text"
                            value=""
                            inputmode="numeric"
                            style={{ opacity: "0" }}
                          />
                        </div>
                      </div>
                      <div className="PostApp-Coapplicant">
                        <h1>Do you want to add a co-applicant?</h1>
                        <ul>
                          <li>
                            <label
                              className="Applicant-Btn"
                              style={{ paddingLeft: "27px" }}
                            >
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
                            <label
                              className="Applicant-Btn"
                              style={{ paddingLeft: "27px" }}
                            >
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
                    </>
                  )}
                </div>
              </div>
              <div className="clearfix"></div>
              <div className="row align-items-center">
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6">
                  <div className="PostApp-NextBtn previous-btn float-left">
                    <button
                      type="button"
                      onClick={() => {
                        props.changeStepButton(1, 2, -props.state.startAddress);
                      }}
                    >
                      {" "}
                      <i className="fa fa-angle-left"></i> Previous{" "}
                    </button>
                  </div>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6">
                  <div className="PostApp-NextBtn float-right">
                    {/* <button type="button" onClick={props.state.coApplication === 'yes' ? () => props.changeStepButton(3, 4, (Next)) : () => props.changeStepButton(3, 5, (Next))}>Next <i className="fa fa-angle-right"></i></button> */}
                    <button
                      type="button"
                      onClick={() => {
                        if (
                          ["Unemployed", "Retired"].includes(
                            props.state.employmentStatus
                          )
                        ) {
                          props.state.coApplication === "yes"
                            ? props.changeStepButton(3, 4, Next)
                            : props.changeStepButton(3, 5, Next);
                        } else {
                          props.changeEmployementInformation(1);
                        }
                      }}
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
export default EmploymentInformation;
