import React from "react";
import { Formik, Form, Field } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { TextInput, TextMaskedInput } from "../formInputs";
import * as Yup from "yup";
import { send_otp } from "../../../../actions/authActions";
export default function EmailDetails({ formState, setFormState, onContinue }) {
  // redux stat
  const { otp_loading } = useSelector(
    (state) => state.authReducer.authentication
  );

  // dispatch fun
  const dispatch = useDispatch();
  // validation Schema
  const ValidationSchema = Yup.object().shape({
    email: Yup.string().email().required(),
    telephone: Yup.string().required(),
  });
  // onSubmit
  const onSubmit = (formValues) => {
    const data = { phone: formValues.telephone, via: "sms" };
    dispatch(send_otp(data, false, () => otpCallback(formValues)));
  };
  // otp callback
  const otpCallback = (formValues) => {
    setFormState((prev) => {
      return { ...prev, ...formValues, applicant_email: formValues.email };
    });
    onContinue();
  };
  // main return
  return (
    <div className="formWrapper">
      <h1>What is your email address and phone number?</h1>
      <Formik
        initialValues={{
          email: formState.applicant_email || "",
          telephone: formState.telephone || "",
        }}
        validationSchema={ValidationSchema}
        onSubmit={onSubmit}
      >
        <Form>
          <div className="optionFlex-personal-loan">
            <Field
              name="email"
              type="email"
              component={TextInput}
              placeholder="Email Address"
            />
            <Field
              mask={[
                "+",
                "1",
                " ",
                "(",
                /[0-9]/i,
                /[0-9]/i,
                /[0-9]/i,
                ")",
                " ",
                /[0-9]/,
                /[0-9]/i,
                /[0-9]/,
                "-",
                /[0-9]/,
                /[0-9]/i,
                /[0-9]/,
                /[0-9]/,
              ]}
              guide={false}
              name="telephone"
              component={TextMaskedInput}
              placeholder="Phone Number"
            />
          </div>
          <h3>
            Make sure to enter the correct phone number as we will be sending
            you a code via sms to confirm your number
          </h3>
          <button
            disabled={otp_loading}
            type="submit"
            className="primaryButton continueBtn"
          >
            {otp_loading ? (
              <>
                <span> </span>
                <i class="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>
                <span> </span>
              </>
            ) : (
              <>
                <span></span> <span>Send code via sms</span>
                <img
                  src="/assets/image/arrow_circle_right_outline.svg"
                  alt="icon"
                />
              </>
            )}
          </button>
          <p>This helps us get in touch with you for your application</p>
        </Form>
      </Formik>
    </div>
  );
}
