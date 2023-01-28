import React from "react";
import { Formik, Form, Field } from "formik";
import { TextInput } from "../formInputs";
import * as Yup from "yup";
export default function PersonlDetail({ formState, setFormState, onContinue }) {
  // validation Schema
  const ValidationSchema = Yup.object().shape({
    first_name: Yup.string().required(),
    last_name: Yup.string().required(),
  });
  // onSubmit
  const onSubmit = (formValues) => {
    setFormState((prev) => {
      return { ...prev, ...formValues };
    });
    formState.interested_vehicle_type === "Automotive" ? onContinue() : onContinue();
  };
  // main return
  return (
    <div className="formWrapper">
      <h1>What is your name?</h1>
      <Formik
        initialValues={{
          first_name: formState.first_name || "",
          last_name: formState.last_name || "",
          sin:formState.sin || ""
        }}
        validationSchema={ValidationSchema}
        onSubmit={onSubmit}
      >
        <Form>
          <div className="optionFlex">
            <Field
              name="first_name"
              component={TextInput}
              placeholder="First Name"
            />
            <Field
              name="last_name"
              component={TextInput}
              placeholder="Last Name"
            />
            {/* <Field
              name="sin"
              maxLength = "9"
              minLenght = "9"
              component={TextInput}
              placeholder="SSN"
            /> */}
          </div>
          <button type="submit" className="primaryButton continueBtn">
            <span></span> <span>Continue</span>
            <img
              src="/assets/image/arrow_circle_right_outline.svg"
              alt="icon"
            />
          </button>
          <p>We need this to contact you.</p>
        </Form>
      </Formik>
    </div>
  );
}
