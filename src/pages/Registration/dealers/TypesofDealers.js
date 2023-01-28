/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState ,useEffect} from 'react'
const TypesofDealers = (props) => {
    const [vehicles, setVehicles] = useState([{ title: "Automotive", name: "automotive", value: false },
    { title: "Equipment Rental", name: "equipment_rental", value: false },
    { title: "Powersports", name: "powersports", value: false },
    { title: "Heavy Equipment", name: "heavy_equipment", value: false },
    { title: "Marine", name: "marine", value: false },
    { title: "Small Equipment", name: "small_equipment", value: false },
    { title: "RV", name: "rv", value: false },
    { title: "E-Bike", name: "e_bike", value: false },
    { title: "Trailer", name: "trailer", value: false }])


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
        // localStorage.setItem("dealer_types_vehicle", JSON.stringify(vehicles.map(ite => {
        //   if (ite.name === name) {
        //     return {
        //       ...ite,
        //       value: !ite.value
        //     }
        //   }
        //   return ite
        // })))
        // localStorage.setItem("selected_dealer_type_vehicle", JSON.stringify(vehicleObject))
        props.changeDealerTypeVehicle("dealer_type_vehicle",vehicleObject)
      }

      useEffect(() => {
        if (props.dealer_type_vehicle && Object.keys(props.dealer_type_vehicle).length > 0) {
          setVehicles(vehicles.slice().map(item => {
            if (Object.keys(props.dealer_type_vehicle).includes(item.name)) {
              return {
                ...item,
                value: props.dealer_type_vehicle[item.name]
              }
            }
            return item
          }))
        }

      }, [props.dealer_type_vehicle])

    return (
        <>  <div className="Addpost-responsiveimg bannerhide-mobile">
        <img className="w-100" src="/assets/image/dealer-img-1.png" alt="" />
    </div>

    <div className="container-fluid vehical">
        <div className="row">

            <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                <div className="row">
                    <div className="col-xl-7 col-lg-7 col-md-12 col-sm-12 col-12">
                        <div className="RegisterAccount-Container">

                            <div className="Select-TopHead pl-0">
                                <h3>Dealership Type</h3>
                                <p>Please select the type of dealership.you can select more then one option.
                              </p>

                            </div>
                            <div className='row'>
          {(vehicles || []).map((item, index) => (

            <div className="col-lg-5" key={index}>
              <div className="row my-2">
                <div className="col-4 swich__title swich__title2 important_c">
                  <label class="label dealer__titlee"> {item.title} </label>
                </div>
                <div className="col-md-2 mbl_view">
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
          )}
             {/* {props.vehiclesError === true ? (
                                      <div
                                        className="srv-validation-message"
                                        style={{ color: "red" }}
                                      >
                                        Select Atleast One Vehicle
                                      </div>
                                    ) : (
                                      ""
                                    )} */}
          </div>
          <div className="SignIn-Con w-auto ml-0 mt-5">
                                <div className="DealerForm float-right">

                                    <button
                                      className="btnbg" onClick={()=> {props.change_dealer_type(1)
                                        }
                                      }>
                                      Next
                                      <i className="fa fa-angle-right"></i>
                                    </button>
                                </div>
                              </div>

                        </div>
                    </div>
                    <div className="col-lg-5 col-md-5 col-sm-12 col-12 pr-0 Dealer-Mobileimg">
                        <div className="Sec-SelectAccount">
                            <img src="/assets/image/dealer-img-1.png" alt="Dealer Pic"/>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    </div></>

    )
}
export default TypesofDealers