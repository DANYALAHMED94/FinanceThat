import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Animated } from "react-animated-css";

const ConfirmPost = (props) => {
    // useEffect(() => {
    //     window.scrollTo({
    //         top: 0,
    //         behavior: "smooth",
    //     });
    // }, [])
    return (
        <React.Fragment>
            {/* <Animated animationIn="fadeInUp" animationInDuration={1000} animationOutDuration={1000} animationOut="fadeOutUp" isVisible={true}> */}
                <section class="Section-AddPost">
                    <div class="AppSubmit-Container">
                        <div class="Conditionapprov-Con">

                            <div class="AppSubmit-Head">
                                <img src="/assets/image/application-submit.svg" alt="" />
                                <div class="clearfix"></div>
                                <img class="submit-img" src="/assets/image/app-submit-icon.svg" alt="" />
                                <h1>Application is Submitted Successfully!</h1>
                                <p>Thank you for submitting your financing application. We will process your application within next 24 hours. One of our agents will verify any document that you<br /> have uploaded with this application. We will reach you via email or phone if we have any questions.</p>
                                <h2>Please check you inbox in for an update from FinanceThat</h2>
                                <Link to='/'>Back to Home</Link>
                            </div>

                        </div>
                    </div>
                </section>
            {/* </Animated> */}
        </React.Fragment>
    )
}
export default ConfirmPost