import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { history } from "../../../../_helpers";
import {confirm_post_application} from '../../../../actions/postApplication'
export default function CongratulationStep({
  formState,
  setFormState,
  onContinue,
}) {
  const dispatch = useDispatch()
  const { app_id, response_type, credit_score, jumio_url } = useSelector(
    (state) => state.postApplication.postApplicationReducer
  );
  useEffect(()=> {
    var theScript=""
    var head = document.getElementsByTagName('head')[0];
       theScript= document.createElement('script');
       theScript.src = "/assets/js/submitLead.js";
       theScript.async = true;
       theScript.id = "submitLead"
       theScript.type = "text/javascript";
       head.appendChild( theScript )
    return ()=> {
      console.log('Unmount', theScript)
      theScript.parentNode.removeChild( theScript );
    }
  },[])
  // main return
  // if(credit_score >=550){
    if(response_type === 2){
    return (
      <div className="formWrapper postSuccess" style={{padding:"0px 20px"}}>
       <h1>Congratulations!</h1>
       <div className="centerFlex">
       <img src="/assets/image/leadAppSuccess.svg" alt="succuss post" />
         {/* <img src="/assets/image/condition-approved-image.svg" alt="succuss post" /> */}
       </div>
       <h2>
         You have been
         <br /> <span> Conditionally Approved </span>
       </h2>
       <p>Next step is to verify your identity!</p>
       <div className="skipSec">
         <button
           onClick={() =>
             history.push(`/post-application-verification/${app_id}`, {
               jumio_url,
               credit_score,
             })
           }
           className="primaryButton continueBtn mt-1"
         >
           <span></span> <span>Verify Identity</span>
           <img src="/assets/image/arrow_circle_right_outline.svg" alt="icon" />
         </button>
         <button
          onClick={() =>
            history.push(`/post-application-verification/${app_id}/2`, {
              jumio_url,
              credit_score,
            })
          }
        //  onClick={()=>dispatch(confirm_post_application())}
          //  onClick={() => history.push("/")}
           className="skipButton"
         >{`Skip >`}</button>
       </div>
     </div>
    );
    // credit_score == null ||
  }else if(response_type === 1){
    return (
      <div className="formWrapper postSuccess" style={{padding:"0px 20px"}}>
      <h1>Completed!</h1>
        <div className="centerFlex">
        <img src="/assets/image/leadAppSuccess.svg" alt="succuss post" />
          {/* <img src="/assets/image/condition-approved-image.svg" alt="succuss post" /> */}
        </div>
        <h2>
          Thanks you for submitting your application!
        </h2>
        <p>Next step is to verify your identity!</p>
        <div className="skipSec">
          <button
            onClick={() =>
              history.push(`/post-application-verification/${app_id}`, {
                jumio_url,
                credit_score,
              })
            }
            className="primaryButton continueBtn mt-1"
          >
            <span></span> <span>Verify Identity</span>
            <img src="/assets/image/arrow_circle_right_outline.svg" alt="icon" />
          </button>
          <button
          onClick={() =>
            history.push(`/post-application-verification/${app_id}/2`, {
              jumio_url,
              credit_score,
            })
          }
            // onClick={()=>dispatch(confirm_post_application())}
            className="skipButton"
          >{`Skip >`}</button>
        </div>
      </div>
    );
    // credit_score < 550 ||
  }else if(response_type === 4){
    return (
      <div className="formWrapper postSuccess" style={{padding:"0px 20px"}}>
        <div className="centerFlex">
          {/* <img src="/assets/image/condition-approved-image.svg" alt="succuss post" /> */}
        </div>
        <div class="message__wrapper" style={{marginTop:"170px"}}>
        <div class="message__inner">
            <div class="icon__wrap">
            <img src="/assets/image/icon-notification.svg" alt="succuss post" />
            </div>
            <div class="message__wrap" style={{textAlign:'left'}}>
                <p>Unfortunetly, we cannot process your application based on the information you have provided.</p>
            </div>
        </div>
    </div>
      </div>
    );
  }else if(response_type === 5){
    return (
      <div className="formWrapper postSuccess" style={{padding:"0px 20px"}}>
      <h1>Congrats! your application is submitted Successfully!</h1>
        <div className="centerFlex">
        <img src="/assets/image/shortAppSuccess.svg" alt="succuss post" />
        </div>
        <p>We have received your application. One of our agents will contact you via email or phone in 24 hours.</p>

      </div>
    )
  }else {
    return (
      <div className="formWrapper postSuccess" style={{padding:"0px 20px"}}>
      <h1>Congrats! your application is submitted Successfully!</h1>
        <div className="centerFlex">
        <img src="/assets/image/shortAppSuccess.svg" alt="succuss post" />
        </div>
        <p>We have received your application. One of our agents will contact you via email or phone in 24 hours.</p>
        <div className="skipSec">
         <button
           onClick={() =>
             history.push(`/post-application-verification/${app_id}`, {
               jumio_url,
               credit_score,
             })
           }
           className="primaryButton continueBtn mt-1"
         >
           <span></span> <span>Verify Identity</span>
           <img src="/assets/image/arrow_circle_right_outline.svg" alt="icon" />
         </button>
         <button
                  onClick={() =>
                    history.push(`/post-application-verification/${app_id}/2`, {
                      jumio_url,
                      credit_score,
                    })
                  }
          //  onClick={() => history.push("/")}
           className="skipButton"
         >{`Skip >`}</button>
       </div>
      </div>
    )
  }
  }
