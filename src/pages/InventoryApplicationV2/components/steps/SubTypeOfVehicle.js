import React, {useEffect} from "react";
import { vehicalSubTypes, vehicalTypesData } from "../constant";
import { get_vehicle_type } from "../../../../actions/addPostActions";
import { useSelector, useDispatch } from "react-redux";

export default function SubTypeOfVehical({
  formState,
  setFormState,
  onContinue,
}) {
  console.log(formState.interested_vehicle_type, "formState.interested_vehicle_type")
  // main return
  const dispatch = useDispatch()
  useEffect(()=> {
    dispatch(get_vehicle_type())

  },[])

  const {type_of_vehicle} = useSelector(({adPostReducers})=> {
    return {
      type_of_vehicle:adPostReducers.addPostReducer.type_of_vehicle
    }
  })
  // const newVehicalSubTypes = vehicalSubTypes.map(item=> {
  //   return {
  //     ...item,
  //     type_id:(type_of_vehicle || []).filter(ite=> ite?.name?.toLowerCase() === item?.name?.toLowerCase())?.[0]?.id || "",
  //     options:item.options.map(opt=>{
  //       return {
  //         ...opt,
  //         ...(((type_of_vehicle || []).filter(ite=> ite?.name?.toLowerCase() === item?.name?.toLowerCase())?.[0]?.typeofvehicle_id || [])?.filter(subVehicle=> subVehicle?.name?.toLowerCase() === opt?.name?.toLowerCase())?.[0] || {})
  //       }
  //     })
  //   }
  // })
  return (
    <div className="formWrapper">
      <h1>
        What type of{" "}
        {formState.interested_vehicle_type === "RV" ? (
          "RV"
        ) : (
          <span style={{ textTransform: "lowercase" }}>
            {formState.interested_vehicle_type}
          </span>
        )}{" "}
        do you want?
      </h1>
      <div className="optionFlex">
        {(vehicalSubTypes
          .find((el) => el.name === formState.interested_vehicle_type) || [])
          .options.map((item) => {
            return (
              <div
                className={
                  formState.sub_vehicle_type === item.name
                    ? "item active"
                    : "item"
                }
                onClick={() => {
                  setFormState((prev) => {
                    
                    return { ...prev, sub_vehicle_type: item.name,vehicle: [{...prev.vehicle[0], sub_type_of_vehicle:item.id, sub_type_of_vehicle_name: item.name}] };
                  })
                  onContinue()
                }
                }
              >
                <img
                  src={item.img}
                  style={{ marginRight: item?.margin }}
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
        {formState.interested_vehicle_type === "RV" ? (
          "RV"
        ) : (
          <span style={{ textTransform: "lowercase" }}>
            {formState.interested_vehicle_type}
          </span>
        )}{" "}
        your interested in.
      </p>
    </div>
  );
}
