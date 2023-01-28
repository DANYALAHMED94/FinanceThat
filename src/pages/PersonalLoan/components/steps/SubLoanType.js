import React from "react";
import TypeOfLoanNew from "./TypeOfLoanNew";
import RetailPurchase from "./RetailPurchase";
import MedicalProd from "./MedicalProd";
import Automotive from "./Automotive";
import HomeRenovation from "./HomeRenovation";

const SubLoanType = ({ formState, setFormState, onContinue }) => {
    if(formState.type_of_loan === "Personal Loans"){
       return <TypeOfLoanNew formState={formState} setFormState={setFormState} onContinue={onContinue} />
    }else if(formState.type_of_loan === "Medical Procedure"){
        return <MedicalProd formState={formState} setFormState={setFormState} onContinue={onContinue} />
    }else if(formState.type_of_loan === "Home Renovation"){
        return <HomeRenovation formState={formState} setFormState={setFormState} onContinue={onContinue} />
    }
    else if(formState.type_of_loan === "Automotive"){
        return <Automotive formState={formState} setFormState={setFormState} onContinue={onContinue} />
        
    }
    else {
        
        return <RetailPurchase formState={formState} setFormState={setFormState} onContinue={onContinue} />
    }

}
export default SubLoanType