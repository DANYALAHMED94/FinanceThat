import React from "react";
import { history } from "../../../../_helpers";

export default function NotMeetingCriteria({ formState }) {
  return (
    <div className="formWrapper">
      <h1>Sorry, you are not eligible.</h1>
      <div className="notMeetingCriteria">
        {["Unemployed", "Disability"].includes(formState.employement_status) ? (
          <h4>
            You have selected <span> "{formState.employement_status}" </span>
            for employment Unfortunetly we cannot process application if you are
            {formState.employement_status}.
          </h4>
        ) : (
          <h4>
            You have selected <span> “NO” </span>
            for valide driver’s license Unfortunetly we cannot process
            application without a valid driver’s license.
          </h4>
        )}
        <div className="centerFlex btnSec">
          <button
            onClick={() => history.goBack()}
            className="primaryButton continueBtn backBtn"
          >
            <img src="/assets/image/arrow-circle-left-outline.svg" alt="icon" />
            <span>Go Back</span> <span></span>
          </button>
          <button
            onClick={() => history.push("/")}
            className="primaryButton continueBtn exitBtn"
          >
            <span></span> <span>Exit the application</span>
            <img
              src="/assets/image/arrow_circle_right_outline.svg"
              alt="icon"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
