import React, { useEffect, useState } from "react";
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
  const { otp_verify_loading } = useSelector(
    (state) => state.authReducer.authentication
  );
  const { isLoading, save_post } = useSelector(
    (state) => state.postApplication.postApplicationReducer
  );
  const [checked, setChecked] = useState(false);
  const [checked1, setChecked1] = useState(false)

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
    console.log(formValues, "formValues")
    if (checked === false){
      alert("Please Select The borrower Terms and Conditions")
    return false;
  };
  if(checked1 === false){
    alert("Please Select The Credit Report Consent Terms")
    return false;
  }
    const data = {

      code: formValues.verifcation_code,
      phone: formState.telephone,
    };
    dispatch(verify_otp_simple(data, onCallback));
  };
  // on Verification Succss Callback to post application
  const onCallback = () => {
    console.log(formState, "Hammad")
    const pathArr = path.split("/");
    delete formState['fullAddress']
    const data = {
      ...formState,
      user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user'))?.user_type === 2 ? -1 : user_id : -1 ,
      application_type: formState?.stock ? 2 : 1,
      application_status: 2,
    };
    data.getFinancingAddPost = "yes"
    console.log({ data });
    dispatch(save_post_application(data, ()=>onContinue() ));
  };

  // on post save contiune to next step
  // useEffect(() => {

  //   onContinue()

  //   // save_post && onContinue();
  //   return () => { };
  // }, [save_post]);
console.log(checked,"checked")
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

<div style={{marginTop:"37px"}} className="DealerShip-Con d-flex">

<input style={{width:"25px",height:"25px"}} type="radio" name="checked"
onChange={() => setChecked(!checked)}
checked={checked}></input>
<label class="containerr">I have read and accept the{" "}
<a
  href="https://www.financethat.ca/assets/documents/Borrower-Terms-Conditions.pdf"
  target="_blank"
>
  Borrower Terms and Conditions
</a>

<span class="checkmarkk"></span>
</label>

              </div>
              <div style={{marginTop:"20px"}} className="DealerShip-Con d-flex">
<input style={{width:"25px",height:"25px"}} type="radio" name="checked1"
onChange={() => setChecked1(!checked1)}
checked={checked1}></input>
<label class="containerr">  I agree to the{" "}
<a style={{color:"#0d6efd"}} >
  Credit Report Consent Terms
</a>

<span class="checkmarkk"></span>
</label>

              </div>

          </div>


          <button
            disabled={otp_verify_loading || isLoading}
            type="submit"
            className="primaryButton continueBtn"
          >
            {otp_verify_loading ? (
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
          <p>We need this information to confirm your phone number</p>
        </Form>
      </Formik>

    </div>
  );
}
