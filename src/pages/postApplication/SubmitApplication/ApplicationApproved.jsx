import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Animated } from "react-animated-css";
import { Helmet } from "react-helmet";

const ApplicationApproved = (props) => {

  const { jumio_url, credit_score } = useSelector(
    (state) => state.postApplication.postApplicationReducer
  );
  return (
    <React.Fragment>
      <Helmet>
        <script src=
          "/assets/js/bodyGtagScript.js"
          type="text/javascript" />
      </Helmet>
      {/* <Animated animationIn="fadeInUp" animationInDuration={1000} animationOutDuration={1000} animationOut="fadeOutUp" isVisible={true}> */}
      <section class="Section-AddPost">
        <div class="AppNotFound-Container">
          <div class="Conditionapprov-Con">
            <div class="Conditionapprov-Con-Head">
              <h1 className="mainTitle">Congratulations!</h1>
              <h3 className="subTitle">
                You are{" "}
                {props.response_type == "2" ? (
                  <span className="conditional-approve">
                    conditionally approved
                  </span>
                ) : (
                  <span className="pre-approve">pre-approved</span>
                )}{" "}
                for up to{" "}
              </h3>
              <h2>
                {props.amount !== undefined || props.amount !== null
                  ? props.amount
                  : ""}
              </h2>
              <img
                src="/assets/image/condition-approved-image.svg"
                alt="condition-approved-image"
              />

              {/* <p>
                {props.message !== undefined || props.message !== null
                  ? props.message
                  : ""}
              </p> */}
              <h1 className="text"> Next step is to verify your identity! </h1>
              {/* <p>In order to process your application we require few documents to verify your details. Upon verification we will update your application with the approved loan amount and interest rate.</p> */}
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
              {/* <h3 onClick={props.confirm_post_application}>I will upload later</h3> */}
            </div>
          </div>
        </div>
      </section>
      {/* </Animated> */}
    </React.Fragment>
  );
};
export default ApplicationApproved;
