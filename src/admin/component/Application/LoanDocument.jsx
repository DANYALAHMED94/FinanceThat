import React, { Component } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import { API_URL } from "../../../constant";
import ApplicationHeaderAdmin from "./ApplicationHeaderAdmin";

class LoanDocument extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (
      nextProps.loanDocName !== this.props.loanDocName ||
      this.props.loanDoc !== nextProps.loanDoc ||
      nextProps.loanDocName !== this.props.loanDocName ||
      nextProps.loan_document_complete !== this.props.loan_document_complete
    ) {
      this.fileInput.value = "";
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
      nextProps.loan_loading !== this.props.loan_loading
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

          {/* <div className="admin-form-head">
            <div className="admin-form-head-inner">
              {this.props.photo ? (
                <span
                  style={{
                    backgroundImage: `url(${
                      API_URL + "/media/" + this.props.photo
                    })`,
                  }}
                  className="avatar"
                ></span>
              ) : (
                <span className="avatar">{`${first}${last}`} </span>
              )}
              <strong className="title d-inline-block">
                {" "}
                {`${
                  this.props.applicantFirstName != undefined &&
                  this.props.applicantFirstName != null
                    ? this.props.applicantFirstName || ""
                    : ""
                } ${
                  this.props.applicantLastName != undefined &&
                  this.props.applicantLastName != null
                    ? this.props.applicantLastName || ""
                    : ""
                }`}{" "}
              </strong>{" "}
              <span className="date d-inline-block">
                {" "}
                {this.props.created_at != null &&
                this.props.created_at != undefined &&
                this.props.created_at !== ""
                  ? moment(this.props.created_at).format("ll")
                  : ""}{" "}
              </span>{" "}
              <span className="type d-inline-block">
                {" "}
                {this.props.firstTypeOfVehicle}{" "}
              </span>
              <span className="type d-inline-block">
                {" "}
                {`ID: ${this.props.buyerAppId}`}{" "}
              </span>
              <p>
                {" "}
                <span className="">
                  {" "}
                  <em>PH:</em>{" "}
                  {this.props.applicantTelephone != undefined &&
                  this.props.applicantTelephone != null
                    ? this.props.applicantTelephone || ""
                    : ""}{" "}
                </span>{" "}
                <span className="">
                  {" "}
                  <em>E:</em>
                  {this.props.applicantEmail != undefined &&
                  this.props.applicantEmail != null
                    ? this.props.applicantEmail || ""
                    : ""}{" "}
                </span>
                <span className="">
                  {" "}
                  <em>SIN:</em>{" "}
                  {this.props.applicantSin ? this.props.applicantSin || "" : ""}{" "}
                </span>{" "}
              </p>
              {this.props.selectedAgent &&
              Object.keys(this.props.selectedAgent).length > 0 ? (
                <Link
                  className="nav-link"
                  to={`${this.props.url}/assign-agent`}
                >
                  {" "}
                  <span className="name">
                    {" "}
                    {`${
                      this.props.selectedAgent &&
                      Object.keys(this.props.selectedAgent).length > 0
                        ? this.props.selectedAgent.label
                        : ""
                    } `}{" "}
                  </span>
                </Link>
              ) : null}
            </div>
          </div> */}
          <div className="upload-doc">
            <div className="upload-docs-head">
              <h1> Sign loan documents </h1>
              <p>
                {" "}
                Select the signing method and sign all required documents. If
                signed electronically, a completed signed copy will be emailed
                to all signers.{" "}
              </p>
              <span className="icon"></span>
            </div>
            <div className="upload-doc-content">
              <strong className="title"> Upload Signed Document </strong>
              <div className="upload-doc-box">
                <span className="icon-holder"></span>
                <div className="text-box">
                  <button className="upload-btn">
                    {" "}
                    <input
                      type="file"
                      className="custom-file-input"
                      name={`loanDoc`}
                      accept="image/*, application/pdf, application/docs,.doc, .docx,"
                      onChange={this.props._handleloanDocChange}
                      ref={(ref) => (this.fileInput = ref)}
                    />
                    <span className="text"> Upload </span>{" "}
                  </button>
                </div>
              </div>
            </div>
            {this.props.loanDoc ? (
              <div className="upload-doc-content">
                <div className="upload-doc-box">
                  <span className="icon-holder"></span>
                  <div className="text-box">
                    <h2> {this.props.loanDocName} </h2>
                    {/* <h2> {this.props.loanDocName || ''} </h2> */}
                    <p> Electronically sign on device or by email </p>
                    {/* accept="application/pdf, application/docs, .docx" */}
                    <button
                      className="upload-btn"
                      disabled={
                        this.props.loanDoc === undefined ||
                        this.props.loanDoc === null ||
                        this.props.loanDoc === ""
                      }
                      onClick={() =>
                        this.props.dowload_files(this.props.loanDoc)
                      }
                    >
                      {" "}
                      <span className=""> Download </span>{" "}
                    </button>{" "}
                    {this.props.loan_loading === true ? (
                      <i
                        class="fa fa-circle-o-notch fa-spin"
                        aria-hidden="true"
                      ></i>
                    ) : (
                      <img
                        src="/assets/image/trash-icon.svg"
                        alt="trash"
                        onClick={this.props.deleteLoanDoc}
                      />
                    )}
                  </div>
                </div>
              </div>
            ) : null}
            <div class="switch-holder">
              <input
                id="swicth"
                type="checkbox"
                name="loan_document_complete"
                checked={this.props.loan_document_complete}
                onChange={(e) =>
                  this.props.changeCompleteStatus(e, "loan_document_complete")
                }
              />
              <label for="swicth" class="switch">
                <div></div>
              </label>
              <span class="switch-label"> Complete </span>
            </div>
            <div className="footer-btns-holder clearfix">
            <Link to={`${this.props.url}/loan-payment`}>
                {" "}
                <button
                  className="btn btn-primary float-left"
                  onClick={() => this.props.onClickChangeStep(8, 7)}
                >
                  {" "}
                  Back{" "}
                </button>
              </Link>
              <Link to={`${this.props.url}/upload-doc`}>
                <button
                  className="btn btn-primary float-right active"
                  onClick={() => this.props.onClickChangeStep(8, 8)}
                >
                  {" "}
                  Continue{" "}
                </button>
              </Link>
              {/* <button className="btn btn-primary float-left"> Back  </button>
                        <button className="btn btn-primary float-right active"> Continue  </button> */}
            </div>
          </div>
        </div>
        </div>
      </React.Fragment>
    );
  }
}
export default LoanDocument;
