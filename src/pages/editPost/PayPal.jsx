import React, { Component } from 'react';
import { PayPalButton } from 'react-paypal-button-v2';
import { API_URL } from '../../constant'

class PayPal extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        const add_intent_and_change_step = (data) => {
            this.props.paypal_intent_create(data)
            this.props.changeStepButton(23, 5, 6, this.props.startPercent, 1, '')
        }
        // 1a. Add your client ID and secret
        const PAYPAL_CLIENT = process.env.REACT_APP_PAYPAL_CLIENT;
        const PAYPAL_SECRET = process.env.REACT_APP_PAYPAL_SECRET;

        // 1b. Point your server to the PayPal API
        const PAYPAL_OAUTH_API = 'https://api-m.paypal.com/v1/oauth2/token/';
        const PAYPAL_AUTHORIZATION_API =
            'https://api-m.paypal.com/v2/payments/authorizations/';

        const basicAuth = btoa(`${PAYPAL_CLIENT}:${PAYPAL_SECRET}`);
        const amountPay = this.props.amountPay !== '' ? Number(this.props.amountPay).toFixed(2) : (0).toFixed(2)

        return (
            <PayPalButton
                createOrder={(data, actions) =>
                    actions.order.create({
                        purchase_units: [
                            {
                                amount: {
                                    currency_code: 'CAD',
                                    value: amountPay,
                                },
                            },
                        ],
                        application_context: {
                            shipping_preference: 'NO_SHIPPING', // default is "GET_FROM_FILE"
                        },
                    })
                }
                onApprove={(data, actions) =>
                    // Capture the funds from the transaction
                    actions.order.authorize().then(function (authorization) {
                        // Show a success message to your buyer
                        const authorizationID =
                            authorization.purchase_units[0].payments.authorizations[0].id;
                        const links = authorization;
                        // alert(
                        //     `Payment Intent Created Succesfully for ${authorization.payer.name.given_name
                        //     }`,
                        // );

                        console.log(authorizationID, 'authhthjkhfsdjkfhkjsd');
                        console.log(links, 'authhthjkhfsdjkfhkjsd');
                        console.log(basicAuth, 'basic auttthhh');
                        const resData = {
                            orderID: data.orderID,
                            authorizationID: authorizationID
                        }
                        console.log(resData)
                        add_intent_and_change_step(resData)
                        // OPTIONAL: Call your server to save the transaction
                        // return fetch(`${API_URL}/paypal-transaction-complete/`, {
                        //     method: "post",
                        //     body: JSON.stringify({
                        //         orderID: data.orderID,
                        //         authorizationID: authorizationID
                        //     })
                        // });
                    })
                }
            />
        );
    }
}
export default PayPal;
