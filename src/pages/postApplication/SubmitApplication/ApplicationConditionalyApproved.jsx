import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Animated } from "react-animated-css";
import { Helmet } from "react-helmet";

const ApplicationConditionalyApproved = props => {

    return (
        <React.Fragment>
            <Helmet>
                <script src=
                    "/assets/js/bodyGtagScript.js"
                    type="text/javascript" />
            </Helmet>
            {/* <Animated  animationIn="fadeInUp" animationInDuration={1000} animationOutDuration={1000} animationOut="fadeOutUp" isVisible={true}> */}
            <section class="Section-AddPost">
                <div class="AppNotFound-Container">
                    <div class="Conditionapprov-Con">

                        <div class="Conditionapprov-Con-Head">
                            <h1>Conditionally approved for up to</h1>
                            {/* <h2>$30,000</h2> */}
                            <h2>{props.amount !== undefined || props.amount !== null ? props.amount : ''}</h2>
                            <img src="/assets/image/condition-approved-image.svg" alt="" />
                            <h3>Congratulations! you are</h3>
                            <h4>Conditionally Approved!</h4>
                            <p>{props.message !== undefined || props.message !== null ? props.message : ''}</p>
                            {/* <p>In order to process your application we require few documents to verify your details.<br /> Upon verification we will update your application with the approved loan amount and interest rate.</p> */}
                            <Link to={`/buyer/my-application/${props.app_id}`}>Finalize My Application</Link>
                            {/* <h3 onClick={props.confirm_post_application}>I will upload later</h3> */}
                        </div>

                    </div>
                </div>
            </section>
            {/* </Animated> */}
        </React.Fragment>
    )
}
export default ApplicationConditionalyApproved
