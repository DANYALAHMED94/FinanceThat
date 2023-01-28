/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { history } from "../../../_helpers/history";
import { connect } from "react-redux";
class AdminSideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dashoardActive: history.location.pathname === "/admin" ? true : false,
      applicationActive:
        history.location.pathname.toString().split("/")[3] === "pending" ||
          history.location.pathname.toString().split("/")[3] === "approved"
          ? true
          : false,
      listingActive:
        history.location.pathname.toString().split("/")[2] ===
          "pending-listing" ||
          history.location.pathname.toString().split("/")[2] === "active-listing"
          ? true
          : false,
      accountActive:
        history.location.pathname.toString().split("/")[2] ===
          "pending-account" ||
          history.location.pathname.toString().split("/")[2] === "active-account"
          ? true
          : false,
      agentActive:
        history.location.pathname.toString().split("/")[2] ===
          "agent-listing" ||
          history.location.pathname.toString().split("/")[2] === "new-agent"
          ? true
          : false,
      settingActive:
        history.location.pathname === "/admin/settings" ? true : false,
      dmsActive: history.location.pathname.toString().split("/")[2] === "dms",
      allowScreens: {
        applications:
          (this.props.adminScreens || []).length > 0
            ? ((this.props.adminScreens || [])[0] !== undefined &&
              (this.props.adminScreens || [])[0] !== null)
              ? (this.props.adminScreens || [])[0].applications
              : false
            : true,
        accounts:
          (this.props.adminScreens || []).length > 0
            ? ((this.props.adminScreens || [])[0] !== undefined &&
              (this.props.adminScreens || [])[0] !== null)
              ? (this.props.adminScreens || [])[0].accounts
              : false
            : true,
        listings:
          (this.props.adminScreens || []).length > 0
            ? ((this.props.adminScreens || [])[0] !== undefined &&
              (this.props.adminScreens || [])[0] !== null)
              ? (this.props.adminScreens || [])[0].listings
              : false
            : true,
        employees:
          (this.props.adminScreens || []).length > 0
            ? ((this.props.adminScreens || [])[0] !== undefined &&
              (this.props.adminScreens || [])[0] !== null)
              ? (this.props.adminScreens || [])[0].employees
              : false
            : true,
        settings:
          (this.props.adminScreens || []).length > 0
            ? ((this.props.adminScreens || [])[0] !== undefined &&
              (this.props.adminScreens || [])[0] !== null)
              ? (this.props.adminScreens || [])[0].settings
              : false
            : true,
        users:
          (this.props.adminScreens || []).length > 0
            ? ((this.props.adminScreens || [])[0] !== undefined &&
              (this.props.adminScreens || [])[0] !== null)
              ? (this.props.adminScreens || [])[0].users
              : false
            : true,
        dms: (this.props.adminScreens || []).length > 0
        ? ((this.props.adminScreens || [])[0] !== undefined &&
          (this.props.adminScreens || [])[0] !== null)
          ? (this.props.adminScreens || [])[0].dms
          : false
        : true,
        agents: (this.props.adminScreens || []).length > 0
        ? ((this.props.adminScreens || [])[0] !== undefined &&
          (this.props.adminScreens || [])[0] !== null)
          ? (this.props.adminScreens || [])[0].agents
          : false
        : true,
      },
    };
  }
  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.adminScreens !== this.props.adminScreens &&
      this.props.adminScreens !== undefined
    ) {
      const allowScreens = {
        applications:
          (this.props.adminScreens || []).length > 0
            ? ((this.props.adminScreens || [])[0] !== undefined &&
              (this.props.adminScreens || [])[0] !== null)
              ? (this.props.adminScreens || [])[0].applications
              : false
            : false,
        accounts:
          (this.props.adminScreens || []).length > 0
            ? ((this.props.adminScreens || [])[0] !== undefined &&
              (this.props.adminScreens || [])[0] !== null)
              ? (this.props.adminScreens || [])[0].accounts
              : false
            : false,
        listings:
          (this.props.adminScreens || []).length > 0
            ? ((this.props.adminScreens || [])[0] !== undefined &&
              (this.props.adminScreens || [])[0] !== null)
              ? (this.props.adminScreens || [])[0].listings
              : false
            : false,
        employees:
          (this.props.adminScreens || []).length > 0
            ? ((this.props.adminScreens || [])[0] !== undefined &&
              (this.props.adminScreens || [])[0] !== null)
              ? (this.props.adminScreens || [])[0].employees
              : false
            : false,
        settings:
          (this.props.adminScreens || []).length > 0
            ? ((this.props.adminScreens || [])[0] !== undefined &&
              (this.props.adminScreens || [])[0] !== null)
              ? (this.props.adminScreens || [])[0].settings
              : false
            : false,
        users:
          (this.props.adminScreens || []).length > 0
            ? ((this.props.adminScreens || [])[0] !== undefined &&
              (this.props.adminScreens || [])[0] !== null)
              ? (this.props.adminScreens || [])[0].users
              : false
            : false,
            dms: (this.props.adminScreens || []).length > 0
            ? ((this.props.adminScreens || [])[0] !== undefined &&
              (this.props.adminScreens || [])[0] !== null)
              ? (this.props.adminScreens || [])[0].dms
              : false
            : false,
            agents: (this.props.adminScreens || []).length > 0
            ? ((this.props.adminScreens || [])[0] !== undefined &&
              (this.props.adminScreens || [])[0] !== null)
              ? (this.props.adminScreens || [])[0].agents
              : false
            : false,
      };
      this.setState({
        ...this.state,
        allowScreens: allowScreens,
      });
    }
  }
  getActive = (v) => {
    var pathname = history.location.pathname
    return pathname == v
  }
  findActive = (v) => {
    // console.log(history.location.pathname,v)

    var pathname = history.location.pathname
    return pathname.includes(v)
  }
  render() {
    console.log(this.props.adminScreens, "this.props.adminScreens")
    return (
      <React.Fragment>
        <aside className="asideMenu">
          <ul className="menu">
            <li
              className={
                this.state.dashoardActive === true ? "list active" : "list"
              }
            >
              <Link to="/admin" className="DashIcon">
                Dashboard
              </Link>
            </li>
            {this.state.allowScreens?.applications && (<li className={(this.findActive('application/pending') || this.findActive('application/deleted')) ? "list active" : "list"}>
              <Link to="/admin/application/pending" className="AccountIcon" onClick={()=>localStorage.setItem("app_tab", "unmanaged")}>
                Applications
              </Link>
              <ul className="items">
                <li onClick={()=>localStorage.setItem("app_tab", "unmanaged")}>
                  <Link
                    to="/admin/application/pending"
                    className={
                      history.location.pathname.toString().split("/")[3] ===
                        "pending"
                        ? "active PendingHead"
                        : "PendingHead"
                    }
                  >
                    Applications
                  </Link>
                </li>
                <li onClick={()=>localStorage.setItem("app_tab", "unmanaged")}>
                  <Link
                    to="/admin/application/deleted"
                    className={
                      history.location.pathname.toString().split("/")[3] ===
                        "deleted"
                        ? "active ArchiveHead"
                        : "ArchiveHead"
                    }
                  >
                    Deleted
                  </Link>
                </li>
              </ul>
            </li>)}
            {this.state.allowScreens?.accounts && ( <li
              className={(this.findActive('pending-account') || this.findActive('admin/active-account')) ? "list active" : "list"}
            >
              <Link to="/admin/pending-account" className="AccountIcon">
                Accounts
              </Link>
              <ul className="items">
                <li>
                  <Link
                    to="/admin/pending-account"
                    className={
                      history.location.pathname.toString().split("/")[2] ===
                        "pending-account"
                        ? "active PendingHead"
                        : "PendingHead"
                    }
                  >
                    Pending
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/active-account"
                    className={
                      history.location.pathname.toString().split("/")[2] ===
                        "active-account"
                        ? "active ApprovedHead"
                        : "ApprovedHead"
                    }
                  >
                    Active
                  </Link>
                </li>
              </ul>
            </li>
            )}
          {this.state.allowScreens?.listings && ( <li
              className={(this.findActive('pending-listing') || this.findActive('active-listing')|| this.findActive('delete-listing')|| this.findActive('expire-listing')|| this.findActive('archive-listing')|| this.findActive('sold-listing')) ? "list active" : "list"}

            >
              {/* <a className="ListIcon">Listings</a> */}
              <Link to="/admin/pending-listing" className="ListIcon">
                Listings
              </Link>
              <ul className="items">
                <li>
                  <Link
                    to="/admin/pending-listing"
                    className={
                      history.location.pathname.toString().split("/")[2] ===
                        "pending-listing"
                        ? "active PendingHead"
                        : "PendingHead"
                    }
                  >
                    Pending
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/active-listing"
                    className={
                      history.location.pathname.toString().split("/")[2] ===
                        "active-listing"
                        ? "active ApprovedHead"
                        : "ApprovedHead"
                    }
                  >
                    Active
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/sold-listing"
                    className={
                      history.location.pathname.toString().split("/")[2] ===
                        "sold-listing"
                        ? "active SoldHead"
                        : "SoldHead"
                    }
                  >
                    Sold
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/archive-listing"
                    className={
                      history.location.pathname.toString().split("/")[2] ===
                        "archive-listing"
                        ? "active ArchiveHead"
                        : "ArchiveHead"
                    }
                  >
                    Archive
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/expire-listing"
                    className={
                      history.location.pathname.toString().split("/")[2] ===
                        "expire-listing"
                        ? "active ArchiveHead"
                        : "ArchiveHead"
                    }
                  >
                    Expired
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/delete-listing"
                    className={
                      history.location.pathname.toString().split("/")[2] ===
                        "delete-listing"
                        ? "active ArchiveHead"
                        : "ArchiveHead"
                    }
                  >
                    Deleted
                  </Link>
                </li>
              </ul>
            </li>)}
            {
            // JSON.parse(localStorage.getItem("admin"))?.user_type === 3 &&
            this.state.allowScreens?.dms && (  <li
              className={(this.findActive('dms') || this.findActive('dms')) ? "dms list active" : "dms list"}
            >
              <Link to="/admin/dms" className="AccountIcon">
                DMS
              </Link>
            </li>)}
            {
            // JSON.parse(localStorage.getItem("admin"))?.user_type === 3
            this.state.allowScreens?.agents  && (
                <li
                  className={
                    this.state.agentActive === true ? "list active" : "list"
                  }
                >
                  <Link to="/admin/agent-listing" className="AgentIcon">
                    Agents
                  </Link>
                </li>
              )}
            {this.state.allowScreens?.settings && (
            <li
              className={(this.findActive('settings')) ? "list active" : "list"}
            >
              <Link to="/admin/settings" className="SettingIcon">
                Settings
              </Link>
            </li>)}
          </ul>
        </aside>
      </React.Fragment>
    );
  }
}

export default AdminSideBar;
