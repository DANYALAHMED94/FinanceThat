import React from 'react'
import {ReactComponent as BillSVG} from '../../../../assets/image/personalLoan/bill.svg';
import {ReactComponent as CarRepairSVG} from '../../../../assets/image/personalLoan/carrepair.svg';
import {ReactComponent as ItemPurchaseSVG} from '../../../../assets/image/personalLoan/itempurchase.svg';
import {ReactComponent as MedicalSVG} from '../../../../assets/image/personalLoan/Medical.svg';
import {ReactComponent as HomeRepairSVG} from '../../../../assets/image/personalLoan/Home.svg';
import { ReactComponent as Petsvg } from "../../../../assets/image/personalLoan/pet1.svg";

const LoanTypeSvg = ({item, type_of_loan}) => {
    return (
        item.name === "Personal Loans" ? <BillSVG className={
                type_of_loan === item.name ? "personalLoan-svgs active" : "personalLoan-svgs"
              } stroke={type_of_loan === item.name ? "#fff" : ""} fill={type_of_loan === item.name ? "#fff" : ""}/> : item.name === "Automotive" ? <CarRepairSVG className={
                type_of_loan === item.name ? "personalLoan-svgs active" : "personalLoan-svgs"
              } stroke={type_of_loan === item.name ? "#fff" : ""} fill={type_of_loan === item.name ? "#fff" : ""}/> : item.name === "Retail Purchase" ? <ItemPurchaseSVG className={
                type_of_loan === item.name ? "personalLoan-svgs active" : "personalLoan-svgs"
              } stroke={type_of_loan === item.name ? "#fff" : ""} fill={type_of_loan === item.name ? "#fff" : ""}/> : item.name === "Medical Procedure" ? <MedicalSVG className={
                type_of_loan === item.name ? "personalLoan-svgs active" : "personalLoan-svgs"
              } stroke={type_of_loan === item.name ? "#fff" : ""} fill={type_of_loan === item.name ? "#fff" : ""}/> : item.name === "Home Renovation" ? <HomeRepairSVG className={
                type_of_loan === item.name ? "personalLoan-svgs active" : "personalLoan-svgs"
              } stroke={type_of_loan === item.name ? "#fff" : ""} fill={type_of_loan === item.name ? "#fff" : ""}/> : item.name === "Veterinary Care" ? <Petsvg className={
                type_of_loan === item.name ? "personalLoan-svgs active" : "personalLoan-svgs"
              } stroke={type_of_loan === item.name ? "#fff" : ""} fill={type_of_loan === item.name ? "#fff" : ""}/> : null
    )

}
export default LoanTypeSvg