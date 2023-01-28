import React from 'react'
import Avatar from 'react-avatar-edit'

const ProfileImageCrop = props => {
    return (
        <div className="modal fade" id="profileImageCropModel" tabIndex="-1" role="dialog" aria-labelledby="profileImageCropModelLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={props.onSaveCrop}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <Avatar
                            width='100%'
                            height={295}
                            onCrop={props.onCrop}
                            onClose={props.onClose}
                            imageWidth={390}
                            shadingColor='none'
                            onBeforeFileLoad={props.onBeforeFileLoad}
                            src={props.image}
                            exportQuality={0.7}
                        />
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={props.onSaveCrop}>Close</button>
                        <button type="button" className="btn btn-primary" onClick={props.onSaveCrop}>Save Crop</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ProfileImageCrop