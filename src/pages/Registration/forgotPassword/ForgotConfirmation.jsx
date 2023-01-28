import React, { Component } from "react";
import { Link } from 'react-router-dom'

class ForgotConfirmation extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    componentDidMount() {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }

    render() {
        return (

            <React.Fragment>
                <section className="Section-ListandGrid pt-0">
                    <div className="Addpost-responsiveimg bannerhide-mobile">
                        <img className="w-100" src="/assets/image/forget-pass-responsive-image.png" alt="" />
                        <div className="UserRegister-SignUp-r">
                            <h1>Buy, sell and get financing<br /> with a click of a button.</h1>
                        </div>
                    </div>

                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                                <div className="row">
                                    <div className="col-xl-7 col-lg-7 col-md-12 col-sm-12 col-12">
                                        
                                     <div className="forgot-confirmation-container">
                                      <div className="confirmation-inner">
                                       <img src="/assets/image/check-your-email.svg" alt="" />
                                       <h1>Check your mail</h1>
                                       <p>We have sent a password recover instructions to your email.</p>
                                      </div>
                                     </div>

                                    </div>

                                    <div className="col-lg-5 col-md-5 col-sm-12 col-12 pr-0 Dealer-Mobileimg">

                                        <div className="Sec-SelectAccount">
                                            <div className="SelectText">
                                                <h1>Buy, sell and get financing<br /> with a click of a button.</h1>
                                            </div>
                                            <img src="/assets/image/forget-pass-img.png" alt="" />
                                        </div>

                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </React.Fragment >
        )
    }
}

export default (ForgotConfirmation);
