import React from 'react'
import NumberFormat from 'react-number-format';
import { Animated } from "react-animated-css";
import Select, { components } from 'react-select';
import { Scrollbars } from "react-custom-scrollbars";
import DurationYearsOptions from "../../../components/DurationYearsOptions";

const { Option } = components;

const renderScrollbar = props => {
    return (
        <div style={{ height: 200 }}>
            <Scrollbars>{props.children}</Scrollbars>
        </div>
    );
};

const renderOption = props => {
    return (
        <Option {...props}>
            <div>{props.data.label}</div>
        </Option>
    );
};
const ApplicantAddress2 = props => {
    // const bar = props.state.startPerc / 2
    const lastBar = props.state.startPerc * 4
    const Next = props.state.backTo === '' ? (props.state.startAddress) : (lastBar)

    return (
      <React.Fragment>
        <Animated
          animationIn={props.state.animation}
          animationInDuration={500}
          animationOutDuration={500}
          animationOut="fadeOutUp"
          isVisible={true}
        >
          <div className="PostApp-SecTwo">
            <div className="PostApp-Head Dura-ApplicantHead">
              <h1>Applicant Current Address</h1>
            </div>

            <div className="clearfix">
              <form>
                <div className="ApplicantInfo-Container">
                  {/* <label>Duration at this address</label> */}
                  <div className="two-col-grid clearfix">
                    <div className="col-outer pt-0 pb-0">
                      <div className="PostApp-Form">
                      <label>Duration at this address</label>

                      <DurationYearsOptions
                                            value={props.state.durationAtAddress}
                                            getDuration={(e) =>{
                                                let ee = {target:{ name: "durationAtAddress", value:  e.value}};
                                                props.handleOnChange(ee)
                                            }} />
                                          
                       
                        {props.validator.message(
                          "Duration At Address",
                          props.state.durationAtAddress,
                          "required"
                        )}
                      </div>
                    </div>
                    <div className="col-outer pt-0 pb-0">
                      <div className="PostApp-Form">
                        <label>Status</label>
                        <Select
                          required
                          id="selectStatus"
                          name="selectStatus"
                          options={props.state.statuses}
                          onChange={(e) =>
                            props.changeSelect(e, "status", "selectStatus")
                          }
                          value={props.state.selectStatus}
                          className="react-select-main"
                          classNamePrefix="react-select"
                          components={{
                            Option: renderOption,
                            MenuList: renderScrollbar,
                          }}
                          placeholder="Status"
                          captureMenuScroll={false}
                          onBlur={() =>
                            props.validator.showMessageFor("Status")
                          }
                        />
                        {/* <SelectSearch id="status"
                                                name="status" options={props.state.statuses} onChange={(e) => props.handleOnChangeSelect(e, 'status')} value={props.state.status} closeOnSelect
                                                placeholder={null}
                                            /> */}
                        {props.validator.message(
                          "Status",
                          props.state.status,
                          "required"
                        )}
                      </div>
                    </div>
                    {props.state.status === "Owned" ||
                    props.state.status === "Rent" ? (
                      <>
                        {" "}
                        <div className="col-outer pt-0 pb-0">
                          <div className="PostApp-Form">
                            <label>Mortgage or rent amount</label>
                            <NumberFormat
                              required
                              className="form-control"
                              value={props.state.mortgageAmount}
                              decimalScale={2}
                              prefix={"$"}
                              onChange={props.handleOnChange}
                              thousandSeparator={true}
                              id="mortgageAmount"
                              name="mortgageAmount"
                              placeholder="Amount"
                              onBlur={() =>
                                props.validator.showMessageFor(
                                  "Mortgage Amount"
                                )
                              }
                            />
                            {props.validator.message(
                              "Mortgage Amount",
                              props.state.mortgageAmount,
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
                          props.changeAddress(
                            "",
                            "addressChild",
                            2,
                            -props.state.startAddress
                          )
                        }
                      >
                        {" "}
                        <i className="fa fa-angle-left"></i> Previous{" "}
                      </button>
                      {/* <button type="button" onClick={() => props.changeStepButton(1, 2)}> <i className="fa fa-angle-left"></i> Previous </button> */}
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6">
                    <div className="PostApp-NextBtn float-right">
                      <button
                        type="button"
                        onClick={() => props.changeStepButton(2, 3, Next)}
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
}
export default ApplicantAddress2