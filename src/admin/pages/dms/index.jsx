import React, { Component } from "react";
import DmsDatatable from "../../component/dms/DmsDatatable";
import {
  get_dms_detail,
  remove_all_state,
} from "../../../actions/admin/dmsActions";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";

class DMS extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sort_by: "newest_accounts_first",
    };
  }
  componentDidMount() {
    const data = {
      sort_by: this.state.sort_by,
      p_size: 20,
      a_status: "active",
    };
    this.props.get_dms_detail(data);
  }

  componentWillUnmount() {
    this.props.remove_all_state();
  }
  emptyFun = () => {
    return true;
  };
  render() {
    return (
      <React.Fragment>
        <Helmet>
          <title>DMS</title>
          <meta name="description" content="" />
        </Helmet>
        <div className="Pending-ListHead">
          <h1>Dealer Management System</h1>
        </div>
        <div className="Admin-ActiveList-Container">
          <div className="tab-content" id="myTabContent">
            <DmsDatatable
              {...this.props}
              sort_by={this.state.sort_by}
              a_status="approved"
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    delete_dms_loading:
      state.adminReducer.adminAccounts.dmsReducer.delete_dms_loading,
    dms_detail: state.adminReducer.adminAccounts.dmsReducer.dms_detail,
  };
};
export default connect(mapStateToProps, {
  get_dms_detail,
  remove_all_state,
})(DMS);
