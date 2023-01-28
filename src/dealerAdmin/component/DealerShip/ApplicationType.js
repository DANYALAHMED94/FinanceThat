/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react'
import { update_dealership_vehicle_location } from '../../../actions/dealer/dealerShipActions'
import { useDispatch, useSelector } from "react-redux";
const ApplicationType = () => {
  const dispatch = useDispatch();
  const { dealer_id, application_type, vehicle_location_status } = useSelector(({ dealerAdminReducer }) => {
    return {
      dealer_id: dealerAdminReducer.dealerShipReducer.dealer_id,
      application_type: dealerAdminReducer.dealerShipReducer.application_type,
      vehicle_location_status: dealerAdminReducer.dealerShipReducer.vehicle_location_status,
    }
  })
  const [applicant_types, setApplictionType] = useState([
    { title: "General and Inventory-Specific", name: "general", value: false, className:"content1"},
    { title: "Inventory-Specific Only", name: "inventory", value: false, className:"content11" }])

  const [selectedApplicationType, setSelectedapplicationType] = useState('')

  const updateApplicantType = (name) => {
    setSelectedapplicationType(name)
    setApplictionType(applicant_types.map(ite => {
      if (ite.name === name) {
        return {
          ...ite,
          value: !ite.value
        }
      }
      return ite
    }))
    let vehicleObject = {}
    applicant_types.map(ite => {
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
    const data = {
      application_type: vehicleObject,
      dealer_id: dealer_id,
      type:'application_type'
    }
    dispatch(update_dealership_vehicle_location(data))

  }

  useEffect(() => {
    if (application_type && Object.keys(application_type).length > 0) {
      setApplictionType((applicant_types || []).map(item => {
        if (Object.keys(application_type).includes(item.name)) {
          return {
            ...item,
            value: application_type[item.name]
          }
        }
        return item
      }))
    }
  }, [application_type])

  useEffect(() => {
      if(vehicle_location_status){
        setApplictionType((applicant_types || []).map(ite => {
          if (ite.name === selectedApplicationType) {
            return {
              ...ite,
              value: !ite.value
            }
          }
          return ite
        }))
      }

  }, [vehicle_location_status])
  return (
    <div className="Altable-Container">
    <div className="Dealer-dtable vehical">
      <div className="col-12">
        <div className="row lh-lg my-4">
          <h5>Application Type</h5>
          <p className='fg_p label__color'>Select the type of application you want to receive.</p>
        </div>
        <hr></hr>
      </div>
      {(applicant_types || [])?.map(item=> (
  <div className={"col-12 d-flex alignn"}>
  <div className="row lh-lg my-4">
    <h5>{item.title}</h5>
    {item.name === "general" ?<p className='content3 fg_p label__color'>General Applications are applicants interested in purchasing<br></br> a particular type of asset, such as a Truck, SUV, ATV, etc.<br></br> Inventory-specific applications are applicants directly applying<br></br> for financing on your vehicles listed in our marketplace.
</p>: <p className='content3 fg_p label__color'>Inventory-Specific Application are applicants directly applying <br></br> for the financing on your vehicles listed in our marketplace.</p>}
  </div>

            <div class="switch-holder switch__css" style={{marginLeft:item.name !== "general" ? "-150px":"-220px"}}>
              <input
                id={item.name}
                type="checkbox"
                name={item.name}
                checked={item.value}
                onChange={() => updateApplicantType(item.name)}
              />
              <label for={item.name} class="switch">
                <div></div>
              </label>
          </div>
</div>
      ))}

      {/* <div className="col-12 d-flex">
        <div className="row lh-lg my-4">
          <h5>General Application</h5>
          <p className='content3 fg_p label__color'>General Application are applicants interested in purchasing<br></br> a particular type of asset, Such as a Truck,SUV,ATV,etc.</p>
        </div>

                  <div class="switch-holder switch__css">
                    <input
                      // id={item.name}
                      type="checkbox"
                      name=""
                      // checked={item.value}
                      // onChange={() => updateVehicle(item.name)}
                    />
                    <label for="" class="switch">
                      <div></div>
                    </label>

                </div>
      </div>
      <div className="col-12">
        <div className="row lh-lg my-4">
          <h5>Inventory-Specific Application</h5>
          <p className='content3 fg_p label__color'>Inventory-Specific Application are applicants directly applying<br></br>for the financing on your vehicles listed in our marketplace</p>
        </div>

                  <div class="switch-holder switch__css">
                    <input
                      // id={item.name}
                      type="checkbox"
                      name=""
                      // checked={item.value}
                      // onChange={() => updateVehicle(item.name)}
                    />
                    <label for="" class="switch">
                      <div></div>
                    </label>
                  </div>

      </div> */}
    </div>
  </div>
  )
}

export default ApplicationType
