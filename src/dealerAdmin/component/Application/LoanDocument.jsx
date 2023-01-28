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
      // this.fileInput.value = "";
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
                  Loan Document{" "}
                </span>{" "}
              </a>
            </li>

          </ul>
          <div className="upload-doc">
            <div className="upload-doc-content">
              <strong className="title"> Upload Finance Agreement </strong>
              <div className="upload-doc-box">
                {this.props.loanDoc ? (
                  <>
                    <span className="icon-holder"></span>
                    <div className="text-box">
                      <h2> {this.props.loanDocName} </h2>
                      <p> Electronically sign on device or by email </p>
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
                  </>
                ) : <>
                  <span className="icon-holder"></span>
                  <div className="text-box">
                    <button className="upload-btn">
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
                </>}
              </div>
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
      </React.Fragment>
    );
  }
}
export default LoanDocument;
