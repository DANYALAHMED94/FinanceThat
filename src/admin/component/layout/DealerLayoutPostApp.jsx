import React, { Component } from "react";
import AdminHeader from "../header/AdminHeader";
import AdminSideBar from "../sideBar/AdminSideBar";
import TostarMessages from "../../../components/alertMessages/TostarMessages";
import { get_chat_user, change_chat_user } from "../../../actions/chatActions";
import { get_agents_screen } from "../../../actions/authActions";
import { connect } from "react-redux";
import LoadingOverlay from "react-loading-overlay";
import DMSHeader from '../../../dms/component/header/DMSHeader'

class DealerLayoutPostApp extends Component {

    render() {
        console.log(this.props, "admin hoc", this.props.adminScreens);
        return (
            <React.Fragment>
                <div className="bodyColor">
                    <DMSHeader />
                    <main className="MainBodyDealerApplication">
                        <LoadingOverlay
                            active={this.props.loading_api}
                            spinner
                            text="Loading your content..."
                        >
                            {this.props.children}
                            <TostarMessages />
                        </LoadingOverlay>
                    </main>
                </div>
            </React.Fragment>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        admin: state.authReducer.authentication.admin,
        adminScreens: state.authReducer.authentication.adminScreens,
        loading_api:
            state.adminReducer.adminAccounts.adminCommonReducer.loading_api,
    };
};
export default connect(mapStateToProps, {
    get_chat_user,
    change_chat_user,
    get_agents_screen,
})(DealerLayoutPostApp);
