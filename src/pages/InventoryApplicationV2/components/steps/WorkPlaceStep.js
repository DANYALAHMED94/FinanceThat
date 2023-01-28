import React from "react";
import { Formik, Form, Field } from "formik";
import { TextInput } from "../formInputs";
import * as Yup from "yup";
export default function WorkPlaceStep({ formState, setFormState, onContinue }) {
  // validation Schema
  const ValidationSchema = Yup.object().shape({
    employer_name: Yup.string().required(),
    employment_designation: Yup.string().required(),
  });
  // onSubmit
  const onSubmit = (formValues) => {
    console.log(formValues,"formValues")
    formValues.occupation = formValues.employment_designation
    setFormState((prev) => {
      return { ...prev, ...formValues };
    });
    onContinue();
  };
  // main return
  return (
    <div className="formWrapper">
      <h1>Where do you work?</h1>
      <Formik
        initialValues={{
          // business_name change with employer_name because same values pass from post app
          employer_name: formState.employer_name || "",
          employment_designation: formState.employment_designation || "",
        }}
        validationSchema={ValidationSchema}
        onSubmit={onSubmit}
      >
        <Form>
          <div className="optionFlex">
            <Field
              name="employer_name"
              type="text"
              component={TextInput}
              placeholder="Employer Name"
            />
            <Field
              name="employment_designation"
              type="text"
              component={TextInput}
              placeholder="Job Title"
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
