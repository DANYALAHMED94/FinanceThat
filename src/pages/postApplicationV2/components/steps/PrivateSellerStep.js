import React from "react";
import { booleanOptions } from "../constant";

export default function PrivateSellerStep({
  formState,
  setFormState,
  onContinue,
}) {
  // main return
  return (
    <div className="formWrapper">
      <h1>Are you looking to buy from a private seller?</h1>
      <div className="optionFlex">
        {booleanOptions.map((item) => {
          return (
            <div
              className={
                formState.looking_for_private_seller === item.value
                  ? "item active"
                  : "item"
              }
              onClick={() =>
               { 
                 setFormState((prev) => {
                  return { ...prev, looking_for_private_seller: item.value };
                })
                onContinue()
              }}
              style={{ justifyContent: "center" }}
            >
              {item.label}
            </div>
          );
        })}
      </div>
      <button
        onClick={() => {
          if(formState.looking_for_private_seller != ''){
            onContinue()
          }
        }}
        className="primaryButton continueBtn"
      >
        <span></span> <span>Continue</span>
        <img src="/assets/image/arrow_circle_right_outline.svg" alt="icon" />
      </button>
      <p>This lowers the price of your next vehicle</p>
    </div>
  );
}
