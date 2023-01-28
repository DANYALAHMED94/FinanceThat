/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { API_URL } from "../../../../constant";
import { useDispatch, useSelector } from "react-redux";
import { toastr } from 'react-redux-toastr'
import { update_dealer_profile, downloadFile, delete_document } from "../../../../actions/admin/accountActions"
const DmsDocument = (props) => {
  const dispatch = useDispatch();
  const { dealer_id, document_delete_loading, license_path, void_check_path,
    exterior_business_path, interior_business_path, document_name, is_deleted } = useSelector(({ adminReducer }) => {
      return {
        dealer_id: adminReducer.adminAccounts.pendingAccountReducer.dealer_id,
        license_path: adminReducer.adminAccounts.pendingAccountReducer.license_path,
        void_check_path: adminReducer.adminAccounts.pendingAccountReducer.void_check_path,
        exterior_business_path: adminReducer.adminAccounts.pendingAccountReducer.exterior_business_path,
        interior_business_path: adminReducer.adminAccounts.pendingAccountReducer.interior_business_path,
        document_delete_loading: adminReducer.adminAccounts.pendingAccountReducer.document_delete_loading,
        document_name: adminReducer.adminAccounts.pendingAccountReducer.document_name,
        is_deleted: adminReducer.adminAccounts.pendingAccountReducer.is_deleted,
      }
    })

    const [state, setState] = useState({
      license_path: null,
      void_check_path: null,
      exterior_business_path: null,
      interior_business_path: null,
      license_pathName: null,
      void_check_pathName: null,
      exterior_business_pathName: null,
      interior_business_pathName: null,
    })
  const [delete_name, setDeleteName] = useState('')
  const [documents, setDocuments] = useState([{ name: "void_check_path", fileName: "", fileStatus: "", fileType: "Void Cheque or PAD form", filePath: "" }, { name: "license_path", fileName: "", fileStatus: "", fileType: "Article of incorporation", filePath: "" }, { name: "exterior_business_path", fileName: "", fileStatus: "", fileType: "Dealership exterior photo", filePath: "" }, { name: "interior_business_path", fileName: "", fileStatus: "", fileType: "Dealership interior photo", filePath: "" }])
  useEffect(() => {
    setState({
      ...state,
      license_pathName: license_path,
      void_check_pathName: void_check_path,
      exterior_business_pathName: exterior_business_path,
      interior_business_pathName: interior_business_path
    })
console.log(license_path, "license_path")
  setDocuments((documents || []).map(item => {
    if (void_check_path && item.name === 'void_check_path') {
      return {
        ...item,
        fileStatus: "Uploaded",
        fileName: void_check_path?.split("/")?.pop() || '',
        filePath: void_check_path
      }
    }
    if (exterior_business_path && item.name === 'exterior_business_path') {
      return {
        ...item,
        fileStatus: "Uploaded",
        fileName: exterior_business_path?.split("/")?.pop() || '',
        filePath: exterior_business_path
      }
    }
    if (interior_business_path && item.name === 'interior_business_path') {
      return {
        ...item,
        fileStatus: "Uploaded",
        fileName: interior_business_path?.split("/")?.pop() || '',
        filePath: interior_business_path
      }
    }
    if (license_path && item.name === 'license_path') {
      return {
        ...item,
        fileStatus: "Uploaded",
        fileName: license_path?.split("/")?.pop() || '',
        filePath: license_path
      }
    }
    return item
  }))
  }, [license_path, void_check_path,
    exterior_business_path, interior_business_path])

  useEffect(() => {
    if(delete_name){
      const fileNameState = delete_name + "Name"
      setState({
        ...state,
        [delete_name]: null,
        [fileNameState]: ''
      });
      setDocuments((documents || []).map(item => {
        if (item.name === delete_name) {
          return {
            ...item,
            fileName: '',
            fileStatus: ""
          }
        }
        return item
      }))
      setDeleteName('')
    }
  
  }, [is_deleted])

  const _handleImageChange = (e) => {
    props.goToNext(true)
    e.preventDefault();
    let file = e.target.files[0];
    if (file) {
      if (file.type !== "image/png" && file.type !== "image/jpg" && file.type !== "image/jpeg" && file.type !== 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' && file.type !== "application/pdf" && file.type !== "application/docs") {
        toastr.error('Error', "File does not support. You must use pdf, docs, .png, jpeg or .jpg ")
        return false;
      }
      // if (file.size > (2 * 1024 * 1024)) {
      //     toastr.error('Error', "Please upload a file smaller than 2 MB")
      //     return false;
      // }
      const name = e.target.name;
      const fileNameState = e.target.name + 'Name'
      const fileName = e.target.files[0].name
      var formData = new FormData();
      formData.append([name], file)
      dispatch(update_dealer_profile(formData, dealer_id))
      setState({
        ...state,
        [name]: file,
        [fileNameState]: fileName
      });
      setDocuments((documents || []).map(item => {
        if (item.name === e.target.name) {
          return {
            ...item,
            fileName: fileName,
            fileStatus: "Uploaded"
          }
        }
        return item
      }))

    }
  }

  const deleteFile = (name) => {
    setDeleteName(name)
    var formData = new FormData();
    formData.append([name], "")
    dispatch(delete_document(formData, dealer_id, name))
  }


  const dowload_files = (filePath) => {
    const path = API_URL + filePath;
    console.log(path, "path");
    dispatch(downloadFile(path));
  };
  console.log(documents, state, is_deleted,"documents")
  return (
    <React.Fragment>
      <div className="Altable-Container">
        <div className="Dealer-dtable">
          <div className="col-12">
            <h5 className="lh-lg mt-3 mb-5">Documents</h5>
            <hr></hr>
          </div>

          <div className="col-12">
            <div className="row">
              <div className="col-10">
                <div className="dealer-doc-content">
                  <div className="upload-doc-box">
                    <span className="icon-holder"></span>
                    <div className="text-box">
                      <p className="mt-2">Void Cheque or PAD form</p>
                      <button className="upload-btn">
                        {" "}
                        <input
                          type="file"
                          className="custom-file-input"
                          name={`void_check_path`}
                          accept="image/*, application/pdf, application/docs,.doc, .docx,"
                          onChange={_handleImageChange}
                          disabled={state.void_check_pathName}
                        />
                        <span className="text"> {state.void_check_pathName ? "Uploaded" : "Upload"} </span>{" "}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 2 */}

          <div className="col-12">
            <div className="row">
              <div className="col-10">
                <div className="dealer-doc-content">
                  <div className="upload-doc-box">
                    <span className="icon-holder"></span>
                    <div className="text-box">
                      <p className="mt-2">Dealership interior photo</p>
                      <button className="upload-btn">
                        {" "}
                        <input
                          type="file"
                          className="custom-file-input"
                          name={`interior_business_path`}
                          accept="image/*, application/pdf, application/docs,.doc, .docx,"
                          onChange={_handleImageChange}
                          disabled={state.interior_business_pathName}
                        />
                        <span className="text"> {state.interior_business_pathName ? "Uploaded" : "Upload"} </span>{" "}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 3  */}

          <div className="col-12">
            <div className="row">
              <div className="col-10">
                <div className="dealer-doc-content">
                  <div className="upload-doc-box">
                    <span className="icon-holder"></span>
                    <div className="text-box">
                      <p className="mt-2">Dealership exterior photo</p>
                      <button className="upload-btn">
                        {" "}
                        <input
                          type="file"
                          className="custom-file-input"
                          name={`exterior_business_path`}
                          accept="image/*, application/pdf, application/docs,.doc, .docx,"
                          onChange={_handleImageChange}
                          disabled={state.exterior_business_pathName}
                        />
                        <span className="text"> {state.exterior_business_pathName ? "Uploaded" : "Upload"} </span>{" "}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 4 */}

          <div className="col-12">
            <div className="row">
              <div className="col-10">
                <div className="dealer-doc-content">
                  <div className="upload-doc-box">
                    <span className="icon-holder"></span>
                    <div className="text-box">
                      <p className="mt-2">Article of incorporation</p>
                      <button className="upload-btn">
                        {" "}
                        <input
                          type="file"
                          className="custom-file-input"
                          name={`license_path`}
                          accept="image/*, application/pdf, application/docs,.doc, .docx,"
                          onChange={_handleImageChange}
                          disabled={state.license_pathName}
                        />
                        <span className="text"> {state.license_pathName ? "Uploaded" : "Upload"} </span>{" "}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>


          {/* 6 */}


          <div className="col-12">
            <div className="row">
              <div className="col-10">
                <div className="dealer-data-content">
                  <div className="Dealer-table">
                    <table style={{ width: "100%" }}>
                      <thead>
                        <tr>
                          <th >File Name</th>
                          <th >File Type</th>
                          <th >Status</th>
                          <th >Action</th>
                          <th>Delete</th>
                        </tr>
                      </thead>
                      <tbody>
                        {(documents || []).filter(item => item.fileStatus === 'Uploaded').map((item, index) => {
                          return (
                            <React.Fragment key={index}>
                              <tr key={index}>

                                <td>{item.fileName}</td>
                                <td>{item.fileType}</td>
                                <td>{item.fileStatus}</td>

                                <td>
                                  <button className="Actionbtn" onClick={() => dowload_files(item.filePath)}>Download</button>

                                </td>
                                <td>
                                  <div className="icon-delete">
                                    <button
                                      type="button"
                                      data-toggle="modal"
                                      data-target="#confirmModelAdmin"
                                      onClick={() => deleteFile(item.name)}
                                    >
                                      {document_delete_loading &&
                                        (item.name) === (document_name) ? (
                                        <i
                                          class="fa fa-circle-o-notch fa-spin"
                                          aria-hidden="true"
                                        ></i>
                                      ) : (
                                        <img
                                          src="/assets/image/sprite-icon/icon-delete.svg"
                                          alt=""
                                        />
                                      )}
                                    </button>
                                  </div>
                                </td>



                              </tr>
                            </React.Fragment>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default DmsDocument;
