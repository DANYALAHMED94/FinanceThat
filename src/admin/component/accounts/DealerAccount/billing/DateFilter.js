import React, { useState } from 'react'
import { Modal } from "react-bootstrap";
import DateRangePicker from "../../../DateRangePicker";
import moment from 'moment';
var date = new Date();
date.setDate(date.getDate() - 7);
const today = moment();
const DateFilter = ({ handleClose, show, handleOnDone }) => {
    const [totalDays, setTotalDays] = useState(7);
    const [startDate, setStartDate] = useState(date)
    const [endDate, setEndDate] = useState(new Date())
    const [rangeDate, setRangeDate] = useState(moment.range(today.clone().subtract(7, "days"), today.clone()))
    return (
        <Modal dialogClassName="DateRangePicker-modal" show={show} onHide={handleClose}>
            <Modal.Body>
                <DateRangePicker getDay={(days) => { setTotalDays(days) }} setStartDate={setStartDate}
                    setEndDate={setEndDate} setRangeDate={setRangeDate} rangeDate={rangeDate} />
            </Modal.Body>
            <Modal.Footer className="justify-content">
                <div className="space-between">

                    <div className="TDays">
                        <span className="tText">
                            {totalDays} Days
                        </span>
                    </div>
                    <div className="row">

                        <button className="btnClose" onClick={handleClose}>
                            Close
                        </button>
                        <button className="btnDone" onClick={() => handleOnDone(startDate, endDate)}>
                            Done
                        </button>
                    </div>
                </div>

            </Modal.Footer>
        </Modal>
    )
}
export default DateFilter