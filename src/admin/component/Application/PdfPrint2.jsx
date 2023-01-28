import React from "react";
import ReactToPdf from "react-to-pdf";

const PdfPrint = (props) => {
  const ref = React.createRef();
  const options = {
    orientation: "landscape",
    // unit: "in",
    // format: [4, 2],
  };
  return (
    <div>
      <ReactToPdf
        targetRef={ref}
        filename="div-blue.pdf"
        options={options}
        // x={0.5}
        // y={0.5}
        scale={0.8}
      >
        {({ toPdf }) => <button onClick={toPdf}>Generate pdf</button>}
      </ReactToPdf>
      <div id="divToPrint" ref={ref} style={{ marginTop: "20px" }}>
        <table
          style={{
            border: "1px solid #dcdcdc",
            borderRadius: "4px",
            width: "70%",
            margin: "0 auto",
            padding: "20px",
          }}
        >
          <thead>
            <tr>
              <th
                style={{
                  textAlign: "left",
                  width: "40%",
                  fontSize: "16px",
                  color: "#000",
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
                  color: "#000",
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
                    color: "#000",
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
                    color: "grey",
                    fontSize: "14px",
                    textAlign: "left",
                    fontFamily: "Arial",
                    display: "block",
                    fontWeight: "normal",
                    paddingTop: "8px",
                  }}
                >
                  KYLE MACDONALD
                </span>
              </td>

              <td style={{ textAlign: "left", paddingTop: "16px" }}>
                <span
                  style={{
                    color: "#000",
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
                    color: "grey",
                    fontSize: "14px",
                    textAlign: "left",
                    fontFamily: "Arial",
                    display: "block",
                    fontWeight: "normal",
                    paddingTop: "8px",
                  }}
                >
                  4D23B429-20BC-47D4-A312-F91933473E15
                </span>
              </td>
            </tr>

            <tr>
              <td style={{ textAlign: "left", paddingTop: "16px" }}>
                <span
                  style={{
                    color: "#000",
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
                    color: "grey",
                    fontSize: "14px",
                    textAlign: "left",
                    fontFamily: "Arial",
                    display: "block",
                    fontWeight: "normal",
                    paddingTop: "8px",
                  }}
                >
                  henry_jones01@hotmail.com
                </span>
              </td>

              <td style={{ textAlign: "left", paddingTop: "16px" }}>
                <span
                  style={{
                    color: "#000",
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
                    color: "grey",
                    fontSize: "14px",
                    textAlign: "left",
                    fontFamily: "Arial",
                    display: "block",
                    fontWeight: "normal",
                    paddingTop: "8px",
                  }}
                >
                  6:58 PM, Aug 9, 2021
                </span>
              </td>
            </tr>

            <tr>
              <td style={{ textAlign: "left", paddingTop: "16px" }}>
                <span
                  style={{
                    color: "#000",
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
                    color: "grey",
                    fontSize: "14px",
                    textAlign: "left",
                    fontFamily: "Arial",
                    display: "block",
                    fontWeight: "normal",
                    paddingTop: "8px",
                  }}
                >
                  UNIT 209260 ACADEMY ST BATH, ON, K0H1G0
                </span>
              </td>

              <td style={{ textAlign: "left", paddingTop: "16px" }}>
                <span
                  style={{
                    color: "#000",
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
                    color: "grey",
                    fontSize: "14px",
                    textAlign: "left",
                    fontFamily: "Arial",
                    display: "block",
                    fontWeight: "normal",
                    paddingTop: "8px",
                  }}
                >
                  Completed
                </span>
              </td>
            </tr>

            <tr>
              <td style={{ textAlign: "left", paddingTop: "16px" }}>
                <span
                  style={{
                    color: "#000",
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
                    color: "grey",
                    fontSize: "14px",
                    textAlign: "left",
                    fontFamily: "Arial",
                    display: "block",
                    fontWeight: "normal",
                    paddingTop: "8px",
                  }}
                >
                  RBC
                </span>
              </td>
            </tr>

            <tr>
              <td style={{ textAlign: "left", paddingTop: "16px" }}>
                <span
                  style={{
                    color: "#000",
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
                    color: "grey",
                    fontSize: "14px",
                    textAlign: "left",
                    fontFamily: "Arial",
                    display: "block",
                    fontWeight: "normal",
                    paddingTop: "8px",
                  }}
                >
                  fe292734-9071-47f3-a54f-08d95b892275
                </span>
              </td>
            </tr>
          </tbody>
        </table>

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
                style={{
                  textAlign: "left",
                  fontSize: "16px",
                  olor: "#000",
                  fontFamily: "Arial",
                }}
              >
                Account Name
              </th>

              <th
                style={{
                  textAlign: "left",
                  fontSize: "16px",
                  olor: "#000",
                  fontFamily: "Arial",
                }}
              >
                Account Number
              </th>

              <th
                style={{
                  textAlign: "left",
                  fontSize: "16px",
                  olor: "#000",
                  fontFamily: "Arial",
                }}
              >
                Account Type
              </th>

              <th
                style={{
                  textAlign: "left",
                  fontSize: "16px",
                  olor: "#000",
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
                  color: "gray",
                  fontFamily: "Arial",
                  borderBottom: "1px solid #dcdcdc",
                  padding: "20px 20px",
                  fontWeight: "normal",
                }}
              >
                RBC VIP Banking
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
              >
                003-00292-5115787
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
              >
                Operation
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
              >
                $3.90
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
                  color: "gray",
                  fontWeight: "700",
                  fontSize: "14px",
                  textAlign: "left",
                  background: "#f3f3f3",
                  fontFamily: "Arial",
                  padding: "10px 20px",
                  borderBottom: "1px solid #dcdcdc",
                }}
              >
                Date
              </td>

              <td
                style={{
                  color: "gray",
                  fontWeight: "700",
                  fontSize: "14px",
                  textAlign: "left",
                  background: "#f3f3f3",
                  fontFamily: "Arial",
                  padding: "10px 20px",
                  borderBottom: "1px solid #dcdcdc",
                }}
              >
                Description
              </td>

              <td
                style={{
                  color: "gray",
                  fontWeight: "700",
                  fontSize: "14px",
                  textAlign: "left",
                  background: "#f3f3f3",
                  fontFamily: "Arial",
                  padding: "10px 20px",
                  borderBottom: "1px solid #dcdcdc",
                }}
              >
                Withdrawals
              </td>

              <td
                style={{
                  color: "gray",
                  fontWeight: "700",
                  fontSize: "14px",
                  textAlign: "left",
                  background: "#f3f3f3",
                  fontFamily: "Arial",
                  padding: "10px 20px",
                  borderBottom: "1px solid #dcdcdc",
                }}
              >
                Deposits
              </td>

              <td
                style={{
                  color: "gray",
                  fontWeight: "700",
                  fontSize: "14px",
                  textAlign: "left",
                  background: "#f3f3f3",
                  fontFamily: "Arial",
                  padding: "10px 20px",
                  borderBottom: "1px solid #dcdcdc",
                }}
              >
                Balance
              </td>
            </tr>

            <tr>
              <td
                style={{
                  color: "gray",
                  fontWeight: "normal",
                  fontSize: "14px",
                  textAlign: "left",
                  background: "#fff",
                  fontFamily: "Arial",
                  padding: "10px 20px",
                  borderBottom: "1px solid #dcdcdc",
                }}
              >
                2021-08-09
              </td>

              <td
                style={{
                  color: "gray",
                  fontWeight: "normal",
                  fontSize: "14px",
                  textAlign: "left",
                  background: "#fff",
                  fontFamily: "Arial",
                  padding: "10px 20px",
                  borderBottom: "1px solid #dcdcdc",
                }}
              >
                Online Banking transfer
              </td>

              <td
                style={{
                  color: "gray",
                  fontWeight: "normal",
                  fontSize: "14px",
                  textAlign: "left",
                  background: "#fff",
                  fontFamily: "Arial",
                  padding: "10px 20px",
                  borderBottom: "1px solid #dcdcdc",
                }}
              >
                $440.00
              </td>

              <td
                style={{
                  color: "gray",
                  fontWeight: "normal",
                  fontSize: "14px",
                  textAlign: "left",
                  background: "#fff",
                  fontFamily: "Arial",
                  padding: "10px 20px",
                  borderBottom: "1px solid #dcdcdc",
                }}
              >
                $15.00
              </td>

              <td
                style={{
                  color: "gray",
                  fontWeight: "normal",
                  fontSize: "14px",
                  textAlign: "left",
                  background: "#fff",
                  fontFamily: "Arial",
                  padding: "10px 20px",
                  borderBottom: "1px solid #dcdcdc",
                }}
              >
                $3.90
              </td>
            </tr>

            <tr>
              <td
                style={{
                  color: "gray",
                  fontWeight: "normal",
                  fontSize: "14px",
                  textAlign: "left",
                  background: "#fff",
                  fontFamily: "Arial",
                  padding: "10px 20px",
                  borderBottom: "1px solid #dcdcdc",
                }}
              >
                2021-08-09
              </td>

              <td
                style={{
                  color: "gray",
                  fontWeight: "normal",
                  fontSize: "14px",
                  textAlign: "left",
                  background: "#fff",
                  fontFamily: "Arial",
                  padding: "10px 20px",
                  borderBottom: "1px solid #dcdcdc",
                }}
              >
                Online Banking transfer
              </td>

              <td
                style={{
                  color: "gray",
                  fontWeight: "normal",
                  fontSize: "14px",
                  textAlign: "left",
                  background: "#fff",
                  fontFamily: "Arial",
                  padding: "10px 20px",
                  borderBottom: "1px solid #dcdcdc",
                }}
              >
                $440.00
              </td>

              <td
                style={{
                  color: "gray",
                  fontWeight: "normal",
                  fontSize: "14px",
                  textAlign: "left",
                  background: "#fff",
                  fontFamily: "Arial",
                  padding: "10px 20px",
                  borderBottom: "1px solid #dcdcdc",
                }}
              >
                $15.00
              </td>

              <td
                style={{
                  color: "gray",
                  fontWeight: "normal",
                  fontSize: "14px",
                  textAlign: "left",
                  background: "#fff",
                  fontFamily: "Arial",
                  padding: "10px 20px",
                  borderBottom: "1px solid #dcdcdc",
                }}
              >
                $3.90
              </td>
            </tr>

            <tr>
              <td
                style={{
                  color: "gray",
                  fontWeight: "normal",
                  fontSize: "14px",
                  textAlign: "left",
                  background: "#fff",
                  fontFamily: "Arial",
                  padding: "10px 20px",
                  borderBottom: "1px solid #dcdcdc",
                }}
              >
                2021-08-09
              </td>

              <td
                style={{
                  color: "gray",
                  fontWeight: "normal",
                  fontSize: "14px",
                  textAlign: "left",
                  background: "#fff",
                  fontFamily: "Arial",
                  padding: "10px 20px",
                  borderBottom: "1px solid #dcdcdc",
                }}
              >
                Online Banking transfer
              </td>

              <td
                style={{
                  color: "gray",
                  fontWeight: "normal",
                  fontSize: "14px",
                  textAlign: "left",
                  background: "#fff",
                  fontFamily: "Arial",
                  padding: "10px 20px",
                  borderBottom: "1px solid #dcdcdc",
                }}
              >
                $440.00
              </td>

              <td
                style={{
                  color: "gray",
                  fontWeight: "normal",
                  fontSize: "14px",
                  textAlign: "left",
                  background: "#fff",
                  fontFamily: "Arial",
                  padding: "10px 20px",
                  borderBottom: "1px solid #dcdcdc",
                }}
              >
                $15.00
              </td>

              <td
                style={{
                  color: "gray",
                  fontWeight: "normal",
                  fontSize: "14px",
                  textAlign: "left",
                  background: "#fff",
                  fontFamily: "Arial",
                  padding: "10px 20px",
                  borderBottom: "1px solid #dcdcdc",
                }}
              >
                $3.90
              </td>
            </tr>

            <tr>
              <td
                style={{
                  color: "gray",
                  fontWeight: "normal",
                  fontSize: "14px",
                  textAlign: "left",
                  background: "#fff",
                  fontFamily: "Arial",
                  padding: "10px 20px",
                  borderBottom: "1px solid #dcdcdc",
                }}
              >
                2021-08-09
              </td>

              <td
                style={{
                  color: "gray",
                  fontWeight: "normal",
                  fontSize: "14px",
                  textAlign: "left",
                  background: "#fff",
                  fontFamily: "Arial",
                  padding: "10px 20px",
                  borderBottom: "1px solid #dcdcdc",
                }}
              >
                Online Banking transfer
              </td>

              <td
                style={{
                  color: "gray",
                  fontWeight: "normal",
                  fontSize: "14px",
                  textAlign: "left",
                  background: "#fff",
                  fontFamily: "Arial",
                  padding: "10px 20px",
                  borderBottom: "1px solid #dcdcdc",
                }}
              >
                $440.00
              </td>

              <td
                style={{
                  color: "gray",
                  fontWeight: "normal",
                  fontSize: "14px",
                  textAlign: "left",
                  background: "#fff",
                  fontFamily: "Arial",
                  padding: "10px 20px",
                  borderBottom: "1px solid #dcdcdc",
                }}
              >
                $15.00
              </td>

              <td
                style={{
                  color: "gray",
                  fontWeight: "normal",
                  fontSize: "14px",
                  textAlign: "left",
                  background: "#fff",
                  fontFamily: "Arial",
                  padding: "10px 20px",
                  borderBottom: "1px solid #dcdcdc",
                }}
              >
                $3.90
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default PdfPrint;
