import React from "react";
import { bankRuptcy } from "../constant";

export default function ExistingLoan({ formState, setFormState, onContinue }) {
  // main return
  return (
    <div className="formWrapper">
      <h1>Do you have an existing loan with easyfinancial?</h1>
      <div className="optionFlex">
        {bankRuptcy.map((item) => {
          return (
            <div
              className={
                formState.existingLoan === item.value
                  ? "personal_item active"
                  : "personal_item"
              }
              onClick={() =>
               {
                 setFormState((prev) => {
                  return { ...prev, existingLoan: item.value };
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
          if(formState.existingLoan !=''){
            onContinue()
          }
        }}
        className="primaryButton continueBtn"
      >
        <span></span> <span>Continue</span>
        <img src="/assets/image/arrow_circle_right_outline.svg" alt="icon" />
      </button>
      {/* <p>This helps determine your eligibility</p> */}
    </div>
  );
}
