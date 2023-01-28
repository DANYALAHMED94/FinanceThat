import React, { Component } from 'react'
import AdminHeader from "../header/AdminHeader";
import TostarMessages from '../../../components/alertMessages/TostarMessages'
import { get_chat_user, change_chat_user } from '../../../actions/chatActions'
import { connect } from 'react-redux'
import LoadingOverlay from 'react-loading-overlay';

class AdminLayoutPostApp extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user_id: this.props.admin !== null && this.props.admin !== undefined ? this.props.admin.user_id : '',
        }
    }
    componentDidMount() {
        this.removejscssfile("/assets/admin/js/slidenav", 'js')
        this.removejscssfile("/assets/admin/js/admin-menu", 'js')
        if (this.state.user_id != undefined && this.state.user_id != null && this.state.user_id != '') {
            this.props.get_chat_user(this.state.user_id)
            this.props.change_chat_user(this.state.user_id)
        }
    }

    removejscssfile = (filename, filetype) => {
        var targetelement = (filetype == "js") ? "script" : (filetype == "css") ? "link" : "none" //determine element type to create nodelist from
        var targetattr = (filetype == "js") ? "src" : (filetype == "css") ? "href" : "none" //determine corresponding attribute to test for
        var allsuspects = document.getElementsByTagName(targetelement)
        for (var i = allsuspects.length; i >= 0; i--) { //search backwards within nodelist for matching elements to remove
            if (allsuspects[i] && allsuspects[i].getAttribute(targetattr) != null && allsuspects[i].getAttribute(targetattr).indexOf(filename) != -1)
                allsuspects[i].parentNode.removeChild(allsuspects[i]) //remove element by calling parentNode.removeChild()
        }
    }
    render() {

        console.log(this.props, 'admin hoc')
        return (
            <React.Fragment >
                <div className="bodyColor">
                    <AdminHeader />
                    <main className="MainBody" style={{
                        margin: '87px 0 0 0',
                        padding: '0',
                        float: 'none'
                    }}>
                        <LoadingOverlay
                            active={this.props.loading_api}
                            spinner
                            text='Loading your content...'
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
        loading_api: state.adminReducer.adminAccounts.adminCommonReducer.loading_api,
    }
}
export default connect(mapStateToProps, {
    get_chat_user, change_chat_user,
})(AdminLayoutPostApp);