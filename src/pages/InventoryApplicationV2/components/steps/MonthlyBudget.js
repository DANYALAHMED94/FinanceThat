import React from "react";
import { monthlyBudgetOptions } from "../constant";

export default function MonthlyBudget({ formState, setFormState, onContinue }) {
  // main return
  return (
    <div className="formWrapper">
      <h1>What is your monthly Budget?</h1>
      <div className="optionFlex">
        {monthlyBudgetOptions.map((item) => {
          return (
            <div
              className={
                formState.monthly_budget === item.value ? "item active" : "item"
              }
              onClick={() => {
                setFormState((prev) => {
                  return { ...prev, monthly_budget: item.value };
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
          if (formState.monthly_budget) {
            onContinue()
          }
        }}
        className="primaryButton continueBtn"
      >
        <span></span> <span>Continue</span>
        <img src="/assets/image/arrow_circle_right_outline.svg" alt="icon" />
      </button>
      <p>This narrows down the budget your interested in.</p>
    </div>
  );
}
