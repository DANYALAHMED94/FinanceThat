import React, { Component } from 'react'
import { Link } from 'react-router-dom'
class VehicleDownPaymentModel extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {
        return (<React.Fragment>
            <div className="your-estimate-budget-modal">
                <div className="modal fade" id="VehicleDownPaymentModel" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">How does my down payment affect my offer?</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <ul className="vehicle-payment-list"><span className="zero-down-payment-dialog-li-row"><svg width="20px" height="20px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><path d="M0 0h24v24H0z" fill="none"></path><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"></path></svg><li className="zero-down-payment-dialog-li">Increases your chances of approval</li></span><span className="zero-down-payment-dialog-li-row"><svg width="20px" height="20px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><path d="M0 0h24v24H0z" fill="none"></path><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"></path></svg><li className="zero-down-payment-dialog-li">Improves your terms, like a lower APR</li></span><span className="zero-down-payment-dialog-li-row"><svg width="20px" height="20px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><path d="M0 0h24v24H0z" fill="none"></path><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"></path></svg><li className="zero-down-payment-dialog-li">Lowers your monthly payment amount</li></span></ul>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </React.Fragment >)
    }
}
export default VehicleDownPaymentModel