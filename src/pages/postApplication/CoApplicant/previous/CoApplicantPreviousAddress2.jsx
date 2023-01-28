import React from "react";
import NumberFormat from "react-number-format";
import { Animated } from "react-animated-css";
import Select, { components } from "react-select";
import { Scrollbars } from "react-custom-scrollbars";

const { Option } = components;

const renderScrollbar = (props) => {
  return (
    <div style={{ height: 200 }}>
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
const CoApplicantPreviousAddress2 = (props) => {
  return (
    <React.Fragment>
      <Animated
        animationIn={props.state.animation}
        animationInCo
        Duration={500}
        animationOutCo
        Duration={500}
        animationOut="fadeOutUp"
        isVisible={true}
      >
        <div className="PostApp-SecTwo">
          <div className="PostApp-Head Dura-ApplicantHead">
            <h1>Co Applicant Previous Address</h1>
          </div>

          <div className="clearfix">
            <form>
              <div className="ApplicantInfo-Container">
                <label>Duration at this address</label>
                <div className="two-col-grid clearfix">
                  <div className="col-outer pt-0 pb-0">
                    <div className="PostApp-Form">
                      <NumberFormat
                        required
                        className="form-control"
                        value={props.state.coDurationAtPreviousAddress}
                        onChange={props.handleOnChange}
                        allowNegative={false}
                        id="coDurationAtPreviousAddress"
                        name="coDurationAtPreviousAddress"
                        placeholder="Years"
                        onBlur={() =>
                          props.validator.showMessageFor(
                            "Co Duration At Previous Address"
                          )
                        }
                      />
                      {props.validator.message(
                        "Co Duration At Previous Address",
                        props.state.coDurationAtPreviousAddress,
                        "required"
                      )}
                    </div>
                  </div>
                  <div className="col-outer pt-0 pb-0">
                    <div className="PostApp-Form">
                      <NumberFormat
                        required
                        className="form-control"
                        value={props.state.coDurationAtPreviousAddressMonth}
                        onChange={props.handleOnChange}
                        allowNegative={false}
                        id="coDurationAtPreviousAddressMonth"
                        name="coDurationAtPreviousAddressMonth"
                        placeholder="Months"
                        onBlur={() =>
                          props.validator.showMessageFor(
                            "Co Duration At Previous Address Month"
                          )
                        }
                      />
                      {props.validator.message(
                        "Co Duration At Previous Address Month",
                        props.state.coDurationAtPreviousAddressMonth,
                        "required"
                      )}
                    </div>
                  </div>
                  <div className="col-outer pt-0 pb-0">
                    <div className="PostApp-Form">
                      <label>Status</label>
                      <Select
                        required
                        placeholder=""
                        id="selectCoPreviousStatus"
                        name="selectCoPreviousStatus"
                        options={props.state.statuses}
                        onChange={(e) =>
                          props.changeSelect(
                            e,
                            "coPreviousStatus",
                            "selectCoPreviousStatus"
                          )
                        }
                        value={props.state.selectCoPreviousStatus}
                        className="react-select-main"
                        classNamePrefix="react-select"
                        components={{
                          Option: renderOption,
                          MenuList: renderScrollbar,
                        }}
                        placeholder="Status"
                        captureMenuScroll={false}
                        onBlur={() =>
                          props.validator.showMessageFor("Co Previous Status")
                        }
                      />
                      {props.validator.message(
                        "Co Previous Status",
                        props.state.coPreviousStatus,
                        "required"
                      )}
                    </div>
                  </div>
                  {props.state.coPreviousStatus === "Owned" ||
                  props.state.coPreviousStatus === "Rent" ? (
                    <>
                      {" "}
                      <div className="col-outer pt-0 pb-0">
                        <div className="PostApp-Form">
                          <label>Mortgage or rent amount</label>
                          <NumberFormat
                            required
                            className="form-control"
                            value={props.state.coPreviousMortgageAmount}
                            decimalScale={2}
                            prefix={"$"}
                            onChange={props.handleOnChange}
                            thousandSeparator={true}
                            id="coPreviousMortgageAmount"
                            name="coPreviousMortgageAmount"
                            placeholder="Amount"
                            onBlur={() =>
                              props.validator.showMessageFor(
                                "Co Previous Mortgage Amount"
                              )
                            }
                          />
                          {props.validator.message(
                            "Co Previous Mortgage Amount",
                            props.state.coPreviousMortgageAmount,
                            "required"
                          )}
                        </div>
                      </div>
                    </>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className="row align-items-center">
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6">
                  <div className="PostApp-NextBtn previous-btn float-left">
                    <button
                      type="button"
                      onClick={() =>
                        props.changeCoAddress(
                          2,
                          "coApplicantAddressChild",
                          3,
                          -props.state.startAddress
                        )
                      }
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
                        props.changeStepCoApplicant(3, props.state.startPerCo)
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
export default CoApplicantPreviousAddress2;
