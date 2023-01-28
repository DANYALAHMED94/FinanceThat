import React from "react";
import { Formik, Form, Field } from "formik";
import { TextInput } from "../formInputs";
import * as Yup from "yup";
export default function LoanAmount({ formState, setFormState, onContinue }) {
  const ValidationSchema = Yup.object().shape({
    loan_amount: Yup.number().min(0).required(),
  });
  // onSubmit
  const onSubmit = (formValues) => {
    formState.loan_amount = formValues.loan_amount
    setFormState((prev) => {
      return { ...prev, ...formState };
    });
    onContinue();
  };
  // main return
  return (
    <div className="formWrapper">
    <h1 style={{marginBottom:"0px"}}>How much loan do you need?</h1>
    <p style={{marginBottom:"30px"}}>Loan amounts vary by province. Finance That offers loans up to $75,000 in all provinces except BC, Nunavut, NWT and Yukon, where loans are up to $15,000.</p>
    <Formik
      initialValues={{
        loan_amount: formState.loan_amount || "",
      }}
      validationSchema={ValidationSchema}
      onSubmit={onSubmit}
    >
      <Form>
        <div className="optionFlex-personal-loan">
          <Field
            name="loan_amount"
            type="number"
            component={TextInput}
            placeholder="Loan amount"
          />
        </div>
        <button type="submit" className="primaryButton continueBtn">
          <span></span> <span>Continue</span>
          <img
            src="/assets/image/arrow_circle_right_outline.svg"
            alt="icon"
          />
        </button>
        {/* <p>This lowers the price of your purchase.</p> */}
      </Form>
    </Formik>
  </div>
  );
}
