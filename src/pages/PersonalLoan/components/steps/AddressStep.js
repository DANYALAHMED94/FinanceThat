/* eslint-disable default-case */
/* eslint-disable no-unused-vars */
import React from "react";
import { Form, Field, Formik } from "formik";
import { SelectInput, TextInput, TextMaskedInput} from "../formInputs";
import * as Yup from "yup";
import {Provinces} from "../../../../_constants/Provinces"
// import AddressFormik from './AddressFormik'
export default function AddressStep({ formState, setFormState, onContinue }) {
  // validation Schema
  const ValidationSchema = Yup.object().shape({
    city: Yup.string().required(),
    province: Yup.string().required(),
    postal_code: Yup.string().required(),
    country: Yup.string().required(),
  });
  // onSubmit
  const onSubmit = (formValues) => {
    setFormState((prev) => {
      return { ...prev, ...formValues};
    });
    onContinue();
  };

  // main return
  return (
    <div className="formWrapper">
      <h1>What is your address?</h1>
      <Formik
        initialValues={{
          street_address: formState.street_address || "",
          city: formState.city || "",
          province: formState.province || "",
          postal_code: formState.postal_code || "",
          country: formState.country || "Canada",
        }}
        validationSchema={ValidationSchema}
        onSubmit={onSubmit}
      >
           <Form>
        <div className="optionFlex">

        <Field
        inputClassName="personalloan_input_adress"
            name="street_address"
            type="text"
            component={TextInput}
            placeholder="street_address"
            style={{ width: "100%", maxWidth: "620px" }}
          />
          <Field
           inputClassName="personalloan_input"
            name="city"
            type="text"
            component={TextInput}
            placeholder="City"
          />
          <Field
          inputClassName="personalloan_input"
            name="province"
            type="text"
            component={SelectInput}
            placeholder="Province"
            options={Provinces}
          />
          <Field
           mask={[
            /[a-zA-Z0-9]/i,
            /[a-zA-Z0-9]/,
            /[a-zA-Z0-9]/i,
            " ",
            /[a-zA-Z0-9]/,
            /[a-zA-Z0-9]/i,
            /[a-zA-Z0-9]/,
          ]}
            guide={false}
            name="postal_code"
            component={TextMaskedInput}
            inputClassName="personalloan_input"
            placeholder="Postal Code"
          />
          <Field
          inputClassName="personalloan_input"
            name="country"
            type="text"
            component={TextInput}
            placeholder="Country"
            value="Canada"
            disabled
          />
        </div>
        <button type="submit" className="primaryButton continueBtn">
          <span></span> <span>Continue</span>
          <img
            src="/assets/image/arrow_circle_right_outline.svg"
            alt="icon"
          />
        </button>
        <p>This helps us find you a vehicle near you.</p>
      </Form>
       {/* <AddressFormik address={address} setStreetAddress={setStreetAddress} setAddress={setAddress}/> */}
      </Formik>
    </div>
  );
}
