import React from "react";
import { bankRuptcy } from "../constant";

export default function Bankruptcy({ formState, setFormState, onContinue }) {
  // main return
  return (
    <div className="formWrapper">
      <h1>Do you have an active bankruptcy or consumer proposal?</h1>
      <div className="optionFlex">
        {bankRuptcy.map((item) => {
          return (
            <div
              className={
                formState.bankRuptcy === item.value
                  ? "personal_item active"
                  : "personal_item"
              }
              onClick={() =>
               { 
                 setFormState((prev) => {
                  return { ...prev, bankRuptcy: item.value };
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
          if(formState.bankRuptcy !=''){
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
