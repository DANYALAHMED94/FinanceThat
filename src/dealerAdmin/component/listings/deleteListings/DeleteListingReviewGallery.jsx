import React, { useEffect } from 'react'
import DeleteListingGalleryView from './DeleteListingGalleryView'
import DeleteListingGalleryEditView from './DeleteListingGalleryEditView'
const DeleteListingReviewGallery = props => {
    useEffect(() => {
        if (props.update_listing_images !== undefined && props.update_listing_images !== null && props.update_listing_images === false) {
            props.setEditListingImages(false)
        }
    }, [props.update_listing_images])
    return (
        <React.Fragment>
            {!props.editListingImages ? <DeleteListingGalleryView state={props.state} /> : (<><DeleteListingGalleryEditView  {...props} /></>)}
        </React.Fragment>
    )
}

export default DeleteListingReviewGallery
