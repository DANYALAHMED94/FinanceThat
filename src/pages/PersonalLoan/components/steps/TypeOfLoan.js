import React  from "react";
import { typeOfLoan } from "../constant";
import LoanTypeSvg from './LoanTypeSvg'
export default function TypeOfLoan({ formState, setFormState, onContinue }) {
  const onSetTypeOfLoan = (name) => {
    setFormState((prev) => {
      return { ...prev, type_of_loan: name, sub_type_of_loan:"" };
    });
    onContinue()
  };

  // main return
  return (
    <div className="formWrapper">
      <h1>What will you be using your loan for? </h1>
      <div className="optionFlex-personal-loan">
        {typeOfLoan.map((item) => {
          return (
            <div
              className={
                formState.type_of_loan === item.name ? "item active" : "item"
              }
              onClick={() => onSetTypeOfLoan(item.name)}
            >
              <LoanTypeSvg item={item} type_of_loan={formState.type_of_loan}/>
              <span>{item.name}</span>
            </div>
          );
        })}
      </div>
      <button
        onClick={() => {
          if(formState.type_of_loan !== ''){
            onContinue()
          }
        }
        }
        className="primaryButton continueBtn"
      >
        <span></span> <span>Continue</span>
        <img src="/assets/image/arrow_circle_right_outline.svg" alt="icon" />
      </button>
      <p>
      By clicking on the Button, I confirm my agreement to the general Terms of Service and Privacy Policy to Finance That.
      </p>
    </div>
  );
}
