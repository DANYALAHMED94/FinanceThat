/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { update_dealership_vehicle_location } from "../../../../actions/admin/accountActions"
import { useDispatch, useSelector } from "react-redux";

const DmsDatatable = (props) => {
  const dispatch = useDispatch();
  const { dealer_id, vehicle_preferences, vehicle_location_status, vehicle_subtype_preferences } = useSelector(({ adminReducer }) => {
        return {
          dealer_id: adminReducer.adminAccounts.pendingAccountReducer.dealer_id,
          vehicle_preferences: adminReducer.adminAccounts.pendingAccountReducer.vehicle_preferences,
          vehicle_location_status: adminReducer.adminAccounts.pendingAccountReducer.vehicle_location_status,
          vehicle_subtype_preferences: adminReducer.adminAccounts.pendingAccountReducer.vehicle_subtype_preferences,

        }
      })
  const [vehicles, setVehicles] = useState([{ title: "Automotive", name: "automotive", value: false, subTypes:[{title: "Truck", name: "truck", value: false, },{title: "SUV", name: "suv", value: false },{title: "Van", name: "van", value: false },{title: "Cars", name: "cars", value: false }] },
  { title: "Powersport", name: "powersport", value: false, subTypes:[{title: "Snowmobile", name: "snowmobile", value: false, },{title: "ATV/UTV", name: "atv/utv", value: false, },{title: "Motorcycle", name: "motorcycle", value: false, },{title: "Dirt Bike", name: "dirt_bike", value: false, },{title: "E-Scooter", name: "e-scooter", value: false}] },
  { title: "Marine", name: "marine", value: false, subTypes:[{title: "Personal Watercarft", name: "personal_watercarft", value: false, },{title: "Boat", name: "boat", value: false }] },
  { title: "RV", name: "rv", value: false, subTypes:[{title: "Motor Home", name: "motor_home", value: false, },{title: "Travel Trailer", name: "travel_trailer", value: false }] },
  { title: "Trailer", name: "trailer", value: false, subTypes:[] },
  { title: "Lawn Tractor", name: "lawn_tractor", value: false, subTypes:[] },{ title: "Construction", name: "construction", value: false, subTypes:[{title: "Skid Steer", name: "skid_steer", value: false, },{title: "Backhoe", name: "backhoe", value: false },{title: "Mini Excavator", name: "mini_excavator", value: false },{title: "Loader", name: "loader", value: false },{title: "Farm Tractor", name: "farm_tractor", value: false },{title: "Small Construction", name: "small_construction", value: false }] }])
  const [selectedVehicle, setSelectedVehicle] = useState('')
  const [selectedSubVehicle, setSelectedSubVehicle] = useState("")

  const updateVehicle = (name) => {
    setSelectedVehicle(name)
    setVehicles(vehicles.map(ite => {
      if (ite.name === name) {
        return {
          ...ite,
          value: !ite.value
        }
      }
      return ite
    }))
    let vehicleObject = {}
    vehicles.map(ite => {
      if (ite.name === name) {
        return {
          ...ite,
          value: !ite.value
        }
      }
      return ite
    }).map(item => {
      vehicleObject = {
        ...vehicleObject,
        [item.name]: item.value,
      }
    })
    const data = {
      vehicle_preferences: vehicleObject,
      dealer_id: dealer_id,
      type:"vehicle"
    }
    dispatch(update_dealership_vehicle_location(data))

  }

  const updateSubVehicle = (vehicleName, subVehicleName) => {
    setSelectedSubVehicle(vehicleName)
    setVehicles(vehicles.map(item => {
      if (item.name === vehicleName) {
        return {
          ...item,
          subTypes: item.subTypes.map(ite=> {
            if(ite.name === subVehicleName){
              return {
                ...ite,
                value:!ite.value
              }
            }
            return ite

          })
        }
      }
      return item
    }))
    let subVehicleObject = {}
    vehicles.map(item => {
      if (item.name === vehicleName) {
        return {
          ...item,
          subTypes: item.subTypes.map(ite=> {
            if(ite.name === subVehicleName){
              return {
                ...ite,
                value:!ite.value
              }
            }
            return ite

          })
        }
      }
      return item
    }).map(item => {
      item.subTypes.map(ite=> {
        subVehicleObject = {
          ...subVehicleObject,
          [ite.name]: ite.value,
        }
      })
    })
    const data = {
      vehicle_subtype_preferences: subVehicleObject,
      dealer_id: dealer_id,
      type:"subvehicle"
    }
    dispatch(update_dealership_vehicle_location(data))

  }


  useEffect(() => {
    if (vehicle_preferences && Object.keys(vehicle_preferences).length > 0) {
      setVehicles(vehicles.slice().map(item => {
        if (Object.keys(vehicle_preferences).includes(item.name)) {
          return {
            ...item,
            value: vehicle_preferences[item.name],
            subTypes:item.subTypes.map(ite => {
              if (Object.keys(vehicle_subtype_preferences).includes(ite.name)) {
                return {
                  ...ite,
                  value: vehicle_subtype_preferences[ite.name],
                }
              }
              return ite
              })
          }
        }
        return item
      }))
    }

  }, [vehicle_preferences])

  // useEffect(() => {
  //   setVehicles(vehicles.map(ite => {
  //     if (ite.name === selectedVehicle) {
  //       return {
  //         ...ite,
  //         value: !ite.value
  //       }
  //     }
  //     return ite
  //   }))
  // }, [vehicle_location_status])
  console.log(vehicles, "vehiclesvehicles")
  return (
    <React.Fragment>
      <div className="Altable-Container">
        <div className="Dealer-dtable vehical">
          <div className="col-12">
          <div className="row lh-lg my-4">
          <h5>Vehicle preferences</h5>
          <p>Select the type of vehicles you want to receive applications for.</p>
          </div>
            <hr></hr>
          </div>
          {/* {(vehicles || []).map((item, index) => (

            <div className="col-md-10" key={index}>
              <div className="row my-3">
                <div className="col-2">
                  <label class="label"> {item.title} </label>
                </div>
                <div className="col-md-2">
                  <div class="switch-holder">
                    <input
                      id={item.name}
                      type="checkbox"
                      name={item.name}
                      checked={item.value}
                      onChange={() => updateVehicle(item.name)}
                    />
                    <label for={item.name} class="switch">
                      <div></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            )
          )} */}
          <div className="lllll">  {(vehicles || []).map((item, index) => (
<div style={{height:"400px"}} className={item.value === true || item.subTypes.filter(ite=> ite.value === true).length > 0 ? "v_cards update_vel_colr" : "v_cards gray_clr"} key={index}>
              <div className="sel_v">
                <div className="">
                  <label class="label"> {item.title} </label>
                </div>
                <div className="">
                  <div class="switch-holder">
                    <input
                      id={item.name}
                      type="checkbox"
                      name={item.name}
                      checked={item.value}
                      onChange={() => updateVehicle(item.name)}
                    />
                    <label for="" class="switch">
                      <div></div>
                    </label>
                  </div>
                </div>
              </div>
              {(item.subTypes || []).map((itemSub, subIndex)=> (
                 <div className="sel_sb_type">
                 <div className="kikk">
                   <label class="label">{itemSub.title}</label>
                 </div>
                 <div className="">
                   <div class="switch-holder">
                     <input
                      id={itemSub.name}
                      type="checkbox"
                      name={itemSub.name}
                      checked={itemSub.value}
                      onChange={() => updateSubVehicle(item.name, itemSub.name)}
                     />
                     <label for="" class="switch">
                       <div></div>
                     </label>
                   </div>
                 </div>
               </div>
              ))}
            </div>


          ))}</div>

        </div>
      </div>
    </React.Fragment>
  );
};
export default DmsDatatable;

// eslint-disable react-hooks/exhaustive-deps
// import React, { useState, useEffect } from "react";
// import { update_dealership_vehicle_location } from "../../../../actions/admin/accountActions"
// import { useDispatch, useSelector } from "react-redux";

// const DmsDatatable = (props) => {
//   const dispatch = useDispatch();
//   const { dealer_id, vehicle_preferences, vehicle_location_status } = useSelector(({ adminReducer }) => {
//     return {
//       dealer_id: adminReducer.adminAccounts.pendingAccountReducer.dealer_id,
//       vehicle_preferences: adminReducer.adminAccounts.pendingAccountReducer.vehicle_preferences,
//       vehicle_location_status: adminReducer.adminAccounts.pendingAccountReducer.vehicle_location_status,
//     }
//   })
//   const [vehicles, setVehicles] = useState([
//     { title: "Automotive", name: "automotive", value: false },
//     { title: "Powersport", name: "powersport", value: false },
//     { title: "Marine", name: "marine", value: false },
//     { title: "RV", name: "rv", value: false },
//     { title: "trailer", name: "trailer", value: false },
//     { title: "Lawn Tractor", name: "lawn_tractor", value: false },{ title: "Construction", name: "construction", value: false }])
//   const [selectedVehicle, setSelectedVehicle] = useState('')
//   const updateVehicle = (name) => {
//     props.goToNext(true)
//     setSelectedVehicle(name)
//     setVehicles(vehicles.map(ite => {
//       if (ite.name === name) {
//         return {
//           ...ite,
//           value: !ite.value
//         }
//       }
//       return ite
//     }))
//     let vehicleObject = {}
//     vehicles.map(ite => {
//       if (ite.name === name) {
//         return {
//           ...ite,
//           value: !ite.value
//         }
//       }
//       return ite
//     }).map(item => {
//       vehicleObject = {
//         ...vehicleObject,
//         [item.name]: item.value
//       }
//     })
//     const data = {
//       vehicle_preferences: vehicleObject,
//       dealer_id: dealer_id,
//       type:'vehicle'
//     }
//     dispatch(update_dealership_vehicle_location(data))

//   }

//   useEffect(() => {
//     console.log(vehicle_preferences, "vehicle_preferences")
//     if (vehicle_preferences && Object.keys(vehicle_preferences).length > 0) {
//       console.log(vehicle_preferences, "vehicle_preferences sas")
//       console.log((vehicles || []).map(item => {
//         if (Object.keys(vehicle_preferences).includes(item.name)) {
//           return {
//             ...item,
//             value: vehicle_preferences[item.name]
//           }
//         }
//         return item
//       }))
//       setVehicles((vehicles || []).map(item => {
//         if (Object.keys(vehicle_preferences).includes(item.name)) {
//           return {
//             ...item,
//             value: vehicle_preferences[item.name]
//           }
//         }
//         return item
//       }))
//     }
//   }, [vehicle_preferences])

//   useEffect(() => {
//       if(vehicle_location_status){
//         setVehicles((vehicles || []).map(ite => {
//           console.log(ite.name === selectedVehicle, selectedVehicle, "selectedVehicle")
//           if (ite.name === selectedVehicle) {
//             return {
//               ...ite,
//               value: !ite.value
//             }
//           }
//           return ite
//         }))
//       }

//   }, [vehicle_location_status])

// console.log(vehicles, "vehicles")
//   return (
//     <React.Fragment>
//       <div className="Altable-Container">
//         <div className="Dealer-dtable vehical">
//           <div className="col-12">
//             <div className="row lh-lg my-4">
//               <h5>Vehicle preferences</h5>
//               <p>Select the type of vehicles you want to receive applications for.</p>
//             </div>
//             <hr></hr>
//           </div>
//           {(vehicles || []).map((item, index) => (
//             <div className="col-md-10" key={index}>
//               <div className="row my-3">
//                 <div className="col-2">
//                   <label class="label"> {item.title} </label>
//                 </div>
//                 <div className="col-md-2">
//                   <div class="switch-holder">
//                     <input
//                       id={item.name}
//                       type="checkbox"
//                       name={item.name}
//                       checked={item.value}
//                       onChange={() => updateVehicle(item.name)}
//                     />
//                     <label for={item.name} class="switch">
//                       <div></div>
//                     </label>
//                   </div>
//                 </div>
//               </div>
//             </div>)
//           )}
//         </div>
//       </div>
//     </React.Fragment>
//   );
// };
// export default DmsDatatable;
