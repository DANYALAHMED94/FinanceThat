import React, { Component } from "react";
import { Link } from "react-router-dom";
import ApplicationHeaderAdmin from "./ApplicationHeaderAdmin";

class IncomeVerification extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (
      nextProps.incomeVerification !== this.props.incomeVerification ||
      nextProps.incomeVerificationName !== this.props.incomeVerificationName ||
      nextProps.incomeVerificationStatmentName !==
        this.props.incomeVerificationStatmentName
    ) {
      return true;
    }
    if (
      nextProps.applicantFirstName !== this.props.applicantFirstName ||
      nextProps.applicantLastName !== this.props.applicantLastName ||
      nextProps.created_at !== this.props.created_at ||
      nextProps.applicantTelephone !== this.props.applicantTelephone ||
      nextProps.applicantEmail !== this.props.applicantEmail ||
      nextProps.applicantSin !== this.props.applicantSin ||
      nextProps.photo !== this.props.photo ||
      nextProps.income_verification_complete !==
        this.props.income_verification_complete ||
      nextProps.income_verification_json !== this.props.income_verification_json
    ) {
      return true;
    }
    return false;
  }

  render() {
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
        <div className="app-form-content-inner">

          <ApplicationHeaderAdmin {...this.props} />
          <div className="income-id-verif">
              <span className="income-request-detail" style={{ float: "left" }}>
              Income Verification
              </span>

              <span
                className=""
                style={{ float: "right" }}
              >
                <button
                  class="income-btn-request-id"
                  onClick={() =>
                    this.props.request_identity_verification({
                      id: this.props.buyerAppId,
                      mail: true,
                      email_address: this.props.applicantEmail,
                      screen_name: "income",
                      screen_link: `${window.location.origin}/buyer/my-application/${this.props.buyerAppId}/income-verify`
                    })
                  }
                >
                  Request Income
                </button>
              </span>
            </div>
          <div className="upload-doc">
            {this.props.incomeVerification || (this.props.income_statement || []).length > 0  ? (
              <>
              <div className="upload-docs-head income-verification-head clearfix">
              <h1 className="float-left"> Income Verification documents </h1>
              <span className="icon float-right"></span>
            </div>
             <div className="upload-doc-content">
                {this.props.incomeVerification ? (
                  <>
                    {" "}
                    <div className="upload-doc-box">
                      <span className="icon-holder"></span>
                      <div className="text-box">
                        {/* <h2> IncomeVerification.pdf </h2> */}
                        <h2> {this.props.incomeVerificationName || ""} </h2>
                        {/* <h2> {this.props.loanDocName || ''} </h2> */}
                        <p> Income Verification file </p>

                        {this.props.income_file === false ? (
                          <Link
                            to={{
                              pathname: `/admin/application/pdf/${this.props.buyerAppId}`,
                            }}
                            target="_blank"
                          >
                            <button
                              className="upload-btn"
                              disabled={!this.props.incomeVerification}
                            >
                              <span className=""> Preview </span>

                              {/* <span className=""> Download </span>{" "} */}
                            </button>
                          </Link>
                        ) : (
                          <button
                            className="upload-btn"
                            disabled={!this.props.incomeVerification}
                            onClick={() =>
                              this.props.dowload_files(
                                "/media/" + this.props.incomeVerification
                              )
                            }
                          >
                            {" "}
                            <span className=""> Download </span>{" "}
                          </button>
                        )}
                      </div>
                    </div>
                  </>
                ) : null}
                {this.props.income_statement &&
                (this.props.income_statement || []).length > 0 ? (
                  <>
                    {(this.props.income_statement || []).map((item) => (
                      <div className="upload-doc-box">
                        <span className="icon-holder"></span>
                        <div className="text-box">
                          {/* <h2> IncomeVerification.pdf </h2> */}
                          <h2> {item.income.split("/").pop() || ""} </h2>
                          {/* <h2> {this.props.loanDocName || ''} </h2> */}
                          <p> Income Verification file </p>

                          <button
                            className="upload-btn"
                            disabled={!item.income}
                            onClick={() =>
                              this.props.dowload_files(`/media/${item.income}`)
                            }
                          >
                            {" "}
                            <span className=""> Download </span>{" "}
                          </button>
                        </div>
                      </div>
                    ))}
                  </>
                ) : null}
              </div>
              </>
            ) : (
              <div className="income-id-verif-detail-head">
                      <>
                        <h1> NO INCOME HAS BEEN SUBMITED</h1>
                        <div className="text-center mt-5">
                        <button
                          class="btn-request-id"
                          onClick={() =>
                            this.props.request_identity_verification({
                              id: this.props.buyerAppId,
                              mail: true,
                              email_address: this.props.applicantEmail,
                              screen_name: "income",
                              screen_link: `${window.location.origin}/buyer/my-application/${this.props.buyerAppId}/income-verify`
                            })
                          }
                        >
                          Request Income
                        </button>
                        </div>
                      </>
                    </div>
            )}

            {this.props.incomeVerification ? (
            <div class="switch-holder">
              <input
                id="swicth"
                type="checkbox"
                name="income_verification_complete"
                checked={this.props.income_verification_complete}
                onChange={(e) =>
                  this.props.changeCompleteStatus(
                    e,
                    "income_verification_complete"
                  )
                }
              />
              <label for="swicth" class="switch">
                <div></div>
              </label>
              <span class="switch-label"> Complete </span>
            </div>
            ):null}
            <div className="footer-btns-holder clearfix">
              <Link to={`${this.props.url}/verify-identity`}>
                {" "}
                <button
                  className="btn btn-primary float-left"
                  onClick={() => this.props.onClickChangeStep(6, 5)}
                >
                  {" "}
                  Back{" "}
                </button>
              </Link>
              <Link to={`${this.props.url}/loan-payment`}>
                <button
                  className="btn btn-primary float-right active"
                  onClick={() => this.props.onClickChangeStep(6, 7)}
                >
                  {" "}
                  Continue{" "}
                </button>
              </Link>
            </div>
          </div>
        </div>
        </div>
      </React.Fragment>
    );
  }
}
export default IncomeVerification;
