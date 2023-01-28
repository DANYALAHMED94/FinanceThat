import React, { useEffect } from 'react'
import SoldListingGalleryView from './SoldListingGalleryView'
import SoldListingGalleryEditView from './SoldListingGalleryEditView'
const SoldListingReviewGallery = props => {
    useEffect(() => {
        if (props.update_listing_images !== undefined && props.update_listing_images !== null && props.update_listing_images === false) {
            props.setEditListingImages(false)
        }
    }, [props.update_listing_images])
    return (
        <React.Fragment>
            {!props.editListingImages ? <SoldListingGalleryView state={props.state} /> : (<><SoldListingGalleryEditView  {...props} /></>)}
        </React.Fragment>
    )
}

export default SoldListingReviewGallery
