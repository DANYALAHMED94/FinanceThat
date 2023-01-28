import React from "react";
import MaskedInput from "react-text-mask";
import NumberFormat from "react-number-format";
const ArchiveListingReviewUserDetail = (props) => {
  return (
    <React.Fragment>
      {props.state.listingBy === "Dealer" ? (
        <div className="DealerID-List">
          <div className="LeftCon">
            <h1>Operating Name</h1>
          </div>
          <div className="RightCon">
            <h2>
              <span>
                {props.loading_listing_detail === true ? (
                  <i
                    class="fa fa-circle-o-notch fa-spin"
                    aria-hidden="true"
                  ></i>
                ) : props.editUser === true ? (
                  <input
                    type="text"
                    name="userName"
                    value={props.state.userName}
                    onChange={props.handleOnChange}
                  />
                ) : (
                  props.state.userName
                )}
              </span>
            </h2>
          </div>
        </div>
      ) : null}
      {props.state.listingBy !== "Dealer" ? (
        <>
          <div className="DealerID-List">
            <div className="LeftCon">
              <h1>First Name</h1>
            </div>
            <div className="RightCon">
              <h2>
                <span>
                  {props.loading_listing_detail === true ? (
                    <i
                      class="fa fa-circle-o-notch fa-spin"
                      aria-hidden="true"
                    ></i>
                  ) : props.editUser === true ? (
                    <input
                      type="text"
                      name="userFirstName"
                      value={props.state.userFirstName}
                      onChange={props.handleOnChange}
                    />
                  ) : (
                    props.state.userFirstName
                  )}
                </span>
              </h2>
            </div>
          </div>
          <div className="DealerID-List">
            <div className="LeftCon">
              <h1>Last Name</h1>
            </div>
            <div className="RightCon">
              <h2>
                <span>
                  {props.loading_listing_detail === true ? (
                    <i
                      class="fa fa-circle-o-notch fa-spin"
                      aria-hidden="true"
                    ></i>
                  ) : props.editUser === true ? (
                    <input
                      type="text"
                      name="userLastName"
                      value={props.state.userLastName}
                      onChange={props.handleOnChange}
                    />
                  ) : (
                    props.state.userLastName
                  )}
                </span>
              </h2>
            </div>
          </div>
        </>
      ) : null}

      <div className="DealerID-List">
        <div className="LeftCon">
          <h1>City</h1>
        </div>
        <div className="RightCon">
          <h2>
            {props.loading_listing_detail === true ? (
              <i class="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>
            ) : props.editUser === true ? (
              <input
                type="text"
                name="userCity"
                value={props.state.userCity}
                onChange={props.handleOnChange}
              />
            ) : (
              props.state.userCity
            )}
          </h2>
        </div>
      </div>

      <div className="DealerID-List">
        <div className="LeftCon">
          <h1>Street Address</h1>
        </div>
        <div className="RightCon">
          <h2>
            {props.loading_listing_detail === true ? (
              <i class="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>
            ) : props.editUser === true ? (
              <input
                type="text"
                name="userStreetAddress"
                value={props.state.userStreetAddress}
                onChange={props.handleOnChange}
              />
            ) : (
              props.state.userStreetAddress
            )}
          </h2>
        </div>
      </div>

      <div className="DealerID-List">
        <div className="LeftCon">
          <h1>City</h1>
        </div>
        <div className="RightCon">
          <h2>
            {props.loading_listing_detail === true ? (
              <i class="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>
            ) : props.editUser === true ? (
              <input
                type="text"
                name="userCity"
                value={props.state.userCity}
                onChange={props.handleOnChange}
              />
            ) : (
              props.state.userCity
            )}
          </h2>
        </div>
      </div>

      <div className="DealerID-List">
        <div className="LeftCon">
          <h1>Postal Code</h1>
        </div>
        <div className="RightCon">
          <h2>
            {props.loading_listing_detail === true ? (
              <i class="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>
            ) : props.editUser === true ? (
              <MaskedInput
                mask={[
                  /[a-zA-Z0-9]/i,
                  /[a-zA-Z0-9]/,
                  /[a-zA-Z0-9]/i,
                  " ",
                  /[a-zA-Z0-9]/,
                  /[a-zA-Z0-9]/i,
                  /[a-zA-Z0-9]/,
                ]}
                guide={false}
                placeholder="A2A 2A2"
                id="userPostalCode"
                name="userPostalCode"
                value={props.state.userPostalCode}
                onChange={props.handleOnChange}
              />
            ) : (
              props.state.userPostalCode
            )}
          </h2>
        </div>
      </div>

      <div className="DealerID-List">
        <div className="LeftCon">
          <h1>Fax</h1>
        </div>
        <div className="RightCon">
          <h2>
            {props.loading_listing_detail === true ? (
              <i class="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>
            ) : props.editUser === true ? (
              <NumberFormat
                format="+1 (###) ###-####"
                onChange={props.handleOnChange}
                value={props.state.userFax}
                name="userFax"
              />
            ) : (
              props.state.userFax
            )}
          </h2>
        </div>
      </div>

      <div className="DealerID-List">
        <div className="LeftCon">
          <h1>Email</h1>
        </div>
        <div className="RightCon">
          <h2>
            {props.loading_listing_detail === true ? (
              <i class="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>
            ) : props.editUser === true ? (
              <input
                type="email"
                name="userEmail"
                value={props.state.userEmail}
                onChange={props.handleOnChange}
              />
            ) : (
              props.state.userEmail
            )}
          </h2>
        </div>
      </div>
    </React.Fragment>
  );
};
export default ArchiveListingReviewUserDetail;
