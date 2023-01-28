import React, { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import axios from "../../_helpers/axiosInterceptors";
import { Flinks } from "../../constant";
import { useDispatch } from "react-redux";
import { login_flinks } from "../../actions/editPostAppActions";
import { useLocation, useParams } from "react-router";
import NavigationPrompt from "react-router-navigation-prompt";
import ConfirmAlertChangeRoute from "../../components/alertMessages/ConfirmAlertChangeRoute";
import { history } from "../../_helpers";

export default function VerifiyIdentity() {
  const [step, setStep] = useState(1);
  const [showLicenseUplaod, setShowLicenseuplaod] = useState(false);
  const [showStatementUpload, setShowStatementUpload] = useState(false);
  const [licenseFiles, setLicenseFiles] = useState(null);
  const [statementFiles, setStatementFiles] = useState(null);
  const [bankName, setBankName] = useState(null);
  const [LoginID, setLoginId] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isFlinksCompleted, setIsFlinksCompleted] = useState(false);
  const [isJumioCompleted, setIsJumioCompleted] = useState(false);

  const params = useParams();
  const pushState = useLocation().state;
  const applicationId = params?.id;
  const verified_credit_score = 640;

  // disptach
  const dispatch = useDispatch();

  // onIframe message
  // khfskdfhsdkfjhsdkfhsdk
  const onIframeMessage = (e) => {
    console.log("onIframeMessage", e.data, "step", step);

    if (step != 2) {
      const dataInJson = JSON.parse(e.data);
      console.log(dataInJson, "dataInJson");
      if (dataInJson?.payload?.value === "success") {
        setIsJumioCompleted(true);
      }
    } else if (step === 2) {
      // on fLinks callback
      if (e.data && e.data.institution) {
        setBankName(e.data.institution);
      }
      if (
        e.data.loginId !== undefined &&
        e.data.loginId !== null &&
        e.data.loginId !== ""
      ) {
        setLoginId(e.data.loginId);
      }
    }
  };

  //  iframe post message event lisnter



  useEffect(() => {
    window.addEventListener("message", onIframeMessage);
    return () => {
      window.removeEventListener("message", onIframeMessage);
    };
  }, [step]);

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
    return () => {};
  }, [LoginID]);

  //  on file drop
  const onDrop = useCallback(
    (acceptedFiles) => {
      setIsUploading(true);
      console.log(acceptedFiles);
      if (acceptedFiles?.length > 0) {
        if (step === 1) {
          const data = new FormData();
          data.append("additional_item", []);

          if (acceptedFiles) {
            const totalFiles = licenseFiles
              ? [...licenseFiles, ...acceptedFiles]
              : acceptedFiles;

            data.append(`length`, totalFiles.length);
            var i = 0;
            for (let file of totalFiles) {
              data.append(`license[${i}]`, file, file.name);
              i++;
            }
          }

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
              console.log(acceptedFiles);
              setLicenseFiles((prev) =>
                prev ? [...prev, ...acceptedFiles] : acceptedFiles
              );
              setIsJumioCompleted(true);

              setIsUploading(false);
            })
            .catch((error) => {
              console.log(error);
              setIsUploading(false);
            });
        } else if (step === 2) {
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
        }
      }
    },
    [step]
  );
  // dropzone hook
  const { getRootProps, getInputProps } = useDropzone({ onDrop, maxFiles: 4 });

  // on License file Delete
  const onDeleteLicense = (index) => {
    const filterFiles = licenseFiles.filter((el, i) => i != index);
    setLicenseFiles(filterFiles);
    setIsUploading(true);

    const data = new FormData();

    if (filterFiles) {
      let i = 0;
      for (let file of filterFiles) {
        data.append(`license[${i}]`, file, file.name);
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
        setLicenseFiles(filterFiles);
        setIsUploading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsUploading(false);
      });
  };
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

  //  step 1
  const Step1 = (
    <div>
      <h2>
        We need to verify your identity. You can verify your identity online or
        upload a photo of the front of your driver’s license.
      </h2>
      <div className="centerFlex my-4">
        {" "}
        {pushState && pushState.jumio_url ? (
          <iframe
            src={pushState.jumio_url}
            height="640"
            width="100%"
            style={{ maxWidth: "800px", border: "none" }}
            allow="camera;fullscreen;accelerometer;gyroscope;magnetometer"
            allowFullScreen
          ></iframe>
        ) : (
          "No Jumio Url Found"
        )}{" "}
      </div>

      {pushState?.credit_score < verified_credit_score && isJumioCompleted && (
        <>
          <div className="centerFlex">
            <button
              className="primaryButton"
              onClick={() => {
                setStep(2);
              }}
            >
              <span> Verify Income</span>
              <img
                src="/assets/image/arrow_circle_right_outline.svg"
                style={{ marginLeft: "18px" }}
                alt="icon"
              ></img>
            </button>
          </div>
        </>
      )}

      {isJumioCompleted || (
        <>
          <h3>
            Manually upload a photo of your driver’s license if you are not able
            to verify your identity via jumio.
          </h3>

          <div className="centerFlex">
            <a onClick={() => setShowLicenseuplaod(true)}>
              <span> Upload Driver’s License</span>
              <img
                src="/assets/image/arrow_circle_right_outline.svg"
                style={{ marginLeft: "18px" }}
                alt="icon"
              ></img>
            </a>
          </div>
        </>
      )}
      {pushState.credit_score > verified_credit_score && isJumioCompleted && (
        <>
          {" "}
          <div className="appSubmitedWrapper">
            <h5 className="title">Application is Submitted Successfully!</h5>
            <div style={{ textAlign: "center" }}>
              Thank you for submitting your financing application. We will
              process your application within next 24 hours. One of our agents
              will verify any document that you have uploaded with this
              application. We will reach you via email or phone if we have any
              questions.
            </div>
            <h3>Please check you inbox for an update from Finance That</h3>
            <button
              onClick={() => {
                setIsFlinksCompleted(true);
                history.push("/Ad-post/list");
              }}
              className="browseVehicle browseVehicleOrange"
            >
              Browse vehicles
            </button>
          </div>{" "}
        </>
      )}
    </div>
  );

  const Step1Upload = (
    <div>
      <h2>
        We need to verify your identity. You can verify your identity online or
        upload a photo of the front of your driver’s license.
      </h2>
      <div className="uploadFileWrapper">
        <div className="listItem">
          <img src="/assets/image/circleTick.svg" alt="icon"></img>
          <span>All four corners should be visible.</span>
        </div>
        <div className="listItem">
          <img src="/assets/image/circleTick.svg" alt="icon"></img>
          <span>Your image should have good lighting and not be blurry.</span>
        </div>
        <div className="listItem">
          <img src="/assets/image/circleTick.svg" alt="icon"></img>
          <span>You should be able to read all text on your license.</span>
        </div>
        <div className="listItem">
          <img src="/assets/image/circleTick.svg" alt="icon"></img>
          <span>License must not be expired</span>
        </div>
        <div className="uploadDropZoneDiv">
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            <div className="uploadButton">
              <img
                src="/assets/image/uploadLicenseIcon.svg"
                alt="icon"
                style={{ marginRight: "20px" }}
              />
              <span>Upload License</span>
            </div>
          </div>
          {isUploading && (
            <div className="uploadingDiv">
              <i class="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>
            </div>
          )}

          {isUploading ||
            (licenseFiles !== null && licenseFiles.length > 0 && (
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
            (licenseFiles !== null && licenseFiles.length > 0 && (
              <div className=" uploadFileDetail">
                {licenseFiles?.map((item, index) => {
                  return (
                    <div className=" centerFlex item" key={index}>
                      <span>{item?.name}</span>
                      <div onClick={() => onDeleteLicense(index)}>
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

        <div style={{ marginTop: "50px", maxWidth: "418px" }}>
          {licenseFiles !== null &&
            (pushState.credit_score < verified_credit_score ? (
              <div className="centerFlex">
                <button
                  className="primaryButton"
                  onClick={() => {
                    setStep(2);
                  }}
                >
                  <span> Verify Income</span>{" "}
                  <img
                    src="/assets/image/arrow_circle_right_outline.svg"
                    style={{ marginLeft: "18px" }}
                    alt="icon"
                  ></img>
                </button>
              </div>
            ) : (
              <>
                <div className="centerFlex">
                  <button
                    className="primaryButton"
                    onClick={() => {
                      setStep(3);
                    }}
                  >
                    <span>Submit documents</span>{" "}
                    <img
                      src="/assets/image/arrow_circle_right_outline.svg"
                      style={{ marginLeft: "18px" }}
                      alt="icon"
                    ></img>
                  </button>
                </div>
              </>
            ))}
        </div>
      </div>
    </div>
  );

  const Step2 = (
    <div>
      <h2>
        Please connect your bank account so we can verify your income. You can
        also{" "}
        <span style={{ fontFamily: "basis_grotesque_probold" }}>
          manually upload
        </span>{" "}
        the last 60 days of your bank statement.
      </h2>
      <div className="centerFlex my-4">
        <iframe
          height="640"
          width="100%"
          style={{ maxWidth: "800px", border: "none" }}
          src={Flinks}
        ></iframe>
      </div>
      {isFlinksCompleted ? (
        <>
          {" "}
          <div className="appSubmitedWrapper">
            <h5 className="title">Application is Submitted Successfully!</h5>
            <div style={{ textAlign: "center" }}>
              Thank you for submitting your financing application. We will
              process your application within next 24 hours. One of our agents
              will verify any document that you have uploaded with this
              application. We will reach you via email or phone if we have any
              questions.
            </div>
            <h3>Please check you inbox for an update from Finance That</h3>
            <button
              onClick={() => {
                setIsFlinksCompleted(true);
                history.push("/Ad-post/list");
              }}
              className="browseVehicle browseVehicleOrange"
            >
              Browse vehicles
            </button>
          </div>{" "}
        </>
      ) : (
        <>
          <h3>
            Manually upload past 60 days bank statement showing proof of income.
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
          </div>
        </>
      )}
    </div>
  );

  const Step2Upload = (
    <div>
      <h2>
        Please upload last 60 days of your bank statement showing proof of
        income.
      </h2>
      <div className="uploadFileWrapper">
        <div className="listItem">
          <img src="/assets/image/circleTick.svg" alt="icon"></img>
          <span>60 days (2 months) bank statment</span>
        </div>
        <div className="listItem">
          <img src="/assets/image/circleTick.svg" alt="icon"></img>
          <span>Must show proof of income (pay deposit) consistently</span>
        </div>
        <div className="listItem">
          <img src="/assets/image/circleTick.svg" alt="icon"></img>
          <span>
            Applicant name, bank name and account number must be visibile
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
              <i class="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>
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

        <div style={{ marginTop: "50px", maxWidth: "418px" }}>
          {statementFiles !== null && statementFiles.length > 0 && (
            <div className="centerFlex">
              <button
                className="primaryButton"
                onClick={() => {
                  setStep(3);
                }}
              >
                <span>Submit documents</span>{" "}
                <img
                  src="/assets/image/arrow_circle_right_outline.svg"
                  style={{ marginLeft: "18px" }}
                  alt="icon"
                ></img>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const ApplicationSubmit = (
    <div className="appSubmitedWrapper">
      <img
        src="/assets/image/applicationSubmitSuccess.svg"
        alt="icon"
        className="submitImg"
      />

      <img
        src="/assets/image/circleTickGreen.svg"
        alt="circleGreen"
        style={{ width: "50px", height: "50px" }}
      ></img>

      <h5 className="title">Application is Submitted Successfully!</h5>
      <div style={{ textAlign: "center" }}>
        Thank you for submitting your financing application. We will process
        your application within next 24 hours. One of our agents will verify any
        document that you have uploaded with this application. We will reach you
        via email or phone if we have any questions.
      </div>
      <h3>Please check you inbox for an update from Finance That</h3>
      <button
        onClick={() => history.push("/Ad-post/list")}
        className="browseVehicle browseVehicleOrange"
      >
        Browse vehicles
      </button>
    </div>
  );

  // render steps
  const rennderSteps = () => {
    if (step === 1 && showLicenseUplaod === false) return Step1;
    else if (step === 1 && showLicenseUplaod === true) return Step1Upload;
    else if (step === 2 && showStatementUpload === false) return Step2;
    else if (step === 2 && showStatementUpload === true) return Step2Upload;
    else if (step > 2) return ApplicationSubmit;
  };

  // main reuturn
  return (
    <section class="Section-AddPost">
      <NavigationPrompt
        renderIfNotActive={true}
        when={
          pushState?.credit_score < verified_credit_score
            ? !isFlinksCompleted
            : !isJumioCompleted
        }
      >
        {({ isActive, onCancel, onConfirm }) => {
          if (isActive) {
            window.$("#confirmModelChangeRoute").modal("show");
            return (
              <ConfirmAlertChangeRoute
                buttonAction={onConfirm}
                cancel={onCancel}
                id={""}
                heading={"Incomplete Application"}
                section1={
                  "You are only 2 steps away from completing your application. We require ID and Income verification to fund the application. If you wish to complete your ID and income verification at a later time then you can always come back and access the application checklist from My Applications."
                }
                bottomHeading={"Do you still want to exit the application?"}
              />
            );
          }
        }}
      </NavigationPrompt>
      <div
        class="PostAdd-Container veriFyIdentityContainer"
        style={{ padding: "25px 30px" }}
      >
        <div className="verifyIdentityHeader mb-2">
          <div>
            {step > 2 || (
              <h5 className="title">
                {step === 1
                  ? showLicenseUplaod
                    ? "Upload Driver’s license"
                    : "Step 1 - Identity Verification"
                  : showStatementUpload
                  ? "Upload Bank Statement"
                  : "Income Verification"}
              </h5>
            )}
          </div>
          <div className="steps">
            {pushState?.credit_score < verified_credit_score && (
              <>
                <div
                  className={
                    isJumioCompleted
                      ? "step  stepCompleted"
                      : step === 1
                      ? "step stepActive"
                      : "step"
                  }
                >
                  <div
                    className="circle"
                    onClick={() => {
                      if (step < 1) return;
                      setStep(1);
                    }}
                  >
                    {" "}
                    {isJumioCompleted ? (
                      <img src="/assets/image/tickWhite.svg " />
                    ) : (
                      "1"
                    )}
                  </div>
                  <div className="name">STEP 1</div>{" "}
                  <div> ID Verification </div>
                </div>
                <>
                  <div className="path"> </div>
                  <div
                    onClick={() => {
                      if (step < 2) return;
                      setStep(2);
                    }}
                    className={
                      isFlinksCompleted
                        ? "step stepCompleted"
                        : step === 2
                        ? "step stepActive"
                        : "step"
                    }
                  >
                    <div className="circle">
                      {isFlinksCompleted ? (
                        <img src="/assets/image/tickWhite.svg " />
                      ) : (
                        "2"
                      )}
                    </div>
                    <div className="name">STEP 2</div>
                    <div>Income Verification </div>
                  </div>
                </>
              </>
            )}
          </div>
        </div>

        {rennderSteps()}
      </div>
    </section>
  );
}
