/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-use-before-define */
import React, { useEffect, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import moment from "moment";
import ReactToPrint, { PrintContextConsumer } from "react-to-print";
import { get_pdf_data } from "../../../actions/admin/applicationActions";
import { useDispatch, useSelector } from "react-redux";
import LoadingOverlay from "react-loading-overlay";
var dateFormat = require("dateformat");
const PdfPrint = (props) => {
  const [state, setState] = useState("");
  const dispatch = useDispatch();
  const reduxState = useSelector((state) => {
    return {
      pdf_data: state.adminReducer.adminAccounts.applicationReducer.pdf_data,
      loading_update:
        state.adminReducer.adminAccounts.applicationReducer.loading_update,
    };
  });
  useEffect(() => {
    if (props.match.params && props.match.params.id) {
      dispatch(get_pdf_data(props.match.params.id));
    }
  }, [props.match.params]);
  useEffect(() => {
    console.log(reduxState.pdf_data);
    if (reduxState.pdf_data && Object.keys(reduxState.pdf_data).length > 0) {
      setState(reduxState.pdf_data);
    }
  }, [reduxState.pdf_data]);
  const printDocument = () => {
    var HTML_Width = document.getElementById("divToPrint").offsetWidth;
    var HTML_Height = document.getElementById("divToPrint").offsetHeight;
    var top_left_margin = 15;
    var PDF_Width = HTML_Width + top_left_margin * 2;
    var PDF_Height = PDF_Width * 1.5 + top_left_margin * 2;
    var canvas_image_width = HTML_Width;
    var canvas_image_height = HTML_Height;

    var totalPDFPages = Math.ceil(HTML_Height / PDF_Height) - 1;

    html2canvas(document.getElementById("divToPrint"), {
      allowTaint: true,
    }).then(function (canvas) {
      canvas.getContext("2d");
      console.log(canvas.height + "  " + canvas.width);
      console.log(PDF_Width + "  " + PDF_Height);
      var imgData = canvas.toDataURL("image/jpeg", 1.0);
      var pdf = new jsPDF("p", "pt", [PDF_Width, PDF_Height]);
      pdf.addImage(
        imgData,
        "JPG",
        top_left_margin,
        top_left_margin,
        canvas_image_width,
        canvas_image_height
      );
      for (var i = 1; i <= totalPDFPages; i++) {
        // pdf.addPage(PDF_Width, PDF_Height);
        pdf.addPage();
        pdf.addImage(
          imgData,
          "JPG",
          top_left_margin,
          -(PDF_Height * i) + top_left_margin * 4,
          canvas_image_width,
          canvas_image_height
        );
      }

      pdf.save("download.pdf");
    });
  };

  const componentRef = React.useRef(null);
  const reactToPrintContent = React.useCallback(() => {
    return componentRef.current;
  }, [componentRef.current]);
  const customerInfo =
    state && Object.keys(state).length > 0
      ? state.Accounts
        ? (state.Accounts || []).length > 0
          ? state.Accounts[0]
            ? state.Accounts[0].Holder
              ? state.Accounts[0].Holder
              : ""
            : ""
          : ""
        : ""
      : "";
  const requestId =
    state && Object.keys(state).length > 0
      ? state.Accounts
        ? (state.Accounts || []).length > 0
          ? state.Accounts[0]
            ? state.Accounts[0].Id
              ? state.Accounts[0].Id
              : ""
            : ""
          : ""
        : ""
      : "";
  console.log(state, "state");
  return (
    <React.Fragment>
      <LoadingOverlay
        active={reduxState.loading_update}
        spinner
        text="Loading your content..."
      >
        {state ? (
          <React.Fragment>
            {" "}
            <ReactToPrint
              documentTitle="Active Applications Record"
              content={reactToPrintContent}
            >
              <PrintContextConsumer>
                {({ handlePrint }) => (
                  <div
                    style={{
                      margin: "30px auto 30px auto",
                      textAlign: "right",
                      width: "90%",
                    }}
                  >
                    <button
                      style={{
                        background: "none",
                        border: "none",
                        outline: "none",
                      }}
                      className="mr-0"
                      onClick={handlePrint}
                    >
                      <img
                        src="/assets/image/sprite-icon/icon-print.svg"
                        alt=""
                      />
                    </button>
                  </div>
                )}
              </PrintContextConsumer>
            </ReactToPrint>
            <div
              id="divToPrint"
              ref={componentRef}
              style={{ marginTop: "20px", marginBottom: "20px" }}
            >
              {/* <button onClick={printDocument}>Print</button> */}
              <div
                style={{
                  border: "1px solid #dcdcdc",
                  borderRadius: "4px",
                  width: "70%",
                  margin: "0 auto",
                  padding: "20px",
                }}
              >
                <table>
                  <thead>
                    <tr>
                      <th
                        style={{
                          textAlign: "left",
                          width: "40%",
                          fontSize: "16px",
                          color: "#151515",
                          fontFamily: "Arial",
                        }}
                      >
                        Customer Information
                      </th>
                      <th
                        style={{
                          textAlign: "left",
                          width: "60%",
                          fontSize: "16px",
                          color: "#151515",
                          fontFamily: "Arial",
                        }}
                      >
                        Request Information
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr>
                      <td style={{ textAlign: "left", paddingTop: "16px" }}>
                        <span
                          style={{
                            color: "#151515",
                            fontSize: "14px",
                            textAlign: "left",
                            fontFamily: "Arial",
                            display: "block",
                            fontWeight: "bold",
                          }}
                        >
                          Name
                        </span>

                        <span
                          style={{
                            color: "#7d7d7d",
                            fontSize: "14px",
                            textAlign: "left",
                            fontFamily: "Arial",
                            display: "block",
                            fontWeight: "normal",
                            paddingTop: "8px",
                          }}
                        >
                          {customerInfo ? customerInfo.Name : ""}
                        </span>
                      </td>

                      <td style={{ textAlign: "left", paddingTop: "16px" }}>
                        <span
                          style={{
                            color: "#151515",
                            fontSize: "14px",
                            textAlign: "left",
                            fontFamily: "Arial",
                            display: "block",
                            fontWeight: "bold",
                          }}
                        >
                          Request ID
                        </span>

                        <span
                          style={{
                            color: "#7d7d7d",
                            fontSize: "14px",
                            textAlign: "left",
                            fontFamily: "Arial",
                            display: "block",
                            fontWeight: "normal",
                            paddingTop: "8px",
                          }}
                        >
                          {requestId ? requestId : ""}
                        </span>
                      </td>
                    </tr>

                    <tr>
                      <td style={{ textAlign: "left", paddingTop: "16px" }}>
                        <span
                          style={{
                            color: "#151515",
                            fontSize: "14px",
                            textAlign: "left",
                            fontFamily: "Arial",
                            display: "block",
                            fontWeight: "bold",
                          }}
                        >
                          Email
                        </span>

                        <span
                          style={{
                            color: "#7d7d7d",
                            fontSize: "14px",
                            textAlign: "left",
                            fontFamily: "Arial",
                            display: "block",
                            fontWeight: "normal",
                            paddingTop: "8px",
                          }}
                        >
                          {customerInfo ? customerInfo.Email : ""}
                        </span>
                      </td>

                      <td style={{ textAlign: "left", paddingTop: "16px" }}>
                        <span
                          style={{
                            color: "#151515",
                            fontSize: "14px",
                            textAlign: "left",
                            fontFamily: "Arial",
                            display: "block",
                            fontWeight: "bold",
                          }}
                        >
                          Request Date/Time
                        </span>

                        <span
                          style={{
                            color: "#7d7d7d",
                            fontSize: "14px",
                            textAlign: "left",
                            fontFamily: "Arial",
                            display: "block",
                            fontWeight: "normal",
                            paddingTop: "8px",
                          }}
                        >
                          {state
                            ? state.Login
                              ? state.Login.LastRefresh
                                ? moment(state.Login.LastRefresh).format("LT")
                                : ""
                              : ""
                            : ""}
                          <br />
                          {state
                            ? state.Login
                              ? state.Login.LastRefresh
                                ? moment(state.Login.LastRefresh).format("ll")
                                : ""
                              : ""
                            : ""}
                        </span>
                      </td>
                    </tr>

                    <tr>
                      <td style={{ textAlign: "left", paddingTop: "16px" }}>
                        <span
                          style={{
                            color: "#151515",
                            fontSize: "14px",
                            textAlign: "left",
                            fontFamily: "Arial",
                            display: "block",
                            fontWeight: "bold",
                          }}
                        >
                          Address
                        </span>

                        <span
                          style={{
                            color: "#7d7d7d",
                            fontSize: "14px",
                            textAlign: "left",
                            fontFamily: "Arial",
                            display: "block",
                            fontWeight: "normal",
                            paddingTop: "8px",
                          }}
                        >
                          {customerInfo ? customerInfo.Address : ""}
                        </span>
                      </td>

                      <td style={{ textAlign: "left", paddingTop: "16px" }}>
                        <span
                          style={{
                            color: "#151515",
                            fontSize: "14px",
                            textAlign: "left",
                            fontFamily: "Arial",
                            display: "block",
                            fontWeight: "bold",
                          }}
                        >
                          Request Status
                        </span>

                        <span
                          style={{
                            color: "#7d7d7d",
                            fontSize: "14px",
                            textAlign: "left",
                            fontFamily: "Arial",
                            display: "block",
                            fontWeight: "normal",
                            paddingTop: "8px",
                          }}
                        >
                          {state
                            ? state.HttpStatusCode
                              ? state.HttpStatusCode === 200
                                ? "Completed"
                                : state.HttpStatusCode === 401
                                ? state.FlinksCode
                                  ? state.FlinksCode
                                  : ""
                                : ""
                              : ""
                            : ""}
                        </span>
                      </td>
                    </tr>

                    <tr>
                      <td style={{ textAlign: "left", paddingTop: "16px" }}>
                        <span
                          style={{
                            color: "#151515",
                            fontSize: "14px",
                            textAlign: "left",
                            fontFamily: "Arial",
                            display: "block",
                            fontWeight: "bold",
                          }}
                        >
                          Financial Institution
                        </span>

                        <span
                          style={{
                            color: "#7d7d7d",
                            fontSize: "14px",
                            textAlign: "left",
                            fontFamily: "Arial",
                            display: "block",
                            fontWeight: "normal",
                            paddingTop: "8px",
                          }}
                        >
                          {state
                            ? state.Institution
                              ? state.Institution
                              : ""
                            : ""}
                        </span>
                      </td>
                    </tr>

                    <tr>
                      <td style={{ textAlign: "left", paddingTop: "16px" }}>
                        <span
                          style={{
                            color: "#151515",
                            fontSize: "14px",
                            textAlign: "left",
                            fontFamily: "Arial",
                            display: "block",
                            fontWeight: "bold",
                          }}
                        >
                          Login ID
                        </span>

                        <span
                          style={{
                            color: "#7d7d7d",
                            fontSize: "14px",
                            textAlign: "left",
                            fontFamily: "Arial",
                            display: "block",
                            fontWeight: "normal",
                            paddingTop: "8px",
                          }}
                        >
                          {state ? (state.Login.Id ? state.Login.Id : "") : ""}
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              {(state.Accounts || []).map((item, index) => (
                <>
                  <table
                    style={{
                      border: "1px solid #dcdcdc",
                      borderRadius: "4px",
                      width: "70%",
                      margin: "0 auto",
                      padding: "20px",
                      marginTop: "30px",
                    }}
                  >
                    <thead>
                      <tr>
                        <th
                          width="25%"
                          style={{
                            textAlign: "left",
                            fontSize: "16px",
                            color: "#151515",
                            fontFamily: "Arial",
                            padding: "20px",
                          }}
                        >
                          Account Name
                        </th>

                        <th
                          width="25%"
                          style={{
                            textAlign: "left",
                            fontSize: "16px",
                            color: "#151515",
                            fontFamily: "Arial",
                          }}
                        >
                          Account Number
                        </th>

                        <th
                          width="25%"
                          style={{
                            textAlign: "left",
                            fontSize: "16px",
                            color: "#151515",
                            fontFamily: "Arial",
                          }}
                        >
                          Account Type
                        </th>

                        <th
                          style={{
                            textAlign: "left",
                            fontSize: "16px",
                            color: "#151515",
                            fontFamily: "Arial",
                          }}
                        >
                          Account Balance
                        </th>
                      </tr>
                    </thead>
                  </table>
                  <table
                    style={{
                      border: "1px solid #dcdcdc",
                      borderRadius: "4px",
                      width: "70%",
                      margin: "0 auto",
                      padding: "0px",
                      marginTop: "10px",
                      borderCollapse: "collapse",
                    }}
                  >
                    <thead>
                      <tr>
                        <th
                          style={{
                            textAlign: "left",
                            fontSize: "16px",
                            color: "#5a5a5a",
                            fontFamily: "Arial",
                            borderBottom: "1px solid #dcdcdc",
                            padding: "20px 20px",
                            fontWeight: "normal",
                          }}
                          width="25%"
                        >
                          {item.Title ? item.Title : ""}
                        </th>

                        <th
                          style={{
                            textAlign: "left",
                            fontSize: "16px",
                            color: "#5a5a5a",
                            fontFamily: "Arial",
                            borderBottom: "1px solid #dcdcdc",
                            padding: "20px 20px",
                            fontWeight: "normal",
                          }}
                          width="25%"
                        >
                          {item.InstitutionNumber
                            ? item.InstitutionNumber + "-"
                            : ""}
                          {item.TransitNumber ? item.TransitNumber + "-" : ""}
                          {item.AccountNumber ? item.AccountNumber : ""}
                        </th>

                        <th
                          style={{
                            textAlign: "left",
                            fontSize: "16px",
                            color: "#5a5a5a",
                            fontFamily: "Arial",
                            borderBottom: "1px solid #dcdcdc",
                            padding: "20px 20px",
                            fontWeight: "normal",
                          }}
                          width="25%"
                        >
                          {item.Title ? item.Title : ""}
                        </th>

                        <th
                          style={{
                            textAlign: "left",
                            fontSize: "16px",
                            color: "#5a5a5a",
                            fontFamily: "Arial",
                            borderBottom: "1px solid #dcdcdc",
                            padding: "20px 20px",
                            fontWeight: "normal",
                          }}
                        >
                          {item.Balance
                            ? item.Balance.Current
                              ? "$" + item.Balance.Current
                              : ""
                            : ""}
                        </th>

                        <th
                          style={{
                            textAlign: "left",
                            fontSize: "16px",
                            color: "gray",
                            fontFamily: "Arial",
                            borderBottom: "1px solid #dcdcdc",
                            padding: "20px 20px",
                            fontWeight: "normal",
                          }}
                        ></th>
                      </tr>
                    </thead>

                    <tbody>
                      <tr>
                        <td
                          style={{
                            color: "#5a5a5a",
                            fontWeight: "700",
                            fontSize: "14px",
                            textAlign: "left",
                            background: "#f3f3f3",
                            fontFamily: "Arial",
                            padding: "6px 20px",
                            borderBottom: "1px solid #dcdcdc",
                          }}
                        >
                          Date
                        </td>

                        <td
                          style={{
                            color: "#5a5a5a",
                            fontWeight: "700",
                            fontSize: "14px",
                            textAlign: "left",
                            background: "#f3f3f3",
                            fontFamily: "Arial",
                            padding: "6px 20px",
                            borderBottom: "1px solid #dcdcdc",
                          }}
                        >
                          Description
                        </td>

                        <td
                          style={{
                            color: "#5a5a5a",
                            fontWeight: "700",
                            fontSize: "14px",
                            textAlign: "left",
                            background: "#f3f3f3",
                            fontFamily: "Arial",
                            padding: "6px 20px",
                            borderBottom: "1px solid #dcdcdc",
                          }}
                        >
                          Withdrawals
                        </td>

                        <td
                          style={{
                            color: "#5a5a5a",
                            fontWeight: "700",
                            fontSize: "14px",
                            textAlign: "left",
                            background: "#f3f3f3",
                            fontFamily: "Arial",
                            padding: "6px 20px",
                            borderBottom: "1px solid #dcdcdc",
                          }}
                        >
                          Deposits
                        </td>

                        <td
                          style={{
                            color: "#5a5a5a",
                            fontWeight: "700",
                            fontSize: "14px",
                            textAlign: "left",
                            background: "#f3f3f3",
                            fontFamily: "Arial",
                            padding: "6px 20px",
                            borderBottom: "1px solid #dcdcdc",
                          }}
                        >
                          Balance
                        </td>
                      </tr>
                      {item.Transactions && item.Transactions.length > 0 ? (
                        (item.Transactions || []).map((trs, trsIndex) => (
                          <tr>
                            <td
                              style={{
                                color: "#5a5a5a",
                                fontWeight: "normal",
                                fontSize: "14px",
                                textAlign: "left",
                                background: "#fff",
                                fontFamily: "Arial",
                                padding: "10px 20px",
                                borderBottom: "1px solid #dcdcdc",
                              }}
                            >
                              {trs.Date ? trs.Date : ""}
                            </td>

                            <td
                              style={{
                                color: "#5a5a5a",
                                fontWeight: "normal",
                                fontSize: "14px",
                                textAlign: "left",
                                background: "#fff",
                                fontFamily: "Arial",
                                padding: "10px 20px",
                                borderBottom: "1px solid #dcdcdc",
                              }}
                            >
                              {trs.Description ? trs.Description : ""}
                            </td>

                            <td
                              style={{
                                color: "#5a5a5a",
                                fontWeight: "normal",
                                fontSize: "14px",
                                textAlign: "left",
                                background: "#fff",
                                fontFamily: "Arial",
                                padding: "10px 20px",
                                borderBottom: "1px solid #dcdcdc",
                              }}
                            >
                              {trs.Debit ? "$" + trs.Debit : ""}
                            </td>

                            <td
                              style={{
                                color: "#5a5a5a",
                                fontWeight: "normal",
                                fontSize: "14px",
                                textAlign: "left",
                                background: "#fff",
                                fontFamily: "Arial",
                                padding: "10px 20px",
                                borderBottom: "1px solid #dcdcdc",
                              }}
                            >
                              {trs.Credit ? "$" + trs.Credit : ""}
                            </td>

                            <td
                              style={{
                                color: "#5a5a5a",
                                fontWeight: "normal",
                                fontSize: "14px",
                                textAlign: "left",
                                background: "#fff",
                                fontFamily: "Arial",
                                padding: "10px 20px",
                                borderBottom: "1px solid #dcdcdc",
                              }}
                            >
                              {trs.Balance ? "$" + trs.Balance : ""}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <React.Fragment>
                          <tr>
                            <td></td>
                            <td style={{ float: "right" }}>No Transactions</td>
                            <td></td>
                            <td></td>
                          </tr>
                        </React.Fragment>
                      )}
                    </tbody>
                  </table>
                </>
              ))}
            </div>
          </React.Fragment>
        ) : (
          "No Record Found"
        )}
      </LoadingOverlay>
    </React.Fragment>
  );
};

export default PdfPrint;
