import React, { useEffect } from "react";
// import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import NumberFormat from "react-number-format";
// import DateFnsUtils from '@date-io/date-fns';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getMonth, getYear } from "date-fns";
import range from "lodash/range";
import { Animated } from "react-animated-css";
import Select, { components } from "react-select";

// import { Scrollbars } from "react-custom-scrollbars";

const { Option } = components;

const renderScrollbar = (props) => {
  return (
    <div style={{ height: "auto" }}>
      {props.children}
      {/* <Scrollbars>{props.children}</Scrollbars> */}
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
const ApplicantInformation = (props) => {
  const bar = props.state.startPerc / 2;
  const lastBar = props.state.startPerc * 5;
  const Next =
    props.state.backTo === "" ? props.state.startPerc : lastBar + bar;

  const years = range(1900, getYear(new Date()) + 1, 1);
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

  // making scroll bar at start
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    return () => {};
  }, []);

  const user = localStorage.getItem("user");
  const userType = user ? JSON.parse(user).user_type : "";
  return (
    <React.Fragment>
      <Animated
        animationIn={props.state.animation}
        animationInDuration={500}
        animationOutDuration={500}
        animationOut="fadeOutUp"
        isVisible={true}
      >
        <div className="PostApp-SecOne item">
          <div className="PostApp-Head">
            <h1>Applicant Information</h1>
          </div>

          <div className="clearfix">
            <form>
              <div className="ApplicantInfo-Container">
                <div className="two-col-grid clearfix">
                  <div className="col-outer pt-0 pb-0">
                    <div className="PostApp-Form">
                      <label>Salutation</label>
                      <Select
                        required
                        placeholder="Salutation"
                        id="selectSalutation"
                        name="salutation"
                        options={props.state.salutations}
                        onChange={(e) =>
                          props.changeSelect(
                            e,
                            "salutation",
                            "selectSalutation"
                          )
                        }
                        value={props.state.selectSalutation}
                        className="react-select-main"
                        classNamePrefix="react-select"
                        components={{
                          Option: renderOption,
                          MenuList: renderScrollbar,
                        }}
                        captureMenuScroll={false}
                        onBlur={() =>
                          props.validator.showMessageFor("Salutation")
                        }
                      />
                      {props.validator.message(
                        "Salutation",
                        props.state.salutation,
                        "required"
                      )}
                    </div>
                  </div>
                  {userType === 2 && (
                    <div className="col-outer pt-0 pb-0">
                      <div className="PostApp-Form Applicantin-Btm">
                        <label>Applicant's Email</label>
                        <input
                          type="text"
                          id="applicantEmailByDealer"
                          required
                          name="applicantEmailByDealer"
                          placeholder="Please Enter Applicant's Email"
                          onChange={props.handleOnChange}
                          value={props.state.applicantEmailByDealer}
                          onBlur={() =>
                            props.validator.showMessageFor(
                              "Applicant Email By Dealer"
                            )
                          }
                        />
                        {props.validator.message(
                          "Applicant Email By Dealer",
                          props.state.applicantEmailByDealer,
                          "required"
                        )}
                      </div>
                    </div>
                  )}
                </div>
                <div className="two-col-grid clearfix">
                  <div className="col-outer pt-0 pb-0">
                    <div className="PostApp-Form Applicantin-Btm">
                      <label>First Name</label>
                      <input
                        type="text"
                        id="applicantFirstName"
                        required
                        name="applicantFirstName"
                        placeholder="Please Enter First Name"
                        onChange={props.handleOnChange}
                        value={props.state.applicantFirstName}
                        onBlur={() =>
                          props.validator.showMessageFor("Applicant First Name")
                        }
                      />
                      {props.validator.message(
                        "Applicant First Name",
                        props.state.applicantFirstName,
                        "required"
                      )}
                    </div>
                  </div>
                  <div className="col-outer pt-0 pb-0">
                    <div className="PostApp-Form Applicantin-Btm">
                      <label>Last Name</label>
                      <input
                        type="text"
                        id="applicantLastName"
                        required
                        name="applicantLastName"
                        placeholder="Please Enter Last Name"
                        onChange={props.handleOnChange}
                        value={props.state.applicantLastName}
                        onBlur={() =>
                          props.validator.showMessageFor("Applicant Last Name")
                        }
                      />
                      {props.validator.message(
                        "Applicant Last Name",
                        props.state.applicantLastName,
                        "required"
                      )}
                    </div>
                  </div>
                  <div className="col-outer pt-0 pb-0">
                    <div className="PostApp-Form Applicantin-Btm">
                      <label>Date of Birth</label>
                      <DatePicker
                        required
                        renderCustomHeader={({
                          date,
                          changeYear,
                          changeMonth,
                          decreaseMonth,
                          increaseMonth,
                          prevMonthButtonDisabled,
                          nextMonthButtonDisabled,
                        }) => (
                          <div
                            style={{
                              margin: 10,
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            <button
                              onClick={decreaseMonth}
                              disabled={prevMonthButtonDisabled}
                              type="button"
                            >
                              {"<"}
                            </button>
                            <select
                              value={getYear(date)}
                              onChange={({ target: { value } }) =>
                                changeYear(value)
                              }
                            >
                              {years.map((option) => (
                                <option key={option} value={option}>
                                  {option}
                                </option>
                              ))}
                            </select>

                            <select
                              value={months[getMonth(date)]}
                              onChange={({ target: { value } }) =>
                                changeMonth(months.indexOf(value))
                              }
                            >
                              {months.map((option) => (
                                <option key={option} value={option}>
                                  {option}
                                </option>
                              ))}
                            </select>
                            <button
                              onClick={increaseMonth}
                              disabled={nextMonthButtonDisabled}
                              type="button"
                            >
                              {">"}
                            </button>
                          </div>
                        )}
                        selected={props.state.applicantDateOfBirth}
                        placeholderText="YYYY-MM-DD"
                        dateFormat="yyyy-MM-dd"
                        onChange={(e) =>
                          props.handleOnChangeDates(e, "applicantDateOfBirth")
                        }
                        maxDate={new Date()}
                      />
                      {props.validator.message(
                        "Applicant Date Of Birth",
                        props.state.applicantDateOfBirth,
                        "required"
                      )}
                    </div>
                  </div>

                  <div className="col-outer pt-0 pb-0">
                    <div className="PostApp-Form">
                      <label>Marital Status</label>
                      <Select
                        required
                        placeholder="Marital Status"
                        id="selectMaritalStatus"
                        name="maritalStatus"
                        options={props.state.maritalStatues}
                        onChange={(e) =>
                          props.changeSelect(
                            e,
                            "maritalStatus",
                            "selectMaritalStatus"
                          )
                        }
                        value={props.state.selectMaritalStatus}
                        className="react-select-main"
                        classNamePrefix="react-select"
                        components={{
                          Option: renderOption,
                          MenuList: renderScrollbar,
                        }}
                        captureMenuScroll={false}
                        onBlur={() =>
                          props.validator.showMessageFor("Marital Status")
                        }
                      />
                      {props.validator.message(
                        "Marital Status",
                        props.state.maritalStatus,
                        "required"
                      )}
                    </div>
                  </div>

                  <div className="col-outer pt-0 pb-0">
                    <div className="PostApp-Form">
                      <label>Gender</label>
                      <Select
                        required
                        placeholder="Gender"
                        id="selectGender"
                        name="gender"
                        options={props.state.genders}
                        onChange={(e) =>
                          props.changeSelect(e, "gender", "selectGender")
                        }
                        value={props.state.selectGender}
                        className="react-select-main"
                        classNamePrefix="react-select"
                        components={{
                          Option: renderOption,
                          MenuList: renderScrollbar,
                        }}
                        captureMenuScroll={false}
                        onBlur={() => props.validator.showMessageFor("Gender")}
                      />
                      {props.validator.message(
                        "Gender",
                        props.state.gender,
                        "required"
                      )}
                    </div>
                  </div>
                  {userType === 2 && (
                    <div className="col-outer pt-0 pb-0">
                      <div className="PostApp-Form">
                        <label> Applicant Telephone</label>
                        <NumberFormat
                          required
                          className="form-control"
                          format="+1 (###) ###-####"
                          placeholder="+1 (123) 456-7890"
                          onChange={props.handleOnChange}
                          value={props.state.applicantTelephone}
                          name="applicantTelephone"
                          onBlur={() =>
                            props.validator.showMessageFor(
                              "Applicant Telephone"
                            )
                          }
                        />
                        {props.validator.message(
                          "Applicant Telephone",
                          props.state.applicantTelephone,
                          "required|phone"
                        )}
                      </div>
                    </div>
                  )}

                  <div className="col-outer pt-0 pb-0">
                    <div className="PostApp-Form">
                      <label> Social insurance number (optional)</label>
                      <NumberFormat
                        required
                        className="form-control"
                        value={props.state.sinNumber}
                        onChange={props.handleOnChange}
                        allowNegative={false}
                        id="sinNumber"
                        name="sinNumber"
                        placeholder="SIN Number"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                  <div className="PostApp-NextBtn float-right">
                    <button
                      type="button"
                      onClick={() => props.changeStepButton(1, 2, Next)}
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
export default ApplicantInformation;
