import React, { useEffect, useState } from "react";
import moment from "moment";
import PendingAccountDealerDetail from "./PendingAccountDealerDetail";
import MaskedInput from "react-text-mask";
import { API_URL } from "../../../../constant";
import NumberFormat from "react-number-format";
import { capitalize, capsProvince } from "./../../../../_helpers/capitalize";

const PendingAccountReviews = (props) => {
  const [state, setState] = useState({
    account_id: "",
    user_id: "",
    created_at: null,
    name: "",
    operating_name: "",
    street_address: "",
    city: "",
    province: "",
    postal_code: "",
    phone: "",
    fax: "",
    email: "",
    years_in_business: "",
    no_of_owner: "",
    void_check_path: null,
    interior_business_path: null,
    exterior_business_path: null,
    license_path: null,
    logo_path: null,
    omviccertificate: null,
    auction_dealer_id: "",
    status: "",
    reason: "",
    note: "",
    modified_at: "",
    country: "",
    photo: null,
    declineText: "",
    first_name: "",
    last_name: "",
    phone_number: "",
  });
  const [edit, setEdit] = useState(false);
  const [downloadFiles, setDownloadFiles] = useState([]);

  useEffect(() => {
    if (
      props.update_account_row !== undefined &&
      props.update_account_row !== null
    ) {
      // console.log('props.update_account_row', props.update_account_row)
      (props.update_account_row || []).map((item) =>
        setState({
          ...state,
          account_id: item.id || "",
          user_id: item?.user_id?.id || "",
          created_at: item.created_at || null,
          name:
            props.accountType === "Dealer"
              ? item.business_name || ""
              : item.name || "",
          operating_name: item.operating_name || "",
          // first_name: props.accountType === 'Dealer' ? '' : item.first_name || '',
          // last_name: props.accountType === 'Dealer' ? '' : item.last_name || '',
          first_name: item.first_name || "",
          last_name: item.last_name || "",
          street_address:
            props.accountType === "Dealer"
              ? item.street_address || ""
              : item.street || "",
          city: item.city || "",
          province: item.province || "",
          postal_code: item.postal_code || "",
          phone:
            props.accountType === "Dealer"
              ? item.phone || ""
              : item.telephone || "",
          phone_number: item?.user_id?.phone_number || "",
          fax: item.fax || "",
          email: item.email || "",
          years_in_business: item.years_in_business || "",
          no_of_owner: item.no_of_owner || "",
          void_check_path:
            item.void_check_path !== undefined && item.void_check_path !== null
              ? API_URL + item.void_check_path
              : null,
          interior_business_path:
            item.interior_business_path !== undefined &&
            item.interior_business_path !== null
              ? API_URL + item.interior_business_path
              : null,
          exterior_business_path:
            item.exterior_business_path !== undefined &&
            item.exterior_business_path !== null
              ? API_URL + item.exterior_business_path
              : null,
          license_path:
            item.license_path !== undefined && item.license_path !== null
              ? API_URL + item.license_path
              : null,
          logo_path: item.logo_path || null,
          omviccertificate:
            item.omviccertificate !== undefined &&
            item.omviccertificate !== null
              ? API_URL + item.omviccertificate
              : null,
          auction_dealer_id: item.auction_dealer_id || "",
          status: item.status || "",
          reason: item.reason || "",
          note: item.note || "",
          modified_at: item.modified_at || "",
          country: item.country || "",
          photo: item.photo || null,
        })
      );
    }
  }, [props.update_account_row]);

  useEffect(() => {
    if (
      props.update_account !== undefined &&
      props.update_account !== null &&
      props.update_account === false
    ) {
      setEdit(false);
    }
  }, [props.update_account]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value,
    });
  };
  const approvedAccount = () => {
    const data = {
      action: "approve",
      id: state.user_id,
      update: "account_status",
    };
    props.approved_pending_account(data);

    console.log("approvedAccount");
  };
  const declineAccount = () => {
    const data = {
      action: "decline",
      reason: state.declineText,
      id: state.user_id,
      update: "account_status",
    };
    props.decline_pending_account(data);

    console.log("declineAccount");
  };
  const provinces = [
    { name: "Alberta", value: "AB" },
    { name: "British Columbia", value: "BC" },
    { name: "Manitoba", value: "MB" },
    { name: "New Brunswick", value: "NB" },
    { name: "Newfoundland and Labrador", value: "NL" },
    { name: "Nova Scotia", value: "NS" },
    { name: "Ontario", value: "ON" },
    { name: "Prince Edward Island", value: "PE" },
    { name: "Quebec", value: "QC" },
    { name: "Saskatchewan", value: "SK" },
    { name: "Northwest Territories", value: "NT" },
    { name: "Nunavut", value: "NU" },
    { name: "Yukon", value: "YT" },
  ];
  const update_private_account = () => {
    var formData = new FormData();
    formData.append("first_name", state.first_name);
    formData.append("last_name", state.last_name);
    formData.append("name", state.name);
    formData.append("street", state.street_address);
    formData.append("city", state.city);
    formData.append("postal_code", state.postal_code);
    formData.append("email", state.email);
    formData.append("telephone", state.phone);
    formData.append("phone_number", state.phone_number);
    if (
      state.user_id !== undefined &&
      state.user_id !== null &&
      state.user_id !== ""
    ) {
      props.update_private_account(formData, state.user_id);
    }
  };
  const update_dealer_account = () => {
    var formData = new FormData();
    formData.append("business_name", state.name);
    formData.append("operating_name", state.operating_name);
    formData.append("street_address", state.street_address);
    formData.append("postal_code", state.postal_code);
    formData.append("city", state.city);
    formData.append("phone", state.phone);
    formData.append("province", state.province);
    formData.append("fax", state.fax);
    formData.append("email", state.email);
    formData.append("years_in_business", state.years_in_business);
    formData.append("phone_number", state.phone_number);
    formData.append("update", "dealer_details");
    if (
      state.user_id !== undefined &&
      state.user_id !== null &&
      state.user_id !== ""
    ) {
      props.update_dealer_account(formData, state.user_id);
    }
  };
  const addFiles = (file) => {
    if (downloadFiles.length === 0) {
      setDownloadFiles([...downloadFiles, file]);
    } else {
      const exist = downloadFiles.filter((item) => item == file);
      if (exist.length > 0) {
        const files = downloadFiles.filter((item) => item !== file);
        setDownloadFiles(files);
      } else {
        setDownloadFiles([...downloadFiles, file]);
      }
    }
  };

  const downloadAllFiles = () => {
    downloadFiles.map((item) => {
      props.downloadFile(item);
    });
  };
  return (
    <React.Fragment>
      <div className="Admin-MainHead">
        <div className="Admin-HeadLeft">
          {/* <h1>Account #{props.loading === true ? (<i class="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>) : state.account_id}</h1> */}
          <h1>
            Account #
            {props.loading === true ? (
              <i class="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>
            ) : (
              state.user_id
            )}
          </h1>
          <h2>
            Date Added:{" "}
            {props.loading === true ? (
              <i class="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>
            ) : state.created_at !== null ? (
              moment(state.created_at).format("yyyy-MM-DD")
            ) : (
              ""
            )}
          </h2>
        </div>

        <div className="Admin-HeadRight">
          <h3>Pending</h3>
        </div>
      </div>

      <div className="clearfix"></div>

      <div className="admin-account-detail-container">
        <div className="Admin-DealerLeft">
          <div className="InnerDealer-Container">
            <div className="InnerDealer-Head">
              <div className="InnerLeft">
                <h1>Account Details</h1>
              </div>

              <div className="InnerRight">
                {/* <h3>ID: <span>{props.loading === true ? (<i class="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>) : state.account_id}</span></h3> */}
                <h3>
                  ID:{" "}
                  <span>
                    {props.loading === true ? (
                      <i
                        class="fa fa-circle-o-notch fa-spin"
                        aria-hidden="true"
                      ></i>
                    ) : (
                      state.user_id
                    )}
                  </span>
                </h3>
                <h3>
                  TYPE: <span>{props.accountType}</span>
                </h3>
              </div>
            </div>

            <div className="DealerID-Container">
              {props.accountType !== "Dealer" ? (
                <>
                  <div className="DealerID-List">
                    <div className="LeftCon">
                      <h1>{"First Name"}</h1>
                    </div>
                    <div className="RightCon">
                      <h2>
                        {props.loading === true ? (
                          <i
                            class="fa fa-circle-o-notch fa-spin"
                            aria-hidden="true"
                          ></i>
                        ) : edit === true ? (
                          <input
                            type="text"
                            name="first_name"
                            value={state.first_name}
                            onChange={handleOnChange}
                          />
                        ) : (
                          state.first_name
                        )}
                      </h2>
                    </div>
                  </div>

                  <div className="DealerID-List">
                    <div className="LeftCon">
                      <h1>{"Last Name"}</h1>
                    </div>
                    <div className="RightCon">
                      <h2>
                        {props.loading === true ? (
                          <i
                            class="fa fa-circle-o-notch fa-spin"
                            aria-hidden="true"
                          ></i>
                        ) : edit === true ? (
                          <input
                            type="text"
                            name="last_name"
                            value={state.last_name}
                            onChange={handleOnChange}
                          />
                        ) : (
                          state.last_name
                        )}
                      </h2>
                    </div>
                  </div>
                </>
              ) : null}
              {props.accountType === "Dealer" ? (
                <div className="DealerID-List">
                  <div className="LeftCon">
                    <h1>
                      {props.accountType === "Dealer"
                        ? "Business legal name"
                        : "Name"}
                    </h1>
                  </div>
                  <div className="RightCon">
                    <h2>
                      {props.loading === true ? (
                        <i
                          class="fa fa-circle-o-notch fa-spin"
                          aria-hidden="true"
                        ></i>
                      ) : edit === true ? (
                        <input
                          type="text"
                          name="name"
                          value={state.name}
                          onChange={handleOnChange}
                        />
                      ) : (
                        state.name
                      )}
                    </h2>
                  </div>
                </div>
              ) : null}

              {props.accountType !== "Private" ? (
                <div className="DealerID-List">
                  <div className="LeftCon">
                    <h1>Operating name</h1>
                  </div>
                  <div className="RightCon">
                    <h2>
                      {props.loading === true ? (
                        <i
                          class="fa fa-circle-o-notch fa-spin"
                          aria-hidden="true"
                        ></i>
                      ) : edit === true ? (
                        <input
                          type="text"
                          name="operating_name"
                          value={state.operating_name}
                          onChange={handleOnChange}
                        />
                      ) : (
                        state.operating_name
                      )}
                    </h2>
                  </div>
                </div>
              ) : null}

              <div className="DealerID-List">
                <div className="LeftCon">
                  <h1>Street Address</h1>
                </div>
                <div className="RightCon">
                  <h2>
                    {props.loading === true ? (
                      <i
                        class="fa fa-circle-o-notch fa-spin"
                        aria-hidden="true"
                      ></i>
                    ) : edit === true ? (
                      <input
                        type="text"
                        name="street_address"
                        value={state.street_address}
                        onChange={handleOnChange}
                      />
                    ) : (
                      state.street_address
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
                    {props.loading === true ? (
                      <i
                        class="fa fa-circle-o-notch fa-spin"
                        aria-hidden="true"
                      ></i>
                    ) : edit === true ? (
                      <input
                        type="text"
                        name="city"
                        value={capitalize(state.city)}
                        onChange={handleOnChange}
                      />
                    ) : (
                      capitalize(state.city)
                    )}
                  </h2>
                </div>
              </div>
              {/* <input type='text' name='province' value={capsProvince(state.province)} onChange={handleOnChange} /> */}
              {props.accountType === "Dealer" ? (
                <div className="DealerID-List">
                  <div className="LeftCon">
                    <h1>Province</h1>
                  </div>
                  <div className="RightCon">
                    <h2>
                      {props.loading === true ? (
                        <i
                          class="fa fa-circle-o-notch fa-spin"
                          aria-hidden="true"
                        ></i>
                      ) : edit === true ? (
                        <select
                          name="province"
                          onChange={handleOnChange}
                          value={capsProvince(state.province)}
                        >
                          <option value={""}>Select</option>
                          {provinces.map((prov) => (
                            <option value={prov.value}>{prov.name}</option>
                          ))}
                          )
                        </select>
                      ) : (
                        capsProvince(state.province)
                      )}
                    </h2>
                  </div>
                </div>
              ) : null}

              {/* <input type='text' name="postal_code" value={state.postal_code} onChange={handleOnChange} /> */}
              <div className="DealerID-List">
                <div className="LeftCon">
                  <h1>Postal Code</h1>
                </div>
                <div className="RightCon">
                  <h2>
                    {props.loading === true ? (
                      <i
                        class="fa fa-circle-o-notch fa-spin"
                        aria-hidden="true"
                      ></i>
                    ) : edit === true ? (
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
                        id="postal_code"
                        name="postal_code"
                        value={state.postal_code}
                        onChange={handleOnChange}
                      />
                    ) : (
                      state.postal_code
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
                    {props.loading === true ? (
                      <i
                        class="fa fa-circle-o-notch fa-spin"
                        aria-hidden="true"
                      ></i>
                    ) : edit === true ? (
                      <input
                        type="email"
                        name="email"
                        value={state.email}
                        onChange={handleOnChange}
                      />
                    ) : (
                      state.email
                    )}
                  </h2>
                </div>
              </div>
              {/* <input type='text' name="phone" value={state.phone} onChange={handleOnChange} /> */}
              <div className="DealerID-List">
                <div className="LeftCon">
                  <h1>Telephone</h1>
                </div>
                <div className="RightCon">
                  <h2>
                    {props.loading === true ? (
                      <i
                        class="fa fa-circle-o-notch fa-spin"
                        aria-hidden="true"
                      ></i>
                    ) : edit === true ? (
                      <NumberFormat
                        format="+1 (###) ###-####"
                        onChange={handleOnChange}
                        value={state.phone}
                        name="phone"
                      />
                    ) : (
                      state.phone
                    )}
                  </h2>
                </div>
              </div>
              {props.accountType === "Private" ? (
                <div className="DealerID-List">
                  <div className="LeftCon">
                    <h1>Phone</h1>
                  </div>
                  <div className="RightCon">
                    <h2>
                      {props.loading === true ? (
                        <i
                          class="fa fa-circle-o-notch fa-spin"
                          aria-hidden="true"
                        ></i>
                      ) : edit === true ? (
                        <NumberFormat
                          format="+1 (###) ###-####"
                          onChange={handleOnChange}
                          value={state.phone_number}
                          name="phone_number"
                        />
                      ) : (
                        state.phone_number
                      )}
                    </h2>
                  </div>
                </div>
              ) : null}

              {props.accountType === "Dealer" ? (
                <div className="DealerID-List">
                  <div className="LeftCon">
                    <h1>Fax</h1>
                  </div>
                  <div className="RightCon">
                    <h2>
                      {props.loading === true ? (
                        <i
                          class="fa fa-circle-o-notch fa-spin"
                          aria-hidden="true"
                        ></i>
                      ) : edit === true ? (
                        <input
                          type="text"
                          name="fax"
                          value={state.fax}
                          onChange={handleOnChange}
                        />
                      ) : (
                        state.fax
                      )}
                    </h2>
                  </div>
                </div>
              ) : null}

              {/* {props.accountType === 'Dealer' ? (<div className="DealerID-List">
                            <div className="LeftCon"><h1>Years in business</h1></div>
                            <div className="RightCon"><h2>{props.loading === true ? (<i class="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>) : edit === true ? (<input type='text' name='years_in_business' value={state.years_in_business} onChange={handleOnChange} />) : state.years_in_business}</h2></div>
                        </div>) : null} */}

              <div className="clearfix"></div>

              <div className="Account-EditBtn">
                {edit === true ? (
                  <button
                    type="button"
                    className="newbtn-add"
                    disabled={!edit}
                    onClick={
                      props.accountType === "Dealer"
                        ? update_dealer_account
                        : update_private_account
                    }
                  >
                    {" "}
                    {props.update_account === true ? (
                      <i
                        class="fa fa-circle-o-notch fa-spin"
                        aria-hidden="true"
                      ></i>
                    ) : (
                      "Update"
                    )}{" "}
                  </button>
                ) : (
                  <button type="button" onClick={() => setEdit(!edit)}>
                    {" "}
                    <img src="/assets/image/icon-edit.svg" alt="" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="Admin-DealerRight">
          {props.accountType === "Dealer" ? (
            <div className="InnerDealer-Container">
              <div className="InnerDealer-Head">
                {/* <div className="InnerLeft"><h1>Files Download</h1></div> */}
                <div className="InnerLeft">
                  <h1>Documents</h1>
                </div>

                <div className="InnerRight"></div>
              </div>

              <div className="InnerMark-Container">
                <div className="Admin-DocumetCheck">
                  <label
                    className={
                      state.void_check_path === null
                        ? "DocBtn-Container active"
                        : "DocBtn-Container"
                    }
                  >
                    Void Cheque / Pre-authorized form
                    <input
                      type="checkbox"
                      value={state.void_check_path}
                      disabled={state.void_check_path === null}
                      onClick={() => addFiles(state.void_check_path)}
                    />
                    <span className="DocMark"></span>
                  </label>
                </div>

                <div className="Admin-DocumetCheck">
                  <label
                    className={
                      state.interior_business_path === null
                        ? "DocBtn-Container active"
                        : "DocBtn-Container"
                    }
                  >
                    Business interior picture
                    <input
                      type="checkbox"
                      value={state.interior_business_path}
                      disabled={state.interior_business_path === null}
                      onClick={() => addFiles(state.interior_business_path)}
                    />
                    <span className="DocMark"></span>
                  </label>
                </div>

                <div className="Admin-DocumetCheck">
                  <label
                    className={
                      state.exterior_business_path === null
                        ? "DocBtn-Container active"
                        : "DocBtn-Container"
                    }
                  >
                    Business exterior picture
                    <input
                      type="checkbox"
                      value={state.exterior_business_path}
                      disabled={state.exterior_business_path === null}
                      onClick={() => addFiles(state.exterior_business_path)}
                    />
                    <span className="DocMark"></span>
                  </label>
                </div>

                <div className="Admin-DocumetCheck">
                  <label
                    className={
                      state.license_path === null
                        ? "DocBtn-Container active"
                        : "DocBtn-Container"
                    }
                  >
                    Articles of Incorporation / Master business License
                    <input
                      type="checkbox"
                      value={state.license_path}
                      disabled={state.license_path === null}
                      onClick={() => addFiles(state.license_path)}
                    />
                    <span className="DocMark"></span>
                  </label>
                </div>

                <button
                  type="button"
                  onClick={downloadAllFiles}
                  disabled={downloadFiles.length === 0}
                >
                  Download
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </div>

      <div className="clearfix"></div>
      {props.accountType === "Dealer" ? (
        <div className="PrinOwner-Container" style={{ width: "943px" }}>
          <PendingAccountDealerDetail {...props} />
        </div>
      ) : null}

      <div className="Reasonfor-Diclined dicline-add-mt">
        <div className="Reasonfor-Head">
          {/* <h1>New reason(s) for declining the listing</h1> */}
          <h1>Reason for declining the registration</h1>
          <textarea
            id="declineText"
            name="declineText"
            onChange={handleOnChange}
            value={state.declineText}
          >
            {" "}
          </textarea>
        </div>
      </div>

      <div className="clearfix"></div>

      <div className="Reasonfor-Btn">
        <button
          type="button"
          onClick={approvedAccount}
          disabled={props.loading_approved}
        >
          {props.loading_approved === true ? (
            <i class="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>
          ) : (
            "Approve"
          )}
        </button>
        <button
          type="button"
          className="active"
          onClick={declineAccount}
          disabled={props.loading_decline}
        >
          {props.loading_decline === true ? (
            <i class="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>
          ) : (
            "Decline"
          )}
        </button>
      </div>
    </React.Fragment>
  );
};
export default PendingAccountReviews;
