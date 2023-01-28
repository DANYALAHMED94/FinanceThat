import React, { Component } from 'react'
import DealerRigister from "./dealers/index"
import SignUp from './signUp'

class CoverPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user_type: ''

        }
    }
    change_user_type = e => {
        this.setState({
            ...this.state,
            user_type: e
        })
    }
    render() {
        return (
            <React.Fragment>
                <section className="Section-ListandGrid p-0">
                    {this.state.user_type === '' ? (<React.Fragment><div className="Addpost-responsiveimg bannerhide-mobile">
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
                                                    <p>If you are a buyer and/or a seller please sign up as Buyer & Seller. If you are a dealership <br />then please sign up as a Dealership.</p>
                                                </div>

                                                <div className="">

                                                    <div className="SelectCon" onClick={() => this.change_user_type(1)}>
                                                        <div className="ContainerBuyerIcon">
                                                            <div className="BuyerSeller">
                                                                <img src="/assets/image/buyer-icon.svg" alt="" />
                                                                <h4>Buyer & Seller</h4>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="SelectCon" onClick={() => this.change_user_type(2)}>
                                                        <div className="ContainerBuyerIcon">
                                                            <div className="BuyerSeller">
                                                                <img src="/assets/image/dealer-icon.svg" alt="" />
                                                                <h4>Dealership</h4>
                                                            </div>
                                                        </div>
                                                    </div>

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
                    </React.Fragment>
                    ) : Number(this.state.user_type) === 2 ? (
                        <DealerRigister user_type={this.state.user_type} />
                    ) : (<SignUp user_type={this.state.user_type} />)}

                </section>
            </React.Fragment>
        )
    }
}

export default CoverPage

// import React, { Component } from 'react'
// import DealerRigister from "./dealers/index"
// import SignUp from './signUp'

// class CoverPage extends Component {
//     constructor(props) {
//         super(props)
//         this.state = {
//             user_type: ''

//         }
//     }
//     change_user_type = e => {
//         this.setState({
//             ...this.state,
//             user_type: e
//         })
//     }
//     render() {
//         if (this.state.user_type == '') {
//             return (
//                 <React.Fragment>
//                     <section className="Section-ListandGrid p-0">

//                         <div className="Addpost-responsiveimg bannerhide-mobile">
//                           <img className="w-100" src="/assets/image/account-responsive-img.png" alt="" />
//                           <div className="UserRegister-SignUp-r">
//                             <h1>Buy, sell and get financing<br /> with a click of a button.</h1>
//                           </div>
//                         </div>

//                         <div className="container-fluid">
//                             <div className="row">

//                                 <div className="col-lg-12 col-md-12 col-sm-12 col-12">
//                                     <div className="row">

//                                         {/* <div className="col-lg-1 col-md-1 col-sm-12 col-12"></div> */}

//                                         <div className="col-xl-7 col-lg-7 col-md-12 col-sm-12 col-12">
//                                             <div className="RegisterAccount-Container pl-0">

//                                                 <div className="Select-TopHead">
//                                                     <h3>Select an account</h3>
//                                                     <p>If you are a buyer and/or a seller please sign up as Buyer & Seller. If you are a dealership <br />then please sign up as a Dealership.</p>
//                                                 </div>

//                                                 <div className="row aligncenter-mobile">

//                                                     <div className="SelectCon" onClick={() => this.change_user_type(1)}>
//                                                         <div className="ContainerBuyerIcon">
//                                                             <div className="BuyerSeller">
//                                                                 <img src="/assets/image/buyer-icon.svg" alt="" />
//                                                                 <h4>Buyer & Seller</h4>
//                                                             </div>
//                                                         </div>
//                                                     </div>

//                                                     <div className="SelectCon" onClick={() => this.change_user_type(2)}>
//                                                         <div className="ContainerBuyerIcon">
//                                                             <div className="BuyerSeller">
//                                                                 <img src="/assets/image/dealer-icon.svg" alt="" />
//                                                                 <h4>Dealership</h4>
//                                                             </div>
//                                                         </div>
//                                                     </div>

//                                                 </div>

//                                             </div>
//                                         </div>

//                                         <div className="col-lg-5 col-md-5 col-sm-12 col-12 pr-0 Dealer-Mobileimg">
//                                             <div className="Sec-SelectAccount">
//                                                 <div className="SelectText">
//                                                     <h1>Buy, sell and get financing<br /> with a click of a button.</h1>
//                                                 </div>
//                                                 <img src="/assets/image/select-img-1.png" />
//                                             </div>
//                                         </div>

//                                     </div>
//                                 </div>

//                             </div>
//                         </div>
//                     </section>
//                 </React.Fragment>
//             )
//         } else if (this.state.user_type == 2) {
//             return (<DealerRigister user_type={this.state.user_type} />)
//         } else {
//             return (<SignUp user_type={this.state.user_type} />)
//         }

//     }
// }

// export default CoverPage