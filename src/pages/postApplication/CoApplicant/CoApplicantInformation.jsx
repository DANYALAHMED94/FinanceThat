import React from "react";
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
const CoApplicantInformation = (props) => {
  // const Next = props.state.backTo === '' ? (props.state.startPerc) : (props.state.startPerc * 12)

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
            <h1>Co Applicant Information</h1>
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
                        id="selectCoSalutation"
                        name="coSalutation"
                        options={props.state.salutations}
                        onChange={(e) =>
                          props.changeSelect(
                            e,
                            "coSalutation",
                            "selectCoSalutation"
                          )
                        }
                        value={props.state.selectCoSalutation}
                        className="react-select-main"
                        classNamePrefix="react-select"
                        components={{
                          Option: renderOption,
                          MenuList: renderScrollbar,
                        }}
                        captureMenuScroll={false}
                        onBlur={() =>
                          props.validator.showMessageFor("Co Salutation")
                        }
                      />
                      {props.validator.message(
                        "Co Salutation",
                        props.state.coSalutation,
                        "required"
                      )}
                    </div>
                  </div>
                </div>
                <div className="two-col-grid clearfix">
                  <div className="col-outer pt-0 pb-0">
                    <div className="PostApp-Form">
                      <label>First Name</label>
                      <input
                        required
                        type="text"
                        id="coApplicantFirstName"
                        name="coApplicantFirstName"
                        placeHolder="Please Enter First Name"
                        value={props.state.coApplicantFirstName}
                        onChange={props.handleOnChange}
                        onBlur={() =>
                          props.validator.showMessageFor(
                            "Co Applicant First Name"
                          )
                        }
                      />
                      {props.validator.message(
                        "Co Applicant First Name",
                        props.state.coApplicantFirstName,
                        "required"
                      )}
                    </div>
                  </div>
                  <div className="col-outer pt-0 pb-0">
                    <div className="PostApp-Form">
                      <label>Last Name</label>
                      <input
                        required
                        type="text"
                        id="coApplicantLastName"
                        name="coApplicantLastName"
                        placeHolder="Please Enter Last Name"
                        value={props.state.coApplicantLastName}
                        onChange={props.handleOnChange}
                        onBlur={() =>
                          props.validator.showMessageFor(
                            "Co Applicant Last Name"
                          )
                        }
                      />
                      {props.validator.message(
                        "Co Applicant Last Name",
                        props.state.coApplicantLastName,
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
                        selected={props.state.coApplicantDateOfBirth}
                        placeholderText="YYYY-MM-DD"
                        dateFormat="yyyy-MM-dd"
                        onChange={(e) =>
                          props.handleOnChangeDates(e, "coApplicantDateOfBirth")
                        }
                        maxDate={new Date()}
                        // onBlur={() => props.validator.showMessageFor('Co Applicant Date Of Birth')}
                      />
                      {props.validator.message(
                        "Co Applicant Date Of Birth",
                        props.state.coApplicantDateOfBirth,
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
                        id="selectCoMaritalStatus"
                        name="coMaritalStatus"
                        options={props.state.maritalStatues}
                        onChange={(e) =>
                          props.changeSelect(
                            e,
                            "coMaritalStatus",
                            "selectCoMaritalStatus"
                          )
                        }
                        value={props.state.selectCoMaritalStatus}
                        className="react-select-main"
                        classNamePrefix="react-select"
                        components={{
                          Option: renderOption,
                          MenuList: renderScrollbar,
                        }}
                        captureMenuScroll={false}
                        onBlur={() =>
                          props.validator.showMessageFor(
                            "Co Applicant Marital Status"
                          )
                        }
                      />
                      {props.validator.message(
                        "Co Applicant Marital Status",
                        props.state.coMaritalStatus,
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
                        id="selectCoGender"
                        name="coGender"
                        options={props.state.genders}
                        onChange={(e) =>
                          props.changeSelect(e, "coGender", "selectCoGender")
                        }
                        value={props.state.selectCoGender}
                        className="react-select-main"
                        classNamePrefix="react-select"
                        components={{
                          Option: renderOption,
                          MenuList: renderScrollbar,
                        }}
                        captureMenuScroll={false}
                        onBlur={() =>
                          props.validator.showMessageFor("Co Gender")
                        }
                      />
                      {props.validator.message(
                        "Co Gender",
                        props.state.coGender,
                        "required"
                      )}
                    </div>
                  </div>
                  <div className="col-outer pt-0 pb-0">
                    <div className="PostApp-Form">
                      <label>Telephone</label>
                      <NumberFormat
                        required
                        className="form-control"
                        format="+1 (###) ###-####"
                        placeholder="+1 (123) 456-7890"
                        onChange={props.handleOnChange}
                        value={props.state.coApplicantTelephone}
                        name="coApplicantTelephone"
                        onBlur={() =>
                          props.validator.showMessageFor(
                            "Co Applicant Telephone"
                          )
                        }
                      />
                      {props.validator.message(
                        "Co Applicant Telephone",
                        props.state.coApplicantTelephone,
                        "required|phone"
                      )}
                    </div>
                  </div>
                  <div className="col-outer pt-0 pb-0">
                    <div className="PostApp-Form">
                      <label> Social insurance number (optional)</label>
                      <NumberFormat
                        required
                        className="form-control"
                        value={props.state.coSinNumber}
                        onChange={props.handleOnChange}
                        allowNegative={false}
                        id="coSinNumber"
                        name="coSinNumber"
                        placeholder="SIN Number"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* <div className="PostApp-Form"> */}

              <div className="row align-items-center">
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6">
                  <div className="PostApp-NextBtn previous-btn float-left">
                    <button
                      type="button"
                      onClick={() =>
                        props.changeStepButton(2, 3, -props.state.startPerc)
                      }
                    >
                      {" "}
                      <i className="fa fa-angle-left"></i> Previous{" "}
                    </button>
                    {/* <button type="button" onClick={() => props.changeStepCoApplicant('', -props.state.startPerCo)}> <i className="fa fa-angle-left"></i> Previous </button> */}
                  </div>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6">
                  <div className="PostApp-NextBtn float-right">
                    <button
                      type="button"
                      onClick={() =>
                        props.changeStepCoApplicant(2, props.state.startPerCo)
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
export default CoApplicantInformation;
