import { PayPalButton } from "react-paypal-button-v2";
import React from 'react';
import { toastr } from 'react-redux-toastr'

class PayPal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    create_post = () => {
        this.props.create_post()
    }
    render() {
        const amountPay = this.props.amountPay !== '' ? Number(this.props.amountPay).toFixed(2) : (0).toFixed(2)
        return (
            <PayPalButton
                createOrder={(data, actions) => {
                    return actions.order.create({
                        purchase_units: [{
                            amount: {
                                currency_code: "CAD",
                                value: amountPay
                            }
                        }],
                    });
                }}
                onApprove={(data, actions) => {
                    // Capture the funds from the transaction
                    actions.order.capture().then((details) => {
                        // Show a success message to your buyer
                        toastr.success('Success', "Transaction completed by " + details.payer.name.given_name)

                        // OPTIONAL: Call your server to save the transaction
                        this.create_post()
                        // fetch("/paypal-transaction-complete", {
                        //     method: "post",
                        //     body: JSON.stringify({
                        //         orderID: data.orderID
                        //     })
                        // }).then(response => {
                        //     console.log(response, 'Success Payapl Tran')
                        // });
                    });
                }}
                onError={(error) => {
                    const message = error.message !== undefined && error.message !== null ? error.message : 'Error In Transcation'
                    toastr.error('Error', message)
                    console.log(error)
                }}
                style={{
                    color: 'silver',
                    shape: 'pill',
                    label: 'paypal',
                    tagline: false
                }}
            />
        );
    }
}
export default PayPal;
