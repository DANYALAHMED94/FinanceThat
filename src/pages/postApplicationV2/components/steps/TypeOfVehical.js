import React  from "react";
import { vehicalTypesData } from "../constant";

export default function TypeOfVehical({ formState, setFormState, onContinue }) {

  const onSetVehicalType = (name, id) => {
    setFormState((prev) => {
      return { ...prev, vehicle_type: name, interested_vehicle_type:name ,vehicle: [{...prev.vehicle[0], type_of_vehicle:id, type_of_vehicle_name:name}] };
    });
    if (["Lawn Tractor", "Trailer"].includes(name)) {
      onContinue(3)
      return;
    }
    switch (name) {
      case "Automotive":
        setFormState((prev) => {
          return { ...prev, sub_vehicle_type: "" };
        });
        break;
      case "Powersport":
        setFormState((prev) => {
          return { ...prev, sub_vehicle_type: "" };
        });
        break;
      case "Marine":
        setFormState((prev) => {
          return { ...prev, sub_vehicle_type: "" };
        });
        break;
        case "Construction":
          setFormState((prev) => {
            return { ...prev, sub_vehicle_type: "" };
          });
          break;
      default:
        break;
    }
    ["Lawn Tractor", "Trailer"].includes(name)
    ? onContinue(3)
    : onContinue()
  };
  // main return
  return (
    <div className="formWrapper">
      <h1>What type of vehicle do you want? </h1>
      <div className="optionFlex">
        {vehicalTypesData.map((item) => {
          return (
            <div
              className={
                formState.interested_vehicle_type === item.name ? `item active`
                : `item `
              }
              onClick={() => onSetVehicalType(item.name, item.id)}
            >
              <div className="img__wrapper">
              <img
                src={item.img}
                alt="icon"
                className={
                  ["Lawn Tractor", "Automotive"].includes(item.name)
                    ? "vehicle"
                    : ""
                }
              /></div>
              <span>{item.name}</span>
            </div>
          );
        })}
      </div>
      <button
        onClick={() => {
          if (formState.vehicle_type) {
            ["Lawn Tractor", "Trailer"].includes(formState.vehicle_type)
              ? onContinue(3)
              : onContinue()
          }
        }
        }
        className="primaryButton continueBtn"
      >
        <span></span> <span>Continue</span>
        <img src="/assets/image/arrow_circle_right_outline.svg" alt="icon" />
      </button>
      <p>
        By clicking on the Button, I confirm my agreement to the General Terms
        of Service and Privacy Policy to Finance That.
      </p>
    </div>
  );
}
