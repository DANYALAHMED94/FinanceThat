import React, { useEffect, useState } from "react";
import Select, { components } from "react-select";
import { Scrollbars } from "react-custom-scrollbars";
import { durationLivedOptions } from "./../../pages/postApplicationV2/components/constant";
import { useDispatch, useSelector } from "react-redux";
const DurationYearsOptions = (props) => {
    const { getDuration, value } = props
    const [durationAtAddress, setDurationAtAddress] = useState("")
    const { Option } = components;

    useEffect(()=> {
        setDurationAtAddress((durationLivedOptions|| []).filter(item=> item.value === value)?.[0] || "")
    },[value])


    const renderOption = (props) => {
        return (
            <Option {...props}>
                <div>{props.data.label}</div>
            </Option>
        );
    };
    const renderScrollbar = (props) => {
        return (
            <div style={{ height: 200 }}>
                <Scrollbars>{props.children}</Scrollbars>
            </div>
        );
    };
    return (
        <React.Fragment>
                <div className="form-field-col">
                    <Select
                        placeholder="Duration at this address"
                        id={"durationAtAddress"}
                        name={"durationAtAddress"}
                        value={durationAtAddress}
                        onChange={(e) => {
                            let ob = { value: e.value, label: e.label }
                            setDurationAtAddress(ob)
                            getDuration && getDuration(e)
                        }
                        }
                        options={durationLivedOptions}
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
        </React.Fragment >
    )
}
export default DurationYearsOptions