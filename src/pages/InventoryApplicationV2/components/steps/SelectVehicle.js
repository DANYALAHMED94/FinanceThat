import React from 'react'
import { useLocation } from 'react-router-dom'
import { API_URL } from '../../../../constant'
const SelectVehicle = ({formState, setFormState, onContinue}) => {
  const state = useLocation().state

  return (

        <div className="formWrapper slect_form">
      <h1 className='formWrapper_heading'>Your vehicle selection</h1>
      <div className="select_items_flex">
     <div style={{width:"380px",height:"249px"}} className='item_img'>
      <img style={{height:"100%",width:"100%" , borderRadius:"8px"}} src={state?.image_path ?  `${API_URL}/media/${state?.image_path}` :'/assets/image/about-img-1.png'} alt=''/>
     </div>
     <div className='item_data'>
      <h1 className='item_data_heading'>Listing details</h1>
      <div className='data_field'>
        <div className='stock'>Stock</div>
        <div style={{color:"#3F2355",paddingRight:"18px"}}>:</div>
        <div className='stocknumber'>{state?.vehicle?.stock_id || ""}</div>
      </div>
      <div className='data_field bac_n0n'>
        <div className='stock'>Make</div>
        <div style={{color:"#3F2355",paddingRight:"18px"}}>:</div>
        <div className='stocknumber'>{state?.vehicle?.make || ""}</div>
      </div>
      <div className='data_field '>
        <div className='mb_stock'>Model</div>
        <div style={{color:"#3F2355",paddingRight:"18px"}}>:</div>
        <div className='stocknumber'>{state?.vehicle?.model  || ""}</div>
      </div>
      <div className='data_field bac_n0n'>
        <div className='stock'>Year</div>
        <div style={{color:"#3F2355",paddingRight:"18px"}}>:</div>
        <div className='stocknumber'>{state?.vehicle?.year || ""}</div>
      </div>
      <div className='data_field'>
        <div className='stock'>Price</div>
        <div style={{color:"#3F2355",paddingRight:"18px"}}>:</div>
        <div className='stocknumber'>{state?.vehicle?.price ? new Intl.NumberFormat("en-US", {
                                style: "currency",
                                currency: "USD",
                              }).format(Number(state?.vehicle?.price || 0)) // '$100.00'
                            : new Intl.NumberFormat("en-US", {
                                style: "currency",
                                currency: "USD",
                              }).format(0)}</div>
      </div>
     </div>


      </div>
      <button
      style={{height:"56px"}}
        onClick={() => {
          if(state && state?.vehicle){
            setFormState({...formState, vehicle:[state.vehicle], stock:state?.stock, vehicle_type:state?.vehicle?.type_of_vehicle_name || "", sub_vehicle_type:state?.vehicle?.sub_type_of_vehicle_name || "",sub_type_of_vehicle_name:state?.vehicle?.sub_type_of_vehicle_name || ""})
            onContinue()
          }else{
            alert('Please Select Vehicle')
          }
        }}
        className="primaryButton continueBtn_form continueBtn"
      >
        <span></span> <span>Continue</span>
        <img src="/assets/image/arrow_circle_right_outline.svg" alt="icon" />
      </button>
      <p style={{width:"100%"}} className='formWrapper_content widh_d'>By clicking on the Button, I confirm my agreement to the General Terms of Service and Privacy Policy to Finance That.</p>
    </div>

  )
}

export default SelectVehicle
