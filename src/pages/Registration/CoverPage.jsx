import React, { Component } from 'react'
import DealerRigister from "./dealers/index"
import SignUp from './signUp'
import { Route, Link, Switch } from 'react-router-dom'

const MainPage = (props) => {
    return (<React.Fragment>

    <div className="Addpost-responsiveimg bannerhide-mobile">
     <img className="w-100" src="/assets/image/account-responsive-img.png" alt="" />
     <div className="UserRegister-SignUp-r">
       <h1>Buy, sell and get financing<br /> with a click of a button.</h1>
     </div>
    </div>

        <div className="container-fluid">
            <div className="row">

                <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                    <div className="row">

                        {/* <div className="col-lg-1 col-md-1 col-sm-12 col-12"></div> */}

                        <div className="col-xl-7 col-lg-7 col-md-12 col-sm-12 col-12">
                            <div className="RegisterAccount-Container pl-0">

                                <div className="Select-TopHead">
                                    <h3>Select an account</h3>
                                    <p className="select-para-mobile">If you are a buyer and/or a seller please sign up as Buyer & Seller. If you are a dealership <br />then please sign up as a Dealership.</p>
                                </div>

                                <div className="row aligncenter-mobile">
                                    <Link to={`${props.url}/seller-signup`}>
                                        <div className="SelectCon" >
                                            <div className="ContainerBuyerIcon">
                                                <div className="BuyerSeller">
                                                    <img src="/assets/image/buyer-icon.svg" alt="" />
                                                    <h4>Buyer & Seller</h4>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                    <Link to={`${props.url}/dealer-signup`} onClick={()=> {
                                         localStorage.removeItem("dealer_types_vehicle")
                                         localStorage.removeItem("selected_dealer_type_vehicle")
                                    }}>
                                        <div className="SelectCon" >
                                            <div className="ContainerBuyerIcon">
                                                <div className="BuyerSeller">
                                                    <img src="/assets/image/dealer-icon.svg" alt="" />
                                                    <h4>Dealership</h4>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>

                            </div>
                        </div>

                        <div className="col-lg-5 col-md-5 col-sm-12 col-12 pr-0 Dealer-Mobileimg">
                            <div className="Sec-SelectAccount">
                                <div className="SelectText">
                                    <h1>Buy, sell and get financing<br /> with a click of a button.</h1>
                                </div>
                                <img src="/assets/image/select-img-1.png" />
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    </React.Fragment>)
}
class CoverPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            url: this.props.match.url,
        }
    }
    render() {
        return (
            <React.Fragment>
                <section className="Section-ListandGrid p-0">
                    {<Switch>
                        <Route path={`${this.props.match.url}`}
                            exact
                            name="Cover Page"
                            render={(props) => <MainPage {...this.props} url={this.state.url} />} />
                        <Route path={`${this.props.match.url}/seller-signup`}
                            exact
                            name="Seller Sign Up"
                            render={(props) => <SignUp {...this.props} />} />
                        <Route path={`${this.props.match.url}/dealer-signup`}
                            exact
                            name="Dealer Sign Up"
                            render={(props) => <DealerRigister {...this.props} />} />
                    </Switch>}
                </section>
            </React.Fragment >
        )
    }
}

export default CoverPage