import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Animated } from "react-animated-css";
import { Helmet } from "react-helmet";

const ApplicationDeclined = props => {

    return (
        <React.Fragment>
            <Helmet>
                <script src=
                    "/assets/js/bodyGtagScript.js"
                    type="text/javascript" />
            </Helmet>
            {/* <Animated  animationIn="fadeInUp" animationInDuration={1000} animationOutDuration={1000} animationOut="fadeOutUp" isVisible={true}> */}
            <section class="Section-AddPost">
                <div class="Page404-Container">
                    <div class="Conditionapprov-Con">

                        <div class="Page404-Head">
                            <img src="/assets/image/application-diclined-img.svg" alt="application-diclined-img" />
                            <h3>Unfortunately your credit score does not meet our minimum requirement of 500.
                                <br /> If you believe that we have the incorrect information please contact us at applications@financethat.ca</h3>
                            <a onClick={props.reSubmit_post_application}>Resubmit New Application</a>
                        </div>


                    </div>
                </div>
            </section>
            {/* </Animated> */}
        </React.Fragment>
    )
}
export default ApplicationDeclined