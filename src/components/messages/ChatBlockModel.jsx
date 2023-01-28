import React from 'react'

const ChatBlockModel = (props) => {
    return (
        <React.Fragment>
            <div className="ModalBlock-User">
                <div className="modal fade" id="chatBlockModel" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <button type="button" className="close block-modal-mobile" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                            <div className="modal-body">

                                <div className="BlockUser-Head">
                                    <h1>Block {props.reciver_name}?</h1>
                                    <p>you can permanently delete the conversation or<br /> block {props.reciver_name} from sending you messages.</p>
                                </div>
                                {/* disabled={props.blocked !== undefined && props.blocked !== false ? Number(props.blocked.id) === Number(props.user_id) ? false : true : false} */}
                                <div className="BlockBtn">
                                    <button type="button" onClick={() => props.deleteChat(props.filterRecord)}>{props.deleteLoading === true ? (<i class="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>) : null}Delete</button>
                                    <button className="active" type="button" onClick={() => props.toggleBlock(props.filterRecord)} >{props.blockLoading === true ? (<i class="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>) : null}{props.blocked !== undefined && props.blocked !== false ? Number(props.blocked.id) === Number(props.user_id) ? "Un Block" : `Block` : 'Block'}</button>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}
export default ChatBlockModel