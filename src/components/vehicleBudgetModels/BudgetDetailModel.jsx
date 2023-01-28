import React, { Component } from 'react'
import { Link } from 'react-router-dom'
class BudgetDetailModel extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    toggleGoogleMap = () => {
        window.$('#BudgetDetailModel').modal('hide')
        window.$('#googleMapModelHome').modal('show')
    }

    render() {
        return (<React.Fragment>
            <div className="your-estimate-budget-modal">
                <div className="modal fade" id="BudgetDetailModel" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">How we calculated this</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <p>Your estimated vehicle price of ${this.props.totalBudget ? (Math.round(this.props.totalBudget)).toLocaleString('en-US') :
                                    (0).toLocaleString('en-US')} is based on your selections and the below information:</p>
                                <ul className="kmx-list">
                                    <li>APR of {this.props.estimatedAPR ? this.props.estimatedAPR.highAmount ? this.props.estimatedAPR.highAmount : 0 : 0}% </li>
                                    <li>Terms of {this.props.terms ? this.props.terms : ''} months</li>
                                </ul>
                                {/* <ul className="kmx-list">
                                    <li>A total budget of ${this.props.totalPrice ? (Math.round(this.props.totalPrice)).toLocaleString('en-US') :
                                        (0).toLocaleString('en-US')} minus estimated KS tax, title, and fees of ${this.props.totalTaxPrice ? (Math.round(this.props.totalTaxPrice)).toLocaleString('en-US') :
                                            (0).toLocaleString('en-US')}. Wrong state? <Link to='#' onClick={this.toggleGoogleMap}>Change your location</Link>.</li><li>APR of {this.props.estimatedAPR ? this.props.estimatedAPR.highAmount ? this.props.estimatedAPR.highAmount : 0 : 0}% and <b>term of {this.props.terms} months</b></li></ul> */}
                                <p className="kmx-typography--fine-print m-t-m">Tax, title, and tags vary by state and are calculated at time of purchase. Estimated values are for illustration purposes only, do not constitute an advertisement or offer of specific credit terms; and are based, where applicable, on the information you enter. APRs and terms used in estimates – including a {this.props.terms} month term – may be unavailable based on vehicle, state of purchase, or your credit profile. Actual pre-approval terms are subject to credit approval and availability, and applicable to used vehicles only.</p>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </React.Fragment >)
    }
}
export default BudgetDetailModel