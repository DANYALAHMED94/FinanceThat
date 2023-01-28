/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import ActiveListingGalleryView from "./ActiveListingGalleryView";
import ActiveListingGalleryEditView from "./ActiveListingGalleryEditView";
const ActiveListingReviewGallery = (props) => {
  useEffect(() => {
    if (
      props.update_listing_images !== undefined &&
      props.update_listing_images !== null &&
      props.update_listing_images === false
    ) {
      props.setEditListingImages(false);
    }
  }, [props.update_listing_images]);
  return (
    <React.Fragment>
      {!props.editListingImages ? (
        <ActiveListingGalleryView state={props.state} />
      ) : (
        <>
          <ActiveListingGalleryEditView {...props} />
        </>
      )}
    </React.Fragment>
  );
};

export default ActiveListingReviewGallery;
{
  /* */
}
