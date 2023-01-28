import React, { useEffect } from 'react'
import { Animated } from "react-animated-css";

export default function InstantApproval(props) {

  const listData = ["Fill out the application and get instant approval", "Verify your indentity online", "Verify your income (waived depending on credit)", "Sign the loan agreement digitally.", "Get funded for your dream vehicle!"]
  return (
    <React.Fragment>

      <Animated
        animationIn={props.state.animation}
        animationInDuration={500}
        animationOutDuration={500}
        animationOut="fadeOutUp"
        isVisible={true}
      >

        <div className="PostApp-SecOne item instantApprovalWrapper">
          <div>
            <h1>Get instant approval with our online application!</h1>

            <h3>
              This application will take 2 minutes and it will allow us to
              give you <span>an instant approval</span> without waiting for
              someone to email you or call you.
            </h3>
          </div>

          <h2> Get instantly approved and funded. Here’s how:</h2>

          <div>
            {" "}
            {listData?.map((item, index) => {
              return (
                <div className="item">
                  {" "}
                  <div className="circle"> {index + 1} </div>{" "}
                  <span>{item}</span>{" "}
                </div>
              );
            })}{" "}
          </div>

          <div className="row">
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
              <div className="PostApp-NextBtn float-right">
                <button
                  // type="button"
                  // data-toggle="modal"
                  // data-target="#signUpModel"
                  onClick={() => props.changeStepButton(0, 1, 0)}
                >
                  Get Started <i className="fa fa-angle-right"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </Animated>
    </React.Fragment>
  );
}
