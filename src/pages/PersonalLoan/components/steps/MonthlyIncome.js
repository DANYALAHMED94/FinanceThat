import React from "react";
import { monthlyIncomeOptions } from "../constant";

export default function MonthlyIncome({ formState, setFormState, onContinue }) {
  // main return
  return (
    <div className="formWrapper">
      <h1>What is your monthly income?</h1>
      <div className="optionFlex-personal-loan">
        {monthlyIncomeOptions.map((item) => {
          return (
            <div
              className={
                formState.monthly_income === item.value ? "item active" : "item"
              }
              onClick={() =>
                {
                  setFormState((prev) => {
                  return { ...prev, monthly_income: item.value };
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
          if(formState.monthly_income !=''){
            onContinue()
          }
        }}
        className="primaryButton continueBtn"
      >
        <span></span> <span>Continue</span>
        <img src="/assets/image/arrow_circle_right_outline.svg" alt="icon" />
      </button>
      {/* <p>This narrows down vehicles by price</p> */}
    </div>
  );
}
