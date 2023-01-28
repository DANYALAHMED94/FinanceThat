import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const ApplicationCreditUnknown = (props) => {

  const { jumio_url, credit_score } = useSelector(
    (state) => state.postApplication.postApplicationReducer
  );
  return (
    <React.Fragment>
      <section class="Section-AddPost">
        <div class="AppNotFound-Container">
          <div class="Conditionapprov-Con">
            <div class="Conditionapprov-Con-Head">
              <h1 className="mainTitle">Completed!</h1>
              <img
                src="/assets/image/leadAppSuccess.svg"
                alt="leadAppSuccess"
              />
          <h3>
          Thanks you for submitting your application!
        </h3>
        <p>Next step is to verify your identity!</p>
              <Link
                to={{
                  pathname: `/verify-application/${props.app_id}`,
                  state: { jumio_url, credit_score },
                }}
              >
                <span> Verify Identity</span>{" "}
                <img
                  src="/assets/image/arrow_circle_right_outline.svg"
                  style={{ marginLeft: "18px" }}
                  alt="icon"
                ></img>
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* </Animated> */}
    </React.Fragment>
  );
};
export default ApplicationCreditUnknown;
