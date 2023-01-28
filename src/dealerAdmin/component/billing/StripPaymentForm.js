import React from 'react';
import Card from 'react-credit-cards';
import {
    useStripe,
    useElements,
    CardNumberElement,
    CardCvcElement,
    CardExpiryElement,
} from "@stripe/react-stripe-js";

import {
    formatCreditCardNumber,
    formatCVC,
    formatExpirationDate,
    formatFormData,
} from './cards/utils';

import 'react-credit-cards/es/styles-compiled.css';

const StripPaymentForm = (props) => {
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
            // props.setCardError(event.elementType, event.error.message)

        } else {
            // props.setCardError(event.elementType, event.complete)

        }
        console.log('[change]', event);
    };
    return (
        <div key="Payment">
            <div class="form-group row">
                <div class="col-sm-4">
                    {/* <Card
                        number={number}
                        name={name}
                        expiry={expiry}
                        cvc={cvc}
                        focused={focused}
                        callback={this.handleCallback}
                    /> */}
                </div>
                <div class="col-sm-1" />
                <div class="col-sm-5">


                    {/* <form ref={c => (this.form = c)} onSubmit={this.handleSubmit}> */}
                    <div className="form-group">
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
                        <input
                            type="tel"
                            name="number"
                            className="form-control"
                            placeholder="Card Number"
                            pattern="[\d| ]{16,22}"
                            required
                            onChange={this.handleInputChange}
                            onFocus={this.handleInputFocus}
                        />
                        <small>E.g.: 49..., 51..., 36..., 37...</small>
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            name="name"
                            className="form-control"
                            placeholder="Name"
                            required
                            onChange={this.handleInputChange}
                            onFocus={this.handleInputFocus}
                        />
                    </div>
                    <div className="row">
                        <div className="col-6">
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
                        </div>
                        <div className="col-6">
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
                        </div>
                    </div>
                    {/* </form> */}

                </div>
            </div>

        </div>
    );
}

export default StripPaymentForm
