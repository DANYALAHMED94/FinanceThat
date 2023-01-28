import React, { Component } from "react";
import AgentsListing from "../../component/agent/AgentsListing";
import {
  get_agents,
  single_check_agent,
  toggle_all_check_agent,
  remove_all_state_agent,
  delete_single_agent,
  delete_multi_agent,
  get_agents_pages,
} from "../../../actions/admin/agentActions";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";

class AgentListing extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    const data = {
      search: "",
      sort_by: "newest_accounts_first",
      p_size: 20,
    };
    this.props.get_agents(data);
  }
  componentWillUnmount() {
    this.props.remove_all_state_agent()
  }
  render() {
    return (
      <React.Fragment>
        <Helmet>
          <title>Agent List</title>
          <meta name="description" content="" />
        </Helmet>
        <AgentsListing {...this.props} />
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    loading: state.adminReducer.adminAccounts.agentReducer.loading,
    agent_listing: state.adminReducer.adminAccounts.agentReducer.agent_listing,
    checkedAllAgent:
      state.adminReducer.adminAccounts.agentReducer.checkedAllAgent,
    loading_deleteing:
      state.adminReducer.adminAccounts.agentReducer.loading_deleteing,
    delete_agent_id:
      state.adminReducer.adminAccounts.agentReducer.delete_agent_id,
    total_count: state.adminReducer.adminAccounts.agentReducer.total_count,
    pages_urls: state.adminReducer.adminAccounts.agentReducer.total_pages,
  };
};
export default connect(mapStateToProps, {
  get_agents,
  single_check_agent,
  toggle_all_check_agent,
  remove_all_state_agent,
  delete_single_agent,
  delete_multi_agent,
  get_agents_pages,
})(AgentListing);
