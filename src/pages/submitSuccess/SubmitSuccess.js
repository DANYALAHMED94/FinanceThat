import React from "react";

export default function SubmitSuccess() {
  return (
    <React.Fragment>
    {/* <Animated animationIn="fadeInUp" animationInDuration={1000} animationOutDuration={1000} animationOut="fadeOutUp" isVisible={true}> */}
        <section class="Section-AddPost">
            <div class="AppSubmit-Container">
                <div class="Conditionapprov-Con">
                    <div class="AppSubmit-Head">
                    <h1 className="mainTitle">Congrats! your application is submitted Successfully!</h1>
                        <img src="/assets/image/shortAppSuccess.svg" alt="" />
                        <div class="clearfix"></div>
                        <p>We have received your application. One of our agents will contact you via email or phone in 24 hours.</p>
                        {/* <h2>Please check you inbox in for an update from FinanceThat</h2>
                        <Link to='/'>Back to Home</Link> */}
                    </div>

                </div>
            </div>
        </section>
    {/* </Animated> */}
</React.Fragment>
  );
}
