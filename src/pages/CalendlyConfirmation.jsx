import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "../assets/css/calendlyConfirmation.css";
const CalendlyConfirmation = () => {
  const script = document.createElement("script");
  script.innerHTML = 'fbq("track", "Schedule")';
  useEffect(() => {
    if (
      process.env.NODE_ENV != "development" &&
      process.env.NODE_ENV != "staging"
    ) {
      document.head.appendChild(script);
      return () => {
        document.head.removeChild(script);
      };
    }
  }, []);
  return (
    <>
      <div class="calendlyConfirmationWrapper">
        <div className="logoSec">
          <Link to="/">
            <img src="/assets/image/financethat-logo.svg" alt="logo"></img>
          </Link>
        </div>
        <div className="centerFlex">
          <div className="modalSec">
            <h1>Confirmed!</h1>
            <h2>You are scheduled with Finance That.</h2>
            <h3>
              We have received your Finance That Phone Appointment request and
              one of our agents will give you a call at your requested date and
              time.
            </h3>
            <div className="centerFlex">
              <Link to="/Ad-post/list">
                <button>Browse All Vehicles</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default CalendlyConfirmation;
