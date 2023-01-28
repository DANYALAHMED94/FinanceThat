import React, { Component } from "react";
import { Link } from "react-router-dom";
import moment from "moment";

class LoanPaymentDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  goBack = () => {
    if (
      this.props.postApp &&
      this.props.postApp[4] &&
      this.props.postApp[4].disbaled
    ) {
      this.props.onClickChangeStep(5, 4);
      this.props.history.push(`${this.props.url}/verify-identity`);
    } else {
      this.props.onClickChangeStep(6, 5);
      this.props.history.push(`${this.props.url}/income-verify`);
    }
  };
  render() {
    return (
      <React.Fragment>
        <div className="app-form-content">
          <div className="applicant-info-main">
            <div className="forms-head clearfix">
              <h1> Application {this.props.buyerAppId || ""} </h1>
            </div>
            <div className="applicant-info-box">
              <div className="applicant-info-head clearfix">
                <h2 className="float-left"> Applicant Information </h2>
                {Number(this.props.applicationStatus) === Number("1") ? (
                  <React.Fragment>
                    <span className="applicant-info-status float-right decline">
                      {" "}
                      Credit Unknown{" "}
                    </span>
                  </React.Fragment>
                ) : Number(this.props.applicationStatus) === Number("2") ? (
                  <React.Fragment>
                    <span className="applicant-info-status float-right conditionally-approved">
                      {" "}
                      Amount Requested{" "}
                    </span>
                  </React.Fragment>
                ) : Number(this.props.applicationStatus) === Number("3") ? (
                  <React.Fragment>
                    <span className="applicant-info-status float-right pre-approved">
                      {" "}
                      Amount Requested{" "}
                    </span>
                  </React.Fragment>
                ) : Number(this.props.applicationStatus) === Number("4") ? (
                  <React.Fragment>
                    <span className="applicant-info-status float-right decline">
                      {" "}
                      Declined{" "}
                    </span>
                  </React.Fragment>
                ) : Number(this.props.applicationStatus) === Number("5") ? (
                  <React.Fragment>
                    <span className="applicant-info-status float-right approved">
                      {" "}
                      Amount Requested{" "}
                    </span>
                  </React.Fragment>
                ) : Number(this.props.applicationStatus) === Number("6") ? (
                  <React.Fragment>
                    <span className="applicant-info-status float-right funded">
                      {" "}
                      Booked{" "}
                    </span>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    {/* <span className="applicant-info-status float-right approved"> {this.props.applicationStatus} </span> */}
                    <span className="applicant-info-status float-right approved">
                      {" "}
                      {this.props.applicationStatus === "pending"
                        ? "Credit Unknown"
                        : this.props.applicationStatus}{" "}
                    </span>
                  </React.Fragment>
                )}
                {/* <span className="applicant-info-status float-right approved"> Conditionally approved </span> */}
              </div>
              <div className="applicant-info-amount clearfix">
                <div className="left-section float-left">
                  <h3>
                    {" "}
                    {`${
                      this.props.applicantFirstName !== undefined &&
                      this.props.applicantFirstName !== null
                        ? this.props.applicantFirstName
                        : ""
                    } ${
                      this.props.applicantLastName !== undefined &&
                      this.props.applicantLastName !== null
                        ? this.props.applicantLastName
                        : ""
                    }`}{" "}
                  </h3>
                  <p>
                    {" "}
                    {this.props.applicantEmail !== undefined &&
                    this.props.applicantEmail !== null
                      ? this.props.applicantEmail
                      : ""}{" "}
                  </p>
                  <p>
                    {" "}
                    {this.props.applicantTelephone !== undefined &&
                    this.props.applicantTelephone !== null
                      ? this.props.applicantTelephone
                      : ""}
                  </p>
                </div>
                <div className="right-section float-right">
                  {Number(this.state.applicationStatus) === Number("1") ? (
                    <React.Fragment>
                      <span className="requested-amount-label"> Declined </span>
                    </React.Fragment>
                  ) : Number(this.state.applicationStatus) === Number("2") ? (
                    <React.Fragment>
                      <span className="requested-amount-label">
                        {" "}
                        Conditionally approved{" "}
                      </span>
                    </React.Fragment>
                  ) : Number(this.state.applicationStatus) === Number("3") ? (
                    <React.Fragment>
                      <span className="requested-amount-label">
                        {" "}
                        Pre-approved{" "}
                      </span>
                    </React.Fragment>
                  ) : Number(this.state.applicationStatus) === Number("4") ? (
                    <React.Fragment>
                      <span className="requested-amount-label"> Decline </span>
                    </React.Fragment>
                  ) : Number(this.state.applicationStatus) === Number("5") ? (
                    <React.Fragment>
                      <span className="requested-amount-label"> Approved </span>
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      <span className="requested-amount-label">
                        {" "}
                        {this.state.applicationStatus}{" "}
                      </span>
                    </React.Fragment>
                  )}
                  {/* <span className="requested-amount-label"> Amount Requested </span> */}
                  <span className="requested-amount">
                    {" "}
                    {this.props.financingAmount !== null &&
                    this.props.financingAmount !== ""
                      ? new Intl.NumberFormat("en-US", {
                          style: "currency",
                          currency: "USD",
                        }).format(Number(this.props.financingAmount)) // '$100.00'
                      : new Intl.NumberFormat("en-US", {
                          style: "currency",
                          currency: "USD",
                        }).format(0)}{" "}
                  </span>
                  <span className="requested-date">
                    {" "}
                    {moment(this.props.created_at).format("ll")}{" "}
                  </span>
                </div>
              </div>
              <div className="financing-information-box clearfix">
                <h3> Financing information </h3>
                <div className="row">
                  <div className="col-md-3">
                    <span className="label">
                      {" "}
                      {Number(this.props.applicationStatus) === Number("1") ? (
                        <React.Fragment>
                          <span className="requested-amount-label">
                            {" "}
                            Declined{" "}
                          </span>
                        </React.Fragment>
                      ) : Number(this.props.applicationStatus) ===
                        Number("2") ? (
                        <React.Fragment>
                          <span className="requested-amount-label">
                            {" "}
                            Conditionally approved upto{" "}
                          </span>
                        </React.Fragment>
                      ) : Number(this.props.applicationStatus) ===
                        Number("3") ? (
                        <React.Fragment>
                          <span className="requested-amount-label">
                            {" "}
                            Pre-approved upto{" "}
                          </span>
                        </React.Fragment>
                      ) : Number(this.props.applicationStatus) ===
                        Number("4") ? (
                        <React.Fragment>
                          <span className="requested-amount-label">
                            {" "}
                            Decline{" "}
                          </span>
                        </React.Fragment>
                      ) : Number(this.props.applicationStatus) ===
                        Number("5") ? (
                        <React.Fragment>
                          <span className="requested-amount-label">
                            {" "}
                            Approved{" "}
                          </span>
                        </React.Fragment>
                      ) : (
                        <React.Fragment>
                          <span className="requested-amount-label">
                            {" "}
                            {this.props.applicationStatus ||
                              "Approved Amount"}{" "}
                          </span>
                        </React.Fragment>
                      )}{" "}
                    </span>
                    <span className="text">
                      {" "}
                      {this.props.approvedAmount
                        ? new Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: "USD",
                          }).format(Number(this.props.approvedAmount)) // '$100.00'
                        : "N/A"}{" "}
                    </span>
                    {/* <span className="text">  {this.props.approvedAmount ? new Intl.NumberFormat('en-US',
                                        { style: 'currency', currency: 'USD' }
                                    ).format(Number(this.props.approvedAmount))// '$100.00'
                                        : new Intl.NumberFormat('en-US',
                                            { style: 'currency', currency: 'USD' }
                                        ).format(0)} </span> */}
                  </div>
                  <div className="col-md-3">
                    <span className="label"> Amortization </span>
                    <span className="text">
                      {" "}
                      {this.props.amortization === "N/A"
                        ? this.props.amortization
                        : `${this.props.amortization} Months`}{" "}
                    </span>
                  </div>
                  <div className="col-md-3">
                    <span className="label"> Down Payment Amount </span>
                    <span className="text">
                      {" "}
                      {this.props.downPayment === "N/A"
                        ? this.props.downPayment
                        : this.props.downPayment
                        ? new Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: "USD",
                          }).format(Number(this.props.downPayment)) // '$100.00'
                        : new Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: "USD",
                          }).format(0)}{" "}
                    </span>
                  </div>
                  <div className="col-md-3">
                    <span className="label"> Interest Rate </span>
                    <span className="text">
                      {" "}
                      {this.props.interestRate === "N/A"
                        ? this.props.interestRate
                        : `${
                            this.props.interestRate
                              ? this.props.interestRate.toLocaleString("en-US")
                              : (0).toLocaleString("en-US")
                          } %`}{" "}
                    </span>
                  </div>
                </div>
              </div>
              <div className="payment">
                <span className="label"> Payments </span>
                {Number(this.props.monthlyAmount) === 0 ? (
                  <h3>{"N/A"}</h3>
                ) : (
                  <h3>
                    {" "}
                    {this.props.monthlyAmount
                      ? new Intl.NumberFormat("en-US", {
                          style: "currency",
                          currency: "USD",
                        }).format(Number(this.props.monthlyAmount)) // '$100.00'
                      : new Intl.NumberFormat("en-US", {
                          style: "currency",
                          currency: "USD",
                        }).format(0)}{" "}
                    <span> {this.props.paymentType} </span>{" "}
                  </h3>
                )}
              </div>
            </div>
            <div className="footer-btns-holder clearfix">
              {/* <Link to={`${this.props.url}/income-verify`}> */}{" "}
              <button
                className="btn btn-primary float-left"
                onClick={this.goBack}
              >
                {" "}
                Back{" "}
              </button>
              {/* </Link> */}
              <Link to={`${this.props.url}/loan-document`}>
                <button
                  className="btn btn-primary float-right active"
                  onClick={() => this.props.onClickChangeStep(6, 7)}
                >
                  {" "}
                  Continue{" "}
                </button>
              </Link>
              {/* <button className="btn btn-primary float-right active"> Continue  </button> */}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default LoanPaymentDetail;
