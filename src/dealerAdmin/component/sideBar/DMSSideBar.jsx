/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { history } from "../../../_helpers/history";
  class DMSSideBar extends Component {
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
        dealership: (this.props.adminScreens || []).length > 0
        ? ((this.props.adminScreens || [])[0] !== undefined &&
          (this.props.adminScreens || [])[0] !== null)
          ? (this.props.adminScreens || [])[0].dealership
          : false
        : true,
        billing: (this.props.adminScreens || []).length > 0
        ? ((this.props.adminScreens || [])[0] !== undefined &&
          (this.props.adminScreens || [])[0] !== null)
          ? (this.props.adminScreens || [])[0].billing
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
            dealership: (this.props.adminScreens || []).length > 0
            ? ((this.props.adminScreens || [])[0] !== undefined &&
              (this.props.adminScreens || [])[0] !== null)
              ? (this.props.adminScreens || [])[0].dealership
              : false
            : false,
            billing: (this.props.adminScreens || []).length > 0
            ? ((this.props.adminScreens || [])[0] !== undefined &&
              (this.props.adminScreens || [])[0] !== null)
              ? (this.props.adminScreens || [])[0].billing
              : false
            : false,   };
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
  render(){
    return (
      <React.Fragment>
        <aside className="asideMenu">
          <ul className="menu">
          {this.state.allowScreens?.applications && (
            <li className={(this.findActive('my-application') || this.findActive('application')) ? "list active" : "list"}>
              {/* <Link to="/DMS/Dashboard/General" className="AccountIcon"> */}
              <Link to={'/dealer-admin/application/general'} className="AccountIcon">
                Applications
              </Link>
              <ul className="items">
                <li>
                  <Link
                    to={'/dealer-admin/application/general'}
                    className={
                      this.getActive('/dealer-admin/application/general')
                        ? "active ArchiveHead"
                        : "ArchiveHead"
                    }
                  >
                    General
                  </Link>
                </li>
                <li>
                  <Link
                    to={'/dealer-admin/application/deleted'}
                    className={
                      this.getActive('/dealer-admin/application/deleted')
                        ? "active ArchiveHead"
                        : "ArchiveHead"
                    }>
                    Deleted
                  </Link>
                </li>
              </ul>
            </li>)}

            {this.state.allowScreens?.listings && (
            <li className={this.findActive('listing') ? "list active" : "list"}>
              {/* <a className="ListIcon">Listings</a> */}
              <Link to="/dealer-admin/pending-listing" className="ListIcon">
                Listings
              </Link>
              <ul className="items">
                <li>
                  <Link
                    to="/dealer-admin/pending-listing"
                    className={
                      this.findActive("pending-listing")
                        ? "active PendingHead"
                        : "PendingHead"
                    }
                  >
                    Pending
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dealer-admin/active-listing"
                    className={
                      this.findActive("active-listing")
                        ? "active ApprovedHead"
                        : "ApprovedHead"
                    }
                  >
                    Active
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dealer-admin/sold-listing"
                    className={
                      this.findActive("sold-listing")
                        ? "active SoldHead"
                        : "SoldHead"
                    }
                  >
                    Sold
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dealer-admin/archive-listing"
                    className={
                      this.findActive("archive-listing")
                        ? "active ArchiveHead"
                        : "ArchiveHead"
                    }
                  >
                    Archive
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dealer-admin/expire-listing"
                    className={
                      this.findActive("expire-listing")
                        ? "active ArchiveHead"
                        : "ArchiveHead"
                    }
                  >
                    Expired
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dealer-admin/delete-listing"
                    className={
                      this.findActive("delete-listing")
                        ? "active ArchiveHead"
                        : "ArchiveHead"
                    }
                  >
                    Deleted
                  </Link>
                </li>
              </ul>
            </li>)}

            {this.state.allowScreens?.users && (
            <li className={this.getActive('/dealer-admin/users') ? "dms list active" : "dms list"}>
              <Link to={'/dealer-admin/users'} className="AgentIcon">
                Users
              </Link>
            </li>)}

            {this.state.allowScreens?.billing && (
            <li className={this.getActive("/dealer-admin/Billing") ? "list active" : "list"} >
              <Link to="/dealer-admin/Billing" className="AgentIcon">
                Billing
              </Link>
            </li>)}
            {this.state.allowScreens?.dealership && (
            <li className={this.getActive('/dealer-admin/dealership') ? "list active" : "list"}>
              <Link to={'/dealer-admin/dealership'} className="SettingIcon">
                Dealership
              </Link>
            </li>)}

            {this.state.allowScreens?.settings && (
            <li className={this.getActive('/dealer-admin/settings') ? "list active" : "list"}>
              <Link to={'/dealer-admin/settings'} className="SettingIcon">
                Settings
              </Link>
            </li>)}
          </ul>
        </aside>
      </React.Fragment >
    );
  }

}

export default DMSSideBar;
