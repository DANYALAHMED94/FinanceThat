import React, {useState, useEffect} from 'react'
import Select, { components } from "react-select";
import { Scrollbars } from "react-custom-scrollbars";
import {
    ReactComponent as PlusSvg
  } from "../../../../../assets/image/plus.svg";
  import {
    ReactComponent as VisaCardSvg
  } from "../../../../../assets/image/visa.svg";
  import {
    ReactComponent as
    MsgSvg
  } from "../../../../../assets/image/msg.svg";
  import AddBillingModal from './AddBillingModal'
  const { Option } = components;

const renderScrollbar = (props) => {
  return (
    <div style={{ height: 200 }}>
      <Scrollbars>{props.children}</Scrollbars>
    </div>
  );
};
const renderOption = (props) => {
  return (
    <Option {...props}>
      <div>{props.data.label}</div>
    </Option>
  );
};

const Billing = (props) => {
    const [noOfApplications, setNoOfApplications] = useState({ label: "Up To 5 Application", value: 5 });
    const [AddBillingModalSow, setAddBillingModalSow] = useState(false);
    const [payment_method, setPaymentMethod] = useState({
            "email": "",
            "streed_address": "",
            "city": "",
            "postal_code": "",
            "province": "",
            "firstName": "",
            "lastName":"",
            "number": "",
            "exp_month": "",
            "exp_year": "",
            "cvc": "",
    })

    const [appOptions, setappOptions] = useState([
        // { label: "No Application", value: 0 },
        { label: "Up To 5 Application", value: 5 },
        { label: "Up To 10 Application", value: 10 },
        { label: "Up To 15 Application", value: 15 },
        { label: "Up To 20 Application", value: 20 },
        { label: "No Limit", value: 1000000  },
        {label:"Pause Application",value:-1},
        
        
      ]);
      const [editCard, setEditCard] = useState(false);
      const handleAddBillingModalSowClose = () => setAddBillingModalSow(false);
      const handleAddBillingModalSowShow = () => setAddBillingModalSow(true);
      const add_card_for_billing = (data) => {
        setPaymentMethod({...payment_method, ...data})
        props.changeMultiSelecPerfernec('payment_method', {...payment_method, ...data})
        handleAddBillingModalSowClose()
      }

      useEffect(()=> {
          const applicationValue = appOptions?.filter(item=> item.value === props.no_of_applications)
          console.log(applicationValue, "applicationValue")
          setNoOfApplications(applicationValue?.[0] || "")
      },[props.no_of_applications])

      useEffect(()=> {
        setPaymentMethod(props.payment_method)
    },[props.payment_method])
    console.log(props, "props")
    return (<>
    <div className="dealer-billing-ListHead dealer__billing w-100">
    <h1>Billing</h1>
    <p>Manage your billing and payment details.</p>
  </div>
  <div className="clearfix"></div>
  <div className="row w-100">
          <div style={{maxWidth:"100%", zIndex:"2"}} className="col-md-5 billing__clm1">
            <div className="">
              <div className="dealer-billing-application billing___applicat_back">
                <div className="innerDealerBilling">
                  <div className="innerBillingHeader">
                    <h5 className='billing__appilication'>Applications</h5>
                    <p className='billing__content3'>
                      Select how many monthly applications you would like
                    </p>
                  </div>
                  <div className="innerBilling-container-application">
                    <div className="">
                      <Select
                        placeholder="Search Application"
                        id="noOfApplications"
                        name="noOfApplications"
                        value={noOfApplications}
                          onChange={(e) => {
                          setNoOfApplications(e);
                          props.changeMultiSelecPerfernec('number_of_applications', e?.value || "")
                        }}
                        options={appOptions}
                        isSearchable
                        isClearable
                        className="react-select-main"
                        classNamePrefix="react-select"
                        components={{
                          Option: renderOption,
                          MenuList: renderScrollbar,
                        }}
                        captureMenuScroll={false}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div style={{maxWidth:"100%"}} className="col-md-7 billing__clm1">
            <div className="">
              <div className="dealer-billing-payment billing___applicat_back">
                <div className="innerDealerBilling">
                  <div className="innerBillingHeader">
                    <h5 className='billing__appilication'>Payment method</h5>
                    <p>Change how you pay for monthly applications</p>
                  </div>
                  <div className="innerBilling-container-payment">
                    {payment_method?.email ?
                      <div className="selected-payment-card-view">
                        <div className='selected-payment-card-view-left'>
                          <VisaCardSvg style={{ margin: '12px 0px 0px 5px' }} />
                        </div>
                        <div className='selected-payment-card-view-middle'>
                          <h1>Visa ending in {payment_method?.number || ''}</h1>
                          <h2>Expiry {payment_method?.exp_month || ''}/{payment_method?.exp_year || ''}</h2>
                          <div className="email">
                            <MsgSvg />
                            <span>{payment_method?.email}</span>
                          </div>
                        </div>
                        <div className="selected-payment-card-view-right">
                          <button
                          onClick={() =>{
                            setEditCard(true)
                            handleAddBillingModalSowShow()}
                          }>Edit</button>
                        </div>
                      </div>
                      :
                      <div
                        className="add-payment-div"
                        onClick={handleAddBillingModalSowShow}
                      >
                        <PlusSvg />
                        <span> Add payment method</span>
                      </div>
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <AddBillingModal
          editCard={editCard}
          billing={payment_method}
          noOfApplications={noOfApplications}
          add_card_for_billing={add_card_for_billing}
          AddBillingModalSow={AddBillingModalSow}
          handleAddBillingModalSowClose={handleAddBillingModalSowClose}
        />
</>)
}
export default Billing