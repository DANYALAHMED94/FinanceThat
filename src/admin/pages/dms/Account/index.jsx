import React, { Component } from "react";
import {
  get_dms_account,
  remove_update_row,
  remove_all_state,
} from "../../../../actions/admin/dmsActions";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import DMSAccountDetail from "../../../component/dms/Account/DMSAccountDetail";
class DMSAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id:
        this.props.match.params.id !== undefined
          ? this.props.match.params.id
          : "",
    };
    const id =
      this.props.match.params.id !== undefined
        ? this.props.match.params.id
        : "";
    this.props.get_dms_account(id);
  }
  componentWillUnmount() {
    this.props.remove_update_row();
    this.props.remove_all_state();
  }
  render() {
    return (
      <React.Fragment>
        <Helmet>
          <title>DMS Account Detail</title>
          <meta name="description" content="" />
        </Helmet>
        <DMSAccountDetail id={this.state.id} />
      </React.Fragment>
    );
  }
}

export default connect(null, {
  get_dms_account,
  remove_update_row,
  remove_all_state,
})(DMSAccount);
