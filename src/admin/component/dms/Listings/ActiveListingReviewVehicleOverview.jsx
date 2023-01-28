/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import NumberFormat from "react-number-format";
import { conditions, years } from "../listingConstants";
const ActiveListingReviewVehicleOverview = (props) => {
  useEffect(() => {
    if (
      props.loading_update_listing_vehicle_overview !== undefined &&
      props.loading_update_listing_vehicle_overview !== null &&
      props.loading_update_listing_vehicle_overview === false
    ) {
      props.setEditVehicleOverivew(false);
    }
  }, [props.loading_update_listing_vehicle_overview]);
  const updateVehicleOverview = () => {
    const data = {
      update: "ad",
      user_id: props.state.userId,
      id: props.state.listingId,
      v_condition: props.state.vehicleCondition,
      year: props.state.vehicleYear,
      make: props.state.vehicleMake,
      model: props.state.vehicleModel,
      kilometer:
        props.state.vehicleKilometer == ""
          ? 0
          : props.state.vehicleKilometer !== undefined &&
            props.state.vehicleKilometer !== null &&
            props.state.vehicleKilometer !== ""
          ? props.state.vehicleKilometer.toString().split(",").join("")
          : 0,
    };
    if (
      props.state.userId !== undefined &&
      props.state.userId !== null &&
      props.state.userId !== ""
    ) {
      console.log("data", data);
      props.update_listing_vehicle_overview(data);
    }
  };
  return (
    <React.Fragment>
      <div className="DealerID-List">
        <div className="LeftCon">
          <h1>Condition</h1>
        </div>
        <div className="RightCon">
          <h2>
            <span>
              {props.loading_listing_detail === true ? (
                <i class="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>
              ) : props.editVehicleOverivew === true ? (
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
                props.state.vehicleCondition
              )}
            </span>
          </h2>
        </div>
      </div>

      <div className="DealerID-List">
        <div className="LeftCon">
          <h1>Year</h1>
        </div>
        <div className="RightCon">
          <h2>
            {props.loading_listing_detail === true ? (
              <i class="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>
            ) : props.editVehicleOverivew === true ? (
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
              props.state.vehicleYear
            )}
          </h2>
        </div>
      </div>
      {props.state.showVehicleMakes === true ? (
        <div className="DealerID-List">
          <div className="LeftCon">
            <h1>Make</h1>
          </div>
          <div className="RightCon">
            {props.loading_listing_detail === true ? (
              <i class="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>
            ) : props.editVehicleOverivew === true ? (
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
          {/* <div className="RightCon"><h2>{props.loading_listing_detail === true ? (<i class="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>) : props.editVehicleOverivew === true ? (<input type='text' name='vehicleMake' value={props.state.vehicleMake} onChange={props.handleOnChange} />) : props.state.vehicleMake}</h2></div> */}
        </div>
      ) : null}
      {props.state.showVehicleModels === true ? (
        <div className="DealerID-List">
          <div className="LeftCon">
            <h1>Model</h1>
          </div>
          <div className="RightCon">
            {props.loading_listing_detail === true ? (
              <i class="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>
            ) : props.editVehicleOverivew === true ? (
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
          {/* <div className="RightCon"><h2>{props.loading_listing_detail === true ? (<i class="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>) : props.editVehicleOverivew === true ? (<input type='text' name='vehicleModel' value={props.state.vehicleModel} onChange={props.handleOnChange} />) : props.state.vehicleModel}</h2></div> */}
        </div>
      ) : null}
      {/* <div className="DealerID-List">
                <div className="LeftCon"><h1>Make</h1></div>
                <div className="RightCon"><h2>{props.loading_listing_detail === true ? (<i class="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>) : props.editVehicleOverivew === true ? (<input type='text' name='vehicleMake' value={props.state.vehicleMake} onChange={props.handleOnChange} />) : props.state.vehicleMake}</h2></div>
            </div>

            <div className="DealerID-List">
                <div className="LeftCon"><h1>Model</h1></div>
                <div className="RightCon"><h2>{props.loading_listing_detail === true ? (<i class="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>) : props.editVehicleOverivew === true ? (<input type='text' name='vehicleModel' value={props.state.vehicleModel} onChange={props.handleOnChange} />) : props.state.vehicleModel}</h2></div>
            </div> */}

      <div className="DealerID-List">
        <div className="LeftCon">
          <h1>KM</h1>
        </div>
        <div className="RightCon">
          <h2>
            {props.loading_listing_detail === true ? (
              <i class="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>
            ) : props.editVehicleOverivew === true ? (
              <NumberFormat
                required
                value={props.state.vehicleKilometer}
                id="vehicleKilometer"
                name="vehicleKilometer"
                onChange={props.handleOnChange}
                thousandSeparator={true}
              />
            ) : props.state.vehicleKilometer !== null &&
              props.state.vehicleKilometer !== "" ? (
              props.state.vehicleKilometer.toLocaleString("en-US")
            ) : (
              (0).toLocaleString("en-US")
            )}
          </h2>
        </div>
      </div>
      <div className="Account-EditBtn">
        {props.editVehicleOverivew === true ? (
          <button
            type="button"
            className="newbtn-add"
            disabled={!props.editVehicleOverivew}
            onClick={updateVehicleOverview}
          >
            {" "}
            {props.loading_update_listing_vehicle_overview === true ? (
              <i class="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>
            ) : null}{" "}
            Update
          </button>
        ) : null}
      </div>
    </React.Fragment>
  );
};
export default ActiveListingReviewVehicleOverview;
