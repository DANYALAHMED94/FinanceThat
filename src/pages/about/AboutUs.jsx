import React, { Component } from 'react'
import { Helmet } from 'react-helmet';

class AboutUs extends Component {
    constructor(props) {
        super(props)
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
                <Helmet>
                    <title>About us – Finance That – We are an automotive and powersports marketplace that help buyers with instant financing online.</title>
                    <meta name="description" content="Finance That is a one of a kind marketplace that connects buyers with sellers and provide financing options for any vehicle listed on our platform or outside with a click of a button." />
                </Helmet>
                <section class="SecAboutUs-Banner">
                    <div class="container-fluid d-none d-sm-block">
                        <div class="row">

                            <div class="col-xl-1 col-lg-0 col-md-0 col-sm-12 col-12"></div>

                            <div class="col-xl-10 col-lg-12 col-md-12 col-sm-12 col-12">
                                <div class="row">

                                    <div class="col-xl-7 col-lg-7 col-md-7 col-sm-12 col-12">
                                        <div class="AboutUs-HeadLeft">
                                            <h1>Buy, sell and get financing with<br /> a click of a button!</h1>
                                            <p>Finance That is a one of a kind marketplace that connects buyers<br /> with sellers and provide financing options for any vehicle listed on<br /> our platform or outside with a click of a button.</p>
                                        </div>
                                    </div>

                                    <div class="col-xl-5 col-lg-5 col-md-5 col-sm-12 col-12">
                                        <div class="AboutUs-HeadRight">
                                            <img src="/assets/image/about-img.png" alt="" />
                                        </div>
                                    </div>

                                </div>
                            </div>

                            <div class="col-xl-1 col-lg-0 col-md-0 col-sm-12 col-12"></div>

                        </div>
                    </div>



                    <div class="container-fluid d-block d-sm-none">
                     <div class="row">

                     <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 pr-0 pl-0">
                      <div class="AboutUs-HeadRight">
                        <img src="/assets/image/about-img-responsive.png" alt="" />
                      </div>
                     </div>

                     <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                        
                      <div class="AboutUs-HeadLeft">
                        <h1>Buy, sell and get financing with<br /> a click of a button!</h1>
                        <p>Finance That is a one of a kind marketplace that connects buyers<br /> with sellers and provide financing options for any vehicle listed on<br /> our platform or outside with a click of a button.</p>
                      </div>
                      
                     </div>

                     </div>
                    </div>




                </section>


                <section class="FinanceThat-About">
                    <div class="container-fluid">
                        <div class="row">

                            <div class="col-xl-5 col-lg-5 col-md-4 col-sm-12 col-12 offset-1">
                                <div class="FinanceThatLeft">
                                    <img src="/assets/image/about-img-1.png" width="564" height="591" alt="" />
                                </div>
                            </div>

                            <div class="col-xl-5 col-lg-5 col-md-8 col-sm-12 col-12">
                                <div class="FinanceThatRight">
                                    <h1>Finance That is proudly Canadian and was founded in 2017. The idea is to offer Canadian buyers, dealerships, and private sellers an easy to use marketplace with a very powerful financing engine. Our marketplace offers buyers peace of mind knowing that all our sellers and vehicles have been verified.</h1>
                                    <p>Our team has many years of experience in finance, technology & credit. We are passionate about connecting sellers and dealerships with buyers in a hassle-free way. Our Instant Financing is a one of a kind feature that helps buyer & seller with an enjoyable online purchasing experience.</p>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>


                <section class="Sec-AboutUsIcon">
                    <div class="container-fluid">
                        <div class="row">

                            <div class="col-xl-2 col-lg-1 col-md-0 col-sm-12 col-12"></div>

                            <div class="col-xl-8 col-lg-10 col-md-12 col-sm-12 col-12">
                                <div class="row">

                                    <div class="col-md-3">

                                        <div class="AboutIcon-Container">
                                            <div class="AboutInner">
                                                <img src="/assets/image/Canada-icon.svg" alt="" />
                                            </div>
                                            <h1>Proudly Canadian</h1>
                                        </div>

                                    </div>

                                    <div class="col-md-3">

                                        <div class="AboutIcon-Container">
                                            <div class="AboutInner">
                                                <img src="/assets/image/padlock-icon.svg" alt="" />
                                            </div>
                                            <h1>Secure & Protected</h1>
                                        </div>

                                    </div>

                                    <div class="col-md-3">

                                        <div class="AboutIcon-Container">
                                            <div class="AboutInner">
                                                <img src="/assets/image/money-bk-icon.svg" alt="" />
                                            </div>
                                            <h1>Instant Approval</h1>
                                        </div>

                                    </div>

                                    <div class="col-md-3">

                                        <div class="AboutIcon-Container">
                                            <div class="AboutInner">
                                                <img src="/assets/image/credit-card.svg" alt="" />
                                            </div>
                                            <h1>Good or Bad Credit</h1>
                                        </div>

                                    </div>

                                </div>
                            </div>

                            <div class="col-xl-2 col-lg-1 col-md-0 col-sm-12 col-12"></div>

                        </div>
                    </div>
                </section>

            </React.Fragment>
        )
    }
}

export default AboutUs