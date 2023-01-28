import React from "react";
import { homeRenovation } from "../constant";
import { Formik, Form, Field } from "formik";
import { SelectInput } from "../formInputs";
import * as Yup from "yup";
export default function HomeRenovation({ formState, setFormState, onContinue }) {
  const ValidationSchema = Yup.object().shape({
    sub_type_of_loan: Yup.string().required(),
  });
  // onSubmit
  const onSubmit = (formValues) => {
    setFormState((prev) => {
      return { ...prev, ...formValues };
    });
    onContinue();
  };
  // main return
  return (
    <div className="formWrapper">
    <h1>Please select an option for Home Renovation</h1>
    <Formik
      initialValues={{
        sub_type_of_loan: formState.sub_type_of_loan || "",
      }}
      validationSchema={ValidationSchema}
      onSubmit={onSubmit}
    >
      <Form>
        <div className="optionFlex-personal-loan">
        <Field
              name="sub_type_of_loan"
              type="text"
              component={SelectInput}
              placeholder="Home Renovation"
              options={homeRenovation}
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