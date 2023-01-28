import React from "react";
import { durationLivedOptions } from "../constant";

export default function DurationLivedStep({
  formState,
  setFormState,
  onContinue,
}) {
  // main return
  return (
    <div className="formWrapper">
      <h1>How long have you lived there?</h1>
      <div className="optionFlex">
        {durationLivedOptions.map((item) => {
          return (
            <div
              className={
                formState.duration_address_yr === item.value
                  ? "item active"
                  : "item"
              }
              onClick={() =>
               { 
                 setFormState((prev) => {
                  return { ...prev, duration_address_yr: item.value };
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
          if(formState.duration_address_yr != ''){
            onContinue()
          }
        }}
        className="primaryButton continueBtn"
      >
        <span></span> <span>Continue</span>
        <img src="/assets/image/arrow_circle_right_outline.svg" alt="icon" />
      </button>
      <p>This helps determine your financing eligiblity.</p>
    </div>
  );
}
