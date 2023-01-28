import React, { useEffect } from 'react'
import ExpireListingGalleryView from './ExpireListingGalleryView'
import ExpireListingGalleryEditView from './ExpireListingGalleryEditView'
const ExpireListingReviewGallery = props => {
    useEffect(() => {
        if (props.update_listing_images !== undefined && props.update_listing_images !== null && props.update_listing_images === false) {
            props.setEditListingImages(false)
        }
    }, [props.update_listing_images])
    return (
        <React.Fragment>
            {!props.editListingImages ? <ExpireListingGalleryView state={props.state} /> : (<><ExpireListingGalleryEditView  {...props} /></>)}
        </React.Fragment>
    )
}

export default ExpireListingReviewGallery
{/* */ }

