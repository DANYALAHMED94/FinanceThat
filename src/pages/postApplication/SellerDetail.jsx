import React from "react";
import NumberFormat from "react-number-format";
import SelectSearch from "react-select-search/dist/cjs/index.js";
import { Animated } from "react-animated-css";
import Select, { components } from "react-select";
import { Scrollbars } from "react-custom-scrollbars";
import MaskedInput from "react-text-mask";

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
const SellerDetail = (props) => {
  const bar = props.state.startPerc / 3;
  const NextBar = props.state.startPerc / 2;
  const Next =
    props.state.finalizeStep === ""
      ? bar
      : props.state.fullEdit === "edit"
      ? NextBar + bar
      : NextBar + bar;

  // const Next = props.state.backTo === '' ? (props.state.startPerc) : props.state.fullEdit === 'edit' ? (props.state.startPerc * 2) : (props.state.startPerc * 3)

  return (
    <React.Fragment>
      <Animated
        animationIn={props.state.animation}
        animationInDuration={500}
        animationOutDuration={500}
        animationOut="fadeOutUp"
        isVisible={true}
      >
        <div className="PostApp-SecSix">
          <div className="PostApp-Head">
            <h1>Seller Detail</h1>
          </div>
          <div className="clearfix">
            <form>
              <div className="ApplicantInfo-Container">
                <div className="two-col-grid clearfix">
                  <div className="col-outer pt-0 pb-0">
                    <div className="PostApp-Form Applicantin-Btm">
                      <label>Seller Name</label>
                      <input
                        placeholder="Enter Seller Name"
                        type="text"
                        id="sellerName"
                        name="sellerName"
                        value={props.state.sellerName}
                        onChange={props.handleOnChange}
                        onBlur={() =>
                          props.validator.showMessageFor("Seller Name")
                        }
                      />
                      {props.validator.message(
                        "Seller Name",
                        props.state.sellerName,
                        "required"
                      )}
                    </div>
                  </div>
                  <div className="col-outer pt-0 pb-0">
                    <div className="PostApp-Form Applicantin-Btm">
                      <label>Street Address</label>
                      <input
                        placeholder="Enter Street Address"
                        type="text"
                        id="sellerStreetAddress"
                        name="sellerStreetAddress"
                        value={props.state.sellerStreetAddress}
                        onChange={props.handleOnChange}
                        // onBlur={() => props.validator.showMessageFor('Seller Street Address')}
                      />
                      {/* {props.validator.message('Seller Street Address', props.state.sellerStreetAddress, 'required')} */}
                    </div>
                  </div>
                  <div className="col-outer pt-0 pb-0">
                    <div className="PostApp-Form Applicantin-Btm">
                      <label>City</label>
                      <input
                        placeholder="Enter City"
                        type="text"
                        id="sellerCity"
                        name="sellerCity"
                        onChange={props.handleOnChange}
                        value={props.state.sellerCity}
                        onBlur={() =>
                          props.validator.showMessageFor("Seller City")
                        }
                      />
                      {props.validator.message(
                        "Seller City",
                        props.state.sellerCity,
                        "required"
                      )}
                    </div>
                  </div>
                  <div className="col-outer pt-0 pb-0">
                    <div className="PostApp-Form Applicantin-Btm">
                      <label>Province</label>
                      <Select
                        placeholder="Select Seating"
                        id="selectSellerProvince"
                        name="selectSellerProvince"
                        options={props.state.provinces}
                        onChange={(e) =>
                          props.changeSelect(
                            e,
                            "sellerProvince",
                            "selectSellerProvince"
                          )
                        }
                        value={props.state.selectSellerProvince}
                        className="react-select-main"
                        classNamePrefix="react-select"
                        components={{
                          Option: renderOption,
                          MenuList: renderScrollbar,
                        }}
                        captureMenuScroll={false}
                        onBlur={() =>
                          props.validator.showMessageFor("Seller Province")
                        }
                      />
                      {/* <SelectSearch id="sellerProvince"
                        name="sellerProvince" options={props.state.provinces} onChange={(e) => props.handleOnChangeSelect(e, 'sellerProvince')} value={props.state.sellerProvince} closeOnSelect
                        placeholder={null}
                      /> */}
                      {props.validator.message(
                        "Seller Province",
                        props.state.sellerProvince,
                        "required"
                      )}
                    </div>
                  </div>
                  <div className="col-outer pt-0 pb-0">
                    <div className="PostApp-Form Applicantin-Btm">
                      <label>Postal Code</label>
                      <MaskedInput
                        mask={[
                          /[a-zA-Z0-9]/i,
                          /[a-zA-Z0-9]/,
                          /[a-zA-Z0-9]/i,
                          " ",
                          /[a-zA-Z0-9]/,
                          /[a-zA-Z0-9]/i,
                          /[a-zA-Z0-9]/,
                        ]}
                        // mask={[/(?!.*[DFIOQU])[A-VXY]/i, /[0-9]/, /(?!.*[DFIOQU])[A-Z]/i, ' ', /[0-9]/, /(?!.*[DFIOQU])[A-Z]/i, /[0-9]/]}
                        className="form-control"
                        guide={false}
                        placeholder="A2A 2A2"
                        id="sellerPostalCode"
                        name="sellerPostalCode"
                        onBlur={() =>
                          props.validator.showMessageFor("Seller Postal Code")
                        }
                        value={props.state.sellerPostalCode}
                        onChange={props.handleOnChange}
                      />
                      {/* <input type="text" id="sellerPostalCode" name='sellerPostalCode' onChange={props.handleOnChange}
                        value={props.state.sellerPostalCode}
                        onBlur={() => props.validator.showMessageFor('Seller Postal Code')} /> */}
                      {props.validator.message(
                        "Seller Postal Code",
                        props.state.sellerPostalCode,
                        "required|max:7|regex:[a-zA-Z0-9][a-zA-Z0-9][a-zA-Z0-9] [a-zA-Z0-9][a-zA-Z0-9][a-zA-Z0-9]"
                      )}
                    </div>
                  </div>
                  <div className="col-outer pt-0 pb-0">
                    <div className="PostApp-Form">
                      <label>Email</label>
                      <input
                        placeholder="Enter Email"
                        type="text"
                        id="sellerEmail"
                        name="sellerEmail"
                        value={props.state.sellerEmail}
                        onChange={props.handleOnChange}
                        onBlur={() =>
                          props.validator.showMessageFor("Seller Email")
                        }
                      />
                      {props.validator.message(
                        "Seller Email",
                        props.state.sellerEmail,
                        "required|email"
                      )}
                    </div>
                  </div>
                  <div className="col-outer pt-0 pb-0">
                    <div className="PostApp-Form">
                      <label>Telephone</label>
                      <NumberFormat
                        className="form-control"
                        format="+1 (###) ###-####"
                        placeholder="+1 (123) 456-7890"
                        onChange={props.handleOnChange}
                        value={props.state.sellerTelephone}
                        name="sellerTelephone"
                        onBlur={() =>
                          props.validator.showMessageFor("Seller Telephone")
                        }
                      />
                      {props.validator.message(
                        "Seller Telephone",
                        props.state.sellerTelephone,
                        "required"
                      )}
                    </div>
                  </div>
                  <div className="col-outer pt-0 pb-0"></div>
                </div>
              </div>
              <div className="row align-items-center">
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6">
                  <div className="PostApp-NextBtn previous-btn float-left">
                    <button
                      type="button"
                      onClick={() =>
                        props.changeVehicleDetail(1, -props.state.startPerc)
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
                      onClick={() => props.changeStepButton(5, 6, Next)}
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
export default SellerDetail;
