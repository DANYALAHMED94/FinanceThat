import React, { Component } from 'react'
import { add_chat_message, send_message, reset_chat, block_user, delete_conversation, upload_chat_images, change_chat_user } from '../../actions/chatActions'
import { connect } from 'react-redux'
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
import moment from 'moment'
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'
import Dropdown from 'react-bootstrap/Dropdown';
import ChatBlock from './ChatBlock'
import { API_URL } from '../../constant'
import { toastr } from 'react-redux-toastr'
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";
import ChatModelPreviewImage from './ChatModelPreviewImage'
import { SRLWrapper } from "simple-react-lightbox";
import SimpleReactLightbox from "simple-react-lightbox";

class ChatModel extends Component {
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
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.imageInputRef = React.createRef()

    }

    componentDidMount() {
        document.addEventListener('click', this.handleClickOutside, { capture: true });

        if (this.props.user_id) {
            this.props.change_chat_user(this.props.user_id)
        }
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
        // if (prevProps.message_send !== this.props.message_send) {
        //     alert(this.props.message_send)
        //     this.setState({
        //         ...this.state,
        //         chatMessage: '',
        //         toggleEmojis: false,
        //         selectedFile: [],
        //         imagePreviewUrl: [],
        //         fileNames: [],
        //     })
        //     this.imageInputRef.current.value = ""

        // }

        if (prevState.selectedFile !== this.state.selectedFile && this.state.selectedFile !== undefined && this.state.selectedFile !== null && this.state.selectedFile.length === 0) {
            this.imageInputRef.current.value = ""
        }
        if (prevProps.chat !== this.props.chat && this.props.chat !== undefined) {
            let filterRecord = (this.props.chat || []) !== undefined && (this.props.chat || []) !== null && (this.props.chat || []).length > 0 ? (this.props.chat || [])[0] : ''
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
        let reciver_id = (this.props.chat || [])[(this.props.chat || []).length - 1] !== undefined ? (this.props.chat || [])[(this.props.chat || []).length - 1].message_to : ''
        reciver_id = reciver_id !== undefined && reciver_id !== null && reciver_id !== '' ? reciver_id : this.props.reciver_id
        // const sender_name = localStorage.getItem('user') !== undefined || localStorage.getItem('user') !== null ? JSON.parse(localStorage.getItem('user')).user : ''
        const sender_name = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).user.toLowerCase() : ''
        if ((typeof this.state.chatMessage !== 'undefined' && typeof this.state.chatMessage !== 'null' && this.state.chatMessage !== '' && this.props.reciver_id !== undefined) || (this.state.selectedFile !== undefined && this.state.selectedFile !== null && this.state.selectedFile.length > 0)) {
            const stockId = (this.props.stock_id).toString() + this.props.user_id.toString()

            const data = {
                id: stockId, message: this.state.chatMessage.trim(), time: moment().format('LLLL'), message_by: this.props.user_id, sender_name: sender_name, lister_name: this.props.reciver_name ? this.props.reciver_name.toLowerCase() : '', message_to: this.props.reciver_id, reciver_name: this.props.reciver_name ? this.props.reciver_name.toLowerCase() : '', list_id: this.props.list_id, list_desc: this.props.list_desc, list_price: this.props.list_price, vehicle_image: this.props.vehicle_image, lister_image: this.props.lister_image,
                user_image: this.props.user_image,
                image: this.props.user_image,
                files: this.state.fileNames
            }
            sessionStorage.setItem('chatId', stockId)

            // Number(reciver_id) === Number(this.props.user_id) ? this.props.lister_image : this.props.user_image
            // this.props.send_message(data)
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
            this.setState({
                ...this.state,
                chatMessage: '',
                toggleEmojis: false,
                selectedFile: [],
                imagePreviewUrl: [],
                fileNames: [],
            })
            this.imageInputRef.current.value = ""
        }
    }

    closeModel = () => {
        this.setState({
            ...this.state,
            chatMessage: '',
            toggleEmojis: false,
            selectedFile: [],
            imagePreviewUrl: [],
            fileNames: [],
        })
        if (this.imageInputRef.current.value !== null) {
            this.imageInputRef.current.value = ""
        }
        this.props.reset_chat()
    }
    toggleBlock = (reciver_id) => {
        if (this.props.user_id !== undefined || this.props.user_id !== null || this.props.user_id !== '') {
            this.props.block_user(this.props.user_id, reciver_id, !this.props.isBlock)
        }
    }
    deleteChat = (reciver_id, list_id) => {
        if (this.props.user_id !== undefined || this.props.user_id !== null || this.props.user_id !== '') {
            this.props.delete_conversation(this.props.user_id, reciver_id, list_id)
        }
    }
    deleteChatModel = (filterRecord) => {
        if (this.props.user_id !== undefined || this.props.user_id !== null || this.props.user_id !== '') {
            this.props.delete_conversation(this.props.user_id, filterRecord.reciver_id, filterRecord.list_id)
        }
    }
    toggleBlockModel = (filterRecord) => {
        if (this.props.user_id !== undefined || this.props.user_id !== null || this.props.user_id !== '') {
            this.props.block_user(this.props.user_id, filterRecord.reciver_id, !this.props.isBlock)
        }
    }
    openModel = () => {
        window.$('#chatBlockModel').modal('show')
    }
    componentWillUnmount() {
        document.removeEventListener('click', this.handleClickOutside);
    }
    handleClickOutside(event) {
        console.log(event.target.id)
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
        console.log(idx)
        this.setState({
            ...this.state,
            selectedFile: this.state.selectedFile.filter((item, index) => { return Number(index) !== Number(idx) }),
            fileNames: this.state.fileNames.filter((item, index) => { return Number(index) !== Number(idx) }),
            imagePreviewUrl: this.state.imagePreviewUrl.filter((item, index) => { return Number(index) !== Number(idx) })
        })
    }
    render() {
        const override = css`
        display: block;
        margin: 0 auto;
        border-color: red;
      `;
        const filterRecord = {
            reciver_id: this.props.reciver_id,
            list_id: this.props.list_id
        }
        let first = this.props.reciver_name !== undefined && this.props.reciver_name !== null && this.props.reciver_name !== '' ? this.props.reciver_name.split(' ')[0] ? this.props.reciver_name.split(' ')[0] : '' : ''
        let last = this.props.reciver_name !== undefined && this.props.reciver_name !== null && this.props.reciver_name !== '' ? this.props.reciver_name.split(' ')[1] ? this.props.reciver_name.split(' ')[1] : '' : ''
        first = first ? first.charAt(0).toUpperCase() : ''
        last = last ? last.charAt(0).toUpperCase() : ''

        return (
            <React.Fragment>

                <div className="modal fade" id="chatModel" role='dialog'
                    data-backdrop='false'
                    tabIndex='-1' aria-labelledby="chatModelLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">

                            <div className="modal-header" id="modal-header">
                                <div className="ChatTop-Content">
                                    {/** Left Side Chat */}
                                    <div className="ChatLeft">
                                        {/* <img src="/assets/image/chat-img.png" width="53" height="52" alt="" /> */}
                                        <img src={`${API_URL}/media/${this.props.vehicle_image}`} width="53" height="52" alt="" />
                                        <div className="HeadLeft">
                                            <h1>{this.props.list_desc || ''}</h1>
                                            <h2>{this.props.list_price !== undefined && this.props.list_price !== null && this.props.list_price !== '' ? new Intl.NumberFormat('en-US',
                                                { style: 'currency', currency: 'USD' }
                                            ).format(Number(this.props.list_price))// '$100.00'
                                                : new Intl.NumberFormat('en-US',
                                                    { style: 'currency', currency: 'USD' }
                                                ).format(0)}</h2>
                                        </div>
                                    </div>
                                    {/** Right Side Chat */}
                                    <div className="ChatRight">
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.closeModel}>
                                            <span aria-hidden="true">&times;</span>
                                        </button>

                                        <div className="Chat-dropdown-Right">

                                            <Dropdown>
                                                <Dropdown.Toggle id="dropdown-basic">
                                                </Dropdown.Toggle>

                                                <Dropdown.Menu>
                                                    <Dropdown.Item onClick={() => this.deleteChat(this.props.reciver_id, this.props.list_id)}>{this.props.deleteLoading === true ? (<i class="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>) : null} <i className="icon-delete-trash" ></i>Delete</Dropdown.Item>
                                                    <Dropdown.Item onClick={this.openModel} ><i className="icon-close-square-icon"></i> {this.props.blocked !== undefined && this.props.blocked !== false ? Number(this.props.blocked.id) === Number(this.props.user_id) ? "Un Block" : "Block" : 'Block'}</Dropdown.Item>
                                                    {/* <Dropdown.Item ><i className="icon-help-icon"></i> Help</Dropdown.Item> */}
                                                </Dropdown.Menu>
                                            </Dropdown>

                                        </div>

                                    </div>

                                </div>
                            </div>

                            <div className="modal-body" id="modal-body">
                                <div className="ChatInner-Sec">
                                    <SimpleBar style={{ maxHeight: '331px' }} scrollableNodeProps={{ ref: this.scrollableNodeRef }} >
                                        {(this.props.chat || []).map((item, index) => (
                                            (item.block !== undefined && item.block === true) && (item.block_by !== undefined && item.block_by.toString() === this.props.user_id.toString()) ?
                                                null : (item.message_by.toString() === this.props.user_id.toString() ? (<React.Fragment key={index}>
                                                    <div className="ChatInner-Right">

                                                        <div className="clearfix"></div>
                                                        {this.props.disableMessage == true && item.isSend !== true ? (item.imagePreviewUrl !== undefined && item.imagePreviewUrl !== null && item.imagePreviewUrl.length > 0 ? (item.imagePreviewUrl.map((img, index) => (
                                                            <>
                                                                <img src={img} alt={item.fileNames[index]} />
                                                            </>
                                                        ))) : null) : (item.files ? <SimpleReactLightbox> <SRLWrapper>{(item.files || []).map((img, index) => (
                                                            <img src={`${API_URL}/media/chat/${this.state.chatId}/${img}`} alt={img} />
                                                        ))}</SRLWrapper></SimpleReactLightbox> : null)}
                                                        {item.message !== undefined && item.message !== null && item.message !== '' ? (<h3>{item.message}</h3>) : null}
                                                        <h4> {moment(item.time).fromNow()}</h4>

                                                        {this.props.disableMessage == true && item.isSend !== true ? (<ClipLoader color={'#ffffff'} loading={true} css={override} size={10} />) : null}
                                                    </div>
                                                </React.Fragment>) : (<React.Fragment key={index}>

                                                    <div className="ChatInner-Left">
                                                        {/* <img src={this.props.lister_image ? `${API_URL}/media/${this.props.lister_image}` : `/assets/image/chat-pr-img.png`} alt="No Image" width="30" height="30" /> */}

                                                        {this.props.lister_image ? <img src={`${API_URL}/media/${this.props.lister_image}`} alt="No Image" width="30" height="30" /> : (<span className="chat-avtar"> {`${first}${last}`} </span>)}
                                                        {/* <img src="/assets/image/chat-pr-img.png" width="30" height="30" alt="" /> */}
                                                        <div className="ChatOnLeft">
                                                            {item.files !== undefined && item.files !== null ? <SimpleReactLightbox> <SRLWrapper>{(item.files || []).map((img, index) => (
                                                                <img src={`${API_URL}/media/chat/${this.state.chatId}/${img}`} alt={img} />
                                                            ))}</SRLWrapper></SimpleReactLightbox> : null}
                                                            {/* (item.files || []).map((img, index) => (
                                                                <img src={`${API_URL}/media/chat/${this.state.chatId}/${img}`} alt="" />

                                                            ))  */}
                                                            <div className="clearfix"></div>
                                                            {item.message !== undefined && item.message !== null && item.message !== '' ? (<h1>{item.message}</h1>) : null}
                                                            <h2> {moment(item.time).fromNow()}</h2>

                                                            {/* <img src="/assets/image/chatimg-11.png" alt="" /> */}
                                                        </div>
                                                    </div>
                                                </React.Fragment>))
                                        )
                                        )}
                                    </SimpleBar>

                                </div>
                            </div>
                            {this.props.blocked !== undefined && this.props.blocked !== false && Number(this.props.blocked.id) === Number(this.props.user_id) ? <ChatBlock block_name={this.props.blocked.name} toggleBlock={this.toggleBlockModel} deleteChat={this.deleteChatModel} filterRecord={filterRecord} blocked={this.props.blocked} user_id={this.props.user_id} className="Small-ChatBlock" blockLoading={this.props.blockLoading} deleteLoading={this.props.deleteLoading} /> : (
                                <>
                                    <form onSubmit={this.sendMessage}>
                                        <div className="modal-footer">

                                            <div className="ModalChat-Search">
                                                {this.state.toggleEmojis === true ? (<><div className="Emoji-Container" id="Emoji-Container">
                                                    <Picker set='facebook' onSelect={this.addEmoji} />
                                                </div></>) : null}
                                                {this.state.imagePreviewUrl.length > 0 ?
                                                    <ChatModelPreviewImage uploadImages={this.state.imagePreviewUrl} fileName={this.state.fileNames} deleteUploadImage={this.deleteUploadImage} /> : null}
                                                {/*  */}

                                                <div className="SearchLeft">
                                                    <div className="Emojifile-List">
                                                        <ul>
                                                            <li onClick={this.onClickToggleEmojis}><a ><i className="icon-emoji" id='icon-emoji' ></i></a></li>
                                                            <li>
                                                                <div className="image-upload">
                                                                    <label htmlFor="file-input">
                                                                        <i className="icon-file-attech"></i>
                                                                    </label>
                                                                    <input id="file-input" type="file" name="selectedFile" onChange={this.fileChangedHandler} ref={this.imageInputRef} multiple />
                                                                </div>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <input type="text" id="chatMessage" name="chatMessage" value={this.state.chatMessage} placeholder="Write your message..." onChange={this.handleOnChange} />
                                                </div>
                                                <div className="SearchRight">
                                                    <button type="submit"><img src="/assets/image/icon-paper-plane.svg" alt="" /></button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>

                                </>
                            )}

                        </div>
                    </div>
                </div>
                {/* <ChatBlockModel toggleBlock={this.toggleBlockModel} deleteChat={this.deleteChatModel} reciver_name={this.props.reciver_name} filterRecord={filterRecord} blocked={this.props.blocked} user_id={this.props.user_id} /> */}
            </React.Fragment>
        )
    }

}
const mapStateToProps = state => {
    return {
        user_id: state.authReducer.authentication.user.user_id,
        chat: state.chatReducer.chat,
        blocked: state.chatReducer.blocked,
        isDeleted: state.chatReducer.isDeleted,
        message_send: state.chatReducer.message_send,
        disableMessage: state.chatReducer.disableMessage,
        blockLoading: state.chatReducer.blockLoading,
        deleteLoading: state.chatReducer.deleteLoading,
    }

}
export default connect(mapStateToProps, { add_chat_message, send_message, reset_chat, block_user, delete_conversation, upload_chat_images, change_chat_user })(ChatModel)
// `You have blocked ${this.props.blocked.name || JSON.parse(localStorage.getItem('user')).user}. They will not be able to send you any message. You can delete this conversation or unblock them to send receive messages`
// : `You have blocked ${this.props.blocked.name}. They will not be able to send you any message. You can delete this conversation or unblock them to send receive messages`