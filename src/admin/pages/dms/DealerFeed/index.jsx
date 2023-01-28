import React, { Component } from "react";
import DmsDealerFeedsDatatable from "../../../component/dms/DealerFeed/DmsDealerFeedsDatatable";
import {
  dms_dealer_feed,
  remove_all_state,
} from "../../../../actions/admin/dmsActions";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";

class DmsDealerFeed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id:
        this.props.match.params.id !== undefined
          ? this.props.match.params.id
          : "",
      dealer_name:
        this.props.match.params.dealer_name !== undefined
          ? this.props.match.params.dealer_name
          : "",
      sort_by: "newest_accounts_first",
    };
    const id =
      this.props.match.params.id !== undefined
        ? this.props.match.params.id
        : "";
    if (id) {
      this.props.dms_dealer_feed(id);
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
          <h1>{this.state.dealer_name ? this.state.dealer_name : ""}</h1>
        </div>
        <div className="Admin-ActiveList-Container">
          <div className="tab-content">
            <DmsDealerFeedsDatatable
              {...this.props}
              sort_by={this.state.sort_by}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default connect(null, {
  dms_dealer_feed,
  remove_all_state,
})(DmsDealerFeed);
