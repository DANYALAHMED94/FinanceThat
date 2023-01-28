import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Animated } from "react-animated-css";
import NumberFormat from "react-number-format";
import {
  set_resubmit_application_true,
  Update_Sin_Number,
} from "../../../actions/postApplication";

const ApplicationNotFound = (props) => {
  const [err, setErr] = useState(false);
  const { reSubmit, message } = useSelector(
    (state) => state.postApplication.postApplicationReducer
  );

  console.log("reSubmitValue", reSubmit);
  const dispatch = useDispatch();
  const submit = (e) => {
    e.preventDefault();
    if (props.state.sinNumber) {
      // props.updateSubmitPost();
      // dispatch(set_resubmit_application_true());
      dispatch(
        Update_Sin_Number({ id: props.app_id, sin: props.state.sinNumber })
      );
    } else {
      setErr(true);
    }
  };

  return (
    <React.Fragment>
      {/* <Animated  animationIn="fadeInUp" animationInDuration={1000} animationOutDuration={1000} animationOut="fadeOutUp" isVisible={true}> */}
      <section class="Section-AddPost">
        <div class="AppNotFound-Container">
          <div class="Conditionapprov-Con">
            <div class="AppNotFound-Head">
              <img src="/assets/image/app-not-found.svg" alt="app-not-found" />
              {/* <h1>Sorry, it looks like we could not verify your identity with the information provided.<br /> Please ensure the information provided is accurate and up-to-date as we verify your identity against the credit bureau.</h1>
                                
                                <a onClick={props.reSubmit_post_application}>Resubmit New Application </a>
                                
                                <h2>Still having trouble? Contact us at applications@financethat.ca</h2> */}
              {reSubmit ? (
                <h1>
                  Sorry, it looks like we could not verify your identity with
                  the information provided.
                  <br />
                  <span style={{ fontWeight: "800" }}>
                    Please enter another SIN (Social Insurance Number)
                  </span>{" "}
                  or contact us at info@financethat.ca
                </h1>
              ) : (
                <h1>
                  Sorry, it looks like we could not verify your identity with
                  the information provided.
                  <br />
                  <span style={{ fontWeight: "800" }}>
                    Please enter your SIN(Social Insurance Number)
                  </span>{" "}
                  so we can find your information with the credit bureau.
                </h1>
              )}

              <div className="Application-Not-Found-SIN  ">
                {/* <label>Confirm Password</label> */}
                {/* <input type={"number" } 
                                    value={(props.state.sinNumber)}
                                    onChange={props.handleOnChange}
                                    allowNegative={false}
                                    id="sinNumber"
                                    name="sinNumber"
                                    placeholder='Social Insurance Number' 
                                    value={sin} 
                                    style={{ fontSize:  '16px' }} 
                                    /> */}

                {/* <div className="PostApp-Form"> */}
                <NumberFormat
                  required
                  // className='form-control'
                  // value={sin}
                  // onChange={(e) => setSIN(e.target.value)}
                  value={props.state.sinNumber}
                  onChange={props.handleOnChange}
                  allowNegative={false}
                  id="sinNumber"
                  name="sinNumber"
                  placeholder="SIN Number"
                />
                <a onClick={submit}>Submit</a>
                {/* </div> */}
              </div>

              <h2>
                Still having trouble? Contact us at applications@financethat.ca
              </h2>
            </div>
          </div>
        </div>
      </section>
      {/* </Animated> */}
    </React.Fragment>
  );
};
export default ApplicationNotFound;
