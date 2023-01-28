/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import moment from "moment";
import ArchiveListingReviewUserDetail from "./ArchiveListingReviewUserDetail";
import ArchiveListingReviewLocation from "./ArchiveListingReviewLocation";
import ArchiveListingReviewGallery from "./ArchiveListingReviewGallery";
import ArchiveListingReviewVehicleDetail from "./ArchiveListingReviewVehicleDetail";
import Geocode from "react-geocode";
import CKEditor from "ckeditor4-react";

const ArchiveListingReviews = (props) => {
  const [state, setState] = useState({
    /** Listing  */
    listingId: "",
    listingDate: "",
    listingBy: "",
    listingGallery: [],
    listingDesc: "",
    listingReasonDecline: "",
    /** User Listing Detail */
    userId: "",
    userCity: "",
    userStreetAddress: "",
    userCity: "",
    userPostalCode: "",
    userFax: "",
    userEmail: "",
    userName: "",
    userFirstName: "",
    userLastName: "",
    /**Vehicle Detail State */
    vehicleCategory: "",
    vehicleCondition: "",
    vehicleYear: "",
    vehicleMake: "",
    vehicleModel: "",
    vehicleKilometer: "",
    vehicleVin: "",
    vehiclePrice: "",
    vehicleBodyType: "",
    vehicleSeating: "",
    vehicleTransmission: "",
    vehicleColor: "",
    vehicleFuelType: "",
    vehicleDriveTrain: "",
    vehicleCylinder: "",
    vehiclePreviousOwners: "",
    vehiclePreviousAccidents: "",
    vehicleFeature: [],
    vehicleListingType: "",
    vehicleListingPrice: "",
    vehicleUploadImages: [],
    imageErrors: [],
  });
  const [listLocation, setLocation] = useState({
    listingLongitude: "",
    listingLatitude: "",
    locationName: "",
    location: "",
    locationCity: "",
    locationProvince: "",
  });
  const [editUser, setEditUser] = useState(false);
  const [editVehicle, setEditVehicle] = useState(false);
  const [editVehicleLocation, setVehicleLocation] = useState(false);
  const [editDesc] = useState(false);
  const [editListingImages] = useState(false);
  useEffect(() => {
    // set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
    Geocode.setApiKey("AIzaSyBDXs8HHpZSRxd1vJapwzON64a_vmjpn_4");
    // set response language. Defaults to english.
    Geocode.setLanguage("en");
    // set response region. Its optional.
    // A Geocoding request with region=es (Spain) will return the Spanish city.
    // Geocode.setRegion("es");

    // Enable or disable logs. Its optional.
    Geocode.enableDebug();
  }, []);
  useEffect(() => {
    if (
      props.single_listing_detail !== undefined &&
      props.single_listing_detail !== null
    ) {
      (props.single_listing_detail || []).map((item) => {
        let images =
          item.images != undefined &&
            item.images != null &&
            item.images.length > 0
            ? item.images || []
            : [];
        const imagesFiles = [];
        const orignalImage = [];
        let ad_id = "";
        for (var i = 0; i < 10; i++) {
          if (images[i] !== undefined && images[i] !== null) {
            ad_id = images[i].ad_id;
            imagesFiles.push({
              id: i,
              preViewFiles: null,
              ad_id: images[i].ad_id,
              // path: images[i].image_path
              path: images[i].photo,
            });
            orignalImage.push({
              id: i,
              files: null,
              ad_id: images[i].ad_id,
              // path: images[i].image_path
              path: images[i].photo,
            });
          } else {
            imagesFiles.push({
              id: i,
              preViewFiles: null,
              ad_id: ad_id,
              path: "",
            });
            orignalImage.push({ ad_id: ad_id, id: i, path: "", files: null });
          }
        }
        setLocation({
          ...listLocation,
          location:
            item.location !== undefined && item.location !== null
              ? { label: item.location, value: {} } || ""
              : "",
          locationName:
            item.location !== undefined && item.location !== null
              ? item.location || ""
              : "",
          locationCity:
            item.city !== undefined && item.city !== null
              ? item.city || ""
              : "",
          locationProvince:
            item.province !== undefined && item.province !== null
              ? item.province || ""
              : "",
        });
        setState({
          ...state,
          /** Listing  */
          listingId:
            item.id !== undefined && item.id !== null ? item.id || "" : "",
          listingDate:
            item.created_at !== undefined && item.created_at !== null
              ? item.created_at || ""
              : "",
          listingBy: Number(item.user_type) === 2 ? "Dealer" : "Seller",
          listingGallery:
            item.images != undefined && item.images != null
              ? item.images || []
              : [],
          listingDesc:
            item.description !== undefined && item.description !== null
              ? item.description || ""
              : "",
          /** User Listing Detail */
          userId:
            item.user_id !== undefined &&
              item.user_id !== null &&
              item.user_id.length > 0
              ? item.user_id[0].id !== undefined && item.user_id[0].id !== null
                ? item.user_id[0].id || ""
                : ""
              : "",
          userCity:
            item.user_id !== undefined &&
              item.user_id !== null &&
              item.user_id.length > 0
              ? item.user_id[0].dd_user_id !== undefined &&
                item.user_id[0].dd_user_id !== null &&
                item.user_id[0].dd_user_id.length > 0
                ? item.user_id[0].dd_user_id[0].city !== undefined &&
                  item.user_id[0].dd_user_id[0].city !== null
                  ? item.user_id[0].dd_user_id[0].city || ""
                  : ""
                : item.user_id[0].bd_user_id !== undefined &&
                  item.user_id[0].bd_user_id !== null &&
                  item.user_id[0].bd_user_id.length > 0
                  ? item.user_id[0].bd_user_id[0].city !== undefined &&
                    item.user_id[0].bd_user_id[0].city !== null
                    ? item.user_id[0].bd_user_id[0].city || ""
                    : ""
                  : ""
              : "",
          userName:
            item.user_id !== undefined &&
              item.user_id !== null &&
              item.user_id.length > 0
              ? item.user_id[0].dd_user_id !== undefined &&
                item.user_id[0].dd_user_id !== null &&
                item.user_id[0].dd_user_id.length > 0
                ? item.user_id[0].dd_user_id[0].operating_name !== undefined &&
                  item.user_id[0].dd_user_id[0].operating_name !== null
                  ? item.user_id[0].dd_user_id[0].operating_name || ""
                  : ""
                : item.user_id[0].bd_user_id !== undefined &&
                  item.user_id[0].bd_user_id !== null &&
                  item.user_id[0].bd_user_id.length > 0
                  ? item.user_id[0].bd_user_id[0].name !== undefined &&
                    item.user_id[0].bd_user_id[0].name !== null
                    ? item.user_id[0].bd_user_id[0].name || ""
                    : ""
                  : ""
              : "",
          userFirstName: item.user_id !== undefined && item.user_id !== null && item.user_id.length > 0 ? item.user_id[0].dd_user_id !== undefined && item.user_id[0].dd_user_id !== null && item.user_id[0].dd_user_id.length > 0 ? item.user_id[0].dd_user_id[0].first_name !== undefined && item.user_id[0].dd_user_id[0].first_name !== null ? item.user_id[0].dd_user_id[0].first_name || '' : '' : item.user_id[0].bd_user_id !== undefined && item.user_id[0].bd_user_id !== null && item.user_id[0].bd_user_id.length > 0 ? item.user_id[0].bd_user_id[0].first_name !== undefined && item.user_id[0].bd_user_id[0].first_name !== null ? item.user_id[0].bd_user_id[0].first_name || '' : '' : '' : '',
          userLastName: item.user_id !== undefined && item.user_id !== null && item.user_id.length > 0 ? item.user_id[0].dd_user_id !== undefined && item.user_id[0].dd_user_id !== null && item.user_id[0].dd_user_id.length > 0 ? item.user_id[0].dd_user_id[0].last_name !== undefined && item.user_id[0].dd_user_id[0].last_name !== null ? item.user_id[0].dd_user_id[0].last_name || '' : '' : item.user_id[0].bd_user_id !== undefined && item.user_id[0].bd_user_id !== null && item.user_id[0].bd_user_id.length > 0 ? item.user_id[0].bd_user_id[0].last_name !== undefined && item.user_id[0].bd_user_id[0].last_name !== null ? item.user_id[0].bd_user_id[0].last_name || '' : '' : '' : '',
          userStreetAddress:
            item.user_id !== undefined &&
              item.user_id !== null &&
              item.user_id.length > 0
              ? item.user_id[0].dd_user_id !== undefined &&
                item.user_id[0].dd_user_id !== null &&
                item.user_id[0].dd_user_id.length > 0
                ? item.user_id[0].dd_user_id[0].street_address !== undefined &&
                  item.user_id[0].dd_user_id[0].street_address !== null
                  ? item.user_id[0].dd_user_id[0].street_address || ""
                  : ""
                : item.user_id[0].bd_user_id !== undefined &&
                  item.user_id[0].bd_user_id !== null &&
                  item.user_id[0].bd_user_id.length > 0
                  ? item.user_id[0].bd_user_id[0].street !== undefined &&
                    item.user_id[0].bd_user_id[0].street !== null
                    ? item.user_id[0].bd_user_id[0].street || ""
                    : ""
                  : ""
              : "",
          userPostalCode:
            item.user_id !== undefined &&
              item.user_id !== null &&
              item.user_id.length > 0
              ? item.user_id[0].dd_user_id !== undefined &&
                item.user_id[0].dd_user_id !== null &&
                item.user_id[0].dd_user_id.length > 0
                ? item.user_id[0].dd_user_id[0].postal_code !== undefined &&
                  item.user_id[0].dd_user_id[0].postal_code !== null
                  ? item.user_id[0].dd_user_id[0].postal_code || ""
                  : ""
                : item.user_id[0].bd_user_id !== undefined &&
                  item.user_id[0].bd_user_id !== null &&
                  item.user_id[0].bd_user_id.length > 0
                  ? item.user_id[0].bd_user_id[0].postal_code !== undefined &&
                    item.user_id[0].bd_user_id[0].postal_code !== null
                    ? item.user_id[0].bd_user_id[0].postal_code || ""
                    : ""
                  : ""
              : "",
          userFax:
            item.user_id !== undefined &&
              item.user_id !== null &&
              item.user_id.length > 0
              ? item.user_id[0].dd_user_id !== undefined &&
                item.user_id[0].dd_user_id !== null &&
                item.user_id[0].dd_user_id.length > 0
                ? item.user_id[0].dd_user_id[0].fax !== undefined &&
                  item.user_id[0].dd_user_id[0].fax !== null
                  ? item.user_id[0].dd_user_id[0].fax || ""
                  : ""
                : item.user_id[0].bd_user_id !== undefined &&
                  item.user_id[0].bd_user_id !== null &&
                  item.user_id[0].bd_user_id.length > 0
                  ? item.user_id[0].bd_user_id[0].fax !== undefined &&
                    item.user_id[0].bd_user_id[0].fax !== null
                    ? item.user_id[0].bd_user_id[0].fax || ""
                    : ""
                  : ""
              : "",
          userEmail:
            item.user_id !== undefined &&
              item.user_id !== null &&
              item.user_id.length > 0
              ? item.user_id[0].dd_user_id !== undefined &&
                item.user_id[0].dd_user_id !== null &&
                item.user_id[0].dd_user_id.length > 0
                ? item.user_id[0].dd_user_id[0].email !== undefined &&
                  item.user_id[0].dd_user_id[0].email !== null
                  ? item.user_id[0].dd_user_id[0].email || ""
                  : ""
                : item.user_id !== undefined &&
                  item.user_id !== null &&
                  item.user_id.length > 0
                  ? item.user_id[0].email || ""
                  : ""
              : "",
          /**Vehicle Detail State */
          vehicleCategory:
            item.category !== undefined && item.category !== null
              ? item.category.name !== undefined && item.category.name !== null
                ? item.category.name || ""
                : ""
              : "",
          vehicleCondition:
            item.v_condition !== undefined && item.v_condition !== null
              ? item.v_condition || ""
              : "",
          vehicleYear:
            item.year !== undefined && item.year !== null
              ? item.year || ""
              : "",
          vehicleMake:
            item.make !== undefined && item.make !== null
              ? item.make.make_name !== undefined &&
                item.make.make_name !== null
                ? item.make.make_name || ""
                : ""
              : "",
          vehicleModel:
            item.model !== undefined && item.model !== null
              ? item.model.model_make !== undefined &&
                item.model.model_make !== null
                ? item.model.model_make || ""
                : ""
              : "",
          vehicleKilometer:
            item.kilometer !== undefined && item.kilometer !== null
              ? item.kilometer || ""
              : "",
          vehicleVin:
            item.vin !== undefined && item.vin !== null ? item.vin || "" : "",
          vehiclePrice:
            item.price !== undefined && item.price !== null
              ? item.price || ""
              : "",
          vehicleBodyType:
            item.body_type !== undefined && item.body_type !== null
              ? item.body_type.body_type !== undefined &&
                item.body_type.body_type !== null
                ? item.body_type.body_type || ""
                : ""
              : "",
          vehicleSeating:
            item.seating !== undefined && item.seating !== null
              ? item.seating || ""
              : "",
          vehicleTransmission:
            item.transmission !== undefined && item.transmission !== null
              ? item.transmission || ""
              : "",
          vehicleColor:
            item.color !== undefined && item.color !== null
              ? item.color || ""
              : "",
          vehicleFuelType:
            item.fuel_type !== undefined && item.fuel_type !== null
              ? item.fuel_type.fuel_type !== undefined &&
                item.fuel_type.fuel_type !== null
                ? item.fuel_type.fuel_type || ""
                : ""
              : "",
          vehicleDriveTrain:
            item.drive_train !== undefined && item.drive_train !== null
              ? item.drive_train.drive_train !== undefined &&
                item.drive_train.drive_train !== null
                ? item.drive_train.drive_train || ""
                : ""
              : "",
          vehicleCylinder:
            item.cylinder !== undefined && item.cylinder !== null
              ? item.cylinder || ""
              : "",
          vehiclePreviousOwners:
            item.previous_owners !== undefined && item.previous_owners !== null
              ? item.previous_owners
              : "",
          vehiclePreviousAccidents:
            item.previous_accidents !== undefined &&
              item.previous_accidents !== null
              ? item.previous_accidents
              : "",
          vehicleFeature:
            item.features !== undefined && item.features !== null
              ? JSON.parse(item.features) || []
              : [],
          vehicleListingType:
            item.listing_type !== undefined &&
              item.listing_type !== null &&
              item.listing_type.length > 0
              ? item.listing_type[0].listing_type !== undefined &&
                item.listing_type[0].listing_type !== null
                ? item.listing_type[0].listing_type || ""
                : ""
              : "",
          vehicleListingPrice:
            item.listing_type !== undefined &&
              item.listing_type !== null &&
              item.listing_type.length > 0
              ? item.listing_type[0].price !== undefined &&
                item.listing_type[0].price !== null
                ? item.listing_type[0].price || ""
                : ""
              : "",
          vehicleImages: imagesFiles,
          vehicleUploadImages: orignalImage,
        });
      });
    }
  }, [props.single_listing_detail]);

  useEffect(() => {
    if (listLocation.location !== undefined && listLocation.location !== null) {
      new Promise((resolve, reject) => {
        Geocode.fromAddress(
          listLocation.location.label !== undefined &&
            listLocation.location.label !== null
            ? listLocation.location.label
            : listLocation.location
        ).then(
          (response) => {
            let city, state;
            for (
              let i = 0;
              i < response.results[0].address_components.length;
              i++
            ) {
              for (
                let j = 0;
                j < response.results[0].address_components[i].types.length;
                j++
              ) {
                switch (response.results[0].address_components[i].types[j]) {
                  case "locality":
                    city = response.results[0].address_components[i].long_name;
                    break;
                  case "administrative_area_level_3":
                    city = response.results[0].address_components[i].long_name;
                    break;
                  case "administrative_area_level_1":
                    state =
                      response.results[0].address_components[i].short_name;
                    break;
                  default:
                    break;
                }
              }
            }
            setLocation({
              ...listLocation,
              locationCity: city,
              locationProvince: state,
              listingLongitude:
                response && response.results.length > 0
                  ? response.results[0]
                    ? response.results[0].geometry.location.lng
                    : ""
                  : "",
              listingLatitude:
                response && response.results.length > 0
                  ? response.results[0]
                    ? response.results[0].geometry.location.lat
                    : ""
                  : "",
              locationName:
                listLocation.location.label !== undefined &&
                  listLocation.location.label !== null
                  ? listLocation.location.label
                  : listLocation.location,
            });
            resolve();
          },
          (error) => {
            console.error(error);
          }
        );
      });
    }
  }, [listLocation.location]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value,
    });
  };
  const handleLocationChange = (e) => {
    setLocation({
      ...listLocation,
      // location: e.target.value
      location: e,
    });
  };
  const onDrop = async (files, id) => {
    setState({
      ...state,
      imageErrors: [],
    });
    let index = 0;
    let width = 141.8;
    let height = 107.31;
    let emptyPreviewFiles = state.vehicleImages.filter(
      (item) => item.preViewFiles === null && item.path === ""
    );
    let fillPreviewFiles = state.vehicleImages.filter(
      (item) => item.preViewFiles !== null || item.path !== ""
    );
    let emptyFiles = state.vehicleUploadImages.filter(
      (item) => item.files === null && item.path === ""
    );
    let fillFiles = state.vehicleUploadImages.filter(
      (item) => item.files !== null || item.path !== ""
    );
    for (const item of files) {
      if (
        item.type != "image/png" &&
        item.type != "image/jpg" &&
        item.type != "image/jpeg"
      ) {
        setState({
          ...state,
          imageErrors: [
            ...state.imageErrors,
            {
              message: `${item.path} File does not support. You must use .png, jpeg or .jpg`,
            },
          ],
        });
      } else {
        if (item.size > 2 * 1024 * 1024) {
          setState({
            ...state,
            imageErrors: [
              ...state.imageErrors,
              {
                message: `${item.path} Please upload a file smaller than 2 MB`,
              },
            ],
          });
        } else {
          emptyPreviewFiles = emptyPreviewFiles.map((img, fileIndex) => {
            if (fileIndex === index) {
              return {
                ...img,
                preViewFiles: Object.assign(item, {
                  preview: URL.createObjectURL(item),
                }),
              };
            }
            return img;
          });
          emptyFiles = emptyFiles.map((img, fileIndex) => {
            if (fileIndex === index) {
              return {
                ...img,
                files: item,
              };
            }
            return img;
          });

          index++;
        }
        setState({
          ...state,
          vehicleUploadImages: [...(fillFiles || []), ...emptyFiles],
          vehicleImages: [...(fillPreviewFiles || []), ...emptyPreviewFiles],
        });
      }
    }
  };

  const removeFile = (id) => {
    const fileExist = state.vehicleImages
      .filter((item) => Number(item.id) === Number(id))
      .map((item) => {
        return item.path;
      })[0];
    if (fileExist !== undefined && fileExist !== null && fileExist !== "") {
      const data = {
        update: "remove_images",
        rimg_len: 1,
        "rimages[0]": fileExist,
      };
      // props.delete_listing_image(data)
    }

    const vehicleUploadImages = state.vehicleUploadImages
      .slice()
      .map((item) => {
        if (item.id === id) {
          return {
            ...item,
            files: null,
            path: "",
          };
        }
        return item;
      });
    const vehicleImages = state.vehicleImages.slice().map((item) => {
      if (item.id === id) {
        return {
          ...item,
          preViewFiles: null,
          path: "",
        };
      }
      return item;
    });
    setState({
      ...state,
      vehicleImages,
      vehicleUploadImages,
    });
  };
  const handleOnChangeDesc = (e) => {
    setState({
      ...state,
      listingDesc: e.editor.getData(),
    });
  };
  return (
    <React.Fragment>
      <div className="Admin-MainHead">
        <div className="Admin-HeadLeft">
          <h1>
            Listing #
            {props.loading_listing_detail === true ? (
              <i class="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>
            ) : null}{" "}
            {state.listingId}
          </h1>
          <h2>
            Date Added:{" "}
            {props.loading_listing_detail === true ? (
              <i class="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>
            ) : null}{" "}
            {state.listingDate !== undefined &&
              state.listingDate !== null &&
              state.listingDate !== ""
              ? moment(state.listingDate).format("yyyy-MM-DD")
              : ""}
          </h2>
        </div>

        <div className="Admin-HeadRight">
          <h4 style={{ background: "#FB5100" }}>Archive</h4>
        </div>
      </div>

      <div className="clearfix"></div>

      <div className="Admin-DealerLeft">
        <div className="InnerDealer-Container">
          <div className="InnerDealer-Head">
            <div className="InnerLeft">
              <h1>
                {props.loading_listing_detail === true ? (
                  <i
                    class="fa fa-circle-o-notch fa-spin"
                    aria-hidden="true"
                  ></i>
                ) : null}{" "}
                {state.listingBy} ID{" "}
                <span>
                  {props.loading_listing_detail === true ? (
                    <i
                      class="fa fa-circle-o-notch fa-spin"
                      aria-hidden="true"
                    ></i>
                  ) : null}{" "}
                  {state.userId}
                </span>
              </h1>
            </div>

            <div className="InnerRight"></div>
          </div>

          <div className="DealerID-Container">
            <ArchiveListingReviewUserDetail
              handleOnChange={handleOnChange}
              state={state}
              {...props}
              editUser={editUser}
              setEditUser={setEditUser}
            />
          </div>
        </div>

        <div className="InnerDealer-Container">
          <div className="InnerDealer-Head">
            <div className="InnerLeft">
              <h1>Listing location</h1>
            </div>

            <div className="InnerRight"></div>
          </div>

          <ArchiveListingReviewLocation
            setVehicleLocation={setVehicleLocation}
            editVehicleLocation={editVehicleLocation}
            listLocation={listLocation}
            {...props}
            handleLocationChange={handleLocationChange}
          />
        </div>

        <div className="InnerDealer-Container">
          <div className="InnerDealer-Head">
            <div className="InnerLeft">
              <h1>Listing options</h1>
            </div>

            <div className="InnerRight"></div>
          </div>

          <div className="DealerID-Container">
            <div className="DealerID-List">
              <div className="LeftCon">
                <h1>
                  {props.loading_listing_detail === true ? (
                    <i
                      class="fa fa-circle-o-notch fa-spin"
                      aria-hidden="true"
                    ></i>
                  ) : (
                    state.vehicleListingType || ""
                  )}
                </h1>
              </div>
              <div className="RightCon">
                <h2>
                  <span>
                    {props.loading_listing_detail === true ? (
                      <i
                        class="fa fa-circle-o-notch fa-spin"
                        aria-hidden="true"
                      ></i>
                    ) : state.vehicleListingPrice !== null &&
                      state.vehicleListingPrice !== "" ? (
                      new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                      }).format(Number(state.vehicleListingPrice)) // '$100.00'
                    ) : (
                      new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                      }).format(0)
                    )}
                  </span>
                </h2>
              </div>
            </div>
          </div>
        </div>

        <div className="InnerDealer-Container">
          <div className="InnerDealer-Head">
            <div className="InnerLeft">
              <h1>Listing Gallery</h1>
            </div>

            <div className="InnerRight"></div>
          </div>

          <div className="ListGallery">
            <ArchiveListingReviewGallery
              state={state}
              {...props}
              editListingImages={editListingImages}
              onDrop={onDrop}
              removeFile={removeFile}
            />
          </div>
        </div>

        <div className="InnerDealer-Container">
          <div className="InnerDealer-Head">
            <div className="InnerLeft">
              <h1>Reason for declining the registration</h1>
            </div>
          </div>

          <div className="Admin-DealerAdres Reasonfor-Head">
            <textarea
              id="listingReasonDecline"
              name="listingReasonDecline"
              onChange={handleOnChange}
              value={state.listingReasonDecline}
              disabled
            >
              {" "}
            </textarea>
          </div>
        </div>
      </div>

      <div className="Admin-DealerRight">
        <div className="InnerDealer-Container">
          <div className="InnerDealer-Head">
            <div className="InnerLeft">
              <h1>Vehicle Details</h1>
            </div>

            <div className="InnerRight">
              <button type="submit"></button>
            </div>
          </div>

          <div className="DealerID-Container">
            <ArchiveListingReviewVehicleDetail
              state={state}
              {...props}
              editVehicle={editVehicle}
              setEditVehicle={setEditVehicle}
              handleOnChange={handleOnChange}
            />
          </div>
        </div>

        <div className="InnerDealer-Container">
          <div className="InnerDealer-Head">
            <div className="InnerLeft">
              <h1>Vehicle Features</h1>
            </div>

            <div className="InnerRight"></div>
          </div>

          <div className="VehicleTable-Container">
            <table class="table">
              <tbody>
                {props.loading_listing_detail === true ? (
                  <tr>
                    <td>
                      <i
                        class="fa fa-circle-o-notch fa-spin"
                        aria-hidden="true"
                      ></i>{" "}
                      <b>:</b>
                    </td>
                    <td>
                      <span>
                        <i
                          class="fa fa-circle-o-notch fa-spin"
                          aria-hidden="true"
                        ></i>
                      </span>
                    </td>
                  </tr>
                ) : (
                  (state.vehicleFeature || []).map((item, index) => (
                    <tr key={index}>
                      {(index + 1) % 2 !== 0 ? (
                        <td>
                          {item.v_features} <b>:</b>
                        </td>
                      ) : (
                        <td>
                          <span>{item.v_features}</span>
                        </td>
                      )}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="InnerDealer-Container">
          <div className="InnerDealer-Head">
            <div className="InnerLeft">
              <h1>Description</h1>
            </div>

            <div className="InnerRight"></div>
          </div>

          <div className="Admin-DealerAdres Reasonfor-Head">
            {props.loading_listing_detail === true ? (
              <i class="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>
            ) : editDesc === true ? (
              <CKEditor
                id="listingDesc"
                className="form-control ckEditior-postadd"
                data={state.listingDesc}
                onChange={handleOnChangeDesc}
              />
            ) : (
              <div
                dangerouslySetInnerHTML={{ __html: state.listingDesc }}
                className="addDetail-description"
              />
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default ArchiveListingReviews;
