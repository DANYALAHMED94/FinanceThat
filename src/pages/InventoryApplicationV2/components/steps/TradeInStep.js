import React from "react";
import { Formik, Form, Field } from "formik";
import { TextInput } from "../formInputs";
import * as Yup from "yup";
export default function TradeInStep({ formState, setFormState, onContinue }) {
   // validation Schema
   const ValidationSchema = Yup.object().shape({
    down_payment: Yup.number().min(0).required(),
  });
  // onSubmit
  const onSubmit = (formValues) => {
    formState.down_payment = formValues.down_payment
    setFormState((prev) => {
      return { ...prev, ...formState };
    });
    onContinue();
  };
  // main return
  return (
    <div className="formWrapper">
      <h1 style={{marginBottom:"0px"}}>Down payment amount?</h1>
      <p style={{marginBottom:"30px"}}>Please enter 0 (zero) if there is no down payment.</p>
      <Formik
        initialValues={{
          down_payment: formState.down_payment || "",
        }}
        validationSchema={ValidationSchema}
        onSubmit={onSubmit}
      >
        <Form>
          <div className="optionFlex">
            <Field
              name="down_payment"
              type="text"
              component={TextInput}
              placeholder="Down payment amount"
            />
          </div>
          <button type="submit" className="primaryButton continueBtn">
            <span></span> <span>Continue</span>
            <img
              src="/assets/image/arrow_circle_right_outline.svg"
              alt="icon"
            />
          </button>
          <p>This lowers the price of your purchase.</p>
        </Form>
      </Formik>
    </div>
  );
}
