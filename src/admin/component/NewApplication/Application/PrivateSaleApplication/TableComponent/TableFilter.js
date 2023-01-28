import React, { useCallback, useState, useEffect } from 'react'
import SearchTable from '../../../../TableComponents/SearchTable';
import MultiSelectDropDown from '../../../../TableComponents/MultiSelectDropDown';
import DateFilter from '../../../../TableComponents/DateFilter';
import { private_application_types, application_status, createdBy_options } from '../../../../../constants';
import { useSelector } from 'react-redux';
import useDebounce from '../../../../../../_hooks/useDebounac';
import moment from 'moment';
const TableFilter = ({ search, setSearchParams, searchParams, setChangeSelect, changeSelect, setSearch }) => {
    const { type_of_vehicles, agent_listing } = useSelector(({ adPostReducers, adminReducer }) => {
        return {
            type_of_vehicles: adPostReducers.addPostReducer.type_of_vehicle,
            agent_listing: adminReducer.adminAccounts.applicationReducer.agent_listing,
        }
    })
    const [show, setShow] = useState(false);
    const [selectTypeOfVehicle, setTypeOfVehicle] = useState([])
    const [selectApplicationType, setApplicationType] = useState([]);
    const [selectApplicationStatus, setApplicationStatus] = useState([])
    const [applicationCreatedBy, setApplicationCreatedBy] = useState([])
    const [selectedAgent, setSelectedAgent] = useState([])
    const [stockNumber, setStockNumber] = useState('')
    const debouncedSearchTerm = useDebounce(stockNumber, 500);

    const handleClose = useCallback(() => { setShow(false) }, []);
    const handleShow = useCallback(() => { setShow(true) }, []);
    /** Date Filter */
    const handleOnDone = (startDate, endDate) => {
        setSearchParams ({
            ...searchParams,
            start_date: moment(startDate).format("YYYY-MM-DD"),
            end_date: moment(endDate).format("YYYY-MM-DD"),
        })
        setChangeSelect(!changeSelect)
        handleClose()
    }
    useEffect(() => {
        let data = {}
        delete searchParams['application_status']
        delete searchParams['application_type']
        delete searchParams['vehicle_type']
        delete searchParams['selected_agent']
        delete searchParams['created_by']
        if (selectApplicationStatus?.map(item => { return item.value })?.length > 0) {
            data.application_status = JSON.stringify(selectApplicationStatus?.map(item => { return item.value }) || []);
        }
        if (selectApplicationType?.map(item => { return item.value })?.length > 0) {
            data.application_type = JSON.stringify(selectApplicationType?.map(item => { return item.value }) || []);
        }
        if (selectTypeOfVehicle?.map(item => { return item.label })?.length > 0) {
            data.vehicle_type = JSON.stringify(selectTypeOfVehicle?.map(item => { return item.label }) || []);
        }
        if (selectedAgent?.map(item => { return item.label })?.length > 0) {
            data.selected_agent = JSON.stringify(selectedAgent?.map(item => { return item.label }) || []);
        }
        if (applicationCreatedBy?.map(item => { return item.label })?.length > 0) {
            data.created_by = JSON.stringify(applicationCreatedBy?.map(item => { return item.label }) || []);
        }
        setSearchParams({ ...searchParams, ...data, stock: debouncedSearchTerm })
        setChangeSelect(!changeSelect)
    }, [selectTypeOfVehicle,
        selectApplicationType,
        selectApplicationStatus,
        selectedAgent,
        applicationCreatedBy, debouncedSearchTerm])
    return (<>
        <p className="filtertxt" onClick={handleShow}><i class="fa fa-filter"></i > Filter by <span style={{ color: '#fb5100' }}>date</span></p>
        <div className="row">
            <div className='col-sm-2 selectdropdown'>
                <SearchTable search={search} handleOnChange={(e) => setSearch(e)} />
            </div>
            <div className="col-sm-2 selectdropdown">
                <MultiSelectDropDown dataOptions={private_application_types} selectedValue={selectApplicationType}
                    setSelectedValue={setApplicationType}
                    placeHolder="Application Type" />
            </div>
            <div className="col-sm-2 selectdropdown">
                <MultiSelectDropDown dataOptions={(type_of_vehicles || []).map(item => {
                    return {
                        label: item.name,
                        value: item.id
                    }
                })} selectedValue={selectTypeOfVehicle}
                    setSelectedValue={setTypeOfVehicle}
                    placeHolder="Vehicle Type" />
            </div>
            <div className="col-sm-2 selectdropdown">
                <MultiSelectDropDown dataOptions={application_status} selectedValue={selectApplicationStatus}
                    setSelectedValue={setApplicationStatus}
                    placeHolder="Application Status" />
            </div>
            <div className="col-sm-2 selectdropdown">
                <MultiSelectDropDown dataOptions={[{ label: 'Applicant', value: 'applicant' },{value:'agent', label:"Agent"}]} selectedValue={applicationCreatedBy}
                    setSelectedValue={setApplicationCreatedBy}
                    placeHolder="Created By" />
            </div>
            <div className="col-sm-2 selectdropdown">
                <SearchTable search={stockNumber} handleOnChange={(e) => setStockNumber(e)} placeHolder="Stock number" />
            </div>
            <div className="col-sm-2 selectdropdown">
                <MultiSelectDropDown dataOptions={[...(agent_listing || []).filter(item => item?.aud_user_id && item?.aud_user_id?.length > 0 && +item?.user_type === 5).map((item) => {
                    return {
                        value:
                            item?.aud_user_id &&
                                item?.aud_user_id?.length > 0
                                ? item?.aud_user_id?.[0]?.user_id || ""
                                : "",
                        label:
                            item?.aud_user_id &&
                                item?.aud_user_id?.length > 0
                                ? item?.aud_user_id?.[0]?.name || ""
                                : "",
                    };
                })]} selectedValue={selectedAgent}
                    setSelectedValue={setSelectedAgent}
                    placeHolder="Agent" />
            </div>
        </div>
        {show && <DateFilter handleClose={handleClose} show={show} handleOnDone={handleOnDone} />}
    </>)
}
export default (TableFilter)