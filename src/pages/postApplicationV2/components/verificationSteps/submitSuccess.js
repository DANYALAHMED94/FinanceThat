import React from "react";

export default function submitSuccess() {
  return (
    <div className="formWrapper verification" style={{verticalAlign: 'middle',
    display: 'table-cell',
    textAlign: 'center'}}>
      <h1>Congrats! your application is submitted Successfully!</h1>
      <img src="/assets/image/shortAppSuccess.svg" alt="success" />
      <h1>
      We have received your application. One of our agents will contact you via email or phone in 24 hours.
      </h1>
    </div>
  );
}
