import React from "react";
import NumberFormat from "react-number-format";
import SelectSearch from "react-select-search/dist/cjs/index.js";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
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
const CoApplicantAddress = (props) => {
  return (
    <React.Fragment>
      <Animated
        animationIn={props.state.animation}
        animationInDuration={1000}
        animationOutDuration={1000}
        animationOut="fadeOutUp"
        isVisible={true}
      >
        <div className="PostApp-SecTwo">
          {/* <div className="PostApp-Head">
                    <h1>Co Applicant Address</h1>
                  </div> */}

          <div className="clearfix">
            <form>
              {props.state.coShowMannualAddress === false ? (
                <>
                  {" "}
                  <div className="ApplicantAddress">
                    <label>Co Applicant Address</label>
                    <GooglePlacesAutocomplete
                      apiKey={process.env.REACT_APP_GOOGLE_API_KEY}
                      autocompletionRequest={{
                        componentRestrictions: {
                          country: ["ca"],
                        },
                      }}
                      selectProps={{
                        value: props.state.coApplicantAddress,
                        onChange: (e) =>
                          props.handleLocationChange(e, "coApplicantAddress"),
                        isClearable: true,
                        placeholder: "Start typing your address here",
                        className: "react-location-select-main",
                        classNamePrefix: "react-location-select",
                        onBlur: () =>
                          props.validator.showMessageFor(
                            "Co Applicant Address"
                          ),
                      }}
                      onLoadFailed={(error) =>
                        console.error("Could not inject Google script", error)
                      }
                    />
                    {props.validator.message(
                      "Co Applicant Address",
                      props.state.coCity,
                      "required"
                    )}
                  </div>
                </>
              ) : null}

              {props.state.coShowMannualAddress === true ? (
                <>
                  {" "}
                  <div className="ApplicantAddress">
                    <div className="PostApp-Form">
                      <label>Street Address</label>
                      <input
                        type="text"
                        id="coApplicantStreetAddress"
                        name="coApplicantStreetAddress"
                        placeholder=""
                        value={props.state.coApplicantStreetAddress}
                        onChange={props.handleOnChange}
                        onBlur={() =>
                          props.validator.showMessageFor("Co Street Address")
                        }
                      />
                      {props.validator.message(
                        "Co Street Address",
                        props.state.coApplicantStreetAddress,
                        "required"
                      )}
                    </div>
                  </div>
                  <div className="ApplicantAddress">
                    <div className="two-col-grid clearfix">
                      <div className="col-outer pt-0 pb-0">
                        <div className="PostApp-Form">
                          <label>City</label>
                          <input
                            type="text"
                            id="coCity"
                            name="coCity"
                            onChange={props.handleOnChange}
                            value={props.state.coCity}
                            onBlur={() =>
                              props.validator.showMessageFor("Co City")
                            }
                          />
                          {props.validator.message(
                            "Co City",
                            props.state.coCity,
                            "required"
                          )}
                        </div>
                      </div>
                      <div className="col-outer pt-0 pb-0">
                        <div className="PostApp-Form">
                          <label>Province</label>
                          <Select
                            placeholder="Select Seating"
                            id="selectCoProvince"
                            name="selectCoProvince"
                            options={props.state.provinces}
                            onChange={(e) =>
                              props.changeSelect(
                                e,
                                "coProvince",
                                "selectCoProvince"
                              )
                            }
                            value={props.state.selectCoProvince}
                            className="react-select-main"
                            classNamePrefix="react-select"
                            components={{
                              Option: renderOption,
                              MenuList: renderScrollbar,
                            }}
                            captureMenuScroll={false}
                            onBlur={() =>
                              props.validator.showMessageFor("Co Province")
                            }
                          />

                          {props.validator.message(
                            "Co Province",
                            props.state.coProvince,
                            "required"
                          )}
                        </div>
                      </div>
                      <div className="col-outer pt-0 pb-0">
                        <div className="PostApp-Form">
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
                            id="coPostalCode"
                            name="coPostalCode"
                            onBlur={() =>
                              props.validator.showMessageFor("Co Postal Code")
                            }
                            value={props.state.coPostalCode}
                            onChange={props.handleOnChange}
                          />
                          {/* <input type="text" id="coPostalCode" name='coPostalCode' onChange={props.handleOnChange}
                                                    value={props.state.coPostalCode}
                                                    onBlur={() => props.validator.showMessageFor('Co Postal Code')} /> */}

                          {props.validator.message(
                            "Co Postal Code",
                            props.state.coPostalCode,
                            "required|max:7|regex:[a-zA-Z0-9][a-zA-Z0-9][a-zA-Z0-9] [a-zA-Z0-9][a-zA-Z0-9][a-zA-Z0-9]"
                          )}
                        </div>
                      </div>
                      <div className="col-outer pt-0 pb-0">
                        <div className="PostApp-Form">
                          <label>Country</label>
                          <input
                            type="text"
                            id="coApplicantCountry"
                            name="coApplicantCountry"
                            placeholder=""
                            value={props.state.coApplicantCountry}
                            onChange={props.handleOnChange}
                            onBlur={() =>
                              props.validator.showMessageFor(
                                "Co Applicant Country"
                              )
                            }
                          />
                          {props.validator.message(
                            "Co Applicant Country",
                            props.state.coApplicantCountry,
                            "required"
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : null}

              <div className="AddManual-Btn">
                <button
                  type="button"
                  onClick={() =>
                    props.changeMannualAddress(
                      props.state.coShowMannualAddress,
                      "coShowMannualAddress"
                    )
                  }
                >
                  {props.state.coShowMannualAddress === true
                    ? "Search Address"
                    : "Add Mannual Address"}
                </button>
              </div>
              <div className="row align-items-center">
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6">
                  <div className="PostApp-NextBtn previous-btn float-left">
                    <button
                      type="button"
                      onClick={() =>
                        props.changeStepCoApplicant(1, -props.state.startPerCo)
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
                        props.changeCoAddress(
                          1,
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
export default CoApplicantAddress;
