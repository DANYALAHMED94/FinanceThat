import React, { useState, useEffect } from 'react'

const VehiclePerference = (props) => {
    const [vehicles, setVehicles] = useState([{ title: "Automotive", name: "automotive", value: false, subTypes:[{title: "Truck", name: "truck", value: false, },{title: "SUV", name: "suv", value: false },{title: "Van", name: "van", value: false },{title: "Cars", name: "cars", value: false }] },
    { title: "Powersport", name: "powersport", value: false, subTypes:[{title: "Snowmobile", name: "snowmobile", value: false, },{title: "ATV/UTV", name: "atv/utv", value: false, },{title: "Motorcycle", name: "motorcycle", value: false, },{title: "Dirt Bike", name: "dirt_bike", value: false, },{title: "E-Scooter", name: "e-scooter", value: false}] },
    { title: "Marine", name: "marine", value: false, subTypes:[{title: "Personal Watercarft", name: "personal_watercarft", value: false, },{title: "Boat", name: "boat", value: false }] },
    { title: "RV", name: "rv", value: false, subTypes:[{title: "Motor Home", name: "motor_home", value: false, },{title: "Travel Trailer", name: "travel_trailer", value: false }] },
    { title: "Trailer", name: "trailer", value: false, subTypes:[] },
    { title: "Lawn Tractor", name: "lawn_tractor", value: false, subTypes:[] },{ title: "Construction", name: "construction", value: false, subTypes:[{title: "Skid Steer", name: "skid_steer", value: false, },{title: "Backhoe", name: "backhoe", value: false },{title: "Mini Excavator", name: "mini_excavator", value: false },{title: "Loader", name: "loader", value: false },{title: "Farm Tractor", name: "farm_tractor", value: false },{title: "Small Construction", name: "small_construction", value: false }] }])

    useEffect(() => {
      if (props.selectedVehicle && Object.keys(props.selectedVehicle).length > 0) {
        setVehicles(vehicles.slice().map(item => {
          if (Object.keys(props.selectedVehicle).includes(item.name)) {
            return {
              ...item,
              value: props.selectedVehicle[item.name],
              subTypes:item.subTypes.map(ite => {
                if (Object.keys(props.vehicle_subtype_preferences).includes(ite.name)) {
                  return {
                    ...ite,
                    value: props.vehicle_subtype_preferences[ite.name],
                  }
                }
                return ite
                })
            }
          }
          return item
        }))
      }

    }, [props.selectedVehicle])

    const updateVehicle = (name) => {
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
            [item.name]: item.value
          }
        })
        props.changeMultiSelecPerfernec("selectedVehicle",vehicleObject)
      }
      const updateSubVehicle = (vehicleName, subVehicleName) => {
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
        props.changeMultiSelecPerfernec("vehicle_subtype_preferences",subVehicleObject)

      }
    return (
        <div className="Altable-Container">
        <div className="Dealer-dtable vehical dealer__div">
          <div className="col-12 border__less pl-0">
          <div className="row lh-lg my-4 w-100">
          <h5 className='veh__title'>Vehicle preferences</h5>
          <p className='veh__content3'>Select the type of vehicles you want to receive applications for.</p>
          </div>
            <hr className='d__play'></hr>
          </div>
          <div className='border___box border_width'>
          {/* {(vehicles || []).map((item, index) => (

            <div className="col-md-10 " key={index}>
              <div className="row my-3">
                <div className="col-4 swich__title important_c">
                  <label class="label dealer__titlee"> {item.title} </label>
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
            </div>)
          )} */}
           <div className="lllll">  {(vehicles || []).map((item, index) => (
<div style={{height:"400px"}} className={item.value === true || item.subTypes.filter(ite=> ite.value === true).length > 0 ? "v_cards update_vel_colr v_width" : "v_cards v_width gray_clr"} key={index}>
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
                 <div className="sel_sb_type" key={subIndex}>
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

             {props.vehiclePerferenceError === true ? (
                                      <div
                                        className="srv-validation-message"
                                        style={{ color: "red" }}
                                      >
                                        Select Atleast One Vehicle
                                      </div>
                                    ) : (
                                      ""
                                    )}
          </div>
        </div>
      </div>
    )
}
export default VehiclePerference