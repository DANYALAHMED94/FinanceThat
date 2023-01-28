import React from 'react'

const ChatPreviewImage = props => {
    return (<React.Fragment>
        <div class="ChatImage-Upload">
            {props.uploadImages !== undefined && props.uploadImages !== null && props.uploadImages.length > 0 ? (props.uploadImages.map((item, index) => (
                <>
                    <div class="ImageList" key={index} >
                        <div class="ImageHolder">
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
export default ChatPreviewImage