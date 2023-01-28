import React, { useCallback, useState, useEffect } from 'react'
import SearchTable from '../../../../TableComponents/SearchTable';
import MultiSelectDropDown from '../../../../TableComponents/MultiSelectDropDown';
import DateFilter from '../../../../TableComponents/DateFilter';
import SearchableSelect from '../../../../TableComponents/SearchableSelect';
import { application_types, application_status, createdBy_options } from '../../../../../constants';
import { useSelector } from 'react-redux';
import moment from 'moment';
const TableFilter = ({ search, setSearchParams, searchParams, setChangeSelect, changeSelect, setSearch }) => {
    const { type_of_vehicles, agent_listing, unit_froms, assigned_dealers } = useSelector(({ adPostReducers, adminReducer }) => {
        return {
            type_of_vehicles: adPostReducers.addPostReducer.type_of_vehicle,
            agent_listing: adminReducer.adminAccounts.applicationReducer.agent_listing,
            unit_froms: adminReducer.adminAccounts.applicationReducer.unit_froms,
            assigned_dealers: adminReducer.adminAccounts.applicationReducer.assigned_dealers,
        }
    })
    const [show, setShow] = useState(false);
    const [selectTypeOfVehicle, setTypeOfVehicle] = useState([])
    const [selectApplicationType, setApplicationType] = useState([]);
    const [selectApplicationStatus, setApplicationStatus] = useState([])
    const [applicationCreatedBy, setApplicationCreatedBy] = useState([])
    const [selectedAssignedAgent, setSelectedAssignedAgent] = useState([])
    const [selectedUnitFrom, setSelectedUnitFrom] = useState([])
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
        delete searchParams['created_by']
        delete searchParams['selected_dealer']
        delete searchParams['selected_unitFrom']
        if (selectApplicationStatus?.map(item => { return item.value })?.length > 0) {
            data.application_status = JSON.stringify(selectApplicationStatus?.map(item => { return item.value }) || []);
        }
        if (selectApplicationType?.map(item => { return item.value })?.length > 0) {
            data.application_type = JSON.stringify(selectApplicationType?.map(item => { return item.value }) || []);
        }
        if (selectTypeOfVehicle?.map(item => { return item.label })?.length > 0) {
            data.vehicle_type = JSON.stringify(selectTypeOfVehicle?.map(item => { return item.label }) || []);
        }
        if (applicationCreatedBy?.map(item => { return item.label })?.length > 0) {
            data.created_by = JSON.stringify(applicationCreatedBy?.map(item => { return item.label }) || []);
        }
        if (selectedAssignedAgent?.map(item => { return item.label })?.length > 0) {
            data.selected_dealer = JSON.stringify(selectedAssignedAgent?.map(item => { return item.label }) || []);
        }
        if (selectedUnitFrom?.map(item => { return item.label })?.length > 0) {
            data.selected_unitFrom = JSON.stringify(selectedUnitFrom?.map(item => { return item.label }) || []);
        }
        setSearchParams({ ...searchParams, ...data })
        setChangeSelect(!changeSelect)
    }, [selectTypeOfVehicle,
        selectApplicationType,
        selectApplicationStatus,
        applicationCreatedBy, selectedAssignedAgent, selectedUnitFrom])
    return (<>
        <p className="filtertxt" onClick={handleShow}><i class="fa fa-filter"></i > Filter by <span style={{ color: '#fb5100' }}>date</span></p>
        <div className="row">
            <div className='col-sm-2 selectdropdown'>
                <SearchTable search={search} handleOnChange={(e) => setSearch(e)} />
            </div>
            <div className="col-sm-2 selectdropdown">
                <MultiSelectDropDown dataOptions={application_types} selectedValue={selectApplicationType}
                    setSelectedValue={setApplicationType}
                    placeHolder="Application Type" />
            </div>
            <div className="col-sm-2 selectdropdown">
                <MultiSelectDropDown dataOptions={application_status} selectedValue={selectApplicationStatus}
                    setSelectedValue={setApplicationStatus}
                    placeHolder="Status" />
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
            {/* , ...(agent_listing || []).filter(item => item?.aud_user_id && item?.aud_user_id?.length > 0).map((item) => {
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
                }) */}
                <MultiSelectDropDown dataOptions={[...createdBy_options,{ label: 'Agent', value: 'agent' }]} selectedValue={applicationCreatedBy}
                    setSelectedValue={setApplicationCreatedBy}
                    placeHolder="Created By" />
            </div>
            <div className="col-sm-2 selectdropdown">
                <MultiSelectDropDown dataOptions={(assigned_dealers || []).map(item => {
                    return {
                        label: item,
                        value: item
                    }
                })} selectedValue={selectedUnitFrom}
                    setSelectedValue={setSelectedUnitFrom}
                    placeHolder="Unit From" />
            </div>
            <div className="col-sm-2 selectdropdown">
                <MultiSelectDropDown dataOptions={(assigned_dealers || []).map(item => {
                    return {
                        label: item,
                        value: item
                    }
                })} selectedValue={selectedAssignedAgent}
                    setSelectedValue={setSelectedAssignedAgent}
                    placeHolder="Assigned Dealer" />
            </div>

        </div>
        {show && <DateFilter handleClose={handleClose} show={show} handleOnDone={handleOnDone} />}
    </>)
}
export default (TableFilter)