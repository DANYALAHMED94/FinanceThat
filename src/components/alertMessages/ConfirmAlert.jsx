import React from "react";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { connect } from 'react-redux'

const ConfirmAlert = (props) => {
    const submit = (id) => {
        confirmAlert({
            title: props.heading,
            message: props.section,
            buttons: [
                {
                    label: "Cancel",
                    onClick: () => { return true },
                },
                {
                    label: props.button_text,
                    onClick: () => props.buttonAction(id),
                },
            ],
        });
    };
    return (
        <React.Fragment>
            <button type="button" onClick={() => submit(props.id)}>{props.deleteLoading === true && props.id === props.deletedId ? (<i class="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>) : <i className="icon-delete-trash"></i>}</button>
        </React.Fragment>
    );
};
const mapStateToProps = state => {
    return {
        deleteLoading: state.adsReducer.myAdsReducer.deleteLoading,
        deletedId: state.adsReducer.myAdsReducer.deletedId,
    }
}
export default connect(mapStateToProps, null)(ConfirmAlert);

