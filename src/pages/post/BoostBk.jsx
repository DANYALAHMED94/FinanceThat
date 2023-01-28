import React from 'react'
import NumberFormat from 'react-number-format';
import { Animated } from "react-animated-css";

const Boost = props => {
    /**
      *
      *
      * Card Date
      *
      *
      */
    const limit = (val, max) => {
        if (val.length === 1 && val[0] > max[0]) {
            val = '0' + val;
        }

        if (val.length === 2) {
            if (Number(val) === 0) {
                val = '01';

                //this can happen when user paste number
            } else if (val > max) {
                val = max;
            }
        }

        return val;
    }
    return (
        <React.Fragment>
            { props.stepBoost === 1 ? (
                <React.Fragment>
                    <Animated animationIn="slideInUp" animationInDuration={1000} animationOutDuration={1000} animationOut="slideOutUp" isVisible={true}>
                        <div className="AdPostSec-twelve">
                            <div className="VehicleForm-Head">
                                <label>Boost your Ad</label>
                            </div>
                            <div className="AdBoost-Container">
                                <div className="TableBoost">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th></th>
                                                <td>
                                                    <div className="addDuration-Head">
                                                        <h1>Ad Duration</h1>
                                                        <p>
                                                            Your ad is listed for 14 days
                                </p>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="addDuration-Head">
                                                        <h1>Photos</h1>
                                                        <p>Upto 10 Photos for your ad</p>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="addDuration-Head">
                                                        <h1>Top Ad</h1>
                                                        <p>
                                                            Ad is on rotation on the top of
                                                            the Search Result Page
                                </p>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="addDuration-Head">
                                                        <h1>Homepage Ads</h1>
                                                        <p>
                                                            Your ad is Promoted on the
                                                            Homepage in Rotation
                                </p>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="addDuration-Head">
                                                        <h1>Bump Up</h1>
                                                        <p>
                                                            Your ad is Bumped to top
                                                            Position every week
                                </p>
                                                    </div>
                                                </td>
                                                <td colSpan="2">
                                                    <div className="addDuration-Head addDuration-last-Head">
                                                        <h1>Social Media Ads</h1>
                                                        <p>
                                                            Your ad is Promoted on Various
                                                            Social Media Platfroms
                                </p>
                                                    </div></td>

                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <th className="headone">
                                                    Free
                                    </th>

                                                <td>
                                                    <div className="ad-durationBtn">
                                                        <img
                                                            src="/assets/image/adgood-icon.svg"
                                                            alt=""
                                                        />
                                                    </div>
                                                </td>

                                                <td>
                                                    <div className="ad-durationBtn">
                                                        <img
                                                            src="/assets/image/adgood-icon.svg"
                                                            alt=""
                                                        />
                                                    </div>
                                                </td>

                                                <td>
                                                    <div className="adcross-Btn">
                                                        <img
                                                            src="/assets/image/ad-cross-icon.svg"
                                                            alt=""
                                                        />
                                                    </div>
                                                </td>

                                                <td>
                                                    <div className="adcross-Btn">
                                                        <img
                                                            src="/assets/image/ad-cross-icon.svg"
                                                            alt=""
                                                        />
                                                    </div>
                                                </td>

                                                <td>
                                                    <div className="adcross-Btn">
                                                        <img
                                                            src="/assets/image/ad-cross-icon.svg"
                                                            alt=""
                                                        />
                                                    </div>
                                                </td>

                                                <td>
                                                    <div className="adcross-Btn">
                                                        <img
                                                            src="/assets/image/ad-cross-icon.svg"
                                                            alt=""
                                                        />
                                                    </div>
                                                </td>

                                                <td>
                                                    <div className="SelectedBtn">
                                                        <a className={props.selectedBoost === 'free' ? "active" : ''}
                                                            onClick={() =>
                                                                props.handleOnClickBoost(
                                                                    "selectedBoost",
                                                                    "free",
                                                                    2,
                                                                    6.66
                                                                )
                                                            }
                                                        >
                                                            Select
                                        </a>
                                                    </div>
                                                </td>
                                            </tr>

                                            <tr>
                                                <th className="headone">
                                                    STANDARD
                                         <span>$9.99</span>
                                                </th>

                                                <td>
                                                    <div className="ad-durationBtn pb-0">
                                                        <img
                                                            src="/assets/image/adgood-icon.svg"
                                                            alt=""
                                                        />
                                                    </div>
                                                </td>

                                                <td>
                                                    <div className="ad-durationBtn pb-0">
                                                        <img
                                                            src="/assets/image/adgood-icon.svg"
                                                            alt=""
                                                        />
                                                    </div>
                                                </td>

                                                <td>
                                                    <div className="adcross-Btn pb-0">
                                                        <img
                                                            src="/assets/image/ad-cross-icon.svg"
                                                            alt=""
                                                        />
                                                    </div>
                                                </td>

                                                <td>
                                                    <div className="adcross-Btn pb-0">
                                                        <img
                                                            src="/assets/image/ad-cross-icon.svg"
                                                            alt=""
                                                        />
                                                    </div>
                                                </td>

                                                <td>
                                                    <div className="adcross-Btn pb-0">
                                                        <img
                                                            src="/assets/image/ad-cross-icon.svg"
                                                            alt=""
                                                        />
                                                    </div>
                                                </td>

                                                <td>
                                                    <div className="adcross-Btn pb-0">
                                                        <img
                                                            src="/assets/image/ad-cross-icon.svg"
                                                            alt=""
                                                        />
                                                    </div>
                                                </td>

                                                <td>
                                                    <div className="SelectedBtn pb-0">
                                                        <a className={props.selectedBoost === 'standard' ? "active" : ''}
                                                            onClick={() =>
                                                                props.handleOnClickBoost(
                                                                    "selectedBoost",
                                                                    "standard",
                                                                    2,
                                                                    6.66
                                                                )
                                                            }
                                                        >
                                                            {" "}
                                            Select
                                        </a>
                                                    </div>
                                                </td>
                                            </tr>

                                            <tr>
                                                <th className="headone">
                                                    PREMIUM
                                         <span>$14.99</span>
                                                </th>

                                                <td>
                                                    <div className="ad-durationBtn pb-0">
                                                        <img
                                                            src="/assets/image/adgood-icon.svg"
                                                            alt=""
                                                        />
                                                    </div>
                                                </td>

                                                <td>
                                                    <div className="ad-durationBtn pb-0">
                                                        <img
                                                            src="/assets/image/adgood-icon.svg"
                                                            alt=""
                                                        />
                                                    </div>
                                                </td>

                                                <td>
                                                    <div className="ad-durationBtn pb-0">
                                                        <img
                                                            src="/assets/image/adgood-icon.svg"
                                                            alt=""
                                                        />
                                                    </div>
                                                </td>

                                                <td>
                                                    <div className="ad-durationBtn pb-0">
                                                        <img
                                                            src="/assets/image/adgood-icon.svg"
                                                            alt=""
                                                        />
                                                    </div>
                                                </td>

                                                <td>
                                                    <div className="ad-durationBtn pb-0">
                                                        <img
                                                            src="/assets/image/adgood-icon.svg"
                                                            alt=""
                                                        />
                                                    </div>
                                                </td>

                                                <td>
                                                    <div className="ad-durationBtn pb-0">
                                                        <img
                                                            src="/assets/image/adgood-icon.svg"
                                                            alt=""
                                                        />
                                                    </div>
                                                </td>

                                                <td>
                                                    <div className="SelectedBtn pb-0">
                                                        <a className={props.selectedBoost === 'premium' ? "active" : ''}
                                                            onClick={() =>
                                                                props.handleOnClickBoost(
                                                                    "selectedBoost",
                                                                    "premium",
                                                                    2,
                                                                    6.66
                                                                )
                                                            }
                                                        >
                                                            Select
                                        </a>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-xl-12'>
                                    <div className="SecSeven-Btn previous-btn float-left">
                                        <button className="mt-5"
                                            type="button"
                                            onClick={() => props.changeStepButton(20, 4, 3, -20)}
                                        >
                                            <i className="fa fa-angle-left"></i>
                                    Previous{" "}
                                        </button>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </Animated>
                </React.Fragment>
            ) : props.stepBoost === 2 ? (
                <React.Fragment>
                    <Animated animationIn="slideInUp" animationInDuration={1000} animationOutDuration={1000} animationOut="slideOutUp" isVisible={true}>
                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                            <div className="AdPostSec-Thirteen">


                                <div className="PaymentMethod-Container">
                                    <div className="VehicleForm-Head">
                                        <label>Payment Method</label>
                                    </div>
                                    <div className="row">
                                        <div className="col-xl-5 col-lg-6 col-md-6 col-sm-12 col-12">
                                            <div className="MethodBtn-Third payment-method-pr">
                                                <div className="paymentback">
                                                    <label className="MethodRadio-Btn">
                                                        <img
                                                            src="/assets/image/paypal-icon.svg"
                                                            alt=""
                                                        />
                                                        <input
                                                            type="radio"
                                                            name="checkPayment"
                                                            id="checkPayment"
                                                            onChange={
                                                                props.handleOnChange
                                                            }
                                                            value="pay_pal"
                                                        />
                                                        <span className="MethodCheck"></span>
                                                    </label>
                                                </div>

                                                <div className="paymentback">
                                                    <label className="MethodRadio-Btn">
                                                        Credit card
                                                  <input
                                                            type="radio"
                                                            name="checkPayment"
                                                            id="checkPayment"
                                                            onChange={
                                                                props.handleOnChange
                                                            }
                                                            value="credit_card"
                                                        />
                                                        <span className="MethodCheck"></span>
                                                    </label>
                                                </div>

                                                <div className="row">
                                                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">

                                                        <div className="CardNumber-Form mt-4">
                                                            <label>Card Number</label>

                                                            <NumberFormat value={props.cardNumber} format="#### #### #### ####" placeholder="0000 0000 0000 0000" name='cardNumber' onValueChange={(values) => {
                                                                const { formattedValue, value } = values;
                                                                // formattedValue = $2,223
                                                                // value ie, 2223
                                                                props.changeCardValues('cardNumber', value)
                                                                // this.setState({ cardNumber: value })
                                                            }} />
                                                            <img
                                                                src="/assets/image/atm-card-icon.svg"
                                                                alt="ATM Card"
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                                        <div className="CardNumber-Form">
                                                            <label>Expiry Date</label>
                                                            <NumberFormat value={props.cardExpirDate} format="##/##" placeholder="MM/YY" mask={['M', 'M', 'Y', 'Y']} name='cardExpirDate'
                                                                onValueChange={(values) => {
                                                                    const { formattedValue, value } = values;
                                                                    let month = limit(value.substring(0, 2), '12');
                                                                    let year = value.substring(2, 4);
                                                                    const expirDate = month + year
                                                                    props.changeCardValues('cardExpirDate', expirDate)
                                                                    // this.setState({ cardExpirDate: expirDate })
                                                                }}
                                                            />
                                                            <img
                                                                src="/assets/image/post-calendar-icon.svg"
                                                                style={{ top: "54px" }}
                                                                alt="Calendar"
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                                        <div className="CardNumber-Form">
                                                            <label>CVC/CVV</label>
                                                            <NumberFormat value={props.cardCVC} format="###" placeholder="***" name='cardCVC' onValueChange={(values) => {
                                                                const { formattedValue, value } = values;
                                                                props.changeCardValues('cardCVC', value)
                                                                // this.setState({ cardCVC: value })
                                                            }} />
                                                            <img
                                                                src="/assets/image/Union-Lock.svg"
                                                                style={{ top: "54px" }}
                                                                alt="Union Lock"
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                        <div className="ExpiryUnlock">
                                                            <img
                                                                src="/assets/image/cardlock-union.svg"
                                                                alt="Card Lock"
                                                            />
                                                            <h1>
                                                                Your Transaction is
                                                                secured with SSL
                                                                Encryption
                                                    </h1>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-xl-5 col-lg-5 col-md-5 col-sm-12 col-12">
                                            <div className="AddSummary-Head">
                                                <h6>Summary</h6>
                                            </div>

                                            <div className="Add-SummaryContainer">
                                                <div className="PremiumList">
                                                    <h1>
                                                        {props.selectedBoost == 'free' ? "Free Listing" : props.selectedBoost == 'standard' ? "Standard Listing" : props.selectedBoost == 'premium' ? "Premium Listing" : "Free Listing"}
                                                        <span>$14.99</span>
                                                    </h1>
                                                    <p>
                                                        14 Days - 10 Photos - Top Ads
                                                  <br />
                                                  Homepage Ads - Bump Up -
                                                  Social Media Ads
                                                </p>
                                                </div>

                                                <div className="PremiumList">
                                                    <h1>
                                                        Tax <span>$1.95</span>
                                                    </h1>
                                                    <p>13% HST</p>
                                                </div>

                                                <div className="PremiumList">
                                                    <h1>
                                                        Total (CAD){" "}
                                                        <span>$16.90</span>
                                                    </h1>
                                                    <p>Ad will expire in 14 days</p>
                                                </div>

                                                <div className="TotalContinue-Btn">
                                                    <button
                                                        type="button"
                                                        onClick={() => props.changeBoost(3, 6.66)}
                                                    >
                                                        Continue
                                                </button>
                                                    <p>
                                                        You will not be charged until
                                                        you post ad.
                                                </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12"></div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-xl-12'>
                                            <div className="SecSeven-Btn previous-btn float-left">
                                                <button className="mt-5"
                                                    type="button"
                                                    onClick={() => props.changeBoost(1, -6.66)}
                                                >
                                                    <i className="fa fa-angle-left"></i>
                                                Previous{" "}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Animated>
                </React.Fragment>
            ) : props.stepBoost === 3 ? (
                <React.Fragment>
                    <Animated animationIn="slideInUp" animationInDuration={1000} animationOutDuration={1000} animationOut="slideOutUp" isVisible={true}>
                        <div className="AdPost-SecOne">
                            <div className="row">
                                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                    <div className="AddFinalize-Container">
                                        <div className="AddFinalize-Head">
                                            <h1>Finalize your ad</h1>
                                        </div>

                                        <div className="Finalize-CardDetail">
                                            <div className="CardDetail-Left">
                                                <h1>Car Details</h1>
                                                <p>
                                                    Mileage and basic information
                                              </p>
                                            </div>

                                            <div className="CardDetail-Right">
                                                <button type="button" onClick={() => props.editPost(1, 1, 10, 0)}>
                                                    <img
                                                        src="/assets/image/post-edit-icon.svg"
                                                        alt="Edit"
                                                    />
                                                Edit
                                              </button>
                                            </div>
                                        </div>

                                        <div className="Finalize-CardDetail">
                                            <div className="CardDetail-Left">
                                                <h1>Car Features</h1>
                                                <p>
                                                    Comfort, Entertainment, Extras
                                              </p>
                                            </div>

                                            <div className="CardDetail-Right">
                                                <button type="button" onClick={() => props.editPost(1, 17, 17, 20)}>
                                                    <img
                                                        src="/assets/image/post-edit-icon.svg"
                                                        alt="Edit"
                                                    />{" "}
                                                Edit
                                              </button>
                                            </div>
                                        </div>

                                        <div className="Finalize-CardDetail">
                                            <div className="CardDetail-Left">
                                                <h1>Ad Details</h1>
                                                <p>Image, Description, Price</p>
                                            </div>

                                            <div className="CardDetail-Right">
                                                <button type="button" onClick={() => props.editPost(2, 18, 4, 20)}>
                                                    <img
                                                        src="/assets/image/post-edit-icon.svg"
                                                        alt="Edit"
                                                    />{" "}
                                                Edit
                                              </button>
                                            </div>
                                        </div>

                                        <div className="Finalize-CardDetail">
                                            <div className="CardDetail-Left">
                                                <h1>Contact</h1>
                                                <p>Location and Phone Number</p>
                                            </div>

                                            <div className="CardDetail-Right">
                                                <button type="button" onClick={() => props.editPost(3, 19, 4, 40)}>
                                                    <img
                                                        src="/assets/image/post-edit-icon.svg"
                                                        alt="Edit"
                                                    />{" "}
                                                Edit
                                              </button>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                                <div className="FinalizePre-Btn discard-btn">
                                                    <button
                                                        className="active"
                                                        type="button"
                                                        onClick={props.discardState}
                                                    >
                                                        Discard
                                                </button>
                                                </div>
                                            </div>

                                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                                <div className="FinalizePre-Btn float-right">
                                                    <button type="button" onClick={props.submitAdPost} disabled={props.isLoading}>
                                                        Post Ad
                                                </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Animated>
                </React.Fragment>
            ) : null}
        </React.Fragment>
    )
}
export default Boost