/* eslint-disable jsx-a11y/iframe-has-title */
import React, { useState, useEffect } from "react";
import { history } from "../../../../_helpers";

export default function VerifyIdentity({ onContinue, reducerState }) {
  // state
  const [isJumioCompleted, setIsJumioCompleted] = useState(false);
  // onIframe message
  const onIframeMessage = (e) => {
    console.log("onIframeMessage", e.data);
    const dataInJson = JSON.parse(e.data);
    console.log(dataInJson, "dataInJson");
    if (dataInJson?.payload?.value === "success") {
      setIsJumioCompleted(true);
    }
  };
  //  iframe post message event lisnter
  useEffect(() => {
    window.addEventListener("message", onIframeMessage);
    return () => {
      window.removeEventListener("message", onIframeMessage);
    };
  }, []);

  // main return
  return (
    <div className="formWrapper verification">
      <h1>Confirm your Identity</h1>
      <h3>
        We need to verify your identity to accelerate your financing application
      </h3>
      <div className="centerFlex jumioIframe">
        <iframe
          src={reducerState.jumio_url}
          height="440"
          width="100%"
          style={{ maxWidth: "450px", border: "none" }}
          allow="camera;fullscreen;accelerometer;gyroscope;magnetometer"
          allowFullScreen
        ></iframe>
      </div>
      <div className="skipSec">
        <button
          onClick={() => onContinue()}
          disabled={!isJumioCompleted}
          className="primaryButton continueBtn"
        >
          <span></span> <span>Continue</span>
          <img src="/assets/image/arrow_circle_right_outline.svg" alt="icon" />
        </button>
        <button
          // onClick={() => history.push("/SubmitSuccess")}
          onClick={() => onContinue()}
          className="skipButton"
        >{`Skip >`}</button>
      </div>
      <p>We need this information to confirm your identity</p>
    </div>
  );
}
