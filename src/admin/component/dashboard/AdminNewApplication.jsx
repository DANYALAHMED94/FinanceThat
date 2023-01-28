import React, { useEffect, useState } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import moment from "moment";
const AdminNewApplication = (props) => {
  let { url } = useRouteMatch();

  return (
    <React.Fragment>
      <div className="NewApp-Container">
        <div className="Admin-NewApp">
          <div className="NewApp-Left">
            <h1>New Applications</h1>
          </div>
          <div className="NewApp-Right">
            <h2>
              {props.loading_dashboard_application === true ? (
                <i
                  className="fa fa-circle-o-notch fa-spin"
                  aria-hidden="true"
                ></i>
              ) : (props.dashboard_applications || []) !== undefined &&
                (props.dashboard_applications || []) !== null &&
                (props.dashboard_applications || []).length > 0 ? (
                (props.dashboard_applications || [])[0].created_at !==
                  undefined &&
                (props.dashboard_applications || [])[0].created_at !== null ? (
                  moment(
                    (props.dashboard_applications || [])[0].created_at
                  ).format("ll")
                ) : (
                  ""
                )
              ) : (
                ""
              )}
            </h2>
          </div>
        </div>
        {props.dashboard_applications !== undefined &&
        props.dashboard_applications !== null
          ? (props.dashboard_applications || []).map((item, index) => (
              <div className="Admin-ContentBox" key={index}>
                <div className="JhonDoe-Container">
                  <div className="JhonHead-Left">
                    <h3>
                      {props.loading_dashboard_application === true ? (
                        <i
                          className="fa fa-circle-o-notch fa-spin"
                          aria-hidden="true"
                        ></i>
                      ) : (
                        `${
                          typeof item.first_name !== "undefined" &&
                          typeof item.first_name !== "null" &&
                          typeof item.first_name !== ""
                            ? item.first_name
                            : ""
                        } ${
                          typeof item.last_name !== "undefined" &&
                          typeof item.last_name !== "null" &&
                          typeof item.last_name !== ""
                            ? item.last_name
                            : ""
                        }`
                      )}
                    </h3>
                    <h4>
                      ID:{" "}
                      <span>
                        {props.loading_dashboard_application === true ? (
                          <i
                            className="fa fa-circle-o-notch fa-spin"
                            aria-hidden="true"
                          ></i>
                        ) : (
                          item.id
                        )}
                      </span>
                    </h4>
                  </div>
                  <div className="JhonHead-Right">
                    <h5>
                      {props.loading_dashboard_application === true ? (
                        <i
                          className="fa fa-circle-o-notch fa-spin"
                          aria-hidden="true"
                        ></i>
                      ) : item.created_at !== undefined &&
                        item.created_at !== null ? (
                        moment(item.created_at).format("ll")
                      ) : (
                        ""
                      )}{" "}
                      |{" "}
                      {props.loading_dashboard_application === true ? (
                        <i
                          className="fa fa-circle-o-notch fa-spin"
                          aria-hidden="true"
                        ></i>
                      ) : item.created_at !== undefined &&
                        item.created_at !== null ? (
                        moment(item.created_at).format("LT")
                      ) : (
                        ""
                      )}
                    </h5>
                  </div>
                </div>

                <div className="JhonDoe-Container mb-0">
                  <div className="JhonHead-Left">
                    <h5>
                      {props.loading_dashboard_application === true ? (
                        <i
                          className="fa fa-circle-o-notch fa-spin"
                          aria-hidden="true"
                        ></i>
                      ) : (
                        item.business_name || ""
                      )}
                    </h5>
                  </div>
                  <div className="JhonHead-Right">
                    <Link to={`/admin/application/pending/${item.id}`}>
                      Review
                    </Link>
                    {/* <Link to={`${url}/pending-application/${item.id}`}>Review</Link> */}
                  </div>
                </div>
              </div>
            ))
          : null}

        <div className="ViewAll-Btn">
          <Link to={`/admin/application/pending`}>View all applications</Link>
        </div>
      </div>
    </React.Fragment>
  );
};
export default AdminNewApplication;
