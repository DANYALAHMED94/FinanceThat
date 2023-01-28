import React, { Component } from "react";
import { Link } from "react-router-dom";
class HowItWorks extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <React.Fragment>
        <div className="dealer-how-inner-background how-it-works-background clearfix how-it-works-mobile">
          <div className="dealership-how-container">
            <div className="dealer-colum-left">
              <div className="creative-your-free">
                <h3>
                  We make purchasing &<br /> Financing a seamless
                  <br /> process!
                </h3>
                <h2>
                  Watch our explainer video to see how Finance That works
                  <br /> & why we have the most unique platform for selling,
                  buying
                  <br /> and getting financing.
                </h2>
              </div>
              <div className="register-now-button how-learn-more-button">
                <Link to="/">Learn more</Link>
              </div>
            </div>

            <div className="dealer-colum-right">
              <div className="right-side-img">
                <div className="facebook-responsive">
                  <iframe
                    src="https://www.youtube.com/embed/oF1TyNenVZE"
                    width="560"
                    height="314"
                    scrolling="no"
                    frameborder="0"
                    allowfullscreen="true"
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                    allowFullScreen="true"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="MobileNav">
          <div className="dealer-how-inner-background how-it-works-background clearfix">
            <div className="dealership-how-container">
              <div className="dealer-colum-right">
                <div className="right-side-img">
                  <div className="facebook-responsive">
                    <iframe
                      src="https://www.youtube.com/embed/oF1TyNenVZE"
                      width="560"
                      height="314"
                      scrolling="no"
                      frameborder="0"
                      allowfullscreen="true"
                      allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                      allowFullScreen="true"
                    ></iframe>
                  </div>
                </div>
              </div>

              <div className="dealer-colum-left">
                <div className="creative-your-free">
                  <h3>
                    We make purchasing &<br /> Financing a seamless
                    <br /> process!
                  </h3>
                  <h2>
                    Watch our explainer video to see how Finance That works
                    <br /> & why we have the most unique platform for selling,
                    buying
                    <br /> and getting financing.
                  </h2>
                </div>
                <div className="register-now-button how-learn-more-button">
                  <Link to="/">Learn more</Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="how-it-works-main-container">
          <div className="how-it-works-inner">
            <div className="find-your-dream-vehicle">
              <div className="find-your-left">
                <img src="/assets/image/find-your-dream.svg" alt="" />
              </div>

              <div className="find-your-right">
                <span>1</span>
                <h1>
                  Find your dream Vehicle
                  <span>
                    Choose a vehicle from our marketplace or any third party
                    seller outside of Finance That. All sellers and vehicles
                    listed on our platform have been verified for ownership, are
                    lien-free and sold by the real owners.
                  </span>
                </h1>
              </div>
            </div>

            <div className="find-your-dream-vehicle find-step-two">
              <div className="find-your-left">
                <img src="/assets/image/find-your-dream-2.svg" alt="" />
              </div>

              <div className="find-your-right mt-find-step-two">
                <span>2</span>
                <h1>
                  Apply for financing.
                  <span>
                    When you have picked the vehicle you wish to
                    <br /> purchase, just click on Finance That button to
                    <br /> complete a quick application.
                  </span>
                </h1>
              </div>
            </div>

            <div className="find-your-dream-vehicle find-step-three">
              <div className="find-your-right float-left">
                <span>3</span>
                <h1>
                  Get instant approval.
                  <span>
                    Upon submitting your application, you will instantly
                    <br /> receive a decision based on your credit score and
                    <br /> income. It's that simple!
                  </span>
                </h1>
              </div>

              <div className="find-your-left float-right img-find-step-three">
                <img src="/assets/image/find-your-dream-3.svg" alt="" />
              </div>
            </div>

            <div className="find-your-dream-vehicle find-step-four">
              <div className="find-your-left">
                <img src="/assets/image/find-your-dream-4.svg" alt="" />
              </div>

              <div className="find-your-right mt-find-step-four">
                <span>4</span>
                <h1>
                  Enjoy your vehicle!.
                  <span>
                    E-sign our loan agreement and your vehicle will be
                    <br /> ready for pickup or contactless delivery within 24hrs
                    <br /> – 48hrs.
                  </span>
                </h1>
              </div>
            </div>
          </div>
        </div>

        <div className="we-accept-good-container">
          <div className="timeline-grid">
            <div className="marketplace-with-huge first-one">
              <span>
                <img src="/assets/image/timeline-checkmark.svg" alt="" />
              </span>
              <h4>
                We Accept Good, Bad
                <br /> or no Credit
              </h4>
            </div>
          </div>

          <div className="timeline-grid">
            <div className="marketplace-with-huge first-two">
              <span>
                <img src="/assets/image/timeline-checkmark.svg" alt="" />
              </span>
              <h4>
                Marketplace with huge
                <br /> Powersport Vehicles
              </h4>
            </div>
          </div>

          <div className="timeline-grid">
            <div className="marketplace-with-huge">
              <span>
                <img src="/assets/image/timeline-checkmark.svg" alt="" />
              </span>
              <h4>
                Apply online & get Instant
                <br /> Approvals
              </h4>
            </div>
          </div>

          <div className="timeline-grid">
            <div className="marketplace-with-huge first-four">
              <span>
                <img src="/assets/image/timeline-checkmark.svg" alt="" />
              </span>
              <h4>
                We will finance any year,
                <br /> make & model
              </h4>
            </div>
          </div>

          <div className="timeline-grid">
            <div className="marketplace-with-huge">
              <span>
                <img src="/assets/image/timeline-checkmark.svg" alt="" />
              </span>
              <h4>
                Interest rates Comparable
                <br /> to Major Banks
              </h4>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default HowItWorks;
