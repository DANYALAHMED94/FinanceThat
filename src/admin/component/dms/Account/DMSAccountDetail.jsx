/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import moment from "moment";
import NumberFormat from "react-number-format";
import { useSelector, useDispatch } from "react-redux";
import { update_dms_account } from "../../../../actions/admin/dmsActions";
const DMSAccountDetail = (props) => {
  const [state, setState] = useState({
    dms_id: "",
    password: "",
    dms_provider: "",
    ftp_host: "",
    port: "",
    no_of_dealer: "",
    created_at: null,
    name: "",
    phone: "",
    email: "",
  });
  const dispatch = useDispatch();
  const reduxState = useSelector((state) => {
    return {
      dms_account_row:
        state.adminReducer.adminAccounts.dmsReducer.dms_account_row,
      loading: state.adminReducer.adminAccounts.dmsReducer.loading,
      update_account:
        state.adminReducer.adminAccounts.dmsReducer.update_account,
    };
  });

  const [edit, setEdit] = useState(false);

  useEffect(() => {
    if (
      reduxState.dms_account_row !== undefined &&
      reduxState.dms_account_row !== null
    ) {
      (reduxState.dms_account_row || []).map((item) =>
        setState({
          ...state,
          dms_id: props.id || "",
          password: item.password || "",
          dms_provider: item.name || "",
          ftp_host: item.ftp_host || "",
          port: item.port || "",
          no_of_dealer: item.number_of_dealers || "",
          created_at: item.created_at || null,
          name: item.username || "",
          phone: item.phone || "",
          email: item.email || "",
        })
      );
    }
  }, [reduxState.dms_account_row]);

  useEffect(() => {
    if (
      reduxState.update_account !== undefined &&
      reduxState.update_account !== null &&
      reduxState.update_account === false
    ) {
      setEdit(false);
    }
  }, [reduxState.update_account]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value,
    });
  };
  const update_private_account = () => {
    const data = {
      ftp_host: state.ftp_host,
      port: state.port,
      username: state.username,
      name: state.dms_provider,
      password: state.password,
      number_of_dealers: state.no_of_dealer,
      email: state.email,
      phone: state.phone,
      id: state.dms_id,
    };

    if (
      state.dms_id !== undefined &&
      state.dms_id !== null &&
      state.dms_id !== ""
    ) {
      dispatch(update_dms_account(data));
    }
  };

  return (
    <React.Fragment>
      <div className="Admin-MainHead">
        <div className="Admin-HeadLeft">
          <h1>{state.dms_provider}</h1>
          <h2>
            Date Added:{" "}
            {reduxState.loading === true ? (
              <i class="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>
            ) : state.created_at !== null ? (
              moment(state.created_at).format("yyyy-MM-DD")
            ) : (
              ""
            )}
          </h2>
        </div>

        {/* <div className="Admin-HeadRight">
          <h4>Active</h4>
        </div> */}
      </div>

      <div className="clearfix"></div>

      <div className="admin-account-detail-container">
        <div className="Admin-DealerLeft">
          <div className="InnerDealer-Container">
            <div className="InnerDealer-Head">
              <div className="InnerLeft">
                <h1>
                  DMS ID
                  <span>
                    {reduxState.loading === true ? (
                      <i
                        class="fa fa-circle-o-notch fa-spin"
                        aria-hidden="true"
                      ></i>
                    ) : (
                      state.dms_id
                    )}{" "}
                  </span>
                </h1>
              </div>

              <div className="InnerRight">
                <h3></h3>
                <h3>
                  {/* TYPE: <span>{reduxState.accountType}</span> */}
                  {edit === true ? null : (
                    <button type="button" onClick={() => setEdit(!edit)}>
                      <img src="/assets/image/icon-edit.svg" alt="" />
                    </button>
                  )}
                </h3>
              </div>
            </div>

            <div className="DealerID-Container">
              <div className="DealerID-List">
                <div className="LeftCon">
                  <h1>DMS Name</h1>
                </div>
                <div className="RightCon">
                  <h2>
                    {reduxState.loading === true ? (
                      <i
                        class="fa fa-circle-o-notch fa-spin"
                        aria-hidden="true"
                      ></i>
                    ) : edit === true ? (
                      <input
                        type="text"
                        name="dms_provider"
                        value={state.dms_provider}
                        onChange={handleOnChange}
                      />
                    ) : (
                      state.dms_provider
                    )}
                  </h2>
                </div>
              </div>

              <div className="DealerID-List">
                <div className="LeftCon">
                  <h1>FTP Host</h1>
                </div>
                <div className="RightCon">
                  <h2>
                    {reduxState.loading === true ? (
                      <i
                        class="fa fa-circle-o-notch fa-spin"
                        aria-hidden="true"
                      ></i>
                    ) : edit === true ? (
                      <input
                        type="text"
                        name="ftp_host"
                        value={state.ftp_host}
                        onChange={handleOnChange}
                      />
                    ) : (
                      state.ftp_host
                    )}
                  </h2>
                </div>
              </div>

              <div className="DealerID-List">
                <div className="LeftCon">
                  <h1>Port</h1>
                </div>
                <div className="RightCon">
                  <h2>
                    {reduxState.loading === true ? (
                      <i
                        class="fa fa-circle-o-notch fa-spin"
                        aria-hidden="true"
                      ></i>
                    ) : edit === true ? (
                      <input
                        type="number"
                        name="port"
                        value={state.port}
                        onChange={handleOnChange}
                      />
                    ) : (
                      state.port
                    )}
                  </h2>
                </div>
              </div>

              <div className="DealerID-List">
                <div className="LeftCon">
                  <h1>Username</h1>
                </div>
                <div className="RightCon">
                  <h2>
                    {reduxState.loading === true ? (
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

              <div className="DealerID-List">
                <div className="LeftCon">
                  <h1>Password</h1>
                </div>
                <div className="RightCon">
                  <h2>
                    {reduxState.loading === true ? (
                      <i
                        class="fa fa-circle-o-notch fa-spin"
                        aria-hidden="true"
                      ></i>
                    ) : edit === true ? (
                      <input
                        type="text"
                        name="password"
                        value={state.password}
                        onChange={handleOnChange}
                      />
                    ) : (
                      state.password
                    )}
                  </h2>
                </div>
              </div>

              <div className="DealerID-List">
                <div className="LeftCon">
                  <h1>Phone</h1>
                </div>
                <div className="RightCon">
                  <h2>
                    {reduxState.loading === true ? (
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

              <div className="DealerID-List">
                <div className="LeftCon">
                  <h1>Email</h1>
                </div>
                <div className="RightCon">
                  <h2>
                    {reduxState.loading === true ? (
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

              <div className="DealerID-List">
                <div className="LeftCon">
                  <h1>No. of Dealer</h1>
                </div>
                <div className="RightCon">
                  <h2>
                    {reduxState.loading === true ? (
                      <i
                        class="fa fa-circle-o-notch fa-spin"
                        aria-hidden="true"
                      ></i>
                    ) : edit === true ? (
                      <input
                        type="number"
                        name="no_of_dealer"
                        value={state.no_of_dealer}
                        onChange={handleOnChange}
                      />
                    ) : (
                      state.no_of_dealer
                    )}
                  </h2>
                </div>
              </div>

              <div className="clearfix"></div>

              <div className="Account-EditBtn">
                {edit === true ? (
                  <button
                    type="button"
                    className="newbtn-add"
                    disabled={!edit}
                    onClick={update_private_account}
                  >
                    {" "}
                    {reduxState.update_account === true ? (
                      <i
                        class="fa fa-circle-o-notch fa-spin"
                        aria-hidden="true"
                      ></i>
                    ) : (
                      "Update"
                    )}{" "}
                  </button>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="clearfix"></div>
    </React.Fragment>
  );
};
export default DMSAccountDetail;
