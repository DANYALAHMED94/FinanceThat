import React, { Component } from "react";
import { Link, useLocation } from "react-router-dom";
import { API_URL } from "../../../constant";
import ApplicationHeaderAdmin from "./ApplicationHeaderAdmin";

class VerifyIdentity extends Component {
  constructor(props) {
    super(props);
    this.state = {};
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
            <div className="id-verif">
              <span className="request-detail" style={{ float: "left" }}>
                Identity Verification
              </span>

              <span
                className=""
                style={{ float: "right" }}
              >
                <button
                  class="btn-request-id"
                  onClick={() =>
                    this.props.request_identity_verification({
                      id: this.props.buyerAppId,
                      mail: true,
                      email_address: this.props.applicantEmail,
                      screen_name: "identity",
                      screen_link: `${window.location.origin}/buyer/my-application/${this.props.buyerAppId}/verify-identity`
                    })
                  }
                >
                  Request ID
                </button>
              </span>
            </div>

            <div className="applicant-info-main id-verif-body">
            {/* <div class="Admin-PersonalInfo-Container co-applicant-detail-container"> */}
              <div class="id-verif-detail-container">
                {this.props.license && (this.props.license || []).length > 0 ? (
                  <>
                    <div className="upload-doc-content">
                      {(this.props.license || []).map((item) => (
                        <div className="upload-doc-box">
                          <span className="icon-holder"></span>
                          <div className="text-box">
                            <h2> {item.license.split("/").pop() || ""} </h2>
                            <p> Verify Identity </p>
                            <button
                              className="upload-btn"
                              disabled={!item.license}
                              onClick={() =>
                                this.props.dowload_files(
                                  `/media/${item.license}`
                                )
                              }
                            >
                              {" "}
                              <span className=""> Download </span>{" "}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  (this.props.jumio_data || []).length === 0 && (
                    <div className="id-verif-detail-head">
                      <>
                        <h1> NO IDENTITY HAS BEEN SUBMITED</h1>
                        <div className="text-center mt-5">
                        <button
                          class="btn-request-id"
                          onClick={() =>
                            this.props.request_identity_verification({
                              id: this.props.buyerAppId,
                              mail: true,
                              email_address: this.props.applicantEmail,
                              screen_name: "identity",
                              screen_link: `${window.location.origin}/buyer/my-application/${this.props.buyerAppId}/verify-identity`
                            })
                          }
                        >
                          Request ID
                        </button>
                        </div>
                      </>
                    </div>
                  )
                )}

                <div className="Admin-InfoInner">
                  {(this.props.jumio_data || []).length > 0 && (
                    <>
                      <h1>Status</h1>
                      <ul>
                        <li>
                          <div class="Admin-PrName">
                            <h2>Status</h2>
                            <h3>{this.props.jumio_status}</h3>
                          </div>
                        </li>
                      </ul>
                    </>
                  )}
                </div>
                <div class="Admin-InfoInner2">
                  {(this.props.jumio_data || []).length > 0 ? (
                    <>
                      {" "}
                      <h1>User Data</h1>
                      {(this.props.jumio_data || []).map((item, index) => (
                        <>
                          <ul>
                            <li>
                              <div class="Admin-PrName">
                                <h2>Type</h2>
                                <h3>
                                  {item.document
                                    ? item.document.type
                                      ? item.document.type
                                      : ""
                                    : ""}
                                </h3>
                              </div>
                            </li>
                            <li>
                              <div class="Admin-PrName">
                                <h2>Dob</h2>
                                <h3>
                                  {item.document
                                    ? item.document.dob
                                      ? item.document.dob
                                      : ""
                                    : ""}
                                </h3>
                              </div>
                            </li>
                            <li>
                              <div class="Admin-PrName">
                                <h2>Expiry</h2>
                                <h3>
                                  {item.document
                                    ? item.document.expiry
                                      ? item.document.expiry
                                      : ""
                                    : ""}
                                </h3>
                              </div>
                            </li>
                            <li>
                              <div class="Admin-PrName">
                                <h2>First Name</h2>
                                <h3>
                                  {item.document
                                    ? item.document.firstName
                                      ? item.document.firstName
                                      : ""
                                    : ""}
                                </h3>
                              </div>
                            </li>
                          </ul>
                          <ul>
                            <li>
                              <div class="Admin-PrName">
                                <h2>Issuing Country</h2>
                                <h3>
                                  {item.document
                                    ? item.document.issuingCountry
                                      ? item.document.issuingCountry
                                      : ""
                                    : ""}
                                </h3>
                              </div>
                            </li>
                            <li>
                              <div class="Admin-PrName">
                                <h2>Last Name</h2>
                                <h3>
                                  {item.document
                                    ? item.document.lastName
                                      ? item.document.lastName
                                      : ""
                                    : ""}
                                </h3>
                              </div>
                            </li>
                            <li>
                              <div class="Admin-PrName">
                                <h2>Number</h2>
                                <h3>
                                  {item.document
                                    ? item.document.number
                                      ? item.document.number
                                      : ""
                                    : ""}
                                </h3>
                              </div>
                            </li>
                            <li>
                              <div class="Admin-PrName">
                                <h2>Status</h2>
                                <h3>
                                  {item.document
                                    ? item.document.status
                                      ? item.document.status
                                      : ""
                                    : ""}
                                </h3>
                              </div>
                            </li>
                          </ul>
                        </>
                      ))}
                    </>
                  ) : null}
                </div>

                <div class="Admin-InfoInner2">
                  {(this.props.jumio_data || []).length > 0 ? (
                    <>
                      {" "}
                      <h1>Transaction Data</h1>
                      {(this.props.jumio_data || []).map((item, index) => (
                        <>
                          <ul>
                            <li>
                              <div class="Admin-PrName">
                                <h2>Customer Id</h2>
                                <h3>
                                  {item.transaction
                                    ? item.transaction.customerId
                                      ? item.transaction.customerId
                                      : ""
                                    : ""}
                                </h3>
                              </div>
                            </li>
                            <li>
                              <div class="Admin-PrName">
                                <h2>Date</h2>
                                <h3>
                                  {item.transaction
                                    ? item.transaction.date
                                      ? item.transaction.date
                                      : ""
                                    : ""}
                                </h3>
                              </div>
                            </li>
                            <li>
                              <div class="Admin-PrName">
                                <h2>Merchant Reporting Criteria</h2>
                                <h3>
                                  {item.transaction
                                    ? item.transaction.merchantReportingCriteria
                                      ? item.transaction
                                        .merchantReportingCriteria
                                      : ""
                                    : ""}
                                </h3>
                              </div>
                            </li>
                            <li>
                              <div class="Admin-PrName">
                                <h2>Merchant Scan Reference</h2>
                                <h3>
                                  {item.transaction
                                    ? item.transaction.merchantScanReference
                                      ? item.transaction.merchantScanReference
                                      : ""
                                    : ""}
                                </h3>
                              </div>
                            </li>
                          </ul>
                          <ul>
                            <li>
                              <div class="Admin-PrName">
                                <h2>Source</h2>
                                <h3>
                                  {item.transaction
                                    ? item.transaction.source
                                      ? item.transaction.source
                                      : ""
                                    : ""}
                                </h3>
                              </div>
                            </li>
                            <li>
                              <div class="Admin-PrName">
                                <h2>Last Name</h2>
                                <h3>
                                  {item.transaction
                                    ? item.transaction.lastName
                                      ? item.transaction.lastName
                                      : ""
                                    : ""}
                                </h3>
                              </div>
                            </li>
                            <li>
                              <div class="Admin-PrName">
                                <h2>Status</h2>
                                <h3>
                                  {item.transaction
                                    ? item.transaction.status
                                      ? item.transaction.status
                                      : ""
                                    : ""}
                                </h3>
                              </div>
                            </li>
                            <li>
                              <div class="Admin-PrName">
                                <h2>Updated At</h2>
                                <h3>
                                  {item.transaction
                                    ? item.transaction.updatedAt
                                      ? item.transaction.updatedAt
                                      : ""
                                    : ""}
                                </h3>
                              </div>
                            </li>
                          </ul>
                        </>
                      ))}
                    </>
                  ) : null}
                </div>

                <div class="Admin-InfoInner2">
                  {(this.props.jumio_data || []).length > 0 ? (
                    <>
                      {" "}
                      <h1>Verification Data</h1>
                      <ul>
                        {(this.props.jumio_data || []).map((item, index) => (
                          <>
                            <li>
                              <div class="Admin-PrName">
                                <h2>verification</h2>
                                <h3>
                                  {item.verification
                                    ? item.verification.mrzCheck
                                      ? item.verification.mrzCheck
                                      : ""
                                    : ""}
                                </h3>
                              </div>
                            </li>
                          </>
                        ))}
                      </ul>
                    </>
                  ) : null}
                </div>

                <div class="Admin-InfoInner2">
                  {(this.props.jumio_data || []).length > 0 ? (
                    <>
                      {" "}
                      <h1>Images</h1>
                      {this.props.jumio_images
                        ? this.props.jumio_images[0]
                          ? this.props.jumio_images[0].images
                            ? (this.props.jumio_images[0].images || []).map(
                              (item, index) => (
                                <ul>
                                  <li>
                                    <div class="Admin-PrName">
                                      {item ? (
                                        <img
                                          src={`${API_URL}/${item}`}
                                          alt={item}
                                        />
                                      ) : (
                                        ""
                                      )}
                                    </div>
                                  </li>
                                </ul>
                              )
                            )
                            : null
                          : null
                        : null}
                    </>
                  ) : null}
                </div>
              </div>

              {(this.props.jumio_data || []).length !== 0 && ( <div class="switch-holder">
                <input
                  id="swicth"
                  type="checkbox"
                  name="verify_identity_complete"
                  checked={this.props.verify_identity_complete}
                  onChange={(e) =>
                    this.props.changeCompleteStatus(
                      e,
                      "verify_identity_complete"
                    )
                  }
                />
                <label for="swicth" class="switch">
                  <div></div>
                </label>
                <span class="switch-label"> Complete </span>
              </div>)}

              <div className="footer-btns-holder clearfix">
              <Link to={`${this.props.url}/trade-in`}>                  {" "}
                  <button
                    class="btn btn-primary float-left"
                    onClick={() => this.props.onClickChangeStep(5, 4)}
                  >
                    {" "}
                    Back{" "}
                  </button>
                </Link>
                <Link to={`${this.props.url}/income-verify`}>
                  <button
                    className="btn btn-primary float-right active"
                    onClick={() => this.props.onClickChangeStep(5, 6)}
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
export default VerifyIdentity;
