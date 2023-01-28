import React from 'react'
import DealerType from './DealerType'
import VehiclePerference from './VehiclePerference'
import LocationPerference from "./LocationPerference"
import CreditScore from './CreditSrcore'
import Billing from './Billing'
import ApplicationType from './ApplicationType'
const DealerPerferences = (props) => {
   const getDealerPerference = (type) => {
        var dealerPerferenceRender = {
            0: <DealerType dealerType={props.dealerType} handleOnChange={props.handleOnChangeDealer} />,
            1: <ApplicationType showApplicationError={props.showApplicationError} changeMultiSelecPerfernec={props.changeMultiSelecPerfernec} application_type={props.application_type} />,
            2: <Billing changeMultiSelecPerfernec={props.changeMultiSelecPerfernec} no_of_applications={props.no_of_applications} payment_method ={props.payment_method}/>,
            3: <CreditScore changeMultiSelecPerfernec={props.changeMultiSelecPerfernec} creditscore={props.creditscore} showCreditError={props.showCreditError}/>,
            4: <VehiclePerference changeMultiSelecPerfernec={props.changeMultiSelecPerfernec} selectedVehicle={props.selectedVehicle} vehiclePerferenceError={props.vehiclePerferenceError} vehicle_subtype_preferences={props.vehicle_subtype_preferences}/>,
            5: <LocationPerference changeMultiSelecPerfernec={props.changeMultiSelecPerfernec} selectedLocation={props.selectedLocation} locationError={props.locationError}/>
          };
          return dealerPerferenceRender[type] || dealerPerferenceRender[0];
        }
        return <>{getDealerPerference(props.dealerPerferenceType)}</>
    }
export default DealerPerferences