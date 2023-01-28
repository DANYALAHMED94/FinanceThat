import React, { Component } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import { API_URL } from "../../../constant";
import ApplicationHeaderAdmin from "./ApplicationHeaderAdmin";

class UploadDoc extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (
      nextProps.documents !== this.props.documents ||
      nextProps.documentsTable !== this.props.documentsTable ||
      nextProps.adminDocumentRequest !== this.props.adminDocumentRequest ||
      nextProps.loading_delete_uploaded_doc !==
      this.props.loading_delete_uploaded_doc ||
      nextProps.upload_doc_complete !== this.props.upload_doc_complete
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
      nextProps.buyerAppId !== this.props.buyerAppId
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
          <div className="upload-doc">
            <div className="upload-docs-head">
              <h1> Sign loan documents </h1>
              <p>
                Select the signing method and sign all required documents. If
                signed electronically, a completed signed copy will be emailed
                to all signers.
              </p>
              <span className="icon"></span>
            </div>
            <div className="upload-doc-content">
              <strong className="title"> Required documents </strong>
              {(this.props.adminDocumentRequest || []).map((item, index) => (
                <div className="upload-doc-box request-box" key={index}>
                  <span className="icon-holder"></span>
                  <div className="text-box">
                    <h2> {item.name} </h2>
                    <p> {item.des} </p>
                    {/* accept="application/pdf, application/docs, .docx" */}
                    <button className="upload-btn" style={{ right: "216px" }}>
                      <input
                        type="file"
                        className="custom-file-input"
                        name={`doc`}
                        accept="image/png, image/jpeg, image/jpg,application/pdf, application/docs"
                        onChange={
                          item.isRequest === true
                            ? (e) =>
                              this.props._handleUploadDocChange(
                                e,
                                index,
                                item.name
                              )
                            : (e) =>
                              this.props.upload_unrequested_doc(
                                e,
                                index,
                                item.name
                              )
                        }
                        multiple
                      />
                      <span className="text"> Upload </span>
                    </button>
                    <button
                      className={
                        item.isRequest === true
                          ? "upload-btn active"
                          : "upload-btn"
                      }
                      onClick={() => this.props.updateadminUploadDoc(index)}
                      disabled={!this.props.buyerAppId}
                    >
                      <span className="text">
                        {item.isRequest === true ? "Requested" : "Request"}
                      </span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="table-holder">
              <table>
                <thead>
                  <tr>
                    <th> File Name </th>
                    <th> File Type </th>
                    <th> Status </th>
                    <th> Action </th>
                  </tr>
                </thead>
                <tbody>
                  {(this.props.documentsTable || []).map((item, index) => (
                    <tr key={index}>
                      <td> {item.name} </td>
                      <td> {item.fileType ? item.fileType : ""}</td>
                      <td> {item.file ? "Uploaded" : "Pending"} </td>
                      {/* <td> <button className="download" onClick={() => this.props.dowload_files(`/media/${item.file}`)} disabled={item.file === undefined || item.file === null || item.file === ''}> Download </button> </td> */}
                      <td>
                        <button
                          className="download"
                          onClick={() =>
                            this.props.dowload_files(`${item.file}`)
                          }
                          disabled={
                            item.file === undefined ||
                            item.file === null ||
                            item.file === ""
                          }
                        >
                          Download
                        </button>
                      </td>
                      <td>
                        <button
                          className="del"
                          onClick={() =>
                            this.props.delete_Upload_Doc(index, item.id)
                          }
                        >
                          {this.props.loading_delete_uploaded_doc === true &&
                            Number(item.id) ==
                            Number(this.props.delete_doc_id) ? (
                            <i
                              class="fa fa-circle-o-notch fa-spin"
                              aria-hidden="true"
                            ></i>
                          ) : (
                            <img
                              src="/assets/image/trash-icon.svg"
                              alt="trash"
                            />
                          )}
                        </button>
                      </td>
                      {/* <td> <button className="del" onClick={() => this.props.deleteUploadDoc(index, item.id)} > {this.props.loading_delete_uploaded_doc === true && Number(item.id) == Number(this.props.delete_doc_id) ? (<i class="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>) : (<img src="/assets/image/trash-icon.svg" alt='trash'/>)}  </button> </td> */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div class="switch-holder">
              <input
                id="swicth"
                type="checkbox"
                name="upload_doc_complete"
                checked={this.props.upload_doc_complete}
                onChange={(e) =>
                  this.props.changeCompleteStatus(e, "upload_doc_complete")
                }
              />
              <label for="swicth" class="switch">
                <div></div>
              </label>
              <span class="switch-label"> Complete </span>
            </div>
            <div className="footer-btns-holder clearfix">
              <Link to={`${this.props.url}/loan-document`}>
                <button
                  class="btn btn-primary float-left"
                  onClick={() => this.props.onClickChangeStep(7, 8)}
                >
                  Back
                </button>
              </Link>
              {/* <button class="btn btn-primary float-right active"> Continue  </button> */}
              {/* <Link to={`${this.props.url}/income-verify`}><button className="btn btn-primary float-right active" > Continue  </button></Link> */}
              <button className="btn btn-primary float-right active">
                Continue
              </button>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default UploadDoc;
