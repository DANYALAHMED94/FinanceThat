/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { TextInput, TextMaskedInput } from "../formInputs";
import * as Yup from "yup";
import { send_otp } from "../../../../actions/authActions";
import { save_post_application } from "../../../../actions/postApplication";
export default function EmailDetails({props, formState, setFormState, onContinue }) {
  // redux stat
  const { otp_loading } = useSelector(
    (state) => state.authReducer.authentication
  );
  const [checked, setChecked] = useState(false);
  const [checked1, setChecked1] = useState(false);
  const { user_id } = useSelector(
    (state) => state.authReducer.authentication.user
  );
  const openModel = () => {
    window.$("#consentModel").modal("show");
  };
  const { isLoadingOnConfrim } = useSelector(
    (state) => state.authReducer.registration
  );
  const { isLoading, save_post } = useSelector(
    (state) => state.postApplication.postApplicationReducer
  );
  // dispatch fun
  const dispatch = useDispatch();
  // validation Schema
  const ValidationSchema = Yup.object().shape({
    email: Yup.string().email().required(),
    telephone: Yup.string().required(),
    // setChecked:Yup.string().required(),
  });


  // onSubmit
  const onSubmit = (formValues) => {
    // const data = { phone: formValues.telephone, via: "sms",quickapp:true };
    if (checked === false){
        alert("Please Select The borrower Terms and Conditions")
      return false;
    };
    if(checked1 === false){
      alert("Please Select The Credit Report Consent Terms")
      return false;
    }
    setFormState((prev) => {
      return { ...prev, ...formValues, applicant_email: formValues.email};

          });
    const data = {
      ...formState,
      user: user_id || -1,
      applicant_email: formValues.email,
      application_type: formState?.stock ? 2 : 1,
      application_status: 2,
      telephone: formValues.telephone,
      phone: formValues.telephone,
    };

    console.log({ data });
    data.getFinancingAddPost = "yes"
    dispatch(save_post_application(data, ()=>onContinue()));
    // dispatch(send_otp(data, false, () => otpCallback(formValues)));
  };
  // otp callback

    /** COmment Due To Skip Otp Screen */
  /*const otpCallback = (formValues) => {
     setFormState((prev) => {
       return { ...prev, ...formValues, applicant_email: formValues.email };
     });
     onContinue();
  };*/

  // useEffect(() => {
  //   onContinue()
  //   // save_post && onContinue();
  //   return () => {};
  // }, [save_post]);
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
          <div className="optionFlex">
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

                  <div style={{marginTop:"37px"}} className="DealerShip-Con d-flex">
                  <input style={{width:"25px",height:"25px"}} type="radio" name="checked"
onChange={() => setChecked(!checked)}
checked={checked}></input>
                  <label class="containerr">I have read and accept the{" "}
                  <a
                    href="https://www.financethat.ca/assets/documents/Borrower-Terms-Conditions.pdf"
                    target="_blank" rel="noreferrer"
                  >
                    Borrower Terms and Conditions
                  </a>

  <span class="checkmarkk"></span>
</label>

                                </div>
                                <div style={{marginTop:"20px"}} className="DealerShip-Con d-flex">
                  <input style={{width:"25px",height:"25px"}} type="radio" name="checked1"
                  onChange={() => setChecked1(!checked1)}
                checked={checked1} onClick={openModel}>
 </input>
                  <label class="containerr">  I agree to the{" "}
                  <a style={{color:"#0d6efd"}} >
                    Credit Report Consent Terms
                  </a>

  <span class="checkmarkk"></span>
</label>
                                </div>
          </div>
          <button
              disabled={isLoadingOnConfrim || isLoading || otp_loading}
            type="submit"
            className="primaryButton continueBtn"
          >
            {(otp_loading || isLoadingOnConfrim) ? (
              <>
                <span> </span>
                <i class="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>
                <span> </span>
              </>
            ) : (
              <>
                <span></span> <span>Submit</span>
                <img
                  src="/assets/image/arrow_circle_right_outline.svg"
                  alt="icon"
                />
              </>
            )}
          </button>
          {/* <p>This helps us get in touch with you for your application</p> */}
        </Form>
      </Formik>
    </div>
  );
}
