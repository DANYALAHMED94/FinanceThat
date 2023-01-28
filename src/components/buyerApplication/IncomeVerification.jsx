/* eslint-disable jsx-a11y/iframe-has-title */
import React, { useState, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import { Flinks } from "../../constant";
import { useDispatch } from "react-redux";
import NotificationAlert from "../alertMessages/NotificationAlert";
import { useDropzone } from "react-dropzone";
import axios from "../../_helpers/axiosInterceptors";
import { login_flinks } from "../../actions/editPostAppActions";

function IncomeVerification(props) {
  const [showStatementUpload, setShowStatementUpload] = useState(false);
  const [statementFiles, setStatementFiles] = useState(null);
  const [bankName, setBankName] = useState(null);
  const [LoginID, setLoginId] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isFlinksCompleted, setIsFlinksCompleted] = useState(false);

  const [isPending, setIsPending] = useState(props.postApp[4].pending);
  const [isDone, setIsDone] = useState(props.postApp[4].done);

  const applicationId = props.buyerAppId;

  console.log("ispending", isPending, isDone);

  // disptach
  const dispatch = useDispatch();

  // onIframe message
  const onIframeMessage = (e) => {
    console.log("onIframeMessage", e.data);

    // on fLinks callback
    if (e.data && e.data?.institution) {
      setBankName(e.data?.institution);
    }
    if (
      e.data.loginId !== undefined &&
      e.data.loginId !== null &&
      e.data.loginId !== ""
    ) {
      setLoginId(e.data.loginId);
    }
  };

  // updating pending state
  useEffect(() => {
    setIsPending(props.postApp[4].pending);
    setIsDone(props.postApp[4].done);

    return () => { };
  }, [props.postApp[4]]);

  // setting iframe calback event listner

  useEffect(() => {
    if (isPending === true) {
      window.$("#notificationAlertModal").modal("show");
    }
    window.addEventListener("message", onIframeMessage);
    return () => {
      window.removeEventListener("message", onIframeMessage);
    };
  }, []);

  // fetching updated data on unMount
  useEffect(() => {
    if (isFlinksCompleted) {
      return () => {
        props.get_application_detail(props.buyerAppId);
      };
    }
  }, [isFlinksCompleted]);

  // hitting flinks login api on LoginID change
  useEffect(() => {
    if (LoginID) {
      const data = {
        LoginID: LoginID,
        application_id: applicationId,
        bank_name: bankName,
      };
      setIsFlinksCompleted(true);
      dispatch(login_flinks(data));
    }
    return () => { };
  }, [LoginID]);

  //  on file drop
  const onDrop = useCallback((acceptedFiles) => {
    setIsUploading(true);
    console.log(acceptedFiles);

    const data = new FormData();
    data.append("additional_item", []);
    if (acceptedFiles) {
      const totalFiles = statementFiles
        ? [...statementFiles, ...acceptedFiles]
        : acceptedFiles;
      data.append(`length`, totalFiles.length);
      let i = 0;

      for (let file of totalFiles) {
        data.append(`income_statement[${i}]`, file, file.name);
        i++;
      }
    }

    const url = `/application/${props.buyerAppId}/`;
    const options = {
      method: "PUT",
      headers: { "Content-Type": "application/json; charset=utf8" },
      data: data,
      url,
    };

    axios(options)
      .then((response) => {
        console.log(response);
        setIsFlinksCompleted(true);
        setStatementFiles((prev) =>
          prev ? [...prev, ...acceptedFiles] : acceptedFiles
        );
        setIsUploading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsUploading(false);
      });
  }, []);
  // dropzone hook
  const { getRootProps, getInputProps } = useDropzone({ onDrop, maxFiles: 4 });

  // on satatement Delete
  const onDeleteStatement = (index) => {
    const filterFiles = statementFiles.filter((el, i) => i != index);
    setStatementFiles(filterFiles);
    setIsUploading(true);

    const data = new FormData();
    if (filterFiles) {
      let i = 0;
      for (let file of filterFiles) {
        data.append(`income_statement[${i}]`, file, file.name);
        i++;
      }
    }
    data.append(`length`, filterFiles.length);
    data.append("additional_item", []);
    const url = `/application/${applicationId}/`;
    const options = {
      method: "PUT",
      headers: { "Content-Type": "application/json; charset=utf8" },
      data: data,
      url,
    };

    axios(options)
      .then((response) => {
        console.log(response);
        setStatementFiles(filterFiles);
        setIsUploading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsUploading(false);
      });
  };

  console.log(props.income_statement, "props.income_statement");
  return (
    <React.Fragment>
      {isPending ? null : (
        <>
          <div class="app-form-content">
            <div className="applicant-info-main">
              {props.income_statement &&
                (props.income_statement || []).length > 0 ? (
                <div className="upload-doc-content">
                  {(props.income_statement || []).map((item) => (
                    <div className="upload-doc-box">
                      <span className="icon-holder"></span>
                      <div className="text-box">
                        {/* <h2> IncomeVerification.pdf </h2> */}
                        <h2> {item.income.split("/").pop() || ""} </h2>
                        {/* <h2> {props.loanDocName || ''} </h2> */}
                        <p> Income Verification file </p>

                        <button
                          className="upload-btn"
                          disabled={!item.income}
                          onClick={() =>
                            props.dowload_files(`/media/${item.income}`)
                          }
                        >
                          {" "}
                          <span className=""> Download </span>{" "}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                (isPending || isDone) && <iframe height="760" src={Flinks}></iframe>
              )}

              <div className="veriFyIdentityContainer">
                {isPending ||
                  isDone ||
                  (showStatementUpload === false ? (
                    <>
                      <iframe height="760" src={Flinks}></iframe>
                      <h3>
                        Manually upload past 60 days bank statement showing proof of
                        income.
                      </h3>
                      <div className="centerFlex">
                        <a onClick={() => setShowStatementUpload(true)}>
                          <span> Upload Statement</span>{" "}
                          <img
                            src="/assets/image/arrow_circle_right_outline.svg"
                            style={{ marginLeft: "18px" }}
                            alt="icon"
                          ></img>
                        </a>
                      </div>{" "}
                    </>
                  ) : (
                    <>
                      <h2>
                        Please upload last 60 days of your bank statement showing
                        proof of income.
                      </h2>
                      <div className="uploadFileWrapper">
                        <div className="listItem">
                          <img src="/assets/image/circleTick.svg" alt="icon"></img>
                          <span>60 days (2 months) bank statment</span>
                        </div>
                        <div className="listItem">
                          <img src="/assets/image/circleTick.svg" alt="icon"></img>
                          <span>
                            Must show proof of income (pay deposit) consistently
                          </span>
                        </div>
                        <div className="listItem">
                          <img src="/assets/image/circleTick.svg" alt="icon"></img>
                          <span>
                            Applicant name, bank name and account number must be
                            visibile
                          </span>
                        </div>
                        <div className="listItem">
                          <img src="/assets/image/circleTick.svg" alt="icon"></img>
                          <span>You can upload multiple files</span>
                        </div>
                        <div className="uploadDropZoneDiv">
                          <div {...getRootProps()}>
                            <input {...getInputProps()} />
                            <div className="uploadButton">
                              <img
                                src="/assets/image/uploadStatementIcon.svg"
                                alt="icon"
                                style={{ marginRight: "20px" }}
                              />
                              <span>Upload Statement</span>
                            </div>
                          </div>

                          {isUploading && (
                            <div className="uploadingDiv">
                              <i
                                class="fa fa-circle-o-notch fa-spin"
                                aria-hidden="true"
                              ></i>
                            </div>
                          )}

                          {isUploading ||
                            (statementFiles !== null && statementFiles.length > 0 && (
                              <div className="uploadSuccess">
                                <img
                                  src="/assets/image/circleTickGreen.svg"
                                  alt="circleGreen"
                                  className="mr-2"
                                ></img>
                                <span>File uploaded successfully</span>
                              </div>
                            ))}

                          {isUploading ||
                            (statementFiles !== null && statementFiles.length > 0 && (
                              <div className=" uploadFileDetail">
                                {statementFiles.map((item, index) => {
                                  return (
                                    <div className="centerFlex item" key={index}>
                                      <span>{item?.name}</span>
                                      <div onClick={() => onDeleteStatement(index)}>
                                        <img
                                          src="/assets/image/uploadDeleteIcon.svg"
                                          alt="img"
                                          className="ml-2 pointer"
                                        ></img>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            ))}
                        </div>
                      </div>
                    </>
                  ))}
              </div>

              <div className="footer-btns-holder clearfix">
                <Link to={`${props.url}/verify-identity`}>
                  {" "}
                  <button
                    class="btn btn-primary float-left"
                    onClick={() => props.onClickChangeStep(5, 4)}
                  >
                    {" "}
                    Back{" "}
                  </button>
                </Link>
                {/* <button class="btn btn-primary float-right active"> Continue  </button> */}
                <Link to={`${props.url}/loan-payment`}>
                  <button
                    className="btn btn-primary float-right active"
                    onClick={() => props.onClickChangeStep(5, 6)}
                  >
                    {" "}
                    Continue{" "}
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
      <NotificationAlert
        buttonAction={() => {
          window.$("#notificationAlertModal").modal("hide");
        }}
        id={""}
        heading={"Income"}
        section1={
          "We are currently in the process of verifying your income. We will notify you once it has been verified."
        }
      />
    </React.Fragment>
  );
}
export default IncomeVerification;
