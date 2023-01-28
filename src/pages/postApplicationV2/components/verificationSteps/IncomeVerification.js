/* eslint-disable jsx-a11y/iframe-has-title */
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { login_flinks } from "../../../../actions/editPostAppActions";
import { Flinks } from "../../../../constant";
import { history } from "../../../../_helpers";

export default function IncomeVerification({ onContinue, applicationId }) {
  // state
  const [isFlinksCompleted, setIsFlinksCompleted] = useState(false);
  const [bankName, setBankName] = useState(null);
  const [LoginID, setLoginId] = useState(null);
  const [onIframeLoad, setIframeLoad] = useState(true);

  // disptach
  const dispatch = useDispatch();

  // onIframe message
  const onIframeMessage = (e) => {
    console.log("onIframeMessage", e.data);
    // on fLinks callback
    if (e.data && e.data.institution) {
      setBankName(e.data.institution);
    }
    if (
      e.data.loginId !== undefined &&
      e.data.loginId !== null &&
      e.data.loginId !== ""
    ) {
      setLoginId(e.data.loginId);
    }
  };
  //  iframe post message event lisnter
  useEffect(() => {
    window.addEventListener("message", onIframeMessage);
    return () => {
      window.removeEventListener("message", onIframeMessage);
    };
  }, []);

  // hitting flinks login api on LoginID change
  useEffect(() => {
    if (LoginID) {
      const data = {
        LoginID: LoginID,
        application_id: applicationId,
        bank_name: bankName,
      };
      setIsFlinksCompleted(true);
      dispatch(login_flinks(data));
    }
    return () => {};
  }, [LoginID]);

  // main return
  return (
    <div className="formWrapper verification">
      <h1>Confirm your Income</h1>
      <h3>
        We need to verify your income to accelerate your financing application
      </h3>
      <div className="centerFlex flinksIframe" style={{ minHeight: "600px" }}>
        <div style={{ maxWidth: "450px", border: "none", width: "100%" }}>
          {onIframeLoad && (
            <div class="sk-fading-circle">
              <div class="sk-circle1 sk-circle"></div>
              <div class="sk-circle2 sk-circle"></div>
              <div class="sk-circle3 sk-circle"></div>
              <div class="sk-circle4 sk-circle"></div>
              <div class="sk-circle5 sk-circle"></div>
              <div class="sk-circle6 sk-circle"></div>
              <div class="sk-circle7 sk-circle"></div>
              <div class="sk-circle8 sk-circle"></div>
              <div class="sk-circle9 sk-circle"></div>
              <div class="sk-circle10 sk-circle"></div>
              <div class="sk-circle11 sk-circle"></div>
              <div class="sk-circle12 sk-circle"></div>
            </div>
          )}
          <iframe
            height={onIframeLoad ? "0" : "600px"}
            width="100%"
            style={{ maxWidth: "450px", border: "none" }}
            onLoad={() => setIframeLoad(false)}
            src={Flinks}
          ></iframe>
        </div>
      </div>
      <div className="skipSec">
        <button
          type="button"
          onClick={() => history.push("/SubmitSuccess")}
          disabled={!isFlinksCompleted}
          className="primaryButton continueBtn"
        >
          <span></span> <span>Continue</span>
          <img src="/assets/image/arrow_circle_right_outline.svg" alt="icon" />
        </button>
        <button
          onClick={() => onContinue(3)}
          className="skipButton"
        >{`Skip >`}</button>
      </div>
      <p>We need this information to confirm your identity</p>
    </div>
  );
}
