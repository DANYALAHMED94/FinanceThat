import React from "react";
import { vehicalSubTypes } from "../constant";
export default function SubTypeOfVehical({
  formState,
  setFormState,
  onContinue,
}) {
  console.log(formState.vehicle_type, "formState.vehicle_type")
  // main return

  return (

    <div className="formWrapper">
      <h1>
        What type of{" "}
        {formState.vehicle_type === "RV" ? (
          "RV"
        ) : (
          <span style={{ textTransform: "lowercase" }}>
            {formState.vehicle_type}
          </span>
        )}{" "}
        do you want?
      </h1>
      <div className="optionFlex">
        {vehicalSubTypes
          .find((el) => el.name === formState.vehicle_type)
          .options.map((item) => {
            return (
              <div
                className={
                  formState.sub_vehicle_type === item.name
                  ? `item active ${item.name === "E-Scooter" ? "margin-class" : ""}`
                  : `item ${item.name === "E-Scooter" ? "margin-class" : ""}`
                }
                onClick={() => {
                  setFormState((prev) => {
                    return { ...prev, sub_vehicle_type: item.name, vehicle: [{...prev.vehicle[0], sub_type_of_vehicle:item.id, sub_type_of_vehicle_name: item.name}]  };
                  })
                  onContinue()
                }
                }
              >
                <img
                  src={item.img}
                  style={{ marginRight: item?.margin, height:item?.height }}
                  alt="icon"
                />
                <span>{item.name}</span>
              </div>
            );
          })}
      </div>
      <button
        onClick={() => {
          if (formState.sub_vehicle_type) {
            onContinue()
          }
        }}
        className="primaryButton continueBtn"
      >
        <span></span> <span>Continue</span>
        <img src="/assets/image/arrow_circle_right_outline.svg" alt="icon" />
      </button>
      <p>
        This narrows down type of{" "}
        {formState.vehicle_type === "RV" ? (
          "RV"
        ) : (
          <span style={{ textTransform: "lowercase" }}>
            {formState.vehicle_type}
          </span>
        )}{" "}
        your interested in.
      </p>
    </div>
  );
}
