import React, { Component } from 'react'
import { add_chat_message, send_message, block_user, delete_conversation, upload_chat_images } from '../../actions/chatActions'
import { connect } from 'react-redux'
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
import { history } from '../../_helpers/history'
import moment from 'moment'
import Dropdown from 'react-bootstrap/Dropdown';
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'
import ChatBlockModel from './ChatBlockModel'
import ChatBlock from './ChatBlock'
import { API_URL } from '../../constant'
import ChatPreviewImage from './ChatPreviewImage';
import { toastr } from 'react-redux-toastr'
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";
import { Link } from 'react-router-dom'
import { SRLWrapper } from "simple-react-lightbox";
import SimpleReactLightbox from "simple-react-lightbox";

class Chat extends Component {
    constructor(props) {
        super(props)
        this.state = {
            chatMessage: '',
            emojis: [],
            toggleEmojis: false,
            selectedFile: [],
            imagePreviewUrl: [],
            fileNames: [],
            chatId: ''
        }
        this.scrollableNodeRef = React.createRef();
        this.imageInputRef = React.createRef()
        this.handleClickOutside = this.handleClickOutside.bind(this);

    }

    componentDidMount() {
        document.addEventListener('click', this.handleClickOutside, { capture: true });
    }

    handleOnChange = (e) => {
        const { name, value } = e.target
        this.setState({
            ...this.state,
            [name]: value
        })
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.chat !== this.props.chat && this.props.chat.length > 0 && this.props.chat !== undefined) {
            setTimeout(() => {
                // if (typeof this.scrollableNodeRef.current.scrollHeight !== 'null') {
                if (this.scrollableNodeRef && this.scrollableNodeRef.current && this.scrollableNodeRef.current.scrollHeight) {
                    this.scrollableNodeRef.current.scrollTop = this.scrollableNodeRef.current.scrollHeight;
                }
            }, 10)

        }
        if (prevProps.isBlock !== this.props.isBlock && this.props.isBlock !== undefined) {
            window.$('#chatBlockModel').modal('hide')
        }

        if (prevProps.message_send !== this.props.message_send) {
            this.setState({
                ...this.state,
                chatMessage: '',
                toggleEmojis: false,
                selectedFile: [],
                imagePreviewUrl: [],
                fileNames: []
            })
            if (history.location.state && history.location.state.reciver_name) {
                let state = { ...history.location.state };
                delete state.reciver_name;
                delete state.reciver_id;
                history.replace({ ...history.location, state });
            }
            this.imageInputRef.current.value = ""

        }

        if (prevState.selectedFile !== this.state.selectedFile && this.state.selectedFile !== undefined && this.state.selectedFile !== null && this.state.selectedFile.length === 0) {
            this.imageInputRef.current.value = ""
        }
        if (prevProps.chat_list !== this.props.chat_list && this.props.chat_list !== undefined) {
            let filterRecord = (this.props.chat_list || []).filter(item => item.isSelected === true).length > 0 ? (this.props.chat_list || []).filter(item => item.isSelected === true)[0] : ''
            let chatId = ''
            const message_by = filterRecord.message_by !== undefined && filterRecord.message_by !== null ? filterRecord.message_by : ''
            const message_to = filterRecord.message_to !== undefined && filterRecord.message_to !== null ? filterRecord.message_to : ''
            const list_id = filterRecord.list_id !== undefined && filterRecord.list_id !== null ? filterRecord.list_id : ''
            if (parseInt(message_by) < parseInt(message_to)) {
                chatId = (message_by.toString()) + (message_to.toString());
            }
            else {
                chatId = (message_to.toString()) + (message_by.toString());
            }
            chatId = chatId + "L" + list_id.toString()
            this.setState({
                ...this.state,
                chatId: chatId
            })
        }
    }

    addEmoji = e => {
        let emoji = e.native;
        this.setState({
            ...this.state,
            emojis: [...this.state.emojis, e],
            chatMessage: this.state.chatMessage + emoji
        });
    };

    onClickToggleEmojis = () => {
        this.setState(preState => ({
            ...this.state,
            toggleEmojis: !preState.toggleEmojis
        }))
    }

    sendMessage = e => {
        e.preventDefault()
        let reciver_id = (this.props.chat_list || []).filter(item => item.isSelected === true).length > 0 ? (this.props.chat_list || []).filter(item => item.isSelected === true)[0].message_to : ''
        let filterRecord = (this.props.chat_list || []).filter(item => item.isSelected === true).length > 0 ? (this.props.chat_list || []).filter(item => item.isSelected === true)[0] : ''
        // let filterRecord = (this.props.chat || []).filter(item => item.isSelected === true).length > 0 ? (this.props.chat || []).filter(item => item.isSelected === true)[0] : ''
        if (reciver_id === undefined || reciver_id === null || reciver_id === '') {
            const message_to = Number(reciver_id) === Number(this.props.user_id) ? Number(filterRecord.message_by) : Number(reciver_id)
            // this.props.get_chats(filterRecord.message_by, filterRecord.message_to, filterRecord.list_id, filterRecord.id)
            this.props.get_chats(this.props.user_id, message_to, filterRecord.list_id, filterRecord.id)
        }
        if (reciver_id === undefined || reciver_id === null || reciver_id === '') {
            return false
        }
        if ((typeof this.state.chatMessage !== 'undefined' && typeof this.state.chatMessage !== 'null' && this.state.chatMessage !== '') || (this.state.selectedFile !== undefined && this.state.selectedFile !== null && this.state.selectedFile.length > 0)) {
            const sender_name = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).user.toLowerCase() : ''
            const reciver_name = Number(reciver_id) === Number(this.props.user_id) ? (filterRecord.sender_name ? filterRecord.sender_name.toLowerCase() : '') : (filterRecord.reciver_name ? filterRecord.reciver_name.toLowerCase() : '')
            const data = { id: filterRecord.id, message_by: this.props.user_id, message: this.state.chatMessage.trim(), time: moment().format('LLLL'), sender_name: sender_name, lister_name: filterRecord.lister_name ? filterRecord.lister_name.toLowerCase() : '', message_to: Number(reciver_id) === Number(this.props.user_id) ? Number(filterRecord.message_by) : Number(reciver_id), reciver_name: reciver_name, list_desc: filterRecord.list_desc, list_id: filterRecord.list_id, list_price: filterRecord.list_price, lister_image: filterRecord.lister_image, user_image: filterRecord.user_image, vehicle_image: filterRecord.vehicle_image, image: Number(reciver_id) === Number(this.props.user_id) ? filterRecord.lister_image : filterRecord.user_image, files: this.state.fileNames }
            if (this.state.fileNames !== undefined && this.state.fileNames !== null && this.state.fileNames.length > 0) {
                let chatId = ''
                if (parseInt(data.message_by) < parseInt(data.message_to)) {
                    chatId = (data.message_by.toString()) + (data.message_to.toString());
                }
                else {
                    chatId = (data.message_to.toString()) + (data.message_by.toString());
                }
                chatId = chatId + "L" + data.list_id.toString()
                var formData = new FormData();
                let img_len = 0
                if (this.state.selectedFile !== undefined && this.state.selectedFile !== null) {
                    for (let i = 0; i < this.state.selectedFile.length; i++) {
                        if (this.state.selectedFile[i] !== undefined && this.state.selectedFile[i] !== null) {
                            formData.append(`files[${i}]`, this.state.selectedFile[i])
                        }
                    }
                    img_len = (this.state.selectedFile || []).length
                }
                formData.append("file_len", img_len);
                formData.append("foldername", chatId);
                const imagesFiles = {
                    imagePreviewUrl: this.state.imagePreviewUrl,
                    fileNames: this.state.fileNames,
                }
                this.props.upload_chat_images(formData, data, imagesFiles)
            } else {
                this.props.send_message(data)

            }


        }
    }

    toggleBlock = (filterRecord) => {
        if (this.props.user_id !== undefined || this.props.user_id !== null || this.props.user_id !== '') {
            const reciver_id = Number(filterRecord.message_to) === Number(this.props.user_id) ? Number(filterRecord.message_by) : Number(filterRecord.message_to)
            this.props.block_user(this.props.user_id, reciver_id, !this.props.isBlock)
        }
    }
    openModel = () => {
        window.$('#chatBlockModel').modal('show')
    }

    deleteChat = (filterRecord) => {
        if (this.props.user_id !== undefined || this.props.user_id !== null || this.props.user_id !== '') {
            const reciver_id = Number(filterRecord.message_to) === Number(this.props.user_id) ? Number(filterRecord.message_by) : Number(filterRecord.message_to)
            this.props.delete_conversation(this.props.user_id, reciver_id, filterRecord.list_id)
        }
    }
    componentWillUnmount() {
        document.removeEventListener('click', this.handleClickOutside);
    }

    handleClickOutside(event) {
        if (event.target.id !== '' && event.target.id !== 'Emoji-Container') {
            // this.logout();
            this.setState({
                ...this.state,
                toggleEmojis: false
            })
        }
    }

    fileChangedHandler = event => {
        console.log(event)
        const files = Array.from(event.target.files)
        let imageFiles = []
        let fileName = []

        for (let i = 0; i < files.length; i++) {
            if (files[i].type != "image/png" && files[i].type != "image/jpg" && files[i].type != "image/jpeg") {
                toastr.error('Error', `${files[i].path} File does not support. You must use .png, jpeg or .jpg`)
                return false;
            } else {
                if (files[i].size > (2 * 1024 * 1024)) {
                    toastr.error('Error', `${files[i].path} Please upload a file smaller than 2 MB`)
                    return false;
                } else {
                    let reader = new FileReader();
                    imageFiles.push(files[i])
                    fileName.push(files[i].name)
                    reader.onloadend = () => {
                        this.setState({
                            imagePreviewUrl: [...this.state.imagePreviewUrl, reader.result]
                        });
                    }

                    reader.readAsDataURL(files[i])

                }
            }
        }
        this.setState({
            selectedFile: [...this.state.selectedFile, ...imageFiles],
            fileNames: [...this.state.fileNames, ...fileName],
        })
    }

    deleteUploadImage = (idx) => {
        this.setState({
            ...this.state,
            selectedFile: this.state.selectedFile.filter((item, index) => { return Number(index) !== Number(idx) }),
            fileNames: this.state.fileNames.filter((item, index) => { return Number(index) !== Number(idx) }),
            imagePreviewUrl: this.state.imagePreviewUrl.filter((item, index) => { return Number(index) !== Number(idx) })
        })
    }
    render() {
        // Can be a string as well. Need to ensure each key-value pair ends with ;
        const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;
        const user_id = this.props.user_id !== undefined && this.props.user_id !== null && this.props.user_id !== '' ? this.props.user_id : ''
        let reciver_id = (this.props.chat_list || []).filter(item => item.isSelected === true).length > 0 ? (this.props.chat_list || []).filter(item => item.isSelected === true)[0].message_to : ''
        let filterRecord = (this.props.chat_list || []).filter(item => item.isSelected === true).length > 0 ? (this.props.chat_list || []).filter(item => item.isSelected === true)[0] : ''

        const reciver_name = Number(reciver_id) === Number(user_id) ? (filterRecord.sender_name) : (filterRecord.reciver_name)
        return (
            reciver_id ? (
                <React.Fragment>
                    <div className="col-xl-9 col-lg-8 col-md-7 col-sm-12 col-12" id='HondaAccord-Con'>


                        <div className={(this.props.chat || []).length === 0 && this.props.filterName === 'all' ? "no-chat-right-container" : "no-chat-right-container d-none"}>
                            <div className="chat-right-head">
                                <h2>No chat to display</h2>
                            </div>
                        </div>

                        <div className="HondaAccord-Con" id='HondaAccord-Con'>

                            <div className="AccordLeft" id="AccordLeft">
                                <img src={`${API_URL}/media/${filterRecord.vehicle_image}`} alt="No Image" />
                                <Link to={`/ad-post/detail/${filterRecord.list_id}`} target='_blank' rel="noopener noreferrer">
                                    <div className="AccordHead" id='AccordHead'>
                                        <h1>{filterRecord !== undefined && filterRecord.list_desc !== undefined ? filterRecord.list_desc : ''}</h1>
                                        <h2>{filterRecord !== undefined && filterRecord.list_price !== undefined && filterRecord.list_price !== null && filterRecord.list_price !== '' ? new Intl.NumberFormat('en-US',
                                            { style: 'currency', currency: 'USD' }
                                        ).format(Number(filterRecord.list_price))// '$100.00'
                                            : new Intl.NumberFormat('en-US',
                                                { style: 'currency', currency: 'USD' }
                                            ).format(0)}</h2>
                                    </div>
                                </Link>
                            </div>

                            <div className="AccordRight" id="AccordRight">

                                <div className="dropdown-Right" id='dropdown-Right'>

                                    <Dropdown>
                                        <Dropdown.Toggle id="dropdown-basic">
                                        </Dropdown.Toggle>
                                        {/* `Blocked By ${this.props.check_block_reciver.name || ''}`  */}
                                        <Dropdown.Menu>
                                            <Dropdown.Item onClick={() => this.deleteChat(filterRecord)}>{this.props.deleteLoading === true ? (<i class="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>) : null}<i className="icon-delete-trash" ></i> Delete</Dropdown.Item>
                                            {/* `Blocked By ${this.props.blocked.block_by}` */}
                                            {/* disabled={this.props.blocked !== undefined && this.props.blocked !== false ? Number(this.props.blocked.id) === Number(user_id) ? false : true : false} */}
                                            <Dropdown.Item onClick={this.openModel} ><i className="icon-close-square-icon"></i> {this.props.blocked !== undefined && this.props.blocked !== false ? Number(this.props.blocked.id) === Number(user_id) ? "Un Block" : "Block" : 'Block'}</Dropdown.Item>
                                            {/* <Dropdown.Item className="drop3-border"><i className="icon-help-icon"></i> Help</Dropdown.Item> */}
                                        </Dropdown.Menu>
                                    </Dropdown>

                                </div>


                                <div className="AccordHead-Right" id='AccordHead-Right'>
                                    <h1>{filterRecord !== undefined && filterRecord.lister_name !== undefined && filterRecord.lister_name !== null ? (filterRecord.lister_name || 'No Name') : 'No Name'}</h1>
                                    <p>{filterRecord !== undefined && filterRecord.time !== undefined && filterRecord.time !== null && filterRecord.time !== '' ? `Last messsage ${moment(filterRecord.time).fromNow()}` : ''}</p>
                                </div>


                            </div>


                        </div>

                        <div className="ChatRight-Container" id="ChatRight-Container">

                            <SimpleBar style={{ maxHeight: '530px' }} scrollableNodeProps={{ ref: this.scrollableNodeRef }} >
                                <div className="UserMessage-Section" id="UserMessage-Section" >
                                    {(this.props.chat || []).map((item, index) => (
                                        (item.block !== undefined && item.block === true) && (item.block_by !== undefined && item.block_by.toString() === user_id.toString()) ?
                                            null : (item.message_by.toString() === user_id.toString() ? (<React.Fragment key={index}>
                                                <div className="UserChat-Right">
                                                    <div className="InnerReply-Head">
                                                        {this.props.disableMessage == true && item.isSend !== true ? (item.imagePreviewUrl !== undefined && item.imagePreviewUrl !== null && item.imagePreviewUrl.length > 0 ? (item.imagePreviewUrl.map((img, index) => (
                                                            <>
                                                                <img src={img} alt={item.fileNames[index]} width="198" height="128" />
                                                            </>
                                                        ))
                                                        ) : null) : (item.files ? <SimpleReactLightbox> <SRLWrapper>{(item.files || []).map((img, index) => (
                                                            <img src={`${API_URL}/media/chat/${this.state.chatId}/${img}`} alt={img} width="198" height="128" />
                                                        ))}</SRLWrapper></SimpleReactLightbox>
                                                            : null)}
                                                        <div className="clearfix"></div>
                                                        {item.message !== undefined && item.message !== null && item.message !== '' ? (<h1>{item.message}</h1>) : null}
                                                        <h2> {moment(item.time).fromNow()}</h2>
                                                    </div>
                                                    {this.props.disableMessage == true && item.isSend !== true ? (<ClipLoader color={'#ffffff'} loading={true} css={override} size={10} />) : null}
                                                </div>
                                            </React.Fragment>) : (<React.Fragment key={index}>
                                                <div className="UserChat-Left">
                                                    {item.image ? (<img src={`${API_URL}/media/${item.image}`} alt="" />) : (item.sender_name ? <span className="chat-avtar">{`${item.sender_name.split(' ')[0] ? item.sender_name.split(' ')[0].charAt(0).toUpperCase() : ''}${item.sender_name.split(' ')[1] ? item.sender_name.split(' ')[1].charAt(0).toUpperCase() : ''}`}</span> : '')}
                                                    <div className="InnerChat-Head">
                                                        <div className="InnerReply-Head">
                                                            {item.files ? <SimpleReactLightbox> <SRLWrapper>{(item.files || []).map((img, index) => (
                                                                <img src={`${API_URL}/media/chat/${this.state.chatId}/${img}`} alt={img} width="198" height="128" />
                                                            ))}</SRLWrapper></SimpleReactLightbox>
                                                                : null}
                                                        </div>
                                                        <div className="clearfix"></div>
                                                        {item.message !== undefined && item.message !== null && item.message !== '' ? (<h1>{item.message}</h1>) : null}
                                                        <h2>{moment(item.time).fromNow()}</h2>
                                                    </div>
                                                    {this.state.toggleEmojis === true ? (<><div className="Emoji-Container" id="Emoji-Container"  >
                                                        <Picker set='facebook' onSelect={this.addEmoji} />
                                                    </div></>) : null}
                                                    <div className="Emoji-Control" >
                                                        <img src="/assets/image/smile-emoji.svg" alt="" />
                                                    </div>

                                                </div>
                                            </React.Fragment>))
                                    )
                                    )}
                                </div>
                            </SimpleBar>

                            <form onSubmit={this.sendMessage}>
                                <div className="row" id='submitChat' >
                                    {this.props.blocked !== undefined && this.props.blocked !== false && Number(this.props.blocked.id) === Number(user_id) ? <ChatBlock block_name={this.props.blocked.name} toggleBlock={this.toggleBlock} deleteChat={this.deleteChat} filterRecord={filterRecord} blocked={this.props.blocked} user_id={user_id} className="Block-ConverstionHead" blockLoading={this.props.blockLoading} deleteLoading={this.props.deleteLoading} /> : (<>{this.state.imagePreviewUrl.length > 0 ?
                                        <ChatPreviewImage uploadImages={this.state.imagePreviewUrl} fileName={this.state.fileNames} deleteUploadImage={this.deleteUploadImage} />
                                        : null} <div className="ChatMessage-Search">

                                            {this.state.toggleEmojis === true ? (<><div className="Emoji-Container" id="Emoji-Container"  >
                                                <Picker set='facebook' onSelect={this.addEmoji} />
                                            </div></>) : null}

                                            <input type="text" id="chatMessage" name="chatMessage" placeholder="Write your message" onChange={this.handleOnChange} value={this.state.chatMessage} />

                                            <div className="Emojifile-List">
                                                <ul>
                                                    <li onClick={this.onClickToggleEmojis}><a ><i className="icon-emoji" id='icon-emoji'  ></i></a></li>
                                                    <li>
                                                        <div className="image-upload" id='image-upload'>
                                                            <label htmlFor="file-input" >
                                                                <i className="icon-file-attech"></i>
                                                            </label>
                                                            <input id="file-input" type="file" name="selectedFile" onChange={this.fileChangedHandler} ref={this.imageInputRef} multiple />
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div></div>

                                        <div className="ChatMessage-Btn">
                                            <button type="submit" >Send</button>
                                        </div></>)}




                                </div>
                            </form>
                        </div>
                    </div>
                    <ChatBlockModel toggleBlock={this.toggleBlock} deleteChat={this.deleteChat} reciver_name={reciver_name} filterRecord={filterRecord} blocked={this.props.blocked} user_id={user_id} blockLoading={this.props.blockLoading} deleteLoading={this.props.deleteLoading} />
                </React.Fragment>
            ) : (<React.Fragment>
                <div className="col-xl-9 col-lg-9 col-md-9 col-sm-12 col-12" id='HondaAccord-Con'>
                    <div className={(this.props.chat || []).length === 0 ? "no-chat-right-container" : "no-chat-right-container d-none"}>
                        <div className="chat-right-head">
                            <h2>No chat to display</h2>
                        </div>
                    </div>
                </div>
            </React.Fragment>)
        )
    }

}
const mapStateToProps = state => {
    return {
        user_id: state.authReducer.authentication.user.user_id,
        isBlock: state.chatReducer.isBlock,
        blocked: state.chatReducer.blocked,
        message_send: state.chatReducer.message_send,
        disableMessage: state.chatReducer.disableMessage,
        isDeleted: state.chatReducer.isDeleted,
        blockLoading: state.chatReducer.blockLoading,
        deleteLoading: state.chatReducer.deleteLoading,

    }
}
export default connect(mapStateToProps, { add_chat_message, send_message, block_user, delete_conversation, upload_chat_images })(Chat)
// `You have blocked ${this.props.blocked.name}. They will not be able to send you any message. You can delete this conversation or unblock them to send receive messages` :