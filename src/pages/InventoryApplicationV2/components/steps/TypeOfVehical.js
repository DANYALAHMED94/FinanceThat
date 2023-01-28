import React, {useEffect} from "react";
import { vehicalTypesData } from "../constant";
import { get_vehicle_type } from "../../../../actions/addPostActions";
import { useSelector, useDispatch } from "react-redux";

export default function TypeOfVehical({ formState, setFormState, onContinue }) {
  const dispatch = useDispatch()
  useEffect(()=> {
    dispatch(get_vehicle_type())

  },[])

  
  const {type_of_vehicle} = useSelector(({adPostReducers})=> {
    return {
      type_of_vehicle:adPostReducers.addPostReducer.type_of_vehicle
    }
  })
  
  // const newVehicalTypesData = vehicalTypesData.map(item=> {
  //   return {
  //     ...item,
  //     id:(type_of_vehicle || []).filter(ite=> ite?.name?.toLowerCase() === item?.name?.toLowerCase())?.[0]?.id || ""
  //   }
  // })
  // console.log(newVehicalTypesData, "newVehicalTypesData")
  const onSetVehicalType = (name, id) => {
    setFormState((prev) => {
      
      return { ...prev, interested_vehicle_type: name, vehicle_type: name,vehicle: [{...prev.vehicle[0], type_of_vehicle:id, type_of_vehicle_name:name}]  };
    });
    if (["Lawn Tractor", "Trailer"].includes(name)) {
      onContinue(3)
      return;
    }
    switch (name) {
      case "Automotive":
        setFormState((prev) => {
          return { ...prev, sub_vehicle_type: "",vehicle: [{...prev.vehicle[0], sub_type_of_vehicle:""}] };
        });
        break;
      case "Powersport":
        setFormState((prev) => {
          return { ...prev, sub_vehicle_type: "",vehicle: [{...prev.vehicle[0], sub_type_of_vehicle:""}] };
        });
        break;
      case "Marine":
        setFormState((prev) => {
          return { ...prev, sub_vehicle_type: "",vehicle: [{...prev.vehicle[0], sub_type_of_vehicle:""}] };
        });
        break;

      default:
        break;
    }
    ["Lawn Tractor", "Trailer"].includes(formState.interested_vehicle_type)
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
                formState.interested_vehicle_type === item.name ? "item active" : "item"
              }
              onClick={() => onSetVehicalType(item.name, item.id)}
            >
              <img
                src={item.img}
                alt="icon"
                className={
                  ["Lawn Tractor", "Automotive"].includes(item.name)
                    ? "vehicle"
                    : ""
                }
              />
              <span>{item.name}</span>
            </div>
          );
        })}
      </div>
      <button
        onClick={() => {
          if (formState.interested_vehicle_type) {
            ["Lawn Tractor", "Trailer"].includes(formState.interested_vehicle_type)
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
