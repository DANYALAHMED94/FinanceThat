/*eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import NumberFormat from "react-number-format";
import { Animated } from "react-animated-css";
import ReportConsentModel from "./ReportConsentModel";
import Select, { components } from "react-select";
import { Scrollbars } from "react-custom-scrollbars";
import SignInModel from "../../../components/authModels/SignInModel";
import SignUpModel from "../../../components/authModels/SignUpModel";
import VerificationModel from "../../../components/authModels/VerificationModel";

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

const FinalizeApplication = (props) => {
  const openModel = () => {
    window.$("#consentModel").modal("show");
  };
  const bar =
    props.sellerInfo === "no" || props.sellerInfo === ""
      ? props.state.startPerc
      : props.state.listingSource === "Vehicle listed on Finance That"
      ? props.state.startPerc / 2
      : props.state.listingSource === "Vehicle sold somewhere else"
      ? props.state.startPerc / 3
      : props.state.startPerc;
  const prevTab = props.state.coApplication === "yes" ? 4 : 3;

  // const vehicalOptions = [
  //   { value: "Automotive", label: "Automotive" },
  //   { value: "Powersport", label: "Powersport" },
  //   { value: "Motorcycle", label: "Motorcycle" },
  //   { value: "Boat", label: "Boat" },
  //   { value: "RV", label: "RV" },
  //   { value: "Small Equipment", label: "Small Equipment" },
  //   { value: "Trailer", label: "Trailer" },
  // ];
  const type_of_vehicle = [];
  (props.type_of_vehicles || []).map(item => {
      type_of_vehicle.push({
          value: item.id,
          label: item.name,
          subVehicles:(item.typeofvehicle_id || [])?.map(ite=> {
              return {
                  value:ite.id,
                  label:ite.name
              }
          })
      })
  })
  // main return
  return (
    <React.Fragment>
      <Animated
        animationIn={props.animation}
        animationInDuration={500}
        animationOutDuration={500}
        animationOut="fadeOutUp"
        isVisible={true}
      >
        <div className="PostApp-SecSeven">
          <div className="PostApp-Head">
            <h1>Finalize application</h1>
          </div>
          <div className="FinalizeHead">
          <div className="PostApp-Coapplicant">
                <h1 className="trade_label mb-2">Do you have a trade-in ?</h1>
                <ul>
                  <li>
                    <label className="Applicant-Btn">
                      Yes
                      <input
                        type="radio"
                        id="tradeIn"
                        name="tradeIn"
                        onChange={props.handleOnChange}
                        value="yes"
                        checked={props.state.tradeIn === "yes"}
                      />
                      <span className="Appmark"></span>
                    </label>
                  </li>
                  <li>
                    <label className="Applicant-Btn">
                      No
                      <input
                        type="radio"
                        id="tradeIn"
                        name="tradeIn"
                        onChange={props.handleOnChange}
                        value="no"
                        checked={props.state.tradeIn === "no"}
                      />
                      <span className="Appmark"></span>
                    </label>
                  </li>
                  {props.validator.message(
                    "Trade In",
                    props.state.tradeIn,
                    "required"
                  )}
                </ul>
              </div>
              </div>

          <div className="clearfix">
            <form>
              {props.sellerInfo === "no" || props.sellerInfo === "" ? (
                <>
                  <div className="PostApp-Form ApplicantAddress ApplicantAddress2 mt-5 mb-0">
                    <label>
                      What is the loan amount you wish to apply for?:
                    </label>
                    <NumberFormat
                      className="form-control"
                      value={props.financeAmount}
                      decimalScale={2}
                      prefix={"$"}
                      onChange={props.handleOnChange}
                      thousandSeparator={true}
                      id="financeAmount"
                      name="financeAmount"
                      placeholder="Amount"
                      onBlur={() =>
                        props.validator.showMessageFor("Finance Amount")
                      }
                    />
                    {props.validator.message(
                      "Finance Amount",
                      props.financeAmount,
                      "required"
                    )}
                  </div>
                </>
              ) : null}

              <div className="clearfix"></div>

              {/* {props.state.downPaymentCheck === "yes" ? (
                <> */}
              <div className="ListSource-Form">
                <label>Down payment(optional)</label>
                <NumberFormat
                  className="form-control"
                  value={props.downPayment}
                  decimalScale={2}
                  prefix={"$"}
                  onChange={props.handleOnChange}
                  thousandSeparator={true}
                  id="downPayment"
                  name="downPayment"
                  placeholder="Enter down payment amount"
                  onBlur={() =>
                    props.validator.showMessageFor("Down Payment Amount")
                  }
                />
              </div>

              <div className="clearfix"></div>

              <div className="ListSource-Form">
                 <label>Monthly Budget</label>
                            <Select
                            required
                            placeholder="Over $500/month"
                            options={[
                              {label: "Under $250/month", value:"250"},
                              {label: "$250 - 350/month", value:"250-350"},
                              {label: "$350 - 500/month", value:"350-500"},
                              {label: "Over $500/month", value:"500+"}
                            ]}
                            onChange={(e) =>
                              props.changeSelect(
                                e,
                                "monthly_budget",
                                "selectedMonthlyBudget"
                              )
                            }
                            value={props.state.selectedMonthlyBudget}
                            className="react-select-main"
                            classNamePrefix="react-select"

                            captureMenuScroll={false}
                          />
                            {props.validator.message(
                      "Monthly Budget",
                      props.state.monthly_budget,
                      "required"
                    )}
                          </div>

              {(props.sellerInfo === "no" || props.sellerInfo === "") && (
                <>
                  <div
                    style={{ marginTop: "20px" }}
                    className="col-outer pt-0 pb-0"
                  >
                    <div className="ListSource-Form">
                      <label>Type of Vehicle Interested in?</label>
                      <Select
                        required
                        placeholder="Select One"
                        id="selectInterestedVehicleType"
                        name="selectInterestedVehicleType"
                        options={type_of_vehicle}
                        onChange={(e) =>
                           props.changeInterestedVehicleType(
                              e,
                              true
                            )
                        }
                        value={props.state.selectInterestedVehicleType}
                        className="react-select-main"
                        classNamePrefix="react-select"
                        placeHolder="Select One"
                        components={{
                          Option: renderOption,
                          MenuList: renderScrollbar,
                        }}
                        captureMenuScroll={false}
                      />
                      {props.validator.message(
                        "Interested Vehicale Type",
                        props.state.interestedVehicleType,
                        "required"
                      )}
                    </div>

                    {(type_of_vehicle || [])?.filter(item=> +item.value === +props.state.interestedVehicleId)?.[0]?.subVehicles?.length > 0 && (
                      <div className="ListSource-Form">
                      <label>Sub Type of Vehicle</label>
                      <Select
                        required
                        placeholder="Select Sub Vehicle"
                        id="selectInterestedVehicleSubType"
                        name="selectInterestedVehicleSubType"
                        options={(type_of_vehicle || [])?.filter(item=> +item.value === +props.state.interestedVehicleId)?.[0]?.subVehicles || []}
                        onChange={(e) => {
                            props.changeInterestedVehicleType(
                              e,
                              false
                            )
                        }}
                        value={props.state.selectInterestedVehicleSubType}
                        className="react-select-main"
                        classNamePrefix="react-select"
                        placeHolder="Select One"
                        components={{
                          Option: renderOption,
                          MenuList: renderScrollbar,
                        }}
                        captureMenuScroll={false}
                      />
                      {props.validator.message(
                        "Sub Type Of Vehicle",
                        props.state.subIntrestedVehicleId,
                        "required"
                      )}
                    </div>
                    )}

                  </div>
                </>
              )}
              {/* </>
              ) : null} */}
              <div className="FinalizeHead">
                {/* {props.user_id === undefined ||
                props.user_id === null ||
                props.user_id === "" ? (
                  <>
                    <h1>
                      <a data-toggle="modal" data-target="#signUpModel">
                        Sign up
                      </a>{" "}
                      or{" "}
                      <a data-toggle="modal" data-target="#signInModel">
                        Sign in
                      </a>{" "}
                      to continue
                    </h1>
                  </>
                ) : (
                  ""
                )} */}
              </div>
              <div className="RadioBtn-Con">
                <label className="FeatureRadio-Btn">
                  I have read and accept the{" "}
                  <a
                    href="https://www.financethat.ca/assets/documents/Borrower-Terms-Conditions.pdf"
                    target="_blank"
                  >
                    <b>Borrower Terms and Conditions</b>
                  </a>
                  <input
                    type="checkbox"
                    name="terms1"
                    id="terms1"
                    value="terms1"
                    onChange={props.toggleHandleOnChangeTerm1}
                    checked={props.terms1 === true}
                  />
                  <span className="FeatureMark"></span>
                  {props.validator.message(
                    "borrower Terms and Conditions",
                    props.terms1,
                    "accepted"
                  )}
                </label>
                <label className="FeatureRadio-Btn" onClick={openModel}>
                  I agree to the{" "}
                  <b style={{ color: "#007bff" }}>
                    Credit Report Consent Terms
                  </b>
                  <input
                    type="checkbox"
                    name="terms2"
                    id="terms2"
                    value="terms2"
                    onChange={props.toggleHandleOnChangeTerm2}
                    checked={props.terms2 === true}
                  />
                  <span className="FeatureMark"></span>
                  {props.validator.message(
                    "Credit Report Consent Terms",
                    props.terms2,
                    "accepted"
                  )}
                </label>
              </div>

              <div className="row align-items-center">
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6">
                  <div className="PostApp-NextBtn previous-btn float-left">
                    <button
                      type="button"
                      onClick={() => props.changeStepButton(prevTab, 5, -bar)}
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
                        props.changeStepFinalize(1, props.state.startPerc / 2)
                      }
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </Animated>
      <ReportConsentModel />
      {/* <SignInModel {...props} modelClose={props.modelClose} toggleModel={props.toggleModel} /> <SignUpModel {...props} modelClose={props.modelClose} toggleModel={props.toggleModel} /><VerificationModel email={props.user_detail !== undefined && props.user_detail.email !== undefined ? props.user_detail.email : ''} {...props} validator={props.validator} modelClose={props.modelClose} forceUpdate={props.forceUpdate} /> */}
    </React.Fragment>
  );
};
export default FinalizeApplication;
