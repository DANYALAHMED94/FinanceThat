import React from "react";
import { Formik, Form, Field } from "formik";
import { SelectInput, TextInput, TextMaskedInput } from "../formInputs";
import * as Yup from "yup";
import { provincesOptions } from "../constant";
export default function AddressStep({ formState, setFormState, onContinue }) {
  // validation Schema
  const ValidationSchema = Yup.object().shape({
    street_address: Yup.string().required(),
    city: Yup.string().required(),
    province: Yup.string().required(),
    postal_code: Yup.string().required(),
    country: Yup.string().required(),
  });
  // onSubmit
  const onSubmit = (formValues) => {
    setFormState((prev) => {
      return {
        ...prev,
        ...formValues,
        province_full:
          (provincesOptions || []).filter(
            (item) => item.value === formValues.province
          )?.[0]?.label || "",
      };
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
          unit_number: formState.unit_number || "",
          city: formState.city || "",
          province: formState.province || "",
          postal_code: formState.postal_code || "",
          country: formState.country || "",
        }}
        validationSchema={ValidationSchema}
        onSubmit={onSubmit}
      >
        <Form>
          <div className="optionFlex-personal-loan">
            <Field
              name="street_address"
              type="text"
              component={TextInput}
              placeholder="Street Address"
              style={{ width: "100%", maxWidth: "620px" }}
            />
            <Field
              name="unit_number"
              type="text"
              component={TextInput}
              placeholder="Unit Number"
              style={{ width: "100%", maxWidth: "620px" }}
            />
            <Field
              name="city"
              type="text"
              component={TextInput}
              placeholder="City"
            />
            <Field
              name="province"
              type="text"
              component={SelectInput}
              placeholder="Province"
              options={provincesOptions}
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
              placeholder="Postal Code"
            />
            <Field
              name="country"
              type="text"
              component={TextInput}
              placeholder="Country"
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
      </Formik>
    </div>
  );
}
