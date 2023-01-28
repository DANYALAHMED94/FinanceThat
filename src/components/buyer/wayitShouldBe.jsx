import React, { memo } from "react";
import { Link } from "react-router-dom";

const WayitShouldBe = () => {
  return (
    <>
      <section className="way-it-should">
        <div className="landing-row-wrapper" style={{ width: "100%" }}>
          {" "}
          <h2 className="title"> Why Finance That? </h2>
          <div className="way-it-should-wrapper">
            <div className="image-holder mt-3">
              <div className="facebook-responsive">
              <div dangerouslySetInnerHTML={{ __html: "<iframe className='d-none d-md-block' src='https://www.youtube.com/embed/GV9dFdiczQ8' width='100%' height='100%' style={{ border: 'none', overflow: 'hidden' }} scrolling='no' frameborder='0' allowfullscreen='true'allow='autoplay; clipboard-write; encrypted-media;  picture-in-picture; web-share' allowFullScreen='true'></iframe>"}} />
              {/* <div className="d-none d-md-block" dangerouslySetInnerHTML={{ __html: "<iframe className='d-none d-md-block' src='https://www.youtube.com/embed/GV9dFdiczQ8' width='100%' height='100%' style={{ border: 'none', overflow: 'hidden' }} scrolling='no' frameborder='0' allowfullscreen='true'allow='autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share' allowFullScreen='true'></iframe>"}} />*/}
              </div> 
            </div>
            <div className="way-it-should-content">
              <div className="why-it-should-content-inner">
                <div className="why-it-should-content-main">
                  <h2> Why Finance That? </h2>
                  <ul className="why-fincaethat-listing-outer">
                    <li>
                      <div className="way-it-should-content-box">
                        <span className="icon-holder"></span>
                        <div className="text-box">
                          <h3> Finance new or pre-owned vehicles </h3>
                          <p>
                            {" "}
                            We finance new and used vehicles with amazing
                            interest rates regardless of year, make or model.{" "}
                          </p>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="way-it-should-content-box">
                        <span className="icon-holder"></span>
                        <div className="text-box">
                          <h3> Buy from dealers or private sellers </h3>
                          <p>
                            {" "}
                            Now you can finance any on-road or off-road vehicle
                            from any private seller or dealer of you choosing.{" "}
                          </p>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="way-it-should-content-box">
                        <span className="icon-holder"></span>
                        <div className="text-box">
                          <h3> Unique Marketplace </h3>
                          <p>
                            {" "}
                            Finance That provide a great way of purchasing your
                            dream vehicle with a click of a button.{" "}
                          </p>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="way-it-should-content-box">
                        <span className="icon-holder"></span>
                        <div className="text-box">
                          <h3> Nationwide contactless delivery </h3>
                          <p>
                            {" "}
                            We will get your vehicle delivered nationwide so you
                            are not limited to your local inventory!{" "}
                          </p>
                        </div>
                      </div>
                    </li>
                  </ul>
                  <Link to="/" className="btn btn-primary">
                    {" "}
                    See all{" "}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default memo(WayitShouldBe);
