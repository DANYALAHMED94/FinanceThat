import React,{useState} from "react";
import { Formik, Form, Field } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { TextInput, TextMaskedInput } from "../formInputs";
import * as Yup from "yup";
import { send_otp } from "../../../../actions/authActions";
import { save_post_application } from "../../../../actions/postApplication";

export default function EmailDetails({ formState, setFormState, onContinue }) {
  // redux stat
  const { otp_loading } = useSelector(
    (state) => state.authReducer.authentication
  );
  const { user_id } = useSelector(
    (state) => state.authReducer.authentication.user
  );
  const { isLoading, save_post } = useSelector(
    (state) => state.postApplication.postApplicationReducer
  );
  const [checked, setChecked] = useState(false);
const [checked1, setChecked1] = useState(false)
  // dispatch fun
  const dispatch = useDispatch();
  // validation Schema
  const ValidationSchema = Yup.object().shape({
    email: Yup.string().email().required(),
    telephone: Yup.string().required(),
  });

  // onSubmit
  const onSubmit = (formValues) => {
    if(+localStorage.getItem("user_type") === 1){
      if (checked === false){
        alert("Please Select The borrower Terms and Conditions")
      return false;
    };
    if(checked1 === false){
      alert("Please Select The Credit Report Consent Terms")
      return false;
    }
      const data = {
        ...formState,
        user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user'))?.user_type === 2 ? -1 : user_id : -1 ,
        application_type: formState?.stock ? 2 : 1,
        application_status: 2,
        applicant_email: formValues.email,
        telephone: formValues.telephone,
        phone: formValues.telephone,
      };

      console.log({ data });
      data.getFinancingAddPost = "yes"
      dispatch(save_post_application(data, ()=>onContinue(12)));
    }else {
      const data = { phone: formValues.telephone, via: "sms",quickapp:true,       telephone: formValues?.telephone,
    };
      dispatch(send_otp(data, false, () => otpCallback(formValues)));
    }

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
 {+localStorage.getItem("user_type") === 1 && (<>
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
              </>)}

          </div>
          {+localStorage.getItem("user_type") !== 1 &&( <h3>
Make sure to enter the correct phone number as we will be sending
you a code via sms to <br />confirm your number.
</h3>)}
          {/* {+localStorage.getItem("user_type") === 1 ? ( <div class="textcheckbox">
            <input type="checkbox"
              checked={checked}
              onChange={() => setChecked(!checked)}
          /><p>By clicking the checkbox and submitting, I consent to have my credit file accessed for purposes of prequalifying for a vehicle loan. I agree to the privacy notice, terms and conditions and I acknowledge Finance That may contact me. I understand that I might not prequalify depending on the prequalification criteria.</p></div>) : <h3>
            Make sure to enter the correct phone number as we will be sending
            you a code via sms to <br />confirm your number.
          </h3>} */}

          <button
            disabled={otp_loading || isLoading}
            type="submit"
            className="primaryButton continueBtn"
          >
            {(otp_loading || isLoading) ? (
              <>
                <span> </span>
                <i class="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>
                <span> </span>
              </>
            ) : (
              <>
                <span></span> <span>{+localStorage.getItem("user_type") === 1 ? "Submit" : "Send code via sms"}</span>
                <img
                  src="/assets/image/arrow_circle_right_outline.svg"
                  alt="icon"
                />
              </>
            )}
          </button>
          {+localStorage.getItem("user_type") === 1 ? "" : <p>This helps us get in touch with you for your application</p>}
        </Form>
      </Formik>
    </div>
  );
}
