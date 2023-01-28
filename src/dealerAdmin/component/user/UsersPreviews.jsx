import React, { useEffect, useState } from "react";
import moment from "moment";
import NumberFormat from 'react-number-format'

// {item.start_date !== undefined ? moment(item.start_date).format('ll') : ''}
const UsersPreviews = (props) => {
  const [state, setState] = useState({
    created_data: "",
    id: "",
    type: "",
    firstName: "",
    lastName: "",
    name: "",
    email: "",
    telephone: "",
    role: "",
    allPermissions: false,
    permissions: [
      { value: "applications", name: "Applications", isChecked: false },
      // { value: "accounts", name: "Accounts", isChecked: false },
      { value: "listings", name: "Listings", isChecked: false },
      // { value: "employees", name: "Employees", isChecked: false },
      { value: "settings", name: "Settings", isChecked: false },
      { value: "users", name: "Users", isChecked: false },
      { value: "billing", name: "Billing", isChecked: false },
      { value: "dealership", name: "DealerShip", isChecked: false },
    ],
    roles: [],
  });
  const [editPermisssion, setEditPermisssion] = useState(false);
  const [editAgent, setEditAgent] = useState(false);

  useEffect(() => {
    if (props.user_roles !== undefined && props.user_roles.length > 0) {
      const data = [];
      (props.user_roles || []).map((item) => {
        return data.push({
          value: item.id,
          name: item.user_type,
        });
      });
      setState({
        ...state,
        roles: data,
      });
    }
  }, [props.user_roles]);
  useEffect(() => {
    if (props.user_detail !== undefined && props.user_detail !== null) {
      (props.user_detail || []).map((item) => {
        const permissions = [
          {
            value: "applications",
            name: "Applications",
            isChecked:
              item.upuser_id !== undefined &&
                item.upuser_id !== null &&
                item.upuser_id.length > 0
                ? item.upuser_id[0].applications !== undefined &&
                  item.upuser_id[0].applications !== null
                  ? item.upuser_id[0].applications
                  : false
                : false,
          },
          // {
          //   value: "accounts",
          //   name: "Accounts",
          //   isChecked:
          //     item.upuser_id !== undefined &&
          //       item.upuser_id !== null &&
          //       item.upuser_id.length > 0
          //       ? item.upuser_id[0].accounts !== undefined &&
          //         item.upuser_id[0].accounts !== null
          //         ? item.upuser_id[0].accounts
          //         : false
          //       : false,
          // },
          {
            value: "listings",
            name: "Listings",
            isChecked:
              item.upuser_id !== undefined &&
                item.upuser_id !== null &&
                item.upuser_id.length > 0
                ? item.upuser_id[0].listings !== undefined &&
                  item.upuser_id[0].listings !== null
                  ? item.upuser_id[0].listings
                  : false
                : false,
          },
          // {
          //   value: "employees",
          //   name: "Employees",
          //   isChecked:
          //     item.upuser_id !== undefined &&
          //       item.upuser_id !== null &&
          //       item.upuser_id.length > 0
          //       ? item.upuser_id[0].employees !== undefined &&
          //         item.upuser_id[0].employees !== null
          //         ? item.upuser_id[0].employees
          //         : false
          //       : false,
          // },
          {
            value: "settings",
            name: "Settings",
            isChecked:
              item.upuser_id !== undefined &&
                item.upuser_id !== null &&
                item.upuser_id.length > 0
                ? item.upuser_id[0].settings !== undefined &&
                  item.upuser_id[0].settings !== null
                  ? item.upuser_id[0].settings
                  : false
                : false,
          },
          {
            value: "users",
            name: "Users",
            isChecked:
              item.upuser_id !== undefined &&
                item.upuser_id !== null &&
                item.upuser_id.length > 0
                ? item.upuser_id[0].users !== undefined &&
                  item.upuser_id[0].users !== null
                  ? item.upuser_id[0].users
                  : false
                : false,
          },
          {
            value: "billing",
            name: "Billing",
            isChecked:
              item.upuser_id !== undefined &&
                item.upuser_id !== null &&
                item.upuser_id.length > 0
                ? item.upuser_id[0].billing !== undefined &&
                  item.upuser_id[0].billing !== null
                  ? item.upuser_id[0].billing
                  : false
                : false,
          },
          {
            value: "dealership",
            name: "DealerShip",
            isChecked:
              item.upuser_id !== undefined &&
                item.upuser_id !== null &&
                item.upuser_id.length > 0
                ? item.upuser_id[0].dealership !== undefined &&
                  item.upuser_id[0].dealership !== null
                  ? item.upuser_id[0].dealership
                  : false
                : false,
          },
        ];
        return setState({
          ...state,
          created_data:
            item.aud_user_id !== undefined &&
              item.aud_user_id !== null &&
              item.aud_user_id.length > 0
              ? item.aud_user_id[0].modified_at !== undefined &&
                item.aud_user_id[0].modified_at !== null
                ? item.aud_user_id[0].modified_at || ""
                : ""
              : "",
          id: item.id || "",
          type: item.user_role || "",
          firstName:
            item.aud_user_id !== undefined &&
              item.aud_user_id !== null &&
              item.aud_user_id.length > 0
              ? item.aud_user_id[0].name !== undefined &&
                item.aud_user_id[0].name !== null
                ? item.aud_user_id[0].name.split(" ")[0] || ""
                : ""
              : "",
          lastName:
            item.aud_user_id !== undefined &&
              item.aud_user_id !== null &&
              item.aud_user_id.length > 0
              ? item.aud_user_id[0].name !== undefined &&
                item.aud_user_id[0].name !== null
                ? item.aud_user_id[0].name.split(" ")[1] || ""
                : ""
              : "",
          name:
            item.aud_user_id !== undefined &&
              item.aud_user_id !== null &&
              item.aud_user_id.length > 0
              ? item.aud_user_id[0].name !== undefined &&
                item.aud_user_id[0].name !== null
                ? item.aud_user_id[0].name || ""
                : ""
              : "",
          email: item.email || "",
          telephone:
            item.aud_user_id !== undefined &&
              item.aud_user_id !== null &&
              item.aud_user_id.length > 0
              ? item.aud_user_id[0].telephone !== undefined &&
                item.aud_user_id[0].telephone !== null
                ? item.aud_user_id[0].telephone || ""
                : ""
              : "",
          role: Number(item.role) || "",
          allPermissions:
            permissions.filter((item) => item.isChecked === false).length > 0
              ? false
              : true,
          permissions: permissions,
        });
      });
    }
  }, [props.user_detail]);
  useEffect(() => {
    if (
      props.loading_update_permissions !== undefined &&
      props.loading_update_permissions !== null &&
      props.loading_update_permissions === false
    ) {
      setEditPermisssion(false);
    }
  }, [props.loading_update_permissions]);
  useEffect(() => {
    if (
      props.loading_update_detail !== undefined &&
      props.loading_update_detail !== null &&
      props.loading_update_detail === false
    ) {
      setEditAgent(false);
    }
  }, [props.loading_update_detail]);
  const deleteEmployee = () => {
    props.delete_user(state.id || "");
  };
  const handleOnChangeCheck = (e, value) => {
    const permissions = state.permissions.slice().map((item) => {
      if (item.value === value) {
        return {
          ...item,
          isChecked: !item.isChecked,
        };
      }
      return item;
    });
    const checkAll = permissions.filter((item) => {
      return item.isChecked === false;
    });
    setState({
      ...state,
      permissions: permissions,
      allPermissions: checkAll.length > 0 ? false : true,
    });
  };
  const handleOnCheckAll = (e) => {
    const { name, value } = e.target;
    setState({
      ...state,
      allPermissions: !state.allPermissions,
      permissions: state.permissions.slice().map((item) => {
        return {
          ...item,
          isChecked: !state.allPermissions,
        };
      }),
    });
  };
  const updatePermission = () => {
    const data = {
      update: "user_permissions",
      applications: (state.permissions || [])
        .filter((item) => item.value === "applications")
        .map((item) => {
          return item.isChecked;
        })[0],
      // accounts: (state.permissions || [])
      //   .filter((item) => item.value === "accounts")
      //   .map((item) => {
      //     return item.isChecked;
      //   })[0],
      listings: (state.permissions || [])
        .filter((item) => item.value === "listings")
        .map((item) => {
          return item.isChecked;
        })[0],
      // employees: (state.permissions || [])
      //   .filter((item) => item.value === "employees")
      //   .map((item) => {
      //     return item.isChecked;
      //   })[0],
      settings: (state.permissions || [])
        .filter((item) => item.value === "settings")
        .map((item) => {
          return item.isChecked;
        })[0],
      users: (state.permissions || [])
        .filter((item) => item.value === "users")
        .map((item) => {
          return item.isChecked;
        })[0],
        dealership: (state.permissions || [])
        .filter((item) => item.value === "dealership")
        .map((item) => {
          return item.isChecked;
        })[0],
        billing: (state.permissions || [])
        .filter((item) => item.value === "billing")
        .map((item) => {
          return item.isChecked;
        })[0],
      id: state.id,
    };
    console.log(data);
    props.update_user_permissions(data);
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target
    setState({
      ...state,
      [name]: value
    })
  }
  const update_detail = () => {
    const data = {
      id: state.id,
      update: 'admin_detail',
      full_name: state.firstName + " " + state.lastName,
      email: state.email,
      telephone: state.telephone
    }
    props.update_user_detail(data)
  }
  return (
    <React.Fragment>
      <div class="Admin-MainHead">
        <div class="Admin-HeadLeft">
          <h1>
            {props.loading === true ? (
              <i class="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>
            ) : (
              state.name
            )}
          </h1>
          <h2>
            Date Added:{" "}
            {props.loading === true ? (
              <i class="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>
            ) : state.created_data !== null ? (
              moment(state.created_data).format("yyyy-MM-DD")
            ) : (
              ""
            )}
          </h2>
        </div>

        <div class="Admin-HeadRight"></div>
      </div>

      <div class="clearfix"></div>

      <div class="Admin-DealerLeft">
        <div class="InnerDealer-Container">
          <div class="InnerDealer-Head">

            <div class="InnerLeft">
              <h1>Employee Details</h1>
            </div>
            <div class="InnerRight">
              <h3>
                ID:{" "}
                <span>
                  {props.loading === true ? (
                    <i
                      class="fa fa-circle-o-notch fa-spin"
                      aria-hidden="true"
                    ></i>
                  ) : (
                    state.id
                  )}
                </span>
              </h3>
              <h3>
                TYPE:{" "}
                <span>
                  {props.loading === true ? (
                    <i
                      class="fa fa-circle-o-notch fa-spin"
                      aria-hidden="true"
                    ></i>
                  ) : (
                    state.type
                  )}
                </span>
              </h3>
              <h3>
                {editAgent === false ? (
                  <button
                    type="button"
                    onClick={() => setEditAgent(!editAgent)}
                  >
                    <img src="/assets/image/icon-edit.svg" alt="" />
                  </button>
                ) : null}
              </h3>
            </div>
          </div>

          <div class="DealerID-Container">
            <div class="DealerID-List">
              <div class="LeftCon">
                <h1>First name</h1>
              </div>
              <div class="RightCon">
                {editAgent ? (<input type='text' value={state.firstName} name="firstName" placeholder="First Name" onChange={handleOnChange} />) : (<h2>
                  {props.loading === true ? (
                    <i
                      class="fa fa-circle-o-notch fa-spin"
                      aria-hidden="true"
                    ></i>
                  ) : (
                    state.firstName
                  )}
                </h2>)}

              </div>
            </div>

            <div class="DealerID-List">
              <div class="LeftCon">
                <h1>Last name</h1>
              </div>
              <div class="RightCon">
                {editAgent ? (<input type='text' value={state.lastName} name='lastName' placeholder="Last Name" onChange={handleOnChange} />) : (
                  <h2>
                    {props.loading === true ? (
                      <i
                        class="fa fa-circle-o-notch fa-spin"
                        aria-hidden="true"
                      ></i>
                    ) : (
                      state.lastName
                    )}
                  </h2>)}
              </div>
            </div>

            <div class="DealerID-List">
              <div class="LeftCon">
                <h1>Email Address</h1>
              </div>
              <div class="RightCon">
                {editAgent ? (<input type='email' value={state.email} name='email' placeholder='Email' onChange={handleOnChange} />) : (
                  <h2>
                    {props.loading === true ? (
                      <i
                        class="fa fa-circle-o-notch fa-spin"
                        aria-hidden="true"
                      ></i>
                    ) : (
                      state.email
                    )}
                  </h2>)}
              </div>
            </div>

            <div class="DealerID-List">
              <div class="LeftCon">
                <h1>Telephone</h1>
              </div>
              <div class="RightCon">
                {editAgent ? (<NumberFormat
                  format='+1 (###) ###-####'
                  value={state.telephone}
                  name='telephone'
                  id='telephone'
                  placeholder='Phone No'
                  onChange={handleOnChange}
                />) : (
                  <h2>
                    {props.loading === true ? (
                      <i
                        class="fa fa-circle-o-notch fa-spin"
                        aria-hidden="true"
                      ></i>
                    ) : (
                      state.telephone
                    )}
                  </h2>)}
              </div>
            </div>

            <div class="clearfix"></div>
            {editAgent === true ? (
              <button
                type="button"
                className="newbtn-add"
                disabled={!editAgent}
                onClick={update_detail}
              >
                {" "}
                {props.loading_update_detail === true ? (
                  <i
                    class="fa fa-circle-o-notch fa-spin"
                    aria-hidden="true"
                  ></i>
                ) : (
                  "Update"
                )}{" "}
              </button>
            ) : null}
            {/* <button type="button" onClick={deleteEmployee}>
              {props.loading_deleteing === true ? (
                <i class="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>
              ) : (
                "Delete Employee"
              )}
            </button> */}
          </div>
        </div>
      </div>

      <div class="Admin-DealerRight">
        <div class="InnerDealer-Container">
          <div class="InnerDealer-Head">
            <div class="InnerLeft">
              <h1>Permissions</h1>
            </div>

            <div class="InnerRight">
              {editPermisssion === false ? (
                <button
                  type="button"
                  onClick={() => setEditPermisssion(!editPermisssion)}
                >
                  <img src="/assets/image/icon-edit.svg" alt="" />
                </button>
              ) : null}
            </div>
          </div>

          <div class="InnerMark-Container">
            <div class="Admin-DocumetCheck">
              <label class="DocBtn-Container">
                All Permissions
                <input
                  type="checkbox"
                  name="allPermissions"
                  value={"allPermissions"}
                  checked={state.allPermissions}
                  onChange={handleOnCheckAll}
                  disabled={!editPermisssion}
                />
                <span class="DocMark"></span>
              </label>
            </div>
            {(state.permissions || []).map((item, index) => (
              <div class="Admin-DocumetCheck" key={index}>
                <label class="DocBtn-Container">
                  {item.name}
                  <input
                    type="checkbox"
                    value={item.value}
                    checked={item.isChecked}
                    onChange={(e) => handleOnChangeCheck(e, item.value)}
                    disabled={!editPermisssion}
                  />
                  <span class="DocMark"></span>
                </label>
              </div>
            ))}
          </div>
          <div className="Account-EditBtn">
            {editPermisssion === true ? (
              <button
                type="button"
                className="newbtn-add"
                disabled={!editPermisssion}
                onClick={updatePermission}
              >
                {" "}
                {props.loading_update_permissions === true ? (
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
    </React.Fragment>
  );
};
export default UsersPreviews;
