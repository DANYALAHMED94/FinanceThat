/* eslint-disable jsx-a11y/iframe-has-title */
import axios from "../../_helpers/axiosInterceptors";
import React, { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { Link } from "react-router-dom";
import NotificationAlert from "../alertMessages/NotificationAlert";
export default function VerifyIdentity(props) {
  const [isPending, setIsPending] = useState(props.postApp[3].pending);
  const [isDone, setIsDone] = useState(props.postApp[3].done);
  const [showLicenseUplaod, setShowLicenseuplaod] = useState(false);
  const [licenseFiles, setLicenseFiles] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isJumioCompleted, setIsJumioCompleted] = useState(false);
  useEffect(() => {
    if (isPending === true) {
      window.$("#notificationAlertModal").modal("show");
    }
    window.addEventListener("message", onIframeMessage);
    return () => {
      window.removeEventListener("message", onIframeMessage);
    };
  }, []);

  // onIframe message
  const onIframeMessage = (e) => {
    console.log("onIframeMessage", e.data);

    if (e.data) {
      try {
        const dataInJson = JSON.parse(e.data);

        console.log(dataInJson, "dataInJson");
        if (dataInJson?.payload?.value === "success") {
          setIsJumioCompleted(true);
        }
      } catch (error) {
        console.log("error", error);
      }
    }
  };

  // upating status
  useEffect(() => {
    setIsPending(props.postApp[3].pending);
    setIsDone(props.postApp[3].done);

    return () => { };
  }, [props.postApp[3]]);

  // fetching updated data on unMount
  useEffect(() => {
    if (isJumioCompleted) {
      return () => {
        props.get_application_detail(props.buyerAppId);
      };
    }
  }, [isJumioCompleted]);

  // on next move
  const goNext = () => {
    if (props.postApp && props.postApp[4] && props.postApp[4].disbaled) {
      props.onClickChangeStep(5, 6);
      props.history.push(`${props.url}/loan-payment`);
    } else {
      props.onClickChangeStep(4, 5);
      props.history.push(`${props.url}/income-verify`);
    }
  };

  //  on file drop
  const onDrop = useCallback((acceptedFiles) => {
    setIsUploading(true);
    console.log(acceptedFiles);
    if (acceptedFiles?.length > 0) {
      const data = new FormData();
      data.append("additional_item", []);
      if (acceptedFiles) {
        const totalFiles = licenseFiles
          ? [...licenseFiles, ...acceptedFiles]
          : acceptedFiles;
        data.append(`length`, totalFiles.length);
        let i = 0;
        for (let file of totalFiles) {
          data.append(`license[${i}]`, file, file.name);
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
    }
  }, []);

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
        setLicenseFiles(filterFiles);
        setIsUploading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsUploading(false);
      });
  };

  // main return

  return (
    <React.Fragment>
      {isPending ? null : (<>

        <div class="app-form-content">
          <div className="applicant-info-main">
            {props.license && (props.license || []).length > 0 ? (
              <div className="upload-doc-content">
                {(props.license || []).length > 0
                  ? (props.license || []).map((item) => (
                    <div className="upload-doc-box">
                      <span className="icon-holder"></span>
                      <div className="text-box">
                        <h2> {item.license.split("/").pop() || ""} </h2>
                        <p> Verify Identity </p>
                        <button
                          className="upload-btn"
                          disabled={!item.license}
                          onClick={() =>
                            props.dowload_files(`/media/${item.license}`)
                          }
                        >
                          {" "}
                          <span className=""> Download </span>{" "}
                        </button>
                      </div>
                    </div>
                  ))
                  : null}
              </div>
            ) : (
              props.jumio_status != "PENDING" &&
              props.jumio_url && (
                <iframe
                  src={props.jumio_url}
                  width="930"
                  height="750"
                  allow="camera;fullscreen;accelerometer;gyroscope;magnetometer"
                  allowFullScreen
                ></iframe>
              )
            )}

            <div className="veriFyIdentityContainer">
              {isPending ||
                isDone ||
                (showLicenseUplaod === false ? (
                  <>
                    {props.jumio_url ? (
                      <iframe
                        src={props.jumio_url}
                        width="930"
                        height="750"
                        allow="camera;fullscreen;accelerometer;gyroscope;magnetometer"
                        allowFullScreen
                      ></iframe>
                    ) : (
                      "No Jumio Url Found"
                    )}
                    <h3>
                      Manually upload a photo of your driver’s license if you are
                      not able to verify your identity via jumio.
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
                ) : (
                  <>
                    <h2>
                      We need to verify your identity. You can verify your
                      identity online or upload a photo of the front of your
                      driver’s license.
                    </h2>
                    <div className="uploadFileWrapper">
                      <div className="listItem">
                        <img src="/assets/image/circleTick.svg" alt="icon"></img>
                        <span>All four corners should be visible.</span>
                      </div>
                      <div className="listItem">
                        <img src="/assets/image/circleTick.svg" alt="icon"></img>
                        <span>
                          Your image should have good lighting and not be blurry.
                        </span>
                      </div>
                      <div className="listItem">
                        <img src="/assets/image/circleTick.svg" alt="icon"></img>
                        <span>
                          You should be able to read all text on your license.
                        </span>
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
                            <i
                              class="fa fa-circle-o-notch fa-spin"
                              aria-hidden="true"
                            ></i>
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
                    </div>
                  </>
                ))}
            </div>
            <div className="footer-btns-holder clearfix">
              <Link to={`${props.url}/assets-detail`}>
                {" "}
                <button
                  class="btn btn-primary float-left"
                  onClick={() => props.onClickChangeStep(4, 3)}
                >
                  {" "}
                  Back{" "}
                </button>
              </Link>
              {/* <button class="btn btn-primary float-right active"> Continue  </button> */}
              {/* <Link to={`${props.url}/income-verify`}> */}
              <button
                className="btn btn-primary float-right active"
                onClick={goNext}
              >
                {" "}
                Continue{" "}
              </button>
              {/* </Link> */}
            </div>
          </div>
        </div>
      </>)}

      <NotificationAlert
        buttonAction={() => {
          window.$("#notificationAlertModal").modal("hide");
        }}
        id={""}
        heading={"Identity"}
        section1={
          "We are currently in the process of verifying your identity. We will notify you once it has been verified."
        }
      />
    </React.Fragment>
  );
}
