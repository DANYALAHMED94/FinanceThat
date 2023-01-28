import React, { Component } from "react";
import { Link } from "react-router-dom";
import Select, { components } from "react-select";
import { Scrollbars } from "react-custom-scrollbars";
import NumberFormat from "react-number-format";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getMonth, getYear } from "date-fns";
import range from "lodash/range";
import moment from "moment";
import { API_URL } from "../../../constant";
import ApplicationHeaderAdmin from "./ApplicationHeaderAdmin";

class LoanPaymentDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.updateAdminLoanDocumentDetail !==
      this.props.updateAdminLoanDocumentDetail &&
      this.props.updateAdminLoanDocumentDetail !== undefined
    ) {
      this.props.onClickChangeStep(7, 8);
      this.props.history.push(`${this.props.url}/loan-document`);
    }
  }

  update_loadPayment_detail = () => {
    const data = {
      id: this.props.buyerAppId,
      "loan": {
        "cash_price": !this.props.loanCashPrice
          ? 0
          : this.props.loanCashPrice
            .toString()
            .split(",")
            .join("")
            .split("$")
            .join(""),
        "taxes": !this.props.loanTaxes
          ? 0
          : this.props.loanTaxes
            .toString()
            .split(",")
            .join("")
            .split("$")
            .join(""),
        "down_payment": !this.props.loanDownPayment
          ? 0
          : this.props.loanDownPayment
            .toString()
            .split(",")
            .join("")
            .split("$")
            .join(""),
        "dealer_admin_fee": !this.props.loanDealerAdminFee
          ? 0
          : this.props.loanDealerAdminFee
            .toString()
            .split(",")
            .join("")
            .split("$")
            .join(""),
        "license_fee": !this.props.loanLicenseFee
          ? 0
          : this.props.loanLicenseFee
            .toString()
            .split(",")
            .join("")
            .split("$")
            .join(""),
        "extended_warranty": !this.props.loanExtendedWarranty
          ? 0
          : this.props.loanExtendedWarranty
            .toString()
            .split(",")
            .join("")
            .split("$")
            .join(""),
        "gap_insurance": !this.props.loanGapInsurance
          ? 0
          : this.props.loanGapInsurance
            .toString()
            .split(",")
            .join("")
            .split("$")
            .join(""),
        "terms": this.props.loanTerms,
        "amortization": this.props.loanAmortization,
        "payment_frequency": this.props.loanPaymentFrequency,
        "interest_rate": !this.props.loanInterestRate
          ? 0
          : this.props.loanInterestRate
            .toString()
            .split(",")
            .join("")
            .split("$")
            .join(""),
        "amount_financed": !this.props.loanAmountFinanced
          ? 0
          : this.props.loanAmountFinanced
            .toString()
            .split(",")
            .join("")
            .split("$")
            .join(""),
        "frequency_payment": !this.props.loanFrequencyPayment
          ? 0
          : this.props.loanFrequencyPayment
            .toString()
            .split(",")
            .join("")
            .split("$")
            .join(""),
      },
      additional_item: [],
    };
    if(this.props.loanFirstPaymentDate){
      data.first_payment_date= moment(this.props.loanFirstPaymentDate).format("YYYY-MM-DD");
    }
    this.props.update_application_detail(data, "updateAdminLoanDocumentDetail");
  };

  render() {
    const years = range(1900, getYear(new Date()) + 1, 1);
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const { Option } = components;

    const renderScrollbar = (props) => {
      return (
        <div style={{ height: 260 }}>
          <Scrollbars>{props.children}</Scrollbars>
        </div>
      );
    };

    const renderOption = (props) => {
      return (
        <Option {...props}>
          <div>{props.data.label}</div>
        </Option>
      );
    };
    let first = this.props.applicantFirstName
      ? this.props.applicantFirstName.split(" ")[0]
      : "";
    let last = this.props.applicantLastName
      ? this.props.applicantLastName.split(" ")[0]
      : "";
    first = first ? first.charAt(0).toUpperCase() : "";
    last = last ? last.charAt(0).toUpperCase() : "";
    return (
      <React.Fragment>
        <div className="app-form-content">
          <ApplicationHeaderAdmin {...this.props} />

          <ul
            className="nav nav-tabs-2 singleItem"
            id="formAppTabs"
            role="tablist"
          >
            <li className="nav-item">
              <a
                className={"nav-link active"}
                id="assets-detail-tab"
                data-toggle="tab"
                href="#assets-detail"
                role="tab"
                aria-controls="assets-detail"
                aria-selected={"false"}
              >
                <span className="tabs-text loan-detail">
                  Loan Details{" "}
                </span>{" "}
              </a>
            </li>

          </ul>

          <div className="applicant-info-main2">
            <div className="form-main">
              <div className="form-field-row two-col clearfix">
                <div className="form-field-col">
                  <label> Cash Price </label>
                  <NumberFormat
                    required
                    className="form-control"
                    value={this.props.loanCashPrice}
                    onChange={this.props.handleOnChange}
                    allowNegative={false}
                    id="loanCashPrice"
                    name="loanCashPrice"
                    placeholder=""
                    thousandSeparator={true}
                    prefix={"$"}
                  />
                </div>
                <div className="form-field-col">
                  <label> Taxes </label>
                  <NumberFormat
                    required
                    className="form-control"
                    value={this.props.loanTaxes}
                    onChange={this.props.handleOnChange}
                    allowNegative={false}
                    id="loanTaxes"
                    name="loanTaxes"
                    placeholder=""
                    thousandSeparator={true}
                    prefix={"$"}
                  />
                </div>
              </div>

              <div className="form-field-row two-col clearfix">
                <div className="form-field-col">
                  <label> Down Payment </label>

                  <NumberFormat
                    required
                    className="form-control"
                    value={this.props.loanDownPayment}
                    onChange={this.props.handleOnChange}
                    allowNegative={false}
                    id="loanDownPayment"
                    name="loanDownPayment"
                    placeholder=""
                    thousandSeparator={true}
                    prefix={"$"}
                  />
                </div>
                <div className="form-field-col">
                  <label> Dealer Admin Fee </label>
                  <NumberFormat
                    required
                    className="form-control"
                    value={this.props.loanDealerAdminFee}
                    onChange={this.props.handleOnChange}
                    allowNegative={false}
                    id="loanDealerAdminFee"
                    name="loanDealerAdminFee"
                    placeholder=""
                    thousandSeparator={true}
                    prefix={"$"}
                  />
                </div>
              </div>

              <div className="form-field-row two-col clearfix">
                <div className="form-field-col">
                  <label> License Fee </label>

                  <NumberFormat
                    required
                    className="form-control"
                    value={this.props.loanLicenseFee}
                    onChange={this.props.handleOnChange}
                    allowNegative={false}
                    id="loanLicenseFee"
                    name="loanLicenseFee"
                    placeholder=""
                    thousandSeparator={true}
                    prefix={"$"}
                  />
                </div>
                <div className="form-field-col">
                  <label> Extended Warranty </label>

                  <NumberFormat
                    required
                    className="form-control"
                    value={this.props.loanExtendedWarranty}
                    onChange={this.props.handleOnChange}
                    allowNegative={false}
                    id="loanExtendedWarranty"
                    name="loanExtendedWarranty"
                    placeholder=""
                    thousandSeparator={true}
                    prefix={"$"}
                  />
                </div>
              </div>

              <div className="form-field-row two-col clearfix">
                <div className="form-field-col">
                  <label> Gap Insurance </label>

                  <NumberFormat
                    required
                    className="form-control"
                    value={this.props.loanGapInsurance}
                    onChange={this.props.handleOnChange}
                    allowNegative={false}
                    id="loanGapInsurance"
                    name="loanGapInsurance"
                    placeholder=""
                    thousandSeparator={true}
                    prefix={"$"}
                  />
                </div>
                <div className="form-field-col">
                  <label> First Payment Date </label>
                  <DatePicker
                    required
                    renderCustomHeader={({
                      date,
                      changeYear,
                      changeMonth,
                      decreaseMonth,
                      increaseMonth,
                      prevMonthButtonDisabled,
                      nextMonthButtonDisabled,
                    }) => (
                      <div
                        style={{
                          margin: 10,
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <button
                          onClick={decreaseMonth}
                          disabled={prevMonthButtonDisabled}
                          type="button"
                        >
                          {"<"}
                        </button>
                        <select
                          value={getYear(date)}
                          onChange={({ target: { value } }) =>
                            changeYear(value)
                          }
                        >
                          {years.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>

                        <select
                          value={months[getMonth(date)]}
                          onChange={({ target: { value } }) =>
                            changeMonth(months.indexOf(value))
                          }
                        >
                          {months.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                        <button
                          onClick={increaseMonth}
                          disabled={nextMonthButtonDisabled}
                          type="button"
                        >
                          {">"}
                        </button>
                      </div>
                    )}
                    selected={this.props.loanFirstPaymentDate}
                    placeholderText="YYYY-MM-DD"
                    dateFormat="yyyy-MM-dd"
                    onChange={(e) =>
                      this.props.handleOnChangeDates(e, "loanFirstPaymentDate")
                    }
                    maxDate={new Date()}
                    name="loanFirstPaymentDate"
                    className="form-control callendar"
                  />
                </div>
              </div>

              <div className="form-field-row two-col clearfix">
                <div className="form-field-col">
                  <label> Terms </label>
                  <Select
                    required
                    placeholder=""
                    id="selectedLoanTerms"
                    name="selectedLoanTerms"
                    options={this.props.terms}
                    onChange={(e) =>
                      this.props.changeSelect(
                        e,
                        "loanTerms",
                        "selectedLoanTerms"
                      )
                    }
                    value={this.props.selectedLoanTerms}
                    className="react-select-main"
                    classNamePrefix="react-select"
                    components={{
                      Option: renderOption,
                      MenuList: renderScrollbar,
                    }}
                    captureMenuScroll={false}
                  />
                </div>
                <div className="form-field-col">
                  <label> Amortization </label>
                  <Select
                    required
                    placeholder=""
                    id="selectedLoanAmortization"
                    name="selectedLoanAmortization"
                    options={this.props.amortizationValues}
                    onChange={(e) =>
                      this.props.changeSelect(
                        e,
                        "loanAmortization",
                        "selectedLoanAmortization"
                      )
                    }
                    value={this.props.selectedLoanAmortization}
                    className="react-select-main"
                    classNamePrefix="react-select"
                    components={{
                      Option: renderOption,
                      MenuList: renderScrollbar,
                    }}
                    captureMenuScroll={false}
                  />
                </div>
              </div>


              <div className="form-field-row two-col clearfix">
                <div className="form-field-col">
                  <label> Payment Frequency </label>

                  <Select
                    required
                    placeholder=""
                    id="selectedLoanPaymentFrequency"
                    name="selectedLoanPaymentFrequency"
                    options={this.props.inComeFrequencies}
                    onChange={(e) =>
                      this.props.changeSelect(
                        e,
                        "loanPaymentFrequency",
                        "selectedLoanPaymentFrequency"
                      )
                    }
                    value={this.props.selectedLoanPaymentFrequency}
                    className="react-select-main"
                    classNamePrefix="react-select"
                    components={{
                      Option: renderOption,
                      MenuList: renderScrollbar,
                    }}
                    captureMenuScroll={false}
                  />
                </div>
                <div className="form-field-col">
                  <label> Interest Rate </label>
                  <NumberFormat
                    required
                    className="form-control"
                    value={this.props.loanInterestRate}
                    onChange={this.props.handleOnChange}
                    allowNegative={false}
                    id="loanInterestRate"
                    name="loanInterestRate"
                    placeholder=""
                    thousandSeparator={true}
                    prefix={"$"}
                  />
                </div>
              </div>

              <div className="form-field-row two-col clearfix">
                <div className="form-field-col">
                  <label> Total Amount Financed </label>
                  <NumberFormat
                    required
                    className="form-control"
                    value={this.props.loanAmountFinanced}
                    onChange={this.props.handleOnChange}
                    allowNegative={false}
                    id="loanAmountFinanced"
                    name="loanAmountFinanced"
                    placeholder=""
                    thousandSeparator={true}
                    prefix={"$"}
                  />
                </div>
                <div className="form-field-col">
                  <label> Frequency Payment </label>
                  <NumberFormat
                    required
                    className="form-control"
                    value={this.props.loanFrequencyPayment}
                    onChange={this.props.handleOnChange}
                    allowNegative={false}
                    id="loanFrequencyPayment"
                    name="loanFrequencyPayment"
                    placeholder=""
                    thousandSeparator={true}
                    prefix={"$"}
                  />
                </div>
              </div>


            </div>
            <div class="switch-holder">
              <input
                id="swicth"
                type="checkbox"
                name="loan_payment_complete"
                checked={this.props.loan_payment_complete}
                onChange={(e) =>
                  this.props.changeCompleteStatus(e, "loan_payment_complete")
                }
              />
              <label for="swicth" class="switch">
                <div></div>
              </label>
              <span class="switch-label"> Complete </span>
            </div>
            <div className="footer-btns-holder clearfix">
              <Link to={`${this.props.url}/income-verify`}>
                {" "}
                <button
                  className="btn btn-primary float-left"
                  onClick={() => this.props.onClickChangeStep(7, 6)}
                >
                  {" "}
                  Back{" "}
                </button>
              </Link>
              {this.props.loading_update === true ? (
                <button className="btn btn-primary float-right active">
                  {" "}
                  <i
                    class="fa fa-circle-o-notch fa-spin"
                    aria-hidden="true"
                  ></i>{" "}
                </button>
              ) : (
                <button
                  className="btn btn-primary float-right active"
                  onClick={this.update_loadPayment_detail}
                >
                  {" "}
                  Save{" "}
                </button>
              )}

            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default LoanPaymentDetail;
