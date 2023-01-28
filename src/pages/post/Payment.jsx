import React, { useRef, useEffect, useState } from 'react'
import NumberFormat from 'react-number-format';
import { Animated } from "react-animated-css";
import {
    useStripe,
    useElements,
    CardNumberElement,
    CardCvcElement,
    CardExpiryElement,
} from "@stripe/react-stripe-js";
import simpleAxios from '../../_helpers/axios'
import PayPal from './PayPal'
const Payment = props => {

    /**
     *  
     * Stripe Payment
     */
    const stripe = useStripe();
    const elements = useElements();


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

    const handleChange = (event) => {
        if (event.error !== undefined) {
            props.setCardError(event.elementType, event.error.message)
            // setError(`Payment failed ${payload.error.message}`);
        } else {
            props.setCardError(event.elementType, event.complete)
            // setError(null);
        }
        // console.log('[change]', event);
    };




    const handleSubmit = async (event) => {
        // Block native form submission.
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
        }

        // Get a reference to a mounted CardElement. Elements knows how
        // to find your CardElement because there can only ever be one of
        // each type of element.
        const cardElement = elements.getElement(CardNumberElement);
        // props.setCard(cardElement)
        props.changeStepButton(23, 5, 6, props.startPercent, 1, cardElement)

    };
    const Cad = (amount) => {
        const amountPay = amount !== undefined && amount !== null && amount !== '' ? amount : 0
        const cadAmount = Number(amountPay) + ((Number(amountPay) / 100) * 13)
        return new Intl.NumberFormat('en-US',
            { style: 'currency', currency: 'USD' }
        ).format(Number(cadAmount))
    }
    return (
        <React.Fragment >
            <Animated animationIn={props.animation} animationInDuration={500} animationOutDuration={500} animationOut="fadeOutUp" isVisible={true}>
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 pr-0 pl-0" style={{ display: props.tab === 5 ? 'block' : 'none' }} >
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
                                                Credit card
                                                <input
                                                    type="radio"
                                                    name="checkPayment"
                                                    id="checkPayment"
                                                    onChange={
                                                        props.handleOnChange
                                                    }
                                                    value="credit_card"
                                                    checked={props.checkPayment === 'credit_card'}
                                                />
                                                <span className="MethodCheck"></span>
                                            </label>
                                        </div>
                                        {props.checkPayment === 'credit_card' ? (<div className="row" >
                                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">

                                                <div className="CardNumber-Form mt-4">
                                                    <label>Card Number</label>
                                                    <CardNumberElement
                                                        className="Card_Number"
                                                        value={props.cardNumber}
                                                        placeholder="0000 0000 0000 0000" name='cardNumber'
                                                        onChange={handleChange}

                                                        options={{
                                                            style: {
                                                                base: {
                                                                    fontSize: '14px',
                                                                    color: '#AAABAD',
                                                                    fontWeight: '400',
                                                                    '::placeholder': {
                                                                        color: '#AAABAD',
                                                                    },
                                                                },
                                                                invalid: {
                                                                    color: '#9e2146',
                                                                },
                                                            },
                                                        }}

                                                    />
                                                    <img
                                                        src="/assets/image/atm-card-icon.svg"
                                                        alt="ATM Card"
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                                                <div className="CardNumber-Form">
                                                    <label>Expiry Date</label>
                                                    <CardExpiryElement
                                                        value={props.cardExpirDate}
                                                        onReady={() => {
                                                            console.log("CardNumberElement [ready]");
                                                        }}
                                                        onChange={handleChange}
                                                        options={{
                                                            style: {
                                                                base: {
                                                                    fontSize: '14px',
                                                                    color: '#AAABAD',
                                                                    fontWeight: '400',
                                                                    '::placeholder': {
                                                                        color: '#AAABAD',
                                                                    },
                                                                },
                                                                invalid: {
                                                                    color: '#9e2146',
                                                                },
                                                            },
                                                        }}
                                                    />
                                                    <img
                                                        src="/assets/image/post-calendar-icon.svg"
                                                        alt="Calendar" className="Unionlock-img"
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                                                <div className="CardNumber-Form">
                                                    <label>CVC/CVV</label>
                                                    <CardCvcElement
                                                        value={props.cardCVC}
                                                        onChange={handleChange}

                                                        options={{
                                                            style: {
                                                                base: {
                                                                    fontSize: '14px',
                                                                    color: '#AAABAD',
                                                                    fontWeight: '400',
                                                                    '::placeholder': {
                                                                        color: '#AAABAD',
                                                                    },
                                                                },
                                                                invalid: {
                                                                    color: '#9e2146',
                                                                },
                                                            },
                                                        }}

                                                    />
                                                    {/* <NumberFormat value={props.cardCVC} format="###" placeholder="***" name='cardCVC' onValueChange={(values) => {
                                                        const { formattedValue, value } = values;
                                                        props.changeCardValues('cardCVC', value)
                                                        // this.setState({ cardCVC: value })
                                                    }} />
                                                    <img
                                                        src="/assets/image/Union-Lock.svg"
                                                        alt="Union Lock" className="Unionlock-img"
                                                    /> */}
                                                    <img
                                                        src="/assets/image/Union-Lock.svg"
                                                        alt="Union Lock" className="Unionlock-img"
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
                                        ) : null}

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
                                                <span>{props.boostAmount !== null && props.boostAmount !== '' ? new Intl.NumberFormat('en-US',
                                                    { style: 'currency', currency: 'USD' }
                                                ).format(Number(props.boostAmount))// '$100.00'
                                                    : new Intl.NumberFormat('en-US',
                                                        { style: 'currency', currency: 'USD' }
                                                    ).format(0)}</span>
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
                                                <span>{Cad(props.boostAmount)}</span>
                                            </h1>
                                            <p>Ad will expire in 14 days</p>
                                        </div>

                                        <div className="TotalContinue-Btn">
                                            {props.checkPayment === 'pay_pal' && Object.keys(props.paypalIntentData).length === 0 ? (<PayPal {...props} />) : (<button
                                                type="button"
                                                onClick={handleSubmit}
                                            // onClick={() => props.changeStepButton(23, 5, 6, props.startPercent, 1)}
                                            // disabled={!stripe}
                                            >
                                                Continue
                                            </button>)}

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
                                            onClick={() => props.changeStepButton(21, 5, 4, -props.startPercent)}
                                        >
                                            {/* onClick={() => props.changeStepButton(21, 5, 4, -16.66666666666667)} */}

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
    )
}
export default Payment
// {props.amountPay !== null && props.amountPay !== '' ? new Intl.NumberFormat('en-US',
//                                                     { style: 'currency', currency: 'USD' }
//                                                 ).format(Number(props.amountPay))// '$100.00'
//                                                     : new Intl.NumberFormat('en-US',
//                                                         { style: 'currency', currency: 'USD' }
//                                                     ).format(0)}
// useEffect(async () => {
    //     Create PaymentIntent as soon as the page loads
    //             const paymentIntent = await stripe.paymentIntents.create({
    //                 amount: 2000,
    //                 currency: 'usd',
    //                 payment_method_types: ['card'],
    //             });
    //     console.log(paymentIntent)
    //     window
    //         .fetch("/create-payment-intent", {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json"
    //             },
    //             body: JSON.stringify({ items: [{ id: "xl-tshirt" }] })
    //         })
    //         .then(res => {
    //             return res.json();
    //         })
    //         .then(data => {
    //             console.log(data.clientSecret)
    //             setClientSecret(data.clientSecret);
    //         });
    // }, []);