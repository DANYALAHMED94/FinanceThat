import React from "react";
import { Formik, Form, Field } from "formik";
import { SelectInput } from "../formInputs";
import * as Yup from "yup";
import { dayOptions, monthOptions, yearOptions } from "../constant";
export default function BirthDayStep({ formState, setFormState, onContinue }) {
  // validation Schema
  const ValidationSchema = Yup.object().shape({
    month: Yup.string().required(),
    day: Yup.string().required(),
    year: Yup.string().required(),
  });
  // onSubmit
  const onSubmit = (formValues) => {
    const dob = `${formValues.year}-${formValues.month}-${formValues.day}`;
    setFormState((prev) => {
      return { ...prev, ...formValues, dob };
    });
    onContinue();
  };
  // main return
  return (
    <div className="formWrapper">
      <h1>What is your birthday?</h1>
      <Formik
        initialValues={{
          month: formState.month || "",
          day: formState.day || "",
          year: formState.year || "",
        }}
        validationSchema={ValidationSchema}
        onSubmit={onSubmit}
      >
        <Form>
          <div className="optionFlex" style={{ maxWidth: "100%" }}>
            <Field
              name="month"
              component={SelectInput}
              placeholder="Select Month"
              options={monthOptions}
            />
            <Field
              name="day"
              component={SelectInput}
              placeholder="Select Day"
              options={dayOptions}
            />
            <Field
              name="year"
              component={SelectInput}
              placeholder="Select Year"
              options={yearOptions}
            />
          </div>
          <button type="submit" className="primaryButton continueBtn">
            <span></span> <span>Continue</span>
            <img
              src="/assets/image/arrow_circle_right_outline.svg"
              alt="icon"
            />
          </button>
          <p>This helps determine your interest rate.</p>
        </Form>
      </Formik>
    </div>
  );
}
