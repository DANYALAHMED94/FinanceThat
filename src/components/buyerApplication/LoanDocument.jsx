import React, { Component } from 'react'

class LoanDocument extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.required_documents !== this.props.required_documents || nextProps.loanDocumentsTable !== this.props.loanDocumentsTable || nextProps.LoanDocumentName !== this.props.LoanDocumentName) {
            return true
        }
        return false
    }
    render() {
        return (<React.Fragment>
            <div className="app-form-content">
                <div className="upload-doc">
                    <div className="upload-docs-head">
                        <h1> Sign loan documents </h1>
                        <p> Select the signing method and sign all required documents. If signed electronically, a completed signed copy will be emailed to all signers. </p>
                        <span className="icon"></span>
                    </div>
                    {this.props.loanDoc ? (<div className="upload-doc-content">
                        <strong className="title"> Required documents </strong>
                        <div className="upload-doc-box">
                            <span className="icon-holder"></span>
                            <div className="text-box">
                                {/* <h2> SecuredCreditAgreementCanada.pdf </h2> */}
                                <h2> {this.props.LoanDocumentName} </h2>
                                <p> Electronically sign on device or by email </p>
                                {/* accept="application/pdf, application/docs, .docx" */}
                                <button className="upload-btn" disabled={this.props.loanDoc === undefined || this.props.loanDoc === null || this.props.loanDoc === ''} onClick={() => this.props.dowload_files(this.props.loanDoc)}>  Download </button>
                            </div>
                        </div>
                    </div>) : null}
                </div>
            </div>
        </React.Fragment>)
    }
}
export default LoanDocument