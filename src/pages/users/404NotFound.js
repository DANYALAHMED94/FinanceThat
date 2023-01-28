import React from "react";
import { Link } from "react-router-dom";
import "../../assets/css/404page.css";
import Footer from "../../hoc/layout/footer/Footer";
export default function PageNotFound404(props) {
    return (
        <>
            <div className="col-xl-9 col-lg-9 col-md-7 col-sm-12 col-12">
                <div className="UserProfile-Container user-profile-container">
                    <div className="pageNotFound">
                        <div className="mainDiv">
                            <div className="d-block d-md-none"></div>
                            <div>
                                <img src="/assets/image/404page.svg" alt="404page"></img>
                                <h1>Sorry, we couldn't find that page</h1>
                                <h5>
                                    Most likely the page has been removed or there was a typo in the
                                    link.
                                </h5>
                            </div>

                            <Link to="/buyer/user-profile" onClick={() => props.onChangeTab('user-profile')}>
                                <button className="primaryButton">Go to Homepage</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
