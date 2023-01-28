import React, { Component } from 'react'
import {
   get_credit_details
} from '../../../../actions/admin/applicationActions'
import moment from 'moment'
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux'
import ReactToPrint, { PrintContextConsumer } from 'react-to-print';

class CreditReportDetail extends Component {
   constructor(props) {
      super(props);
      this.state = {
         credit_detail: []
      }
   }
   componentDidMount() {
      const id = this.props.match.params.id;
      this.props.get_credit_details(id)
   }
   componentDidUpdate(prevProps, prevState) {
      if (prevProps.application_credit_detail !== this.props.application_credit_detail && this.props.application_credit_detail) {
         this.setState({
            ...this.state,
            credit_detail: this.props.application_credit_detail
         })
      }
   }
   render() {
      return (
         <React.Fragment>
            <Helmet>
               <title>Credit Report</title>
               <meta name="description" content="" />
            </Helmet>
           <div className='Main-Credit-Report' ref={el => (this.componentRef = el)}>
            <div class="CreditReport-Container">
               <div class="Admin-CreditReport">
                  <div class="CreditLeft">
                     <h1>{`${this.state.credit_detail ? this.state.credit_detail.credit ? this.state.credit_detail.credit[0] ? this.state.credit_detail.credit[0].first_name ? this.state.credit_detail.credit[0].first_name : '' : '' : '' : ''} ${this.state.credit_detail ? this.state.credit_detail.credit ? this.state.credit_detail.credit[0] ? this.state.credit_detail.credit[0].middle_name ? this.state.credit_detail.credit[0].middle_name : '' : '' : '' : ''} ${this.state.credit_detail ? this.state.credit_detail.credit ? this.state.credit_detail.credit[0] ? this.state.credit_detail.credit[0].last_name ? this.state.credit_detail.credit[0].last_name : '' : '' : '' : ''}`} - Credit Report</h1>
                  </div>
                  <div class="CreditRight">
                     <button><img src="image/sprite-icon/icon-print.svg" alt="" /></button>
                     <h2>CREDIT SCORE: <span>{this.state.credit_detail ? this.state.credit_detail.credit ? this.state.credit_detail.credit[0] ? this.state.credit_detail.credit[0].score ? this.state.credit_detail.credit[0].score : 'N/A' : 'N/A' : 'N/A' : 'N/A'}</span></h2>
                  </div>
               </div>
            </div>
            <div class="Admin-PersonalInfo-Container">
               <div class="Admin-InfoInner">
                  <div className="credit-report-print clearfix">
                     <ReactToPrint content={() => this.componentRef}>
                        <PrintContextConsumer>
                           {({ handlePrint }) => (
                           <button className="btn btn-primary" onClick={handlePrint}>Print Report!</button>
                           )}
                        </PrintContextConsumer>
                     </ReactToPrint>
                     <h1>Personal Information</h1>
                  </div>
                 
                  <ul>
                     <li>
                        <div class="Admin-PrName">
                           <h2>Name</h2>
                           <h3>{`${this.state.credit_detail ? this.state.credit_detail.credit ? this.state.credit_detail.credit[0] ? this.state.credit_detail.credit[0].first_name ? this.state.credit_detail.credit[0].first_name : '' : '' : '' : ''} ${this.state.credit_detail ? this.state.credit_detail.credit ? this.state.credit_detail.credit[0] ? this.state.credit_detail.credit[0].middle_name ? this.state.credit_detail.credit[0].middle_name : '' : '' : '' : ''} ${this.state.credit_detail ? this.state.credit_detail.credit ? this.state.credit_detail.credit[0] ? this.state.credit_detail.credit[0].last_name ? this.state.credit_detail.credit[0].last_name : '' : '' : '' : ''}`}</h3>
                        </div>
                     </li>
                     <li>
                        <div class="Admin-PrName">
                           <h2>Date of Birth</h2>
                           <h3>{this.state.credit_detail ? this.state.credit_detail.credit ? this.state.credit_detail.credit[0] ? this.state.credit_detail.credit[0].dob ? this.state.credit_detail.credit[0].dob : '' : '' : '' : ''} </h3>
                        </div>
                     </li>
                  </ul>
               </div>
               <div class="Admin-InfoInner2">
                  <h1>Address</h1>
                  <ul>
                     <li>
                        <div class="Admin-PrName">
                           <h2>Current Address</h2>
                           <h3>{`${this.state.credit_detail ? this.state.credit_detail.credit ? this.state.credit_detail.credit[0] ? this.state.credit_detail.credit[0].cur_address_civic ? this.state.credit_detail.credit[0].cur_address_civic : '' : '' : '' : ''} ${this.state.credit_detail ? this.state.credit_detail.credit ? this.state.credit_detail.credit[0] ? this.state.credit_detail.credit[0].cur_address_street ? this.state.credit_detail.credit[0].cur_address_street : '' : '' : '' : ''} ${this.state.credit_detail ? this.state.credit_detail.credit ? this.state.credit_detail.credit[0] ? this.state.credit_detail.credit[0].cur_address_city ? this.state.credit_detail.credit[0].cur_address_city : '' : '' : '' : ''} ${this.state.credit_detail ? this.state.credit_detail.credit ? this.state.credit_detail.credit[0] ? this.state.credit_detail.credit[0].cur_address_province ? this.state.credit_detail.credit[0].cur_address_province : '' : '' : '' : ''} ${this.state.credit_detail ? this.state.credit_detail.credit ? this.state.credit_detail.credit[0] ? this.state.credit_detail.credit[0].cur_address_postal_code ? this.state.credit_detail.credit[0].cur_address_postal_code : '' : '' : '' : ''}`}</h3>
                           {/* <h3>{this.state.credit_detail ? this.state.credit_detail.credit ? this.state.credit_detail.credit[0] ? this.state.credit_detail.credit[0].cur_address_street ? this.state.credit_detail.credit[0].cur_address_street : 'N/A' : 'N/A' : 'N/A' : 'N/A'}</h3> */}
                        </div>
                     </li>
                     <li>
                        <div class="Admin-PrName">
                           <h2>Previous Address</h2>
                           <h3>{`${this.state.credit_detail ? this.state.credit_detail.credit ? this.state.credit_detail.credit[0] ? this.state.credit_detail.credit[0].prev_address_civic ? this.state.credit_detail.credit[0].prev_address_civic : '' : '' : '' : ''} ${this.state.credit_detail ? this.state.credit_detail.credit ? this.state.credit_detail.credit[0] ? this.state.credit_detail.credit[0].prev_address_street ? this.state.credit_detail.credit[0].prev_address_street : '' : '' : '' : ''} ${this.state.credit_detail ? this.state.credit_detail.credit ? this.state.credit_detail.credit[0] ? this.state.credit_detail.credit[0].prev_address_city ? this.state.credit_detail.credit[0].prev_address_city : '' : '' : '' : ''} ${this.state.credit_detail ? this.state.credit_detail.credit ? this.state.credit_detail.credit[0] ? this.state.credit_detail.credit[0].prev_address_province ? this.state.credit_detail.credit[0].prev_address_province : '' : '' : '' : ''} ${this.state.credit_detail ? this.state.credit_detail.credit ? this.state.credit_detail.credit[0] ? this.state.credit_detail.credit[0].prev_address_postal_code ? this.state.credit_detail.credit[0].prev_address_postal_code : '' : '' : '' : ''}`}</h3>
                           {/* <h3>{this.state.credit_detail ? this.state.credit_detail.credit ? this.state.credit_detail.credit[0] ? this.state.credit_detail.credit[0].prev_address_street ? this.state.credit_detail.credit[0].prev_address_street : 'N/A' : 'N/A' : 'N/A' : 'N/A'}</h3> */}
                        </div>
                     </li>
                  </ul>
               </div>
               <div class="Admin-InfoInner">
                  <h1>Employment</h1>
                  <ul>
                     <li>
                        <div class="Admin-PrName">
                           <h2>Employer</h2>
                           <h3>{this.state.credit_detail ? this.state.credit_detail.credit ? this.state.credit_detail.credit[0] ? this.state.credit_detail.credit[0].cur_employer ? this.state.credit_detail.credit[0].cur_employer : 'N/A' : 'N/A' : 'N/A' : 'N/A'}</h3>
                        </div>
                     </li>
                     <li>
                        <div class="Admin-PrName">
                           <h2>Occupation</h2>
                           <h3>{this.state.credit_detail ? this.state.credit_detail.credit ? this.state.credit_detail.credit[0] ? this.state.credit_detail.credit[0].cur_occupation ? this.state.credit_detail.credit[0].cur_occupation : 'N/A' : 'N/A' : 'N/A' : 'N/A'}</h3>
                        </div>
                     </li>
                     {/* <li>
                        <div class="Admin-PrName">
                           <h2>Date of Last Activity</h2>
                           <h3>{this.state.credit_detail ? this.state.credit_detail.credit ? this.state.credit_detail.credit[0] ? this.state.credit_detail.credit[0].date_of_last_activity ? moment(this.state.credit_detail.credit[0].date_of_last_activity).format('YYYY-MM-DD') : 'N/A' : 'N/A' : 'N/A' : 'N/A'}</h3>
                        </div>
                     </li>
                     <li>
                        <div class="Admin-PrName">
                           <h2>Date of Birth</h2>
                           <h3>{this.state.credit_detail ? this.state.credit_detail.credit ? this.state.credit_detail.credit[0] ? this.state.credit_detail.credit[0].dob ? moment(this.state.credit_detail.credit[0].dob).format('YYYY-MM-DD') : 'N/A' : 'N/A' : 'N/A' : 'N/A'}</h3>
                        </div>
                     </li> */}
                     <li>
                        <div class="Admin-PrName">
                           <h2>Previous Employer</h2>
                           <h3>{this.state.credit_detail ? this.state.credit_detail.credit ? this.state.credit_detail.credit[0] ? this.state.credit_detail.credit[0].prev_employer ? (this.state.credit_detail.credit[0].prev_employer) : 'N/A' : 'N/A' : 'N/A' : 'N/A'}</h3>
                        </div>
                     </li>
                     <li>
                        <div class="Admin-PrName">
                           <h2>Previous Occupation</h2>
                           <h3>{this.state.credit_detail ? this.state.credit_detail.credit ? this.state.credit_detail.credit[0] ? this.state.credit_detail.credit[0].prev_occupation ? (this.state.credit_detail.credit[0].prev_occupation) : 'N/A' : 'N/A' : 'N/A' : 'N/A'}</h3>
                        </div>
                     </li>
                  </ul>
               </div>
               <div class="Admin-InfoInner mb-0">
                  <h1>Credit File</h1>
                  <ul>
                     {/* <li>
                        <div class="Admin-PrName">
                           <h2>Employer</h2>
                           <h3>{this.state.credit_detail ? this.state.credit_detail.credit ? this.state.credit_detail.credit[0] ? this.state.credit_detail.credit[0].cur_employer ? this.state.credit_detail.credit[0].cur_employer : 'N/A' : 'N/A' : 'N/A' : 'N/A'}</h3>
                        </div>
                     </li>
                     <li>
                        <div class="Admin-PrName">
                           <h2>Occupation</h2>
                           <h3>{this.state.credit_detail ? this.state.credit_detail.credit ? this.state.credit_detail.credit[0] ? this.state.credit_detail.credit[0].cur_occupation ? this.state.credit_detail.credit[0].cur_occupation : 'N/A' : 'N/A' : 'N/A' : 'N/A'}</h3>
                        </div>
                     </li> */}
                     <li>
                        <div class="Admin-PrName">
                           <h2>Date of Last Activity</h2>
                           <h3>{this.state.credit_detail ? this.state.credit_detail.credit ? this.state.credit_detail.credit[0] ? this.state.credit_detail.credit[0].date_of_last_activity ? moment(this.state.credit_detail.credit[0].date_of_last_activity).format('YYYY-MM-DD') : 'N/A' : 'N/A' : 'N/A' : 'N/A'}</h3>
                        </div>
                     </li>
                     <li>
                        <div class="Admin-PrName">
                           <h2>Date of Request</h2>
                           <h3>{this.state.credit_detail ? this.state.credit_detail.credit ? this.state.credit_detail.credit[0] ? this.state.credit_detail.credit[0].date_of_request ? moment(this.state.credit_detail.credit[0].date_of_request).format('YYYY-MM-DD') : 'N/A' : 'N/A' : 'N/A' : 'N/A'}</h3>
                        </div>
                     </li>
                     <li>
                        <div class="Admin-PrName">
                           <h2>File since date</h2>
                           <h3>{this.state.credit_detail ? this.state.credit_detail.credit ? this.state.credit_detail.credit[0] ? this.state.credit_detail.credit[0].file_since_date ? moment(this.state.credit_detail.credit[0].file_since_date).format('YYYY-MM-DD') : 'N/A' : 'N/A' : 'N/A' : 'N/A'}</h3>
                        </div>
                     </li>
                     {/* <li>
                        <div class="Admin-PrName">
                           <h2>Date of Birth</h2>
                           <h3>{this.state.credit_detail ? this.state.credit_detail.credit ? this.state.credit_detail.credit[0] ? this.state.credit_detail.credit[0].dob ? moment(this.state.credit_detail.credit[0].dob).format('YYYY-MM-DD') : 'N/A' : 'N/A' : 'N/A' : 'N/A'}</h3>
                        </div>
                     </li> */}
                  </ul>
               </div>
            </div>
            <div class="TradeAcc-Container">
               <div class="TradeAcc-Head">
                  <h1>Trades/Accounts</h1>
               </div>
               {this.state.credit_detail ? this.state.credit_detail.trades ? (this.state.credit_detail.trades || []).map(item => (
                  <>
                     <div class="Revolving-Head">
                        <h1>{item.portfolio_desc ? item.portfolio_desc : 'N/A'}</h1>
                        <h2>{item.trade_name ? item.trade_name : 'N/A'}</h2>
                        <h3>Account: <span>{item.acc_no ? item.acc_no : 'N/A'}</span></h3>
                     </div>
                     <div class="Admin-OverViewList">
                        <h1>OVERVIEW</h1>
                        <ul>
                           <li>
                              <h3>Balance</h3>
                           </li>
                           <li>
                              <h4>{item.balance ? item.balance : 'N/A'}</h4>
                           </li>
                           <li>
                              <h3>Credit Limit</h3>
                           </li>
                           <li>
                              <h4>{item.high_credit_amt ? item.high_credit_amt : 'N/A'}</h4>
                           </li>
                           <li>
                              <h3>Payment Amount</h3>
                           </li>
                           <li>
                              <h4>{item.payment_amount ? item.payment_amount : 'N/A'} </h4>
                           </li>
                           <li>
                              <h3>Past Due Amount</h3>
                           </li>
                           <li>
                              <h4>{item.past_due ? item.past_due : 'N/A'} </h4>
                           </li>
                        </ul>
                     </div>
                     <div class="Admin-OverViewList">
                        <h1>ACCOUNT DETAILS</h1>
                        <ul>
                           <li>
                              <h3>Status</h3>
                           </li>
                           <li>
                              <h4>{item.paymentrate_desc ? item.paymentrate_desc : 'N/A'}</h4>
                           </li>
                           <li>
                              <h3>Type</h3>
                           </li>
                           <li>
                              <h4>{item.portfolio_desc ? item.portfolio_desc : 'N/A'}</h4>
                           </li>
                           <li>
                              <h3>Association</h3>
                           </li>
                           <li>
                              <h4> {item.association_desc ? item.association_desc : 'N/A'} </h4>
                           </li>
                           <li>
                              <h3>Last Activity</h3>
                           </li>
                           <li>
                              <h4>{item.date_last_activity_payment ? item.date_last_activity_payment : 'N/A'} </h4>
                           </li>
                           <li>
                              <h3>Date Opened</h3>
                           </li>
                           <li>
                              <h4> {item.date_opened ? item.date_opened : 'N/A'} </h4>
                           </li>
                           <li>
                              <h3>Date Reported</h3>
                           </li>
                           <li>
                              <h4>{item.trade_date ? item.trade_date : 'N/A'}</h4>
                           </li>
                           <li>
                              <h3>Months Reviewed</h3>
                           </li>
                           <li>
                              <h4>{item.months_review ? item.months_review : 'N/A'}</h4>
                           </li>
                           <li>
                              <h3>Description</h3>
                           </li>
                           <li>
                              <h4>{item.narative_desc ? item.narative_desc : 'N/A'} </h4>
                           </li>
                        </ul>
                     </div>
                     <div class="Admin-PaymetList">
                        <h1>PAYMENT HISTORY</h1>
                        <ul>
                           {item.high_payment_rates && item.high_payment_rates.length > 0 ? (item.high_payment_rates.map((pay, payIndex) => (
                              <>
                                 <li>
                                    <h2>{pay.description}</h2>
                                 </li>
                                 <li>
                                    <h3>{pay.date}</h3>
                                 </li>
                                 <div class="clearfix"></div>
                              </>
                           ))
                           ) : 'N/A'}
                        </ul>
                     </div>
                  </>
               )) : null : null}
            </div>

            <div class="TradeAcc-Container">
               <div class="TradeAcc-Head">
                  <h1>Credit Inquiries</h1>
               </div>
               <div class="Admin-CreditList">
                  <h1>INQUIRIES</h1>
                  <ul>
                     {this.state.credit_detail ? this.state.credit_detail.inquiries && this.state.credit_detail.inquiries.length > 0 ? (
                        (this.state.credit_detail.inquiries || []).map((item, index) => (
                           <li key={index}>
                              <div class="Inquirt-CreditHead">
                                 <h2>{item.org_name || ''}</h2>
                                 <h3>Reported: {item.date}</h3>
                              </div>
                           </li>
                        ))
                     ) : 'N/A' : 'N/A'}
                  </ul>
               </div>
            </div>

            <div class="TradeAcc-Container">
               <div class="TradeAcc-Head">
                  <h1>Bankruptcies</h1>
               </div>
               <div class="Admin-BankrupList">
                  <h1>BANKRUPTCIES</h1>
                  <ul>
                     <li>
                        <h2>Date Filed</h2>
                     </li>
                     <li>
                        <h3>{this.state.credit_detail ? this.state.credit_detail.credit ? this.state.credit_detail.credit[0] ? this.state.credit_detail.credit[0].bankrupt_date ? this.state.credit_detail.credit[0].bankrupt_date : 'N/A' : 'N/A' : 'N/A' : 'N/A'}</h3>
                     </li>
                     <li>
                        <h2>Court Name</h2>
                     </li>
                     <li>
                        <h3>{this.state.credit_detail ? this.state.credit_detail.credit ? this.state.credit_detail.credit[0] ? this.state.credit_detail.credit[0].bankrupt_court_name ? this.state.credit_detail.credit[0].bankrupt_court_name : 'N/A' : 'N/A' : 'N/A' : 'N/A'}</h3>
                     </li>
                     <li>
                        <h2>Court Number</h2>
                     </li>
                     <li>
                        <h3>{this.state.credit_detail ? this.state.credit_detail.credit ? this.state.credit_detail.credit[0] ? this.state.credit_detail.credit[0].bankrupt_court_number ? this.state.credit_detail.credit[0].bankrupt_court_number : 'N/A' : 'N/A' : 'N/A' : 'N/A'}</h3>
                     </li>
                     {/* <li>
                        <h2>Agency</h2>
                     </li>
                     <li>
                        <h3>{this.state.credit_detail ? this.state.credit_detail.credit ? this.state.credit_detail.credit[0] ? this.state.credit_detail.credit[0].bankrupt_court_agency ? this.state.credit_detail.credit[0].bankrupt_court_agency : 'N/A' : 'N/A' : 'N/A' : 'N/A'}</h3>
                     </li>
                     <li>
                        <h2>Creditor</h2>
                     </li>
                     <li>
                        <h3>{this.state.credit_detail ? this.state.credit_detail.credit ? this.state.credit_detail.credit[0] ? this.state.credit_detail.credit[0].bankrupt_court_name ? this.state.credit_detail.credit[0].bankrupt_court_name : 'N/A' : 'N/A' : 'N/A' : 'N/A'}</h3>
                     </li> */}
                     <li>
                        <h2>Liability Amount</h2>
                     </li>
                     <li>
                        <h3>{this.state.credit_detail ? this.state.credit_detail.credit ? this.state.credit_detail.credit[0] ? this.state.credit_detail.credit[0].bankrupt_liability_amt ? this.state.credit_detail.credit[0].bankrupt_liability_amt : 'N/A' : 'N/A' : 'N/A' : 'N/A'}</h3>
                     </li>
                     <li>
                        <h2>Asset</h2>
                     </li>
                     <li>
                        <h3>{this.state.credit_detail ? this.state.credit_detail.credit ? this.state.credit_detail.credit[0] ? this.state.credit_detail.credit[0].bankrupt_asset_amount ? this.state.credit_detail.credit[0].bankrupt_asset_amount : 'N/A' : 'N/A' : 'N/A' : 'N/A'}</h3>
                     </li>
                     <li>
                        <h2>Subject</h2>
                     </li>
                     <li>
                        <h3>{this.state.credit_detail ? this.state.credit_detail.credit ? this.state.credit_detail.credit[0] ? this.state.credit_detail.credit[0].bankrupt_subject ? this.state.credit_detail.credit[0].bankrupt_subject : 'N/A' : 'N/A' : 'N/A' : 'N/A'}</h3>
                     </li>
                     <li>
                        <h2>Case Number-Trustee</h2>
                     </li>
                     <li>
                        <h3>{this.state.credit_detail ? this.state.credit_detail.credit ? this.state.credit_detail.credit[0] ? this.state.credit_detail.credit[0].bankrupt_case_num ? this.state.credit_detail.credit[0].bankrupt_case_num : 'N/A' : 'N/A' : 'N/A' : 'N/A'}</h3>
                     </li>
                     <li>
                        <h2>Disposition Date</h2>
                     </li>
                     <li>
                        <h3>{this.state.credit_detail ? this.state.credit_detail.credit ? this.state.credit_detail.credit[0] ? this.state.credit_detail.credit[0].bankrupt_dispostion_date ? this.state.credit_detail.credit[0].bankrupt_dispostion_date : 'N/A' : 'N/A' : 'N/A' : 'N/A'}</h3>
                     </li>
                     {/* <li>
                        <h2>Months Reviewed</h2>
                     </li>
                     <li>
                        <h3>{this.state.credit_detail ? this.state.credit_detail.credit ? this.state.credit_detail.credit[0] ? this.state.credit_detail.credit[0].bankrupt_months_reviewed ? this.state.credit_detail.credit[0].bankrupt_months_reviewed : 'N/A' : 'N/A' : 'N/A' : 'N/A'}</h3>
                     </li> */}
                     <li>
                        <h2>Description</h2>
                     </li>
                     <li>
                        <h3>{this.state.credit_detail ? this.state.credit_detail.credit ? this.state.credit_detail.credit[0] ? this.state.credit_detail.credit[0].bankrupt_detail ? this.state.credit_detail.credit[0].bankrupt_detail : 'N/A' : 'N/A' : 'N/A' : 'N/A'}</h3>
                     </li>
                  </ul>
               </div>
            </div>
            <div class="TradeAcc-Container">
               <div class="TradeAcc-Head">
                  <h1>Collections</h1>
               </div>
               <div class="Admin-BankrupList">
                  <h1>Collections</h1>
                  <ul class="Admin-BankBorder">
                     <li>
                        <h2>Reported</h2>
                     </li>
                     <li>
                        <h3>{this.state.credit_detail ? this.state.credit_detail.credit ? this.state.credit_detail.credit[0] ? this.state.credit_detail.credit[0].collection_assigned_date ? this.state.credit_detail.credit[0].collection_assigned_date : 'N/A' : 'N/A' : 'N/A' : 'N/A'}</h3>
                     </li>
                     <li>
                        <h2>Amount</h2>
                     </li>
                     <li>
                        <h3>{this.state.credit_detail ? this.state.credit_detail.credit ? this.state.credit_detail.credit[0] ? this.state.credit_detail.credit[0].collection_originalamount ? this.state.credit_detail.credit[0].collection_originalamount : 'N/A' : 'N/A' : 'N/A' : 'N/A'}</h3>
                     </li>
                     <li>
                        <h2>Balance</h2>
                     </li>
                     <li>
                        <h3>{this.state.credit_detail ? this.state.credit_detail.credit ? this.state.credit_detail.credit[0] ? this.state.credit_detail.credit[0].collection_balanceamount ? this.state.credit_detail.credit[0].collection_balanceamount : 'N/A' : 'N/A' : 'N/A' : 'N/A'}</h3>
                     </li>
                     <li>
                        <h2>Agency</h2>
                     </li>
                     <li>
                        <h3>{this.state.credit_detail ? this.state.credit_detail.credit ? this.state.credit_detail.credit[0] ? this.state.credit_detail.credit[0].collection_agency ? this.state.credit_detail.credit[0].collection_agency : 'N/A' : 'N/A' : 'N/A' : 'N/A'}</h3>
                     </li>
                     <li>
                        <h2>Creditor</h2>
                     </li>
                     <li>
                        <h3>{this.state.credit_detail ? this.state.credit_detail.credit ? this.state.credit_detail.credit[0] ? this.state.credit_detail.credit[0].collection_accountnumberandorname ? this.state.credit_detail.credit[0].collection_accountnumberandorname : 'N/A' : 'N/A' : 'N/A' : 'N/A'}</h3>
                     </li>
                     <li>
                        <h2>Status</h2>
                     </li>
                     <li>
                        <h3>{this.state.credit_detail ? this.state.credit_detail.credit ? this.state.credit_detail.credit[0] ? this.state.credit_detail.credit[0].collection_code ? this.state.credit_detail.credit[0].collection_code : 'N/A' : 'N/A' : 'N/A' : 'N/A'}</h3>
                     </li>
                     <li>
                        <h2>DLA</h2>
                     </li>
                     <li>
                        <h3>{this.state.credit_detail ? this.state.credit_detail.credit ? this.state.credit_detail.credit[0] ? this.state.credit_detail.credit[0].collection_dateoflastpayment ? this.state.credit_detail.credit[0].collection_dateoflastpayment : 'N/A' : 'N/A' : 'N/A' : 'N/A'}</h3>
                     </li>
                     <li>
                        <h2>Verification Date</h2>
                     </li>
                     <li>
                        <h3>{this.state.credit_detail ? this.state.credit_detail.credit ? this.state.credit_detail.credit[0] ? this.state.credit_detail.credit[0].collection_verificationdate ? this.state.credit_detail.credit[0].collection_verificationdate : 'N/A' : 'N/A' : 'N/A' : 'N/A'}</h3>
                     </li>
                     <li>
                        <h2>Ledger Number</h2>
                     </li>
                     <li>
                        <h3>{this.state.credit_detail ? this.state.credit_detail.credit ? this.state.credit_detail.credit[0] ? this.state.credit_detail.credit[0].collection_ledgernumber ? this.state.credit_detail.credit[0].collection_ledgernumber : 'N/A' : 'N/A' : 'N/A' : 'N/A'}</h3>
                     </li>
                  </ul>
               </div>
            </div>
            <div class="TradeAcc-Container">
               <div class="TradeAcc-Head">
                  <h1>Legal Items</h1>
               </div>
               <div class="Admin-BankrupList">
                  <h1>JUDGMENT OR FORCLOSURE</h1>
                  <ul class="Admin-BankBorder">
                     <li>
                        <h2>Type</h2>
                     </li>
                     <li>
                        <h3>{this.state.credit_detail ? this.state.credit_detail.credit ? this.state.credit_detail.credit[0] ? this.state.credit_detail.credit[0].legal_description ? this.state.credit_detail.credit[0].legal_description : 'N/A' : 'N/A' : 'N/A' : 'N/A'}</h3>
                     </li>
                     <li>
                        <h2>Date Filed</h2>
                     </li>
                     <li>
                        <h3>{this.state.credit_detail ? this.state.credit_detail.credit ? this.state.credit_detail.credit[0] ? this.state.credit_detail.credit[0].legal_date ? this.state.credit_detail.credit[0].legal_date : 'N/A' : 'N/A' : 'N/A' : 'N/A'}</h3>
                     </li>
                     <li>
                        <h2>Court Name</h2>
                     </li>
                     <li>
                        <h3>{this.state.credit_detail ? this.state.credit_detail.credit ? this.state.credit_detail.credit[0] ? this.state.credit_detail.credit[0].legal_court_name ? this.state.credit_detail.credit[0].legal_court_name : 'N/A' : 'N/A' : 'N/A' : 'N/A'}</h3>
                     </li>
                     <li>
                        <h2>Court Number</h2>
                     </li>
                     <li>
                        <h3>{this.state.credit_detail ? this.state.credit_detail.credit ? this.state.credit_detail.credit[0] ? this.state.credit_detail.credit[0].legal_court_num ? this.state.credit_detail.credit[0].legal_court_num : 'N/A' : 'N/A' : 'N/A' : 'N/A'}</h3>
                     </li>
                     <li>
                        <h2>Case Number</h2>
                     </li>
                     <li>
                        <h3>{this.state.credit_detail ? this.state.credit_detail.credit ? this.state.credit_detail.credit[0] ? this.state.credit_detail.credit[0].legal_casenumber ? this.state.credit_detail.credit[0].legal_casenumber : 'N/A' : 'N/A' : 'N/A' : 'N/A'}</h3>
                     </li>
                     <li>
                        <h2>Status</h2>
                     </li>
                     <li>
                        <h3>{this.state.credit_detail ? this.state.credit_detail.credit ? this.state.credit_detail.credit[0] ? this.state.credit_detail.credit[0].legal_status ? this.state.credit_detail.credit[0].legal_status : 'N/A' : 'N/A' : 'N/A' : 'N/A'}</h3>
                     </li>
                     <li>
                        <h2>Status Date</h2>
                     </li>
                     <li>
                        <h3>{this.state.credit_detail ? this.state.credit_detail.credit ? this.state.credit_detail.credit[0] ? this.state.credit_detail.credit[0].legal_satisfied_date ? this.state.credit_detail.credit[0].legal_satisfied_date : 'N/A' : 'N/A' : 'N/A' : 'N/A'}</h3>
                     </li>
                     <li>
                        <h2>Amount</h2>
                     </li>
                     <li>
                        <h3>{this.state.credit_detail ? this.state.credit_detail.credit ? this.state.credit_detail.credit[0] ? this.state.credit_detail.credit[0].legal_amount ? this.state.credit_detail.credit[0].legal_amount : 'N/A' : 'N/A' : 'N/A' : 'N/A'}</h3>
                     </li>
                     <li>
                        <h2>Defendant</h2>
                     </li>
                     <li>
                        <h3>{this.state.credit_detail ? this.state.credit_detail.credit ? this.state.credit_detail.credit[0] ? this.state.credit_detail.credit[0].legal_defendant ? this.state.credit_detail.credit[0].legal_defendant : 'N/A' : 'N/A' : 'N/A' : 'N/A'}</h3>
                     </li>
                     <li>
                        <h2>Plaintiff</h2>
                     </li>
                     <li>
                        <h3>{this.state.credit_detail ? this.state.credit_detail.credit ? this.state.credit_detail.credit[0] ? this.state.credit_detail.credit[0].legal_plaintiff ? this.state.credit_detail.credit[0].legal_plaintiff : 'N/A' : 'N/A' : 'N/A' : 'N/A'}</h3>
                     </li>
                  </ul>
               </div>
            </div>
            <div class="TradeAcc-Container">
               <div class="TradeAcc-Head">
                  <h1>Secured Loans</h1>
               </div>
               <div class="Admin-BankrupList">
                  <h1>CHATTEL MORGAGE, REGISTERED LOAN OR REGISTERED LEAN </h1>
                  <ul class="Admin-BankBorder">
                     <li>
                        <h2>Date Filed</h2>
                     </li>
                     <li>
                        <h3>{this.state.credit_detail ? this.state.credit_detail.credit ? this.state.credit_detail.credit[0] ? this.state.credit_detail.credit[0].sec_loan_date ? this.state.credit_detail.credit[0].sec_loan_date : 'N/A' : 'N/A' : 'N/A' : 'N/A'}</h3>
                     </li>
                     <li>
                        <h2>Court Name</h2>
                     </li>
                     <li>
                        <h3>{this.state.credit_detail ? this.state.credit_detail.credit ? this.state.credit_detail.credit[0] ? this.state.credit_detail.credit[0].sec_loan_name ? this.state.credit_detail.credit[0].sec_loan_name : 'N/A' : 'N/A' : 'N/A' : 'N/A'}</h3>
                     </li>
                     <li>
                        <h2>Court Number</h2>
                     </li>
                     <li>
                        <h3>{this.state.credit_detail ? this.state.credit_detail.credit ? this.state.credit_detail.credit[0] ? this.state.credit_detail.credit[0].sec_loan_cutomer_number ? this.state.credit_detail.credit[0].sec_loan_cutomer_number : 'N/A' : 'N/A' : 'N/A' : 'N/A'}</h3>
                     </li>
                     <li>
                        <h2>Creditor-Amount</h2>
                     </li>
                     <li>
                        <h3>{this.state.credit_detail ? this.state.credit_detail.credit ? this.state.credit_detail.credit[0] ? this.state.credit_detail.credit[0].sec_loan_amount ? this.state.credit_detail.credit[0].sec_loan_amount : 'N/A' : 'N/A' : 'N/A' : 'N/A'}</h3>
                     </li>
                     <li>
                        <h2>Description</h2>
                     </li>
                     <li>
                        <h3>{this.state.credit_detail ? this.state.credit_detail.credit ? this.state.credit_detail.credit[0] ? this.state.credit_detail.credit[0].sec_loan_detail ? this.state.credit_detail.credit[0].sec_loan_detail : 'N/A' : 'N/A' : 'N/A' : 'N/A'}</h3>
                     </li>
                     <li>
                        <h2>Maturity Date</h2>
                     </li>
                     <li>
                        <h3>{this.state.credit_detail ? this.state.credit_detail.credit ? this.state.credit_detail.credit[0] ? this.state.credit_detail.credit[0].sec_loan_maturity_date ? this.state.credit_detail.credit[0].sec_loan_maturity_date : 'N/A' : 'N/A' : 'N/A' : 'N/A'}</h3>
                     </li>
                  </ul>
               </div>
            </div>
            <div class="TradeAcc-Container">
               <div class="TradeAcc-Head">
                  <h1>NSFs</h1>
               </div>
               <div class="Admin-BankrupList">
                  <h1>NSF</h1>
                  <ul class="Admin-BankBorder">
                     <li>
                        <h2>Date Reported</h2>
                     </li>
                     <li>
                        <h3>{this.state.credit_detail ? this.state.credit_detail.credit ? this.state.credit_detail.credit[0] ? this.state.credit_detail.credit[0].nsf_date ? this.state.credit_detail.credit[0].nsf_date : 'N/A' : 'N/A' : 'N/A' : 'N/A'}</h3>
                     </li>
                     <li>
                        <h2>Creditor</h2>
                     </li>
                     <li>
                        <h3>{this.state.credit_detail ? this.state.credit_detail.credit ? this.state.credit_detail.credit[0] ? this.state.credit_detail.credit[0].nsf_name ? this.state.credit_detail.credit[0].nsf_name : 'N/A' : 'N/A' : 'N/A' : 'N/A'}</h3>
                     </li>
                     <li>
                        <h2>Amount</h2>
                     </li>
                     <li>
                        <h3>{this.state.credit_detail ? this.state.credit_detail.credit ? this.state.credit_detail.credit[0] ? this.state.credit_detail.credit[0].nsf_amount ? this.state.credit_detail.credit[0].nsf_amount : 'N/A' : 'N/A' : 'N/A' : 'N/A'}</h3>
                     </li>
                     <li>
                        <h2>Details</h2>
                     </li>
                     <li>
                        <h3>{this.state.credit_detail ? this.state.credit_detail.credit ? this.state.credit_detail.credit[0] ? this.state.credit_detail.credit[0].nsf_detail ? this.state.credit_detail.credit[0].nsf_detail : 'N/A' : 'N/A' : 'N/A' : 'N/A'}</h3>
                     </li>
                  </ul>
               </div>
            </div>
            <div class="TradeAcc-Container Admin-LastBt">
               <div class="TradeAcc-Head">
                  <h1>Garnishments</h1>
               </div>
               <div class="Admin-BankrupList">
                  <h1>GARNISHMENT</h1>
                  <ul class="Admin-BankBorder">
                     <li>
                        <h2>Date Filed</h2>
                     </li>
                     <li>
                        <h3>{this.state.credit_detail ? this.state.credit_detail.credit ? this.state.credit_detail.credit[0] ? this.state.credit_detail.credit[0].garnishment_date ? this.state.credit_detail.credit[0].garnishment_date : 'N/A' : 'N/A' : 'N/A' : 'N/A'}</h3>
                     </li>
                     <li>
                        <h2>Court Name</h2>
                     </li>
                     <li>
                        <h3>{this.state.credit_detail ? this.state.credit_detail.credit ? this.state.credit_detail.credit[0] ? this.state.credit_detail.credit[0].garnishment_courtname ? this.state.credit_detail.credit[0].garnishment_courtname : 'N/A' : 'N/A' : 'N/A' : 'N/A'}</h3>
                     </li>
                     <li>
                        <h2>Court Number</h2>
                     </li>
                     <li>
                        <h3>{this.state.credit_detail ? this.state.credit_detail.credit ? this.state.credit_detail.credit[0] ? this.state.credit_detail.credit[0].garnishment_courtnumber ? this.state.credit_detail.credit[0].garnishment_courtnumber : 'N/A' : 'N/A' : 'N/A' : 'N/A'}</h3>
                     </li>
                     <li>
                        <h2>Case Number</h2>
                     </li>
                     <li>
                        <h3>{this.state.credit_detail ? this.state.credit_detail.credit ? this.state.credit_detail.credit[0] ? this.state.credit_detail.credit[0].garnishment_casenum ? this.state.credit_detail.credit[0].garnishment_casenum : 'N/A' : 'N/A' : 'N/A' : 'N/A'}</h3>
                     </li>
                     <li>
                        <h2>Amount</h2>
                     </li>
                     <li>
                        <h3>{this.state.credit_detail ? this.state.credit_detail.credit ? this.state.credit_detail.credit[0] ? this.state.credit_detail.credit[0].garnishment_amount ? this.state.credit_detail.credit[0].garnishment_amount : 'N/A' : 'N/A' : 'N/A' : 'N/A'}</h3>
                     </li>
                     <li>
                        <h2>Plaintiff</h2>
                     </li>
                     <li>
                        <h3>{this.state.credit_detail ? this.state.credit_detail.credit ? this.state.credit_detail.credit[0] ? this.state.credit_detail.credit[0].garnishment_plantiff ? this.state.credit_detail.credit[0].garnishment_plantiff : 'N/A' : 'N/A' : 'N/A' : 'N/A'}</h3>
                     </li>
                     <li>
                        <h2>Garnishee</h2>
                     </li>
                     <li>
                        <h3>{this.state.credit_detail ? this.state.credit_detail.credit ? this.state.credit_detail.credit[0] ? this.state.credit_detail.credit[0].garnishment_garnishe ? this.state.credit_detail.credit[0].garnishment_garnishe : 'N/A' : 'N/A' : 'N/A' : 'N/A'}</h3>
                     </li>
                     <li>
                        <h2>Defendant</h2>
                     </li>
                     <li>
                        <h3>{this.state.credit_detail ? this.state.credit_detail.credit ? this.state.credit_detail.credit[0] ? this.state.credit_detail.credit[0].garnishment_defendant ? this.state.credit_detail.credit[0].garnishment_defendant : 'N/A' : 'N/A' : 'N/A' : 'N/A'}</h3>
                     </li>
                  </ul>
               </div>
            </div>
            </div>
         </React.Fragment >
      )
   }
}
const mapStateToProps = (state) => {
   return {
      application_credit_detail: state.adminReducer.adminAccounts.applicationReducer.application_credit_detail,
   }
}
export default connect(mapStateToProps, {
   get_credit_details
})(CreditReportDetail)

