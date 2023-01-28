import React, { Component } from 'react'
import { Helmet } from 'react-helmet';

class DealerCover extends Component {
    render() {
        return (<React.Fragment>
            {/* <section className="Section-ListandGrid p-0"> */}
            <Helmet>
                <title>Dealer - Registration</title>
            </Helmet>
            <div className="Addpost-responsiveimg bannerhide-mobile">
                <img className="w-100" src="/assets/image/dealer-responsive-img.png" alt="" />
            </div>

            <div className="container-fluid">
                <div className="row">

                    <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                        <div className="row">
                            <div className="col-xl-7 col-lg-7 col-md-12 col-sm-12 col-12">
                                <div className="RegisterAccount-Container">

                                    <div className="Select-TopHead">
                                        <h3>Dealership Type</h3>
                                        <p>Please select the type of dealership. If you sell both recreational and automotive, then
                                        <br /> please select automotive. The registration is quick and only requires a few steps.</p>

                                    </div>

                                    <div className="row aligncenter-mobile">

                                        <div className="# w-auto" onClick={() => this.props.change_dealer_type(0)}>
                                            <div className="ContainerBuyerIcon">
                                                <div className="BuyerSeller">
                                                    <img src="/assets/image/recreational-icon.svg" alt="recreational" />
                                                    <h4>Recreational</h4>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="# w-auto" onClick={() => this.props.change_dealer_type(1)}>
                                            <div className="ContainerBuyerIcon">
                                                <div className="BuyerSeller">
                                                    <img src="/assets/image/automotive-icon.svg" alt="automotive" />
                                                    <h4>Automotive & Recreational</h4>
                                                </div>
                                            </div>
                                        </div>

                                    </div>

                                </div>
                            </div>

                            <div className="col-lg-5 col-md-5 col-sm-12 col-12 pr-0 Dealer-Mobileimg">
                                <div className="Sec-SelectAccount">

                                    <img src="/assets/image/dealer-img-1.png" alt="Dealer Pic" />
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
            {/* </section> */}


        </React.Fragment>)
    }
}

export default DealerCover