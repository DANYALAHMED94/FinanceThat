import moment from "moment";
import React from "react";
import { Link } from "react-router-dom";

export default function ApplicationHeaderAdmin(props) {
  const name = `${props.applicantFirstName != undefined && props.applicantFirstName != null
    ? props.applicantFirstName || ""
    : ""
    } ${props.applicantLastName != undefined && props.applicantLastName != null
      ? props.applicantLastName || ""
      : ""
    }`;
  const email = props.applicantEmailByDealer
    ? props.applicantEmailByDealer
    : props.applicantEmail != undefined && props.applicantEmail != null
      ? props.applicantEmail || ""
      : "";

  const telephone =
    props.applicantTelephone != undefined && props.applicantTelephone != null
      ? props.applicantTelephone || ""
      : "";

      function formatPhoneNumber(telephone) {
        telephone = telephone?.replace("+1",).trim() ||""
        var cleaned = ('' + telephone).replace(/\D/g, '')
        var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
        console.log(match, "MATCH")
        if (match) {
          return '(' + match[1] + ') ' + match[2] + '-' + match[3]
        }
        return null
      }


  const isDealer = props.application_detail?.user?.user_type === 2;
  const user = props.application_detail?.user;
  const isLoginUser = JSON.parse(localStorage.getItem('user'))?.id != user?.id
  const vehicle_type = props.application_detail?.vehicle_type;

  function applicationType(apptypeId) {
    const types = {
      1 : "General",
      2 : "Inventory",
      3 : "Manual",
      4 : "Lead"
    }
    return types[apptypeId] || ""
  }
  function applicationCategory(appCatId) {
    const types = {
      1 : "Unmanaged",
      2 : "Managed",
      3 : "Private Sale",
      4 : "In House"
    }
    return types[appCatId] || ""
  }

  return (
    <div className="applicationHeaderAdmin">
      <div className="applicantSec">
        <div className="typeTag d-none d-md-flex">
          <span>Applicant</span>
        </div>
        <div className="innerWrapper">
          <div className="contantSec">
            <div className="headFirst">
              <h2>{name}</h2>
              {(props.firstTypeOfVehicle || props.interestedVehicleType) && (
                <div className="tag">
                  {props.firstTypeOfVehicle || props.interestedVehicleType}
                </div>
              )}
              {props.buyerAppId && (<div className="tag">ID: {props.buyerAppId}</div>)}
              {(props.application_type) && (
                <div className="tag">
                  {applicationType(props.application_type)}
                </div>
              )}
              {(props.application_category) && (
                <div className="tag">
                  {applicationCategory(props.application_category)}
                </div>
              )}
               {/* {(props.application_category) && (
                <div className="tag">
                  {vehicle_type}
                </div>
              )} */}
              {props.created_at && (
                <div className="date">
                  <div className="circle">
                    <img
                      src="/assets/image/calenderApplicantion.svg"
                      alt="calender"
                    />
                  </div>
                  <span>
                    {props.created_at !== ""
                      ? moment(props.created_at).format("ll")
                      : ""}
                  </span>
                </div>
              )}

            </div>
            <div className="headSecond">
              {telephone && (
                <div className="item">
                  <img
                    src="/assets/image/applicationPhoneIcon.svg"
                    alt="phone"
                  ></img>
                <span> +1 {formatPhoneNumber(telephone) || telephone}</span>
                </div>
              )}
              {email && (<div className="item">
                <img
                  src="/assets/image/applicationMessageIcon.svg"
                  alt="phone"
                ></img>
                <span>{email}</span>
              </div>)}

              {props.applicantSin && (
                <div className="item">
                  <img
                    src="/assets/image/applicationSinIcon.svg"
                    alt="phone"
                  ></img>
                  <span> {props.applicantSin}</span>
                </div>
              )}
            </div>
          </div>
          <div className="float-right">
            {props.selectedAgent &&
              Object.keys(props.selectedAgent).length > 0 ? (
              <Link className="nav-link float-right" to={`${props.url}/assign-agent`}>
                <div className="agentSec">
                  <i className="bi bi-person-plus" style={{ fontStyle: 'normal' }}><span style={{ padding: '0px 10px' }}>
                    {`${props.selectedAgent &&
                      Object.keys(props.selectedAgent).length > 0
                      ? props.selectedAgent.label
                      : ""
                      } `}
                  </span></i>
                </div>
              </Link>
            ) : (
              <Link className="agentlinkstyle float-right" to={props.addAppLication ? "#" :`${props.url}/assign-agent`}>
                {props.selectedAgent &&
                  Object.keys(props.selectedAgent).length > 0
                  ? props.selectedAgent.label
                  : <span style={{ padding: '0px 8px 0px 25px' }}>Assign Rep</span>
                }
              </Link>
            )}
          </div>
        </div>
      </div>
      {(isDealer && isLoginUser) && (//CHANGE DELER
        <div className="dealerSec">
          <div className="typeTag d-none d-md-flex">Dealer</div>
          <div className="innerWrapper">
            <div className="leftSec">
              <p>Submitted by</p>
              <h2>{user?.last_name ? user.last_name : ""}</h2>
            </div>

            {/* <div className="rightSec"> */}
            <div>
              <p className="mr-2">Dealer Information</p>
              {user?.phone_number && (
                <div className="flexCenter">
                  <img
                    src="/assets/image/applicationPhoneIcon.svg"
                    alt="phone"
                  ></img>
                  <span> +{user?.phone_number}</span>
                </div>
              )}
            </div>
            <div className="flexCenter">
              <img
                src="/assets/image/applicationMessageIcon.svg"
                alt="phone"
              ></img>
              <span>{user?.email}</span>
            </div>
          </div>
          {/* </div> */}
        </div>
      )}
    </div>
  );
}
