
import React from 'react'

const ChatModelPreviewImage = props => {
    return (<React.Fragment>
        <div className="Modalimg-Preview">
            {props.uploadImages !== undefined && props.uploadImages !== null && props.uploadImages.length > 0 ? (props.uploadImages.map((item, index) => (
                <>
                    <div className="SmallChat-Preview" key={index} >
                        <div className="ChatPlaceholder">
                            <img src={item} alt={props.fileName[index]} />
                            <i class="fa fa-times" onClick={() => props.deleteUploadImage(index)}></i>
                        </div>
                    </div>
                </>
            ))

            ) : null}
        </div>
    </React.Fragment>)
}
export default ChatModelPreviewImage