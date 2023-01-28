/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import NumberFormat from "react-number-format";
import {
  transmissions,
  colors,
  seatings,
  passengers,
  conditions,
  owners,
  accidents,
  years,
  cylinders,
} from "../listingConstants";
const ActiveListingReviewVehicleDetail = (props) => {
  console.log(props.state.vehiclePrice);
  useEffect(() => {
    if (
      props.loading_update_listing_detail !== undefined &&
      props.loading_update_listing_detail !== null &&
      props.loading_update_listing_detail === false
    ) {
      props.setEditVehicle(false);
    }
  }, [props.loading_update_listing_detail]);
  const updateVehicleDetail = () => {
    const checkId = props.state.vehicleCategory.toString().split("-")[1];
    let sub_type_id = "";
    let category_id = 0;
    if (checkId !== undefined && checkId !== null && checkId !== "") {
      sub_type_id = Number(checkId);
      category_id = props.state.vehicleCategory.toString().split("-")[0];
    } else {
      category_id = Number(props.state.vehicleCategory);
      sub_type_id = "";
    }
    //Old
    // const trimName = (props.state.vehicleTrims || []).filter(item => Number(item.value) === Number(props.state.vehicleTrim)) && (props.state.vehicleTrims || []).filter(item => Number(item.value) === Number(props.state.vehicleTrim)).length > 0 ? (props.state.vehicleTrims || []).filter(item => Number(item.value) === Number(props.state.vehicleTrim))[0] ? (props.state.vehicleTrims || []).filter(item => Number(item.value) === Number(props.state.vehicleTrim))[0].label : '' : ''
    const data = {
      update: "ad",
      user_id: props.state.userId,
      id: props.state.listingId,
      category: category_id,
      sub_type_id: sub_type_id,
      v_condition: props.state.vehicleCondition,
      make: props.state.vehicleMake,
      model: props.state.vehicleModel,
      // trim: trimName,
      trim: props.state.vehicleTrim,
      kilometer:
        props.state.vehicleKilometer == ""
          ? 0
          : props.state.vehicleKilometer !== undefined &&
            props.state.vehicleKilometer !== null &&
            props.state.vehicleKilometer !== ""
          ? props.state.vehicleKilometer.toString().split(",").join("")
          : 0,
      price:
        props.state.vehiclePrice == ""
          ? 0
          : props.state.vehiclePrice !== undefined &&
            props.state.vehiclePrice !== null &&
            props.state.vehiclePrice !== ""
          ? props.state.vehiclePrice.toString().split(",").join("")
          : 0,
      // previous_owners: props.state.vehiclePreviousOwners,
      // previous_accidents: props.state.vehiclePreviousAccidents
    };
    if (props.state.vehicleYear) {
      data.year = props.state.vehicleYear;
    }
    if (props.state.vehiclePreviousOwners) {
      data.previous_owners = props.state.vehiclePreviousOwners;
    }
    if (props.state.vehiclePreviousAccidents) {
      data.previous_accidents = props.state.vehiclePreviousAccidents;
    }
    if (props.state.vehicleCylinder) {
      data.cylinder = props.state.vehicleCylinder;
    }
    if (props.state.vehicleSeating) {
      data.seating = props.state.vehicleSeating;
    }
    if (props.state.vehicleTransmission) {
      data.transmission = props.state.vehicleTransmission;
    }
    if (props.state.vehicleColor) {
      data.color = props.state.vehicleColor;
    }
    if (props.state.vehicleBodyType) {
      data.body_type = props.state.vehicleBodyType;
    }
    if (props.state.vehicleFuelType) {
      data.fuel_type = props.state.vehicleFuelType;
    }
    if (props.state.vehicleDriveTrain) {
      data.drive_train = props.state.vehicleDriveTrain;
    }
    if (props.state.vehicleVin) {
      data.vin = props.state.vehicleVin;
    }
    if (
      props.state.userId !== undefined &&
      props.state.userId !== null &&
      props.state.userId !== ""
    ) {
      console.log("data", data);
      props.update_listing_vehicle_detail(data);
    }
  };
  return (
    <React.Fragment>
      <div className="DealerID-List">
        <div className="LeftCon">
          <h1>Category </h1>
        </div>
        {/* <input type='text' name='vehicleCategory' value={props.state.vehicleCategory} onChange={props.handleOnChange} /> */}
        <div className="RightCon">
          {props.loading_listing_detail === true ? (
            <i class="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>
          ) : props.editVehicle === true ? (
            (props.state.typeOfVehicles || []).filter(
              (item) =>
                Number(item.value) === Number(props.state.vehicleCategory)
            ) !== undefined &&
            (props.state.typeOfVehicles || []).filter(
              (item) =>
                Number(item.value) === Number(props.state.vehicleCategory)
            ) !== null &&
            (props.state.typeOfVehicles || []).filter(
              (item) =>
                Number(item.value) === Number(props.state.vehicleCategory)
            ).length > 0 ? (
              <h2>
                <span>
                  {(props.state.typeOfVehicles || []).filter(
                    (item) =>
                      Number(item.value) === Number(props.state.vehicleCategory)
                  )[0].label || ""}
                </span>
              </h2>
            ) : (
              <h2>
                <span></span>
              </h2>
            )
          ) : // (<select name="vehicleCategory" onChange={props.handleOnChange} value={props.state.vehicleCategory} >
          //     <option value={''}>{'Select Category'}</option>
          //     {(props.state.typeOfVehicles || []).map((veh, vehIndex) => (
          //         <option value={veh.value} key={vehIndex}>{veh.label}</option>
          //     ))})</select>)

          (props.state.typeOfVehicles || []).filter(
              (item) =>
                Number(item.value) === Number(props.state.vehicleCategory)
            ) !== undefined &&
            (props.state.typeOfVehicles || []).filter(
              (item) =>
                Number(item.value) === Number(props.state.vehicleCategory)
            ) !== null &&
            (props.state.typeOfVehicles || []).filter(
              (item) =>
                Number(item.value) === Number(props.state.vehicleCategory)
            ).length > 0 ? (
            <h2>
              <span>
                {(props.state.typeOfVehicles || []).filter(
                  (item) =>
                    Number(item.value) === Number(props.state.vehicleCategory)
                )[0].label || ""}
              </span>
            </h2>
          ) : (
            <h2>
              <span></span>
            </h2>
          )}
        </div>
      </div>

      <div className="DealerID-List">
        <div className="LeftCon">
          <h1>Condition</h1>
        </div>
        <div className="RightCon">
          {props.loading_listing_detail === true ? (
            <i class="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>
          ) : props.editVehicle === true ? (
            <select
              name="vehicleCondition"
              onChange={props.handleOnChange}
              value={props.state.vehicleCondition}
            >
              {conditions.map((cond, condIndex) => (
                <option value={cond.name} key={condIndex}>
                  {cond.name}
                </option>
              ))}
              )
            </select>
          ) : (
            <h2>
              <span>{props.state.vehicleCondition}</span>
            </h2>
          )}
        </div>
      </div>

      <div className="DealerID-List">
        <div className="LeftCon">
          <h1>Year</h1>
        </div>
        <div className="RightCon">
          {props.loading_listing_detail === true ? (
            <i class="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>
          ) : props.editVehicle === true ? (
            <select
              name="vehicleYear"
              onChange={props.handleOnChange}
              value={props.state.vehicleYear}
            >
              {years.map((year, yearIndex) => (
                <option value={year.value} key={yearIndex}>
                  {year.label}
                </option>
              ))}
              )
            </select>
          ) : (
            <h2>{props.state.vehicleYear}</h2>
          )}
        </div>
      </div>

      {props.state.showVehicleMakes === true ? (
        <div className="DealerID-List">
          <div className="LeftCon">
            <h1>Make</h1>
          </div>
          {/* <input type='text' name='vehicleMake' value={props.state.vehicleMake} onChange={props.handleOnChange} /> */}
          <div className="RightCon">
            {props.loading_listing_detail === true ? (
              <i class="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>
            ) : props.editVehicle === true ? (
              <select
                name="vehicleMake"
                onChange={props.handleOnChange}
                value={props.state.vehicleMake}
              >
                <option value={""}>{"Select Make"}</option>
                {(props.state.vehicleMakes || []).map((make, makeIndex) => (
                  <option value={make.value} key={makeIndex}>
                    {make.label}
                  </option>
                ))}
                )
              </select>
            ) : (props.state.vehicleMakes || []).filter(
                (item) => Number(item.value) === Number(props.state.vehicleMake)
              ) !== undefined &&
              (props.state.vehicleMakes || []).filter(
                (item) => Number(item.value) === Number(props.state.vehicleMake)
              ) !== null &&
              (props.state.vehicleMakes || []).filter(
                (item) => Number(item.value) === Number(props.state.vehicleMake)
              ).length > 0 ? (
              <h2>
                {(props.state.vehicleMakes || []).filter(
                  (item) =>
                    Number(item.value) === Number(props.state.vehicleMake)
                )[0].label || ""}{" "}
              </h2>
            ) : (
              <h2></h2>
            )}
          </div>
        </div>
      ) : null}
      {props.state.showVehicleModels === true ? (
        <div className="DealerID-List">
          <div className="LeftCon">
            <h1>Model</h1>
          </div>
          {/* <input type='text' name='vehicleModel' value={props.state.vehicleModel} onChange={props.handleOnChange} /> */}
          <div className="RightCon">
            {props.loading_listing_detail === true ? (
              <i class="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>
            ) : props.editVehicle === true ? (
              <select
                name="vehicleModel"
                onChange={props.handleOnChange}
                value={props.state.vehicleModel}
              >
                <option value={""}>{"Select Model"}</option>
                {(props.state.vehicleModels || []).map((model, modelIndex) => (
                  <option value={model.value} key={modelIndex}>
                    {model.label}
                  </option>
                ))}
                )
              </select>
            ) : (props.state.vehicleModels || []).filter(
                (item) =>
                  Number(item.value) === Number(props.state.vehicleModel)
              ) !== undefined &&
              (props.state.vehicleModels || []).filter(
                (item) =>
                  Number(item.value) === Number(props.state.vehicleModel)
              ) !== null &&
              (props.state.vehicleModels || []).filter(
                (item) =>
                  Number(item.value) === Number(props.state.vehicleModel)
              ).length > 0 ? (
              <h2>
                {(props.state.vehicleModels || []).filter(
                  (item) =>
                    Number(item.value) === Number(props.state.vehicleModel)
                )[0].label || ""}{" "}
              </h2>
            ) : (
              <h2></h2>
            )}
          </div>
        </div>
      ) : null}
      {
        props.state.showVehicleTrims === true ? (
          <div className="DealerID-List">
            <div className="LeftCon">
              <h1>Trims</h1>
            </div>
            {/* <input type='text' name='vehicleModel' value={props.state.vehicleModel} onChange={props.handleOnChange} /> */}
            <div className="RightCon">
              {props.loading_listing_detail === true ? (
                <i class="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>
              ) : props.editVehicle === true ? (
                <select
                  name="vehicleTrim"
                  onChange={props.handleOnChange}
                  value={props.state.vehicleTrim}
                >
                  <option value={""}>{"Select Trim"}</option>
                  {(props.state.vehicleTrims || []).map((tri, triIndex) => (
                    <option value={tri.label} key={triIndex}>
                      {tri.label}
                    </option>
                  ))}
                  )
                </select>
              ) : (
                <h2>{props.state.vehicleTrim || ""} </h2>
              )}
            </div>
          </div>
        ) : null
        // props.state.showVehicleTrims === true ? (
        //     <div className="DealerID-List">
        //         <div className="LeftCon"><h1>Trims</h1></div>
        //         <div className="RightCon">{props.loading_listing_detail === true ? (<i class="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>) : props.editVehicle === true ? (<select name="vehicleTrim" onChange={props.handleOnChange} value={props.state.vehicleTrim} >
        //             <option value={''}>{'Select Trim'}</option>
        //             {(props.state.vehicleTrims || []).map((tri, triIndex) => (
        //                 <option value={tri.value} key={triIndex}>{tri.label}</option>
        //             ))})</select>
        //         ) : (props.state.vehicleTrims || []).filter(item => Number(item.value) === Number(props.state.vehicleTrim)) !== undefined && (props.state.vehicleTrims || []).filter(item => Number(item.value) === Number(props.state.vehicleTrim)) !== null && (props.state.vehicleTrims || []).filter(item => Number(item.value) === Number(props.state.vehicleTrim)).length > 0 ? <h2>{(props.state.vehicleTrims || []).filter(item => Number(item.value) === Number(props.state.vehicleTrim))[0].label || ''} </h2> : <h2></h2>}</div>
        //     </div>
        // ) : null
      }
      <div className="DealerID-List">
        <div className="LeftCon">
          <h1>KM</h1>
        </div>
        <div className="RightCon">
          {props.loading_listing_detail === true ? (
            <i class="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>
          ) : props.editVehicle === true ? (
            <NumberFormat
              required
              value={props.state.vehicleKilometer}
              id="vehicleKilometer"
              name="vehicleKilometer"
              onChange={props.handleOnChange}
              thousandSeparator={true}
            />
          ) : (
            <h2>
              {props.state.vehicleKilometer !== undefined &&
              props.state.vehicleKilometer !== null &&
              props.state.vehicleKilometer !== ""
                ? props.state.vehicleKilometer.toLocaleString("en-US")
                : (0).toLocaleString("en-US")}
            </h2>
          )}
        </div>
      </div>

      <div className="DealerID-List">
        <div className="LeftCon">
          <h1>VIN</h1>
        </div>
        <div className="RightCon">
          {props.loading_listing_detail === true ? (
            <i class="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>
          ) : props.editVehicle === true ? (
            <input
              type="text"
              name="vehicleVin"
              value={props.state.vehicleVin}
              onChange={props.handleOnChange}
            />
          ) : (
            <h2>{props.state.vehicleVin}</h2>
          )}
        </div>
      </div>

      <div className="DealerID-List">
        <div className="LeftCon">
          <h1>Price</h1>
        </div>
        <div className="RightCon">
          {props.loading_listing_detail === true ? (
            <i class="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>
          ) : props.editVehicle === true ? (
            <NumberFormat
              required
              value={props.state.vehiclePrice}
              id="vehiclePrice"
              name="vehiclePrice"
              onChange={props.handleOnChange}
              thousandSeparator={true}
            />
          ) : (
            <h2>
              {props.state.vehiclePrice !== null &&
              props.state.vehiclePrice !== ""
                ? new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(
                    Number(
                      props.state.vehiclePrice.toString().split(",").join("")
                    )
                  ) // '$100.00'
                : new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(0)}
            </h2>
          )}
        </div>
      </div>

      {props.state.showVehicleBodys === true ? (
        <div className="DealerID-List">
          <div className="LeftCon">
            <h1>Body type</h1>
          </div>
          {/* <input type='text' name='vehicleBodyType' value={props.state.vehicleBodyType} onChange={props.handleOnChange} /> */}
          <div className="RightCon">
            {props.loading_listing_detail === true ? (
              <i class="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>
            ) : props.editVehicle === true ? (
              <select
                name="vehicleBodyType"
                onChange={props.handleOnChange}
                value={props.state.vehicleBodyType}
              >
                <option value={""}>{"Select Body"}</option>
                {(props.state.vehicleBodys || []).map((body, bodyIndex) => (
                  <option value={body.value} key={bodyIndex}>
                    {body.label}
                  </option>
                ))}
                )
              </select>
            ) : (props.state.vehicleBodys || []).filter(
                (item) =>
                  Number(item.value) === Number(props.state.vehicleBodyType)
              ) !== undefined &&
              (props.state.vehicleBodys || []).filter(
                (item) =>
                  Number(item.value) === Number(props.state.vehicleBodyType)
              ) !== null &&
              (props.state.vehicleBodys || []).filter(
                (item) =>
                  Number(item.value) === Number(props.state.vehicleBodyType)
              ).length > 0 ? (
              <h2>
                {(props.state.vehicleBodys || []).filter(
                  (item) =>
                    Number(item.value) === Number(props.state.vehicleBodyType)
                )[0].label || ""}
              </h2>
            ) : (
              <h2></h2>
            )}
          </div>
        </div>
      ) : null}

      <div className="DealerID-List">
        <div className="LeftCon">
          <h1>Seating</h1>
        </div>
        <div className="RightCon">
          {props.loading_listing_detail === true ? (
            <i class="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>
          ) : props.editVehicle === true ? (
            <select
              name="vehicleSeating"
              onChange={props.handleOnChange}
              value={props.state.vehicleSeating}
            >
              <option value={""}>{"Select Seating"}</option>
              {seatings.map((seat, seatIndex) => (
                <option value={seat.value} key={seatIndex}>
                  {seat.label}
                </option>
              ))}
              )
            </select>
          ) : (
            <h2>{props.state.vehicleSeating}</h2>
          )}
        </div>
      </div>

      <div className="DealerID-List">
        <div className="LeftCon">
          <h1>Transmission</h1>
        </div>
        <div className="RightCon">
          {props.loading_listing_detail === true ? (
            <i class="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>
          ) : props.editVehicle === true ? (
            <select
              name="vehicleTransmission"
              onChange={props.handleOnChange}
              value={props.state.vehicleTransmission}
            >
              <option value={""}>{"Select Transmission"}</option>
              {transmissions.map((trans, transIndex) => (
                <option value={trans.name} key={transIndex}>
                  {trans.name}
                </option>
              ))}
              )
            </select>
          ) : (
            <h2>{props.state.vehicleTransmission}</h2>
          )}
        </div>
      </div>

      <div className="DealerID-List">
        <div className="LeftCon">
          <h1>Exterior Color</h1>
        </div>
        <div className="RightCon">
          {props.loading_listing_detail === true ? (
            <i class="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>
          ) : props.editVehicle === true ? (
            <select
              name="vehicleColor"
              onChange={props.handleOnChange}
              value={props.state.vehicleColor}
            >
              <option value={""}>{"Select Color"}</option>
              {colors.map((col, colIndex) => (
                <option value={col.name} key={colIndex}>
                  {col.name}
                </option>
              ))}
              )
            </select>
          ) : (
            <h2>{props.state.vehicleColor}</h2>
          )}
        </div>
      </div>

      {props.state.showVehicleFuels === true ? (
        <div className="DealerID-List">
          <div className="LeftCon">
            <h1>Fuel type</h1>
          </div>
          {/* <input type='text' name='vehicleFuelType' value={props.state.vehicleFuelType} onChange={props.handleOnChange} /> */}
          <div className="RightCon">
            {props.loading_listing_detail === true ? (
              <i class="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>
            ) : props.editVehicle === true ? (
              <select
                name="vehicleFuelType"
                onChange={props.handleOnChange}
                value={props.state.vehicleFuelType}
              >
                <option value={""}>{"Select Fuel Type"}</option>
                {(props.state.vehicleFuels || []).map((fuel, fuelIndex) => (
                  <option value={fuel.value} key={fuelIndex}>
                    {fuel.label}
                  </option>
                ))}
                )
              </select>
            ) : (props.state.vehicleFuels || []).filter(
                (item) =>
                  Number(item.value) === Number(props.state.vehicleFuelType)
              ) !== undefined &&
              (props.state.vehicleFuels || []).filter(
                (item) =>
                  Number(item.value) === Number(props.state.vehicleFuelType)
              ) !== null &&
              (props.state.vehicleFuels || []).filter(
                (item) =>
                  Number(item.value) === Number(props.state.vehicleFuelType)
              ).length > 0 ? (
              <h2>
                {(props.state.vehicleFuels || []).filter(
                  (item) =>
                    Number(item.value) === Number(props.state.vehicleFuelType)
                )[0].label || ""}
              </h2>
            ) : (
              <h2></h2>
            )}{" "}
          </div>
        </div>
      ) : null}

      {props.state.showVehicleDriveTrains === true ? (
        <div className="DealerID-List">
          <div className="LeftCon">
            <h1>Drive Train</h1>
          </div>
          {/* <input type='text' name='vehicleDriveTrain' value={props.state.vehicleDriveTrain} onChange={props.handleOnChange} /> */}
          <div className="RightCon">
            {props.loading_listing_detail === true ? (
              <i class="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>
            ) : props.editVehicle === true ? (
              <select
                name="vehicleDriveTrain"
                onChange={props.handleOnChange}
                value={props.state.vehicleDriveTrain}
              >
                <option value={""}>{"Select Drive Train"}</option>
                {(props.state.vehicleDriveTrains || []).map(
                  (drivTrain, driveIndex) => (
                    <option value={drivTrain.value} key={driveIndex}>
                      {drivTrain.label}
                    </option>
                  )
                )}
                )
              </select>
            ) : (props.state.vehicleDriveTrains || []).filter(
                (item) =>
                  Number(item.value) === Number(props.state.vehicleDriveTrain)
              ) !== undefined &&
              (props.state.vehicleDriveTrains || []).filter(
                (item) =>
                  Number(item.value) === Number(props.state.vehicleDriveTrain)
              ) !== null &&
              (props.state.vehicleDriveTrains || []).filter(
                (item) =>
                  Number(item.value) === Number(props.state.vehicleDriveTrain)
              ).length > 0 ? (
              <h2>
                {(props.state.vehicleDriveTrains || []).filter(
                  (item) =>
                    Number(item.value) === Number(props.state.vehicleDriveTrain)
                )[0].label || ""}{" "}
              </h2>
            ) : (
              <h2></h2>
            )}
          </div>
        </div>
      ) : null}

      <div className="DealerID-List">
        {/* cylinders<input type='text' name='vehicleCylinder' value={props.state.vehicleCylinder} onChange={props.handleOnChange} /> */}
        <div className="LeftCon">
          <h1>Cylinder</h1>
        </div>
        <div className="RightCon">
          {props.loading_listing_detail === true ? (
            <i class="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>
          ) : props.editVehicle === true ? (
            <select
              name="vehicleCylinder"
              onChange={props.handleOnChange}
              value={props.state.vehicleCylinder}
            >
              <option value={""}>{"Select Cylinder"}</option>
              {(cylinders || []).map((cycl, cyclIndex) => (
                <option value={cycl.value} key={cyclIndex}>
                  {cycl.value}
                </option>
              ))}
              )
            </select>
          ) : (
            <h2>{props.state.vehicleCylinder}</h2>
          )}
        </div>
      </div>

      <div className="DealerID-List">
        <div className="LeftCon">
          <h1>Owners</h1>
        </div>
        <div className="RightCon">
          {props.loading_listing_detail === true ? (
            <i class="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>
          ) : props.editVehicle === true ? (
            <select
              name="vehiclePreviousOwners"
              onChange={props.handleOnChange}
              value={props.state.vehiclePreviousOwners}
            >
              {owners.map((own, ownIndex) => (
                <option value={own.value} key={ownIndex}>
                  {own.name}
                </option>
              ))}
              )
            </select>
          ) : owners.filter(
              (item) =>
                Number(item.value) === Number(props.state.vehiclePreviousOwners)
            ) !== undefined &&
            owners.filter(
              (item) =>
                Number(item.value) === Number(props.state.vehiclePreviousOwners)
            ) !== null &&
            owners.filter(
              (item) =>
                Number(item.value) === Number(props.state.vehiclePreviousOwners)
            ).length > 0 ? (
            <h2>
              {owners.filter(
                (item) =>
                  Number(item.value) ===
                  Number(props.state.vehiclePreviousOwners)
              )[0].name || ""}
            </h2>
          ) : (
            <h2></h2>
          )}
        </div>
        {/* owners.filter(item => Number(item.value) === Number(props.state.vehiclePreviousOwners))[0].name || */}
      </div>

      <div className="DealerID-List">
        <div className="LeftCon">
          <h1>Accidents:</h1>
        </div>
        <div className="RightCon">
          {props.loading_listing_detail === true ? (
            <i class="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>
          ) : props.editVehicle === true ? (
            <select
              name="vehiclePreviousAccidents"
              onChange={props.handleOnChange}
              value={props.state.vehiclePreviousAccidents}
            >
              {accidents.map((acd, acdIndex) => (
                <option value={acd.value} key={acdIndex}>
                  {acd.name}
                </option>
              ))}
              )
            </select>
          ) : accidents.filter(
              (item) =>
                Number(item.value) ===
                Number(props.state.vehiclePreviousAccidents)
            ) !== undefined &&
            accidents.filter(
              (item) =>
                Number(item.value) ===
                Number(props.state.vehiclePreviousAccidents)
            ) !== null &&
            accidents.filter(
              (item) =>
                Number(item.value) ===
                Number(props.state.vehiclePreviousAccidents)
            ).length > 0 ? (
            <h2>
              {accidents.filter(
                (item) =>
                  Number(item.value) ===
                  Number(props.state.vehiclePreviousAccidents)
              )[0].name || ""}
            </h2>
          ) : (
            <h2></h2>
          )}
        </div>
      </div>
      <div className="Account-EditBtn">
        {props.editVehicle === true ? (
          <button
            type="button"
            className="newbtn-add"
            disabled={!props.editVehicle}
            onClick={updateVehicleDetail}
          >
            {" "}
            {props.loading_update_listing_detail === true ? (
              <i class="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>
            ) : (
              "Update"
            )}{" "}
          </button>
        ) : null}
      </div>
    </React.Fragment>
  );
};
export default ActiveListingReviewVehicleDetail; // user_type:2
// listing_type:1
// has_bumpup:0
// sub_type_id:
// make:921
// other_make:
// model:1851
// other_model:
// kilometer:5000
// vin:12345vin
// hin:
// serial_number:
// price:10000
// body_type:1
// seating:2
// transmission:Automatic
// color:Green
// fuel_type:1
// drive_train:1
// cylinder:3
// previous_owners:1
// previous_accidents:0
// features:[{"id":1,"v_features":"Leather seats"},{"id":2,"v_features":"Navigation System"},{"id":3,"v_features":"Bluetooth"},{"id":4,"v_features":"Push Start"}]
// trim:
// longitude:-79.7624177
// latitude:43.7315479
// location:Brampton, ON, Canada
// description:
// steering_type:
// passengers:
// hours:
