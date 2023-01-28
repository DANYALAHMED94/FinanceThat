import React from "react";
import NumberFormat from "react-number-format";
import { Animated } from "react-animated-css";
import Select, { components } from "react-select";
import { Scrollbars } from "react-custom-scrollbars";
import DurationYearsOptions from "../../../components/DurationYearsOptions";

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
const CoApplicantAddress2 = (props) => {
  // const Next = props.state.backTo === '' ? (props.state.startPerc) : (props.state.startPerc * 12)

  return (
    <React.Fragment>
      <Animated
        animationIn={props.state.animation}
        animationInDuration={500}
        animationOutDuration={500}
        animationOut="fadeOutUp"
        isVisible={true}
      >
        <div class="PostApp-SecTwo">
          <div class="PostApp-Head">
            <h1>Co Applicant Address</h1>
          </div>

          <div class="clearfix">
            <form>
              <div className="ApplicantInfo-Container">
                {/* <label>Duration at this address</label> */}
                <div className="two-col-grid clearfix">
                  <div className="col-outer pt-0 pb-0">
                    <div class="PostApp-Form">
                    <label>Duration at this address</label>

                    <DurationYearsOptions
                                            value={props.state.coDurationAtAddress}
                                            getDuration={(e) =>{
                                                let ee = {target:{ name: "coDurationAtAddress", value:  e.value}};
                                                props.handleOnChange(ee)
                                            }} />
                    
                      {props.validator.message(
                        "Co Duration At Address",
                        props.state.coDurationAtAddress,
                        "required"
                      )}
                    </div>
                  </div>
                 
                  <div className="col-outer pt-0 pb-0">
                    <div class="PostApp-Form">
                      <label>Status</label>
                      <Select
                        required
                        placeholder=""
                        id="selectCoStatus"
                        name="selectCoStatus"
                        options={props.state.statuses}
                        onChange={(e) =>
                          props.changeSelect(e, "coStatus", "selectCoStatus")
                        }
                        value={props.state.selectCoStatus}
                        className="react-select-main"
                        classNamePrefix="react-select"
                        components={{
                          Option: renderOption,
                          MenuList: renderScrollbar,
                        }}
                        captureMenuScroll={false}
                        placeHolder="Status"
                        onBlur={() =>
                          props.validator.showMessageFor("Co Status")
                        }
                      />
                     
                      {props.validator.message(
                        "Co Status",
                        props.state.coStatus,
                        "required"
                      )}
                    </div>
                  </div>
                  {props.state.coStatus === "Owned" ||
                  props.state.coStatus === "Rent" ? (
                    <>
                      <div className="col-outer pt-0 pb-0">
                        <div class="PostApp-Form">
                          <label>Mortgage or rent amount</label>
                          <NumberFormat
                            required
                            className="form-control"
                            value={props.state.coMortgageAmount}
                            decimalScale={2}
                            prefix={"$"}
                            onChange={props.handleOnChange}
                            thousandSeparator={true}
                            id="coMortgageAmount"
                            name="coMortgageAmount"
                            placeHolder="Amount"
                            onBlur={() =>
                              props.validator.showMessageFor(
                                "Co Mortgage Amount"
                              )
                            }
                          />
                          {props.validator.message(
                            "Co Mortgage Amount",
                            props.state.coMortgageAmount,
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
                          "",
                          "coApplicantAddressChild",
                          2,
                          -props.state.startPerCo
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
                        // Number(props.state.coDurationAtAddress) >= 2
                        Number(props.state.coDurationAtAddress) != -1
                          ? props.changeStepCoApplicant(
                              3,
                              props.state.startPerCo
                            )
                          : props.changeCoAddress(
                              2,
                              "coApplicantAddressChild",
                              2,
                              props.state.startPerCo
                            )
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
export default CoApplicantAddress2;
