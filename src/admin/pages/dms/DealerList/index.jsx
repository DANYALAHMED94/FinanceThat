import React, { Component } from "react";
import DmsDealerListDatatable from "../../../component/dms/DealerList/DmsDealerListDatatable";
import {
  get_dms_dealer_detail,
  remove_all_state,
} from "../../../../actions/admin/dmsActions";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";

class DMSDelaerList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id:
        this.props.match.params.id !== undefined
          ? this.props.match.params.id
          : "",
      dms_provider:
        this.props.match.params.dms_provider !== undefined
          ? this.props.match.params.dms_provider
          : "",
      sort_by: "newest_accounts_first",
    };
    const id =
      this.props.match.params.id !== undefined
        ? this.props.match.params.id
        : "";
    if (id) {
      const data = {
        sort_by: this.state.sort_by,
        p_size: 20,
        id: id,
      };
      this.props.get_dms_dealer_detail(data);
    }
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
          <h1>
            {this.state.dms_provider
              ? `${this.state.dms_provider} Dealers`
              : ""}
          </h1>
        </div>
        <div className="Admin-ActiveList-Container">
          <div className="tab-content">
            <DmsDealerListDatatable
              {...this.props}
              id={this.state.id}
              sort_by={this.state.sort_by}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default connect(null, {
  get_dms_dealer_detail,
  remove_all_state,
})(DMSDelaerList);
