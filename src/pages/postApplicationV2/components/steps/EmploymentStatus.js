import React from "react";
import { employmentStatusOptions } from "../constant";

export default function EmploymentStatus({
  formState,
  setFormState,
  onContinue,
}) {
  // main return
  return (
    <div className="formWrapper">
      <h1>What is your employment status?</h1>
      <div className="optionFlex">
        {employmentStatusOptions.map((item) => {
          return (
            <div
              className={
                formState.employement_status === item.value
                  ? "item active"
                  : "item"
              }
              onClick={() =>
               { 
                 setFormState((prev) => {
                  return { ...prev, employement_status: item.value };
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
          if(formState.employement_status != ''){
            onContinue()
          }
        }}
        className="primaryButton continueBtn"
      >
        <span></span> <span>Continue</span>
        <img src="/assets/image/arrow_circle_right_outline.svg" alt="icon" />
      </button>
      <p>This helps determine your financing eligiblity</p>
    </div>
  );
}
