import React, { useEffect } from 'react'
import { Animated } from "react-animated-css";
import {
    useStripe,
    useElements,
} from "@stripe/react-stripe-js";
import { toastr } from 'react-redux-toastr'
const FinalizeAdd = props => {

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

    useEffect(() => {
        if (props.clientSecret !== undefined && props.clientSecret !== null && Object.keys(props.clientSecret).length > 0) {
            (async () => {
                if (props.clientSecret.client_secret !== undefined && props.clientSecret.client_secret !== null && props.clientSecret.client_secret !== '') {
                    console.log(props.clientSecret.client_secret, 'props.clientSecret.client_secret')
                    try {
                        const payload = await stripe.confirmCardPayment(props.clientSecret.client_secret, {
                            payment_method: {
                                card: props.card
                            }
                        });
                        console.log('Done', payload)
                        if (payload.error) {
                            toastr.error('Error', payload.error.message)
                            console.log('Error Payment', payload.error.message)
                            props.remove_client_secret()
                        } else {
                            // Hide as Par Client Requiremnt
                            // toastr.success('Success', 'Payment Done Successfully')
                            console.log('Done', payload)
                            // props.create_post_success()
                            props.create_post()
                        }
                    } catch (err) {
                        props.post_ad_end()
                        const message = err.response !== undefined && err.response !== null ? err.response.data.message !== undefined ? err.response.data.message : err.message : err.message
                        toastr.error('Error', message)
                        console.log(err.message)
                    }
                }
                // props.completePostAdd()
            })();
        }

    }, [props.clientSecret])

    return (
        <React.Fragment>
            <Animated animationIn={props.animation} animationInDuration={500} animationOutDuration={500} animationOut="fadeOutUp" isVisible={true}>
                <div className="AdPost-SecOne">
                    <div className="row">
                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                            <div className="AddFinalize-Container">
                                <div className="AddFinalize-Head">
                                    <h1>Finalize your ad</h1>
                                </div>

                                <div className="Finalize-CardDetail">
                                    <div className="CardDetail-Left">
                                        <h1>Vehicle Details</h1>
                                        <p>
                                            Make, Model, Km, Price
                                              </p>
                                    </div>

                                    <div className="CardDetail-Right">
                                        <button type="button" onClick={() => props.editPost(1, 1, 6, props.typeOfVehiclePerc, 1)}>
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
                                        <h1>Photos</h1>
                                        <p>Photos from all 4 angles</p>
                                    </div>
                                    <div className="CardDetail-Right">
                                        <button type="button" onClick={() => props.editPost(2, 19, 6, props.photoPerc, 1)}>
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
                                        <h1>Location</h1>
                                        <p>Street address, City, Province</p>
                                    </div>
                                    <div className="CardDetail-Right">
                                        <button type="button" onClick={() => props.editPost(3, 20, 6, props.locationPerc, 1)}>
                                            <img
                                                src="/assets/image/post-edit-icon.svg"
                                                alt="Edit"
                                            />{" "}
                                                Edit
                                              </button>
                                    </div>
                                </div>
                                {/* <div className="Finalize-CardDetail">
                                    <div className="CardDetail-Left">
                                        <h1>Boost</h1>
                                        <p>Free Ad, Standard or Premium</p>
                                    </div>
                                    <div className="CardDetail-Right">
                                        <button type="button" onClick={() => props.editPost(4, 21, 6, props.boostPerc, 1)}>
                                            <img
                                                src="/assets/image/post-edit-icon.svg"
                                                alt="Edit"
                                            />{" "}
                                                Edit
                                              </button>
                                    </div>
                                </div> */}
                                {/* {props.selectedBoost !== 'free' ? (<>
                                    <div className="Finalize-CardDetail">
                                        <div className="CardDetail-Left">
                                            <h1>Payment</h1>
                                            <p>Free Ad, Standard or Premium</p>
                                        </div>
                                        <div className="CardDetail-Right">
                                            <button type="button" onClick={() => props.editPost(5, 22, 6, props.paymentPerc, 1)}>
                                                <img
                                                    src="/assets/image/post-edit-icon.svg"
                                                    alt="Edit"
                                                />{" "}
                                                Edit
                                              </button>
                                        </div>
                                    </div>
                                </>) : null} */}


                                <div className="row">
                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                        <div className="FinalizePre-Btn discard-btn">
                                            <button type="button" data-toggle="modal" data-target="#confirmModel" disabled={props.isLoading} className="active"> Discard</button>
                                            {/* <button
                                                className="active"
                                                type="button"
                                                onClick={props.discardState}
                                                disabled={props.isLoading}
                                            >
                                                Discard
                                                </button> */}
                                        </div>
                                    </div>

                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                        <div className="FinalizePre-Btn float-right">
                                            <button type="button" onClick={props.submitAdPost} disabled={props.isLoading}>
                                                {props.isLoading === true ? (<i class="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>) : 'Post Ad'}
                                            </button>
                                            {/* {props.checkPayment === 'pay_pal' ? (<PayPal amountPay={props.amountPay} {...props} />) : (<button type="button" onClick={props.submitAdPost} disabled={props.isLoading}>
                                                {props.isLoading === true ? (<i class="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>) : null}  Post Ad
                                            </button>)} */}

                                        </div>
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
export default FinalizeAdd