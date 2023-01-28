import React, { useState } from "react";
import { Helmet } from "react-helmet";
import BillingListing from './billing/BillingListing'
import {
    add_card,
    get_card,
    edit_card,
    get_invoice
} from "../../../../actions/admin/billingActions";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

const DealerBilling = (props) => {
    const { id } = useParams()

    const { billinginvoices, billingData, billingLoader, pages_urls, total_count } = useSelector(({ dealerAdminReducer }) => {
        return {
            billingData: dealerAdminReducer.dealerBillingReducer,
            billingLoader: dealerAdminReducer.dealerBillingReducer.loading,
            billinginvoices: dealerAdminReducer.dealerBillingReducer.invoices,
            pages_urls: dealerAdminReducer.dealerBillingReducer.pages,
            total_count: dealerAdminReducer.dealerBillingReducer.total_count,
        }

    })
    const dispatch = useDispatch()
    const [paymentApplication, setPaymentApplication] = useState('')

    const onSuccess = (data) => {
        setPaymentApplication(data)
    }
    const add_card_for_billing = (card, success, onError) => {
        const data = {
            "number_of_applications": card.number_of_applications ? card.number_of_applications : 5,
            "user_id":+id,
            "payment_method": {
                "email": card.email,
                "streed_address": card.streed_address,
                "city": card.city,
                "postal_code": card.postal_code,
                "province": card.province,
                // "title": card.title,
                "firstName":card.firstName,
                "lastName":card.lastName,
                "number": card.number,
                "exp_month": card.exp_month,
                "exp_year": card.exp_year,
                "cvc": card.cvc,
                "is_deleted": card.is_deleted ? true : false
            }
        }
        dispatch(add_card(data, success, onError))
    }

    const get_invoices = (data) => {
        dispatch(get_invoice(data,id))
    }
    const add_card_dispatch = () => {
        dispatch(get_card(id))
    }
    const edit_card_for_billing = (card, app, pay, success=null, onError=null) => {
        const data = {
            "number_of_applications": card.number_of_applications,
            "user_id":+id,
            "payment_method": {
                "email": card?.email,
                "streed_address": card?.streed_address,
                "city": card?.city,
                "postal_code": card?.postal_code,
                "province": card?.province,
                "firstName":card.firstName,
                "lastName":card.lastName,
                "number": card?.number,
                "exp_month": card?.exp_month,
                "exp_year": card?.exp_year,
                "cvc": card?.cvc,
                "is_deleted": card.is_deleted ? true : false
            }
        }
        dispatch(edit_card(data, app, pay, success, onError))
    }

    const add_application_number = (card, success, onError) => {
        const data  = {
            "number_of_applications": card.number_of_applications ? card.number_of_applications : 5,
            "user_id":+id,
        }
        dispatch(add_card(data, success, onError))
    }

    const update_application_number = (card, app, pay, success=null, onError=null) => {
        const data  = {
            "number_of_applications": card.number_of_applications,
            "user_id":+id,
        }
        dispatch(edit_card(data, app, pay, success, onError))
    }
    return (<>
        <React.Fragment>
            <Helmet>
                <title>Dealer Billing</title>
                <meta name="description" content="" />
            </Helmet>
            <BillingListing billinginvoices={billinginvoices} get_invoices={get_invoices} billingLoader={billingLoader} billingData={billingData} get_card={add_card_dispatch}{...props} add_card_for_billing={add_card_for_billing} edit_card_for_billing={edit_card_for_billing} pages_urls={pages_urls} total_count={total_count} add_application_number={add_application_number} update_application_number={update_application_number} userId={+id}/>
        </React.Fragment>
    </>)
}
export default DealerBilling