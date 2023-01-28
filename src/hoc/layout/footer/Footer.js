import { width } from "dom-helpers";
import React, { memo } from "react";
import { Link } from "react-router-dom";
const Footer = () => {
  // callScript = () => {
  //   var script = document.createElement("script");
  //   script.language = "JavaScript";
  //   script.type = "text/javascript";
  //   script.id = "trustLogoFooter";
  //   script.src = window.TrustLogo("https://www.positivessl.com/images/seals/positivessl_trust_seal_lg_222x54.png", "POSDV", "none");
  //   document.getElementsByTagName("head")[0].appendChild(script);
  // }
  return (
    <>
      {" "}
      <footer className="main-Footer">
        <div className="footer-col first-col">
          <div className="footer-content-col">
            <div className="footer-content-col-inner">
              <h2>
                {" "}
                Buy, sell and <span> get financing </span> with a click of a
                button!{" "}
              </h2>
              <p>
                {" "}
                Finance That is Canada's first peer-to-peer automotive and
                powersport marketplace that connects buyers with sellers and
                provide on spot financing.{" "}
              </p>
              <div className="Contact-fLinks clearfix">
                <ul className="clearfix">
                  <li>
                    <i className="icon-iphone"></i> 1-844-354-5454
                  </li>
                  <li>
                    <a href="mailto:info@financethat.ca">
                      <i className="icon-email footerEmail"></i>{" "}
                      info@financethat.ca
                    </a>
                  </li>
                </ul>
              </div>
              <div className="SocialMedia-Icon clearfix">
                <ul className="clearfix">
                  <li className="social-fb">
                    <a
                      href="https://www.facebook.com/financethat"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fa fa-facebook-f"></i>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.instagram.com/financethat/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="icon-instagram"></i>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://twitter.com/Financethatca"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="icon-twitter"></i>
                    </a>
                  </li>
                  <li>
                    <div>
                      <a
                        href="https://www.trustpilot.com/review/financethat.ca"
                        target="_blank"
                        rel="noopener"
                        className="trustPilotDiv"
                      >
                        <img
                          src="/assets/image/trustPilotLogo.svg"
                          alt="logo"
                          className="trustPilotLogo"
                          style={{ width: "100%" }}
                        />
                      </a>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="footer-bottom-links">
                <ul>
                  <li>
                    {" "}
                    <Link to="#">
                      {" "}
                      <img src="/assets/image/sectigo-logo.png" alt="" />{" "}
                    </Link>{" "}
                  </li>
                  <li>
                    {" "}
                    <Link to="#">
                      {" "}
                      <img src="/assets/image/bbb-logo.png" alt="" />{" "}
                    </Link>{" "}
                  </li>
                  <li>
                    {" "}
                    <Link to="#">
                      {" "}
                      <img
                        src="https://www.positivessl.com/images/seals/positivessl_trust_seal_lg_222x54.png"
                        alt=""
                      />{" "}
                    </Link>{" "}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-col second-col">
          <div className="footer-content-col">
            <div className="footer-content-col-inner">
              <Link to="/">
                <img src="/assets/image/finance-that-logo-footer.svg" alt="" />
              </Link>
              <p>
                {" "}
                Finance That provides one stop shop for all your powersport and
                automotive buying, selling and financing needs under the same
                roof.{" "}
              </p>
              <div className="row">
                <div className="col-md-3 col-6">
                  <h4> Marketplace </h4>
                  <ul className="footer-routes">
                    <li>
                      <Link to="/seller/add-post">Post an ad</Link>
                    </li>
                    <li>
                      <Link to="/applynow/1">Get financing</Link>
                    </li>
                    <li>
                      <Link to="/Ad-post/list">Search a vehicle</Link>
                    </li>
                    <li>
                      <Link to="how-it-works">How it works</Link>
                    </li>
                  </ul>
                </div>
                <div className="col-md-3 col-6">
                  <h4> Vehicles </h4>
                  <ul className="footer-routes">
                    <li>
                      <Link to="/Ad-post/list">Featured listings</Link>
                    </li>
                    <li>
                      <Link
                        to={{
                          pathname: "/Ad-post/list",
                          query: {
                            location: "",
                            color: "",
                            fromKilometer: "",
                            fromRange: "$10,000",
                            fromYear: "",
                            makeFilterName: "",
                            modalFilterName: "",
                            category: "",
                            latitude: "",
                            longitude: "",
                            sortBy: "",
                          },
                        }}
                      >
                        Under $10,000
                      </Link>
                    </li>
                    <li>
                      <Link
                        to={{
                          pathname: "/Ad-post/list",
                          query: {
                            location: "",
                            color: "",
                            fromKilometer: "",
                            fromRange: "",
                            fromYear: "",
                            makeFilterName: "",
                            modalFilterName: "",
                            category: "",
                            latitude: "",
                            longitude: "",
                            sortBy: "listings_newest",
                          },
                        }}
                      >
                        Newly listed
                      </Link>
                    </li>
                    <li>
                      <Link
                        to={{
                          pathname: "/Ad-post/list",
                          query: {
                            location: "",
                            color: "",
                            fromKilometer: "",
                            fromRange: "",
                            fromYear: "",
                            makeFilterName: "",
                            modalFilterName: "",
                            category: "",
                            latitude: "",
                            longitude: "",
                            sortBy: "price_lowest_first",
                          },
                        }}
                      >
                        Reduced price
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="col-md-3 col-6">
                  <h4> Dealers </h4>
                  <ul className="footer-routes">
                    <li>
                      <Link to="/register/dealer-signup">Become a dealer</Link>
                    </li>
                    <li>
                      <Link to="/dealer-how-it-work">How it works</Link>
                    </li>
                    <li>
                      <Link to="/buyer/my-ads">My Dashboard</Link>
                    </li>
                    <li>
                      <Link to="/seller/add-post">Post an ad</Link>
                    </li>
                  </ul>
                </div>

                <div className="col-md-3 col-6">
                  <h4> Finance That </h4>
                  <ul className="footer-routes">
                    <li>
                      <Link to="/about-us">About us</Link>
                    </li>
                    <li>
                      <Link to="/contact-us">Contact Us</Link>
                    </li>
                    <li>
                      <Link to="/privacy">Privacy Policy</Link>
                    </li>
                    <li>
                      <Link to="/terms">Terms & Conditions</Link>
                    </li>
                  </ul>
                </div>
              </div>
              <p className="bottom-para">
                {" "}
                Want to speak with a live agent? You can either start a live
                chat, call customer service at{" "}
                <span style={{ whiteSpace: "nowrap" }}>
                  {" "}
                  1-844-354-5454{" "}
                </span>{" "}
                or email us at info@financethat.ca{" "}
              </p>
              <span className="copyrights">
                {" "}
                {new Date().getFullYear()} © Finance That. All Rights Reserved.{" "}
              </span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};
export default memo(Footer);
