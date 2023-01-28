import React, { Component } from 'react'
import ChatList from '../../components/messages/ChatList'
import Chat from '../../components/messages/Chat'
import {
    get_chat_list,
    get_chats,
    get_chat_user,
    change_chat_user
} from '../../actions/chatActions'
import { connect } from 'react-redux'
import TostarMessages from '../../components/alertMessages/TostarMessages'
import { Helmet } from 'react-helmet';

class Messages extends Component {
    constructor(props) {
        super(props)

    }
    componentDidMount() {
        // this.props.get_chat_list()
        // this.props.get_chats()
        if (this.props.user_id !== undefined) {
            this.props.get_chat_user(this.props.user_id)
            this.props.change_chat_user(this.props.user_id)
        }
    }
    componentWillUnmount() {
        sessionStorage.removeItem('chatId')
        sessionStorage.removeItem('chatFilter')

    }

    render() {
        return (
            <React.Fragment>
                <Helmet>
                    <title>Finance That – Chat</title>
                    <meta name="description" content="" />
                </Helmet>
                <section className="Section-UserProfile Chatbg" id="Chatbg">
                    <div className="container-fluid" id="container-fluid">
                        <div className="row">
                            <ChatList {...this.props} />
                            <Chat {...this.props} />
                        </div>
                    </div>
                    <TostarMessages />
                </section>
            </React.Fragment>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        chat_list: state.chatReducer.chat_list,
        chat: state.chatReducer.chat,
        filterName: state.chatReducer.filterName,
        user_id: state.authReducer.authentication.user.user_id,

    }
}
const actionCreator = {
    get_chat_list,
    get_chats,
    get_chat_user,
    change_chat_user
}
export default connect(mapStateToProps, actionCreator)(Messages)