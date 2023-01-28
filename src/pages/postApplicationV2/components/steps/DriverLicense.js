import React from "react";
import { booleanOptions } from "../constant";

export default function DriverLicense({ formState, setFormState, onContinue }) {
  // main return
  return (
    <div className="formWrapper">
      <h1>Do you currently have a valid driver’s license?</h1>
      <div className="optionFlex">
        {booleanOptions.map((item) => {
          return (
            <div
              className={
                formState.valid_driver_license === item.value
                  ? "item active"
                  : "item"
              }
              onClick={() =>
               {
                 setFormState((prev) => {
                  return { ...prev, valid_driver_license: item.value };
                })
                onContinue()
              }
              }
              style={{ justifyContent: "center" }}
            >
              {item.label}
            </div>
          );
        })}
      </div>
      <button
        onClick={() => {
          if(formState.valid_driver_license !== ''){
            onContinue()
          }
        }}
        className="primaryButton continueBtn"
      >
        <span></span> <span>Continue</span>
        <img src="/assets/image/arrow_circle_right_outline.svg" alt="icon" />
      </button>
      <p>This helps determine your eligibility</p>
    </div>
  );
}
