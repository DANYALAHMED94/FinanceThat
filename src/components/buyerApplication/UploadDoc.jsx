import React, { Component } from 'react'

class UploadDoc extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.documents !== this.props.documents || nextProps.documentsTable !== this.props.documentsTable || nextProps.loading_delete_uploaded_doc !== this.props.loading_delete_uploaded_doc) {
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
                    <div className="upload-doc-content">
                        <strong className="title"> Required documents </strong>
                        {(this.props.documents || []).map((item, index) => (
                            <div className="upload-doc-box">
                                <span className="icon-holder"></span>
                                <div className="text-box">
                                    <h2> {item.name} </h2>
                                    <p> Electronically sign on device or by email </p>
                                    {/* accept="application/pdf, application/docs, .docx" */}
                                    <button className="upload-btn"> <input
                                        type="file"
                                        className="custom-file-input"
                                        name={`doc`}
                                        accept="image/png, image/jpeg, image/jpg,application/pdf, application/docs"
                                        onChange={(e) => this.props._handleUploadDocChange(e, index, item.name)}
                                        multiple
                                    // onBlur={() => this.validator.showMessageFor('Omvic Certificate')}
                                    /><span className="text"> Upload </span> </button>
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
                                {(this.props.documentsTable || []).filter(item=> item.is_uploaded).map((item, index) => (
                                    <tr key={index}>
                                        <td> {item.name} </td>
                                        <td> {item.fileType ? item.fileType : ''}</td>
                                        <td> {item.file  ? 'Uploaded' : 'Pending'} </td>
                                        {/* <td> <button className="download" onClick={() => this.props.dowload_files(`/media/${item.file}`)} disabled={item.file === undefined || item.file === null || item.file === ''}> Download </button> </td> */}
                                        <td> <button className="download" onClick={() => this.props.dowload_files(`${item.file}`)} disabled={item.file === undefined || item.file === null || item.file === ''}> Download </button> </td>
                                        <td> <button className="del" onClick={() => this.props.deleteUploadDoc(index, item.id)} disabled={item.file === undefined || item.file === null || item.file === ''}>{this.props.loading_delete_uploaded_doc === true && Number(item.id) == Number(this.props.delete_doc_id) ? (<i class="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>) : (<img src="/assets/image/trash-icon.svg" alt='trash' />)}  </button> </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </React.Fragment>)
    }
}
export default UploadDoc