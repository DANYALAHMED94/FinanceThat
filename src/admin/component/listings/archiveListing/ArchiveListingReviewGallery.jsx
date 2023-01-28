/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import ArchiveListingGalleryView from "./ArchiveListingGalleryView";
import ArchiveListingGalleryEditView from "./ArchiveListingGalleryEditView";
const ArchiveListingReviewGallery = (props) => {
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
        <ArchiveListingGalleryView state={props.state} />
      ) : (
        <>
          <ArchiveListingGalleryEditView {...props} />
        </>
      )}
    </React.Fragment>
  );
};

export default ArchiveListingReviewGallery;
