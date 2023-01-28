import React, { Component } from 'react'
import AgentPreviews from '../../component/agent/AgentPreviews'
import {
    get_agent_detail,
    get_user_roles,
    remove_all_state_agent,
    delete_agent,
    update_agent_permissions,
    update_agent_detail
} from '../../../actions/admin/agentActions'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet';

class AgentPreview extends Component {
    constructor(props) {
        super(props)
        this.state = {
            agent_id: this.props.match.params.id !== undefined ? this.props.match.params.id : ''
        }
        this.props.get_user_roles()
        this.props.get_agent_detail(this.props.match.params.id !== undefined ? this.props.match.params.id : '')

    }
    componentWillUnmount() {
        this.props.remove_all_state_agent()
    }
    render() {
        return (
            <React.Fragment>
                <Helmet>
                    <title>Agent Detail</title>
                    <meta name="description" content="" />
                </Helmet>
                <AgentPreviews {...this.props} />
            </React.Fragment>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        loading: state.adminReducer.adminAccounts.agentReducer.loading,
        agent_detail: state.adminReducer.adminAccounts.agentReducer.agent_detail,
        user_roles: state.adminReducer.adminAccounts.agentReducer.user_roles,
        loading_deleteing: state.adminReducer.adminAccounts.agentReducer.loading_deleteing,
        loading_update_permissions: state.adminReducer.adminAccounts.agentReducer.loading_update_permissions,
        loading_update_detail: state.adminReducer.adminAccounts.agentReducer.loading_update_detail,
    }
}
export default connect(mapStateToProps, {
    get_agent_detail,
    get_user_roles,
    remove_all_state_agent,
    delete_agent,
    update_agent_permissions,
    update_agent_detail
})(AgentPreview)