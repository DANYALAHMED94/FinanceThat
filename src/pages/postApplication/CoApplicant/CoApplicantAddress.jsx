import React from "react";
import { Animated } from "react-animated-css";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
const CoApplicantAddress = (props) => {
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
          <div className="clearfix">
            <form>
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
                    // onBlur: (() => props.validator.showMessageFor('Co Applicant Address'))
                  }}
                  onLoadFailed={(error) =>
                    console.error("Could not inject Google script", error)
                  }
                />
                {/* {props.validator.message('Co Applicant Address', props.state.coCity, 'required')} */}
              </div>
              <div className="AddManual-Btn">
                {/* <h1>Cant find your address?</h1> */}
                <button
                  type="button"
                  onClick={() =>
                    props.changeMannualAddress(1, "coApplicantMannualAddress")
                  }
                  className="addAddressManually"
                >
                  <span>Enter address manually</span>
                  <i className="fa fa-angle-right"></i>
                </button>
                {/* Add Manual Address */}
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
                        props.changeMannualAddress(
                          1,
                          "coApplicantMannualAddress"
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
