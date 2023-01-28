import React, { useEffect } from 'react'
import PendingListingGalleryView from './PendingListingGalleryView'
import PendingListingGalleryEditView from './PendingListingGalleryEditView'
const PendingListingReviewGallery = props => {
    useEffect(() => {
        if (props.update_listing_images !== undefined && props.update_listing_images !== null && props.update_listing_images === false) {
            props.setEditListingImages(false)
        }
    }, [props.update_listing_images])
    return (
        <React.Fragment>
            {!props.editListingImages ? <PendingListingGalleryView state={props.state} /> : (<><PendingListingGalleryEditView  {...props} /></>)}
        </React.Fragment>
    )
}

export default PendingListingReviewGallery
{/* */ }