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
const EmploymentPreviousInformation = (props) => {
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
            <h1>Applicant Previous Employment </h1>
            <div className="textErrorMessage">
              We require this information because your current employment
              duration is less than <span>2 years old</span>
            </div>
          </div>
          <div className="clearfix">
            <form>
              <div className="ApplicantInfo-Container">
                <div className="two-col-grid clearfix">
                  <div className="col-outer pt-0 pb-0">
                    <div className="PostApp-Form Applicantin-Btm">
                      <label>Previous Employment Status</label>
                      <Select
                        required
                        placeholder=""
                        id="selectEmploymentStatus"
                        name="selectEmploymentStatus"
                        options={props.state.employmentStatuses}
                        onChange={(e) =>
                          props.changeSelect(
                            e,
                            "previousEmploymentStatus",
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
                          props.validator.showMessageFor(
                            "Previous Employement Status"
                          )
                        }
                      />

                      {props.validator.message(
                        "Previous Employement Status",
                        props.state.previousEmploymentStatus,
                        "required"
                      )}
                    </div>
                  </div>
                  <div
                    className={
                      props.state.previousEmploymentStatus === "Unemployed" ||
                      props.state.previousEmploymentStatus === "Retired" ||
                      props.state.previousEmploymentStatus === "Self employed"
                        ? "col-outer pt-0 pb-0 display-none"
                        : "col-outer pt-0 pb-0"
                    }
                  >
                    <div className="PostApp-Form Applicantin-Btm">
                      <label>Previous Employment Type</label>
                      <Select
                        required
                        placeholder=""
                        id="selectTypeOfEmployment"
                        name="selectTypeOfEmployment"
                        options={props.state.typeOfEmployments}
                        onChange={(e) =>
                          props.changeSelect(
                            e,
                            "previousTypeOfEmployment",
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
                          props.validator.showMessageFor(
                            "Previous Type Of Employee"
                          )
                        }
                      />
                      {props.validator.message(
                        "Previous Type Of Employee",
                        props.state.previousTypeOfEmployment,
                        "required"
                      )}
                    </div>
                  </div>

                  <div
                    className={
                      props.state.previousEmploymentStatus !== "Self employed"
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
                          id="previousEmployeeBusinessName"
                          name="previousEmployeeBusinessName"
                          placeholder="Enter Business Name Here"
                          value={props.state.previousEmployeeBusinessName}
                          onChange={props.handleOnChange}
                          onBlur={() =>
                            props.validator.showMessageFor(
                              "Previous Business Name"
                            )
                          }
                        />
                        {props.validator.message(
                          "Previous Business Name",
                          props.state.previousEmployeeBusinessName,
                          "required"
                        )}
                      </div>
                    </div>
                  </div>
                  <div
                    className={
                      props.state.previousEmploymentStatus === "Unemployed" ||
                      props.state.previousEmploymentStatus === "Retired" ||
                      props.state.previousEmploymentStatus === "Self employed"
                        ? "col-outer pt-0 pb-0 display-none"
                        : "col-outer pt-0 pb-0"
                    }
                  >
                    <div className="PostApp-Form Applicantin-Btm">
                      <div className="PostApp-Form Applicantin-Btm">
                        <label>Previous Employer Name</label>
                        <input
                          required
                          type="text"
                          id="previousEmployerName"
                          name="previousEmployerName"
                          value={props.state.previousEmployerName}
                          placeholder="Enter Employer Name Here"
                          onChange={props.handleOnChange}
                          onBlur={() =>
                            props.validator.showMessageFor(
                              "Previous Employer Name"
                            )
                          }
                        />
                        {props.validator.message(
                          "Previous Employer Name",
                          props.state.previousEmployerName,
                          "required"
                        )}
                      </div>
                    </div>
                  </div>
                  <div
                    className={
                      props.state.previousEmploymentStatus === "Unemployed" ||
                      props.state.previousEmploymentStatus === "Retired" ||
                      props.state.previousEmploymentStatus === "Self employed"
                        ? "col-outer pt-0 pb-0 display-none"
                        : "col-outer pt-0 pb-0"
                    }
                  >
                    <div className="PostApp-Form Applicantin-Btm">
                      <div className="PostApp-Form Applicantin-Btm">
                        <label>Previous Occupation</label>
                        <input
                          required
                          type="text"
                          id="previousOccupation"
                          name="previousOccupation"
                          value={props.state.previousOccupation}
                          placeholder="Previous Occupation"
                          onChange={props.handleOnChange}
                          onBlur={() =>
                            props.validator.showMessageFor(
                              "Previous Employer Occupation"
                            )
                          }
                        />
                        {props.validator.message(
                          "Previous Employer Occupation",
                          props.state.previousOccupation,
                          "required"
                        )}
                      </div>
                    </div>
                  </div>
                  <div
                    className={
                      props.state.previousEmploymentStatus === "Unemployed"
                        ? "col-outer pt-0 pb-0 display-none"
                        : "col-outer pt-0 pb-0"
                    }
                  >
                    <div className="PostApp-Form Applicantin-Btm">
                    <label>Previous Gross Income</label>
                    <MonthlyIncomeOptions 
                      value={props.state.previousGrossIncome}
                      getDuration={(e) =>{
                          let ee = {target:{ name: "previousGrossIncome", value:  e.value}};
                          props.handleOnChange(ee)
                          }} />
                      
                      {props.validator.message(
                        "Previous Monthly Income",
                        props.state.previousGrossIncome,
                        "required"
                      )}
                    </div>
                  </div>

                  <div
                    className={
                      props.state.previousEmploymentStatus === "Unemployed" ||
                      props.state.previousEmploymentStatus === "Retired"
                        ? "col-outer pt-0 pb-0 display-none"
                        : "col-outer pt-0 pb-0"
                    }
                  >
                    <div className="PostApp-Form Applicantin-Btm">
                      <label>
                        {/* {props.state.employmentStatus === "Self employed"
                          ? "Business start date"
                          : "Employment since"} */}
                        Previous Duration
                      </label>
                      <div className="flexCenter">
                        <div className="flexCenter mr-3">
                          <NumberFormat
                            required
                            className="form-control"
                            value={props.state.previousEmploymentSinceYear}
                            onChange={props.handleOnChange}
                            allowNegative={false}
                            id="previousEmploymentSinceYear"
                            name="previousEmploymentSinceYear"
                            style={{ width: "50px" }}
                            onBlur={() =>
                              props.validator.showMessageFor(
                                "Previous Employment Since Year"
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
                            value={props.state.previousEmploymentSinceMonth}
                            onChange={props.handleOnChange}
                            allowNegative={false}
                            id="previousEmploymentSinceMonth"
                            name="previousEmploymentSinceMonth"
                            style={{ width: "50px" }}
                            onBlur={() =>
                              props.validator.showMessageFor(
                                "Previous Employment Since Month"
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
                          "Previous Employment Since Year",
                          props.state.previousEmploymentSinceYear,
                          "required"
                        )}
                        {props.state.previousEmploymentSinceYear &&
                          props.validator.message(
                            "Previous Employment Since Month",
                            props.state.previousEmploymentSinceMonth,
                            "required"
                          )}
                      </div>
                    </div>
                  </div>
                  <div
                    className={
                      props.state.previousEmploymentStatus !== "Self employed"
                        ? "col-outer pt-0 pb-0 display-none"
                        : "col-outer pt-0 pb-0"
                    }
                  >
                    <div className="PostApp-Form Applicantin-Btm">
                      <div className="PostApp-Form Applicantin-Btm">
                        <label>Type of Previous Business</label>
                        <input
                          required
                          type="text"
                          id="previousEmployeeTypeOfBusiness"
                          name="previousEmployeeTypeOfBusiness"
                          placeholder="Previous Business Type"
                          value={props.state.previousEmployeeTypeOfBusiness}
                          onChange={props.handleOnChange}
                          onBlur={() =>
                            props.validator.showMessageFor(
                              "Previous Business Type"
                            )
                          }
                        />
                        {props.validator.message(
                          "Previous Business Type",
                          props.state.previousEmployeeTypeOfBusiness,
                          "required"
                        )}
                      </div>
                    </div>
                  </div>

                  {["Unemployed", "Retired"].includes(
                    props.state.previousEmploymentStatus
                  ) && (
                    <>
                      <div
                        className={
                          props.state.previousEmploymentStatus === "Unemployed"
                            ? "col-outer pt-0 pb-0"
                            : "col-outer pt-0 pb-0 display-none"
                        }
                      >
                        <div class="PostApp-Form Applicantin-Btm">
                          <label style={{ opacity: "0" }}>
                            Previous Gross Annual income
                          </label>
                          <input
                            required=""
                            class="form-control"
                            id="previousGrossIncome"
                            name="previousGrossIncome"
                            placeholder="Enter Your Gross Annual income Here"
                            type="text"
                            value={props.state.previousGrossIncome}
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
                        props.changeEmployementInformation(1);
                      }}
                    >
                      <i className="fa fa-angle-left"></i> Previous
                    </button>
                  </div>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6">
                  <div className="PostApp-NextBtn float-right">
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
                          props.changeEmployementInformation(3);
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
export default EmploymentPreviousInformation;
