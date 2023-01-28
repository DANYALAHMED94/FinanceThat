import React from "react";
import NumberFormat from "react-number-format";
// import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
// import DateFnsUtils from '@date-io/date-fns';
import SelectSearch from "react-select-search/dist/cjs/index.js";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Animated } from "react-animated-css";
import Select, { components } from "react-select";
import { Scrollbars } from "react-custom-scrollbars";

const { Option } = components;

const renderScrollbar = (props) => {
  return (
    <div style={{ height: 100 }}>
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
const VehicleDetail = (props) => {
  const bar = props.state.startPerc / 3;
  return (
    <React.Fragment>
      <Animated
        animationIn={props.state.animation}
        animationInDuration={500}
        animationOutDuration={500}
        animationOut="fadeOutUp"
        isVisible={true}
      >
        <div className="PostApp-SecFive">
          <div className="PostApp-Head">
            <h1>Vehicle Detail</h1>
          </div>

          <div className="clearfix">
            <form>
              <div className="ApplicantInfo-Container">
                <div className="two-col-grid clearfix">
                  <div className="col-outer pt-0 pb-0">
                    <div className="PostApp-Form Applicantin-Btm">
                      <label>Year</label>
                      <DatePicker
                        selected={props.state.year}
                        onChange={(e) => props.handleOnChangeDates(e, "year")}
                        showYearPicker
                        dateFormat="yyyy"
                        placeholderText="Enter Vehicle Year"
                        yearItemNumber={6}
                        maxDate={new Date().setFullYear(
                          new Date().getFullYear() + 1
                        )}
                      />
                      {props.validator.message(
                        "year",
                        props.state.year,
                        "required"
                      )}
                    </div>
                  </div>

                  <div className="col-outer pt-0 pb-0">
                    <div className="PostApp-Form Applicantin-Btm">
                      <label>Make</label>
                      <input
                        type="text"
                        id="make"
                        name="make"
                        placeholder="Enter Vehicle Make"
                        onChange={props.handleOnChange}
                        value={props.state.make}
                        onBlur={() =>
                          props.validator.showMessageFor("Vehicle Make")
                        }
                      />
                      {props.validator.message(
                        "Vehicle Make",
                        props.state.make,
                        "required"
                      )}
                    </div>
                  </div>
                </div>
                <div className="two-col-grid clearfix">
                  <div className="col-outer pt-0 pb-0">
                    <div className="PostApp-Form Applicantin-Btm">
                      <label>Model</label>
                      <input
                        type="text"
                        id="model"
                        placeholder="Enter Vehicle Model"
                        name="model"
                        onChange={props.handleOnChange}
                        value={props.state.model}
                        onBlur={() =>
                          props.validator.showMessageFor("Vehicle Model")
                        }
                      />
                      {props.validator.message(
                        "Vehicle Model",
                        props.state.model,
                        "required"
                      )}
                    </div>
                  </div>
                  <div className="col-outer pt-0 pb-0">
                    <div className="PostApp-Form Applicantin-Btm">
                      <label>KM</label>
                      <NumberFormat
                        className="form-control KMIcon-1"
                        value={props.state.kilometer}
                        id="kilometer"
                        name="kilometer"
                        placeholder="Enter kilometer"
                        onChange={props.kilometer}
                        thousandSeparator={true}
                        onChange={props.handleOnChange}
                        onBlur={() =>
                          props.validator.showMessageFor("kilometer")
                        }
                      />
                      {props.validator.message(
                        "kilometer",
                        props.state.kilometer,
                        "required"
                      )}
                    </div>
                  </div>
                </div>
                <div className="two-col-grid clearfix">
                  <div className="col-outer pt-0 pb-0">
                    <div className="PostApp-Form Applicantin-Btm">
                      <label>VIN</label>
                      <input
                        type="text"
                        id="vin"
                        name="vin"
                        placeholder="Enter VIN"
                        value={props.state.vin}
                        onChange={props.handleOnChange}
                        onBlur={() => props.validator.showMessageFor("Vin")}
                      />
                      {props.validator.message(
                        "Vin",
                        props.state.vin,
                        "required|min:17|max:17"
                      )}
                    </div>
                  </div>
                  <div className="col-outer pt-0 pb-0">
                    <div className="PostApp-Form">
                      <label>Condition</label>
                      <Select
                        placeholder=""
                        id="selectCondition"
                        name="selectCondition"
                        options={[
                          { label: "New", value: "new" },
                          { label: "Used", value: "used" },
                        ]}
                        onChange={(e) =>
                          props.changeSelect(e, "condition", "selectCondition")
                        }
                        value={props.state.selectCondition}
                        className="react-select-main"
                        classNamePrefix="react-select"
                        components={{
                          Option: renderOption,
                          MenuList: renderScrollbar,
                        }}
                        captureMenuScroll={false}
                        onBlur={() =>
                          props.validator.showMessageFor("Condition")
                        }
                      />
                      {props.validator.message(
                        "Condition",
                        props.state.condition,
                        "required"
                      )}
                    </div>
                  </div>
                </div>
                <div className="col-outer pt-0 pb-0"></div>
              </div>

              <div className="row align-items-center">
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6">
                  <div className="PostApp-NextBtn previous-btn float-left">
                    <button
                      type="button"
                      onClick={() => props.changeVehicleDetail("", -bar)}
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
                      onClick={() => props.changeVehicleDetail(2, bar)}
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
export default VehicleDetail;
