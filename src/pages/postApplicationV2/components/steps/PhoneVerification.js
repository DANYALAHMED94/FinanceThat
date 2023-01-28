import React, { useEffect } from "react";
import { Formik, Form, Field } from "formik";
import { TextInput } from "../formInputs";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { verify_otp_simple } from "../../../../actions/authActions";
import { save_post_application } from "../../../../actions/postApplication";
import { useLocation } from "react-router";

export default function PhoneVerification({ formState, onContinue }) {
  // redux stat
  const { user_id } = useSelector(
    (state) => state.authReducer.authentication.user
  );
  const { isLoadingOnConfrim } = useSelector(
    (state) => state.authReducer.registration
  );
  const { isLoading, save_post } = useSelector(
    (state) => state.postApplication.postApplicationReducer
  );
  // use location for pathname
  const path = useLocation().pathname;
  // dispatch fun
  const dispatch = useDispatch();
  // validation Schema
  const ValidationSchema = Yup.object().shape({
    verifcation_code: Yup.string().required(),
  });
  // onSubmit
  const onSubmit = (formValues) => {
    console.log(formValues,"formValues")
    const data = {

      code: formValues.verifcation_code,
      phone: formState.telephone,
    };
    dispatch(verify_otp_simple(data, onCallback));
  };
  // on Verification Succss Callback to post application
  const onCallback = () => {
    const data = {
      ...formState,
      user: user_id || -1,
      application_type: formState?.stock ? 2 : 1,
      application_status: 2,
      telephone: formState?.telephone,
    };

    console.log({ data });
    data.getFinancingAddPost = "yes"
    dispatch(save_post_application(data));
  };

  // on post save contiune to next step
  useEffect(() => {
    onContinue()
    // save_post && onContinue();
    return () => {};
  }, [save_post]);

  // main return
  return (
    <div className="formWrapper">
      <h1>Confirm your phone number</h1>
      <Formik
        initialValues={{
          verifcation_code: formState.verifcation_code || "",
        }}
        validationSchema={ValidationSchema}
        onSubmit={onSubmit}
      >
        <Form>
          <div className="optionFlex">
            <Field
              name="verifcation_code"
              component={TextInput}
              placeholder="SMS Code"
            />
          </div>
          <button
            disabled={isLoadingOnConfrim || isLoading}
            type="submit"
            className="primaryButton continueBtn"
          >
            {isLoadingOnConfrim ? (
              <>
                <span> </span>
                <i class="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>
                <span> </span>
              </>
            ) : (
              <>
                <span></span> <span>Continue</span>
                <img
                  src="/assets/image/arrow_circle_right_outline.svg"
                  alt="icon"
                />
              </>
            )}
          </button>
          <p>We need this information to confirm your phone number</p>
        </Form>
      </Formik>
    </div>
  );
}
