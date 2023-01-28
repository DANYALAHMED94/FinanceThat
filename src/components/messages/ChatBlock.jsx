import React from 'react'
const ChatBlock = (props) => {
    console.log(props.block_name)
    return (
        <React.Fragment>
            <div className={props.className}>
                <p>You have blocked {props.block_name}. They will not be able to send you any message.<br /> You can delete this conversation or unblock them to send receive messages.</p>
                <button type="button" onClick={() => props.toggleBlock(props.filterRecord)} >{props.blockLoading === true ? (<i class="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>) : null}{props.blocked !== undefined && props.blocked !== false ? Number(props.blocked.id) === Number(props.user_id) ? "UnBlock" : `Block` : 'Block'}</button>
                <button className="active" type="button" onClick={() => props.deleteChat(props.filterRecord)}>{props.deleteLoading === true ? (<i class="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>) : null}Delete Conversation</button>
            </div>
        </React.Fragment>
    )
}
export default ChatBlock
// disabled={props.blocked !== undefined && props.blocked !== false ? Number(props.blocked.id) === Number(props.user_id) ? false : true : false}