import React, { Component } from 'react'
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
import { get_chats, read_all_chat, toggle_chat_module, search_friends } from '../../actions/chatActions'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { API_URL } from '../../constant'

class ChatList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selected: '',
            chatStatus: 'all',
            searchFriend: ''
        }
        this.scrollableNodeChatList = React.createRef();
        sessionStorage.setItem('chatFilter', 'all')

    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.chat_list !== this.props.chat_list && this.props.chat_list !== undefined && this.props.chat_list.length > 0) {
            // window.$('#chatBlockModel').modal('hide')
            if (this.state.selected === '') {
                const filterRecord = this.props.chat_list[0]
                console.log('componentDidUpdate', filterRecord)
                this.setState({
                    ...this.state,
                    selected: filterRecord.id
                })
                if (filterRecord.message_to) {
                    sessionStorage.setItem('chatId', filterRecord.id)
                    this.props.get_chats(filterRecord.message_by, filterRecord.message_to, filterRecord.list_id, filterRecord.id)
                    const message_to = Number(filterRecord.message_to) === Number(this.props.user_id) ? Number(filterRecord.message_by) : Number(filterRecord.message_to)
                    this.props.read_all_chat(this.props.user_id, message_to, filterRecord.list_id)
                }
            }
            setTimeout(() => {
                this.scrollableNodeChatList.current.scrollTop = this.scrollableNodeChatList.current.scrollHeight;
            }, 10)
        }
        if (prevState.searchFriend !== this.state.searchFriend && this.state.searchFriend) {
            if (this.props.user_id) {
                this.setState({
                    ...this.state,
                    selected: ''
                })
                this.props.search_friends(this.props.user_id, this.state.searchFriend)
            }
        }
        if (prevState.searchFriend !== this.state.searchFriend && !this.state.searchFriend) {
            this.setState({
                ...this.state,
                selected: ''
            })
            this.props.toggle_chat_module(this.state.chatStatus)
        }
    }

    openChat = (id, sender_id, list_id, reciver_id) => {
        this.setState({
            ...this.state,
            selected: id
        })
        if (reciver_id) {
            sessionStorage.setItem('chatId', id)
            const message_to = Number(reciver_id) === Number(this.props.user_id) ? Number(sender_id) : Number(reciver_id)
            this.props.get_chats(this.props.user_id, message_to, list_id, id)
            // this.props.get_chats(sender_id, reciver_id, list_id, id)
            this.props.read_all_chat(this.props.user_id, message_to, list_id)
        }
    }

    toggleChat = (filterName) => {
        this.setState({
            ...this.state,
            chatStatus: filterName,
            selected: ''
        })
        sessionStorage.setItem('chatFilter', filterName)
        this.props.toggle_chat_module(filterName)
    }

    handleOnChange = (e) => {
        const { name, value } = e.target
        this.setState({
            ...this.state,
            [name]: value
        })
    }

    render() {
        console.log(this.state, 'Chat List')
        return (
            <React.Fragment>
                <div className="col-xl-3 col-lg-4 col-md-5 col-sm-12 col-12 pl-0" id='ChatLeft-Container'>
                    {/* <div className={(this.props.chat_list || []).length === 0 && this.props.filterName === 'all' ? "no-chat-left-container " : "no-chat-left-container d-none"}>

                        <div className="ChatLeft-Container border-radius-0" id="ChatLeft-Container">

                            <div className="Message-ConLeft" id="Message-ConLeft">
                                <Link to="/buyer"><img src="assets/image/A-L-chat.svg" /> Back</Link>
                                <h4>Messages</h4>
                            </div>

                            <div className="ChatSearch" id="ChatSearch">
                                <button type="submit">New</button>
                            </div>

                            <div className="ChatUnread-Btn" id="ChatUnread-Btn">
                                <button className={this.state.chatStatus === 'all' ? "active" : ""} type="button"
                                >All</button>
                                <button className={this.state.chatStatus === 'un_read' ? "active" : ""} type="button"
                                >Unread</button>
                            </div>

                            <div className="ChatDropdown-List" id='ChatDropdown-List'>
                                <ul>
                                    <SimpleBar style={{ maxHeight: '611px' }} scrollableNodeProps={{ ref: this.scrollableNodeChatList }}>
                                    </SimpleBar>
                                </ul>
                            </div>

                            <div className="no-left-message"><h1>No messages</h1></div>

                        </div>

                    </div> */}

                    {/* <div className={(this.props.chat_list || []).length === 0 && this.props.filterName === 'all' ? "ChatLeft-Container border-radius-0  d-none" : "ChatLeft-Container border-radius-0"} id="ChatLeft-Container"> */}

                    <div className="Message-ConLeft" id="Message-ConLeft">
                        <Link to="/buyer"><img src="assets/image/A-L-chat.svg" /> Back</Link>
                        <h4>Messages</h4>
                    </div>

                    <div className="ChatSearch" id="ChatSearch">
                        <input type="text" id="searchFriend" name="searchFriend" placeholder="Search..." onChange={this.handleOnChange} />
                    </div>

                    <div className="ChatUnread-Btn" id="ChatUnread-Btn">
                        <button className={this.state.chatStatus === 'all' ? "active" : ""} type="button" onClick={() => this.toggleChat('all')}>All</button>
                        <button className={this.state.chatStatus === 'un_read' ? "active" : ""} type="button" onClick={() => this.toggleChat('un_read')}>Unread</button>
                        {/* <button type="button" className="float-right">Mark all as read</button> */}
                    </div>


                    <div className={(this.props.chat_list || []).length === 0 && this.props.filterName === 'all' ? "ChatLeft-Container border-radius-0  d-none" : "ChatLeft-Container border-radius-0"} id="ChatLeft-Container">
                        <div className="ChatDropdown-List" id='ChatDropdown-List'>
                            <ul>
                                <SimpleBar style={{ maxHeight: '611px' }} scrollableNodeProps={{ ref: this.scrollableNodeChatList }}>
                                    {(this.props.chat_list || []).map((item, index) => (
                                        <li className={item.id === this.state.selected ? 'active' : ''} key={index}>
                                            <a onClick={() => this.openChat(item.id, item.message_by, item.list_id, item.message_to)}>
                                                <div className="ChatDropdown-Head" id="ChatDropdown-Head">
                                                    <img src={`${API_URL}/media/${item.vehicle_image}`} alt="No Image" />
                                                    {/* <img src="assets/image/chat-img.png" alt="" /> */}
                                                    <h1>{item.list_desc} <br />{localStorage.getItem('user_type') == 1 ? (<span>{'Last message'} {moment(item.time).fromNow() || ''}</span>) : null}
                                                        <br />
                                                        {localStorage.getItem('user_type') == 2 ? (<small>{item.user_image ? (<img src={`${API_URL}/media/${item.user_image}`} alt='' />) : (item.lister_name ? <span className="chat-avtar-1">{`${item.lister_name.split(' ')[0] ? item.lister_name.split(' ')[0].charAt(0).toUpperCase() : ''}${item.lister_name.split(' ')[1] ? item.lister_name.split(' ')[1].charAt(0).toUpperCase() : ''}`}</span> : '')}
                                                            <span>{item.lister_name}</span></small>) : null}
                                                        {/* (<img src="assets/image/chatimg-13.png" alt="" />)} */}
                                                    </h1>
                                                    <h2><span>{moment(item.time).format("HH:mm") || ''}</span><br />{item.un_read !== undefined && item.un_read !== null && Number(item.un_read) !== 0 ? (<small>{item.un_read || 0}</small>) : null}</h2>
                                                </div>

                                            </a>
                                        </li>

                                    ))}
                                </SimpleBar>
                            </ul>
                        </div>

                    </div>


                </div>
            </React.Fragment >
        )
    }

}
const mapStateToProps = state => {
    return {
        user_id: state.authReducer.authentication.user.user_id,

    }
}
export default connect(mapStateToProps, { get_chats, read_all_chat, toggle_chat_module, search_friends })(ChatList)