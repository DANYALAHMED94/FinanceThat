import React, { useEffect, useState } from "react";
import Select, { components } from "react-select";
import { Scrollbars } from "react-custom-scrollbars";
import { monthlyIncomeOptions } from "./../../pages/postApplicationV2/components/constant";
const DurationYearsOptions = (props) => {
    const { getDuration, value } = props
    const [grossIncome, setGrossIncome] = useState("")
    const { Option } = components;

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
    useEffect(()=> {
        setGrossIncome((monthlyIncomeOptions || []).filter(item=> item.value === value)?.[0] || "")
    },[value])
    return (
        <React.Fragment>
                <div className="form-field-col">
                    <Select
                        placeholder="Monthly income"
                        id={"grossIncome"}
                        name={"grossIncome"}
                        value={grossIncome}
                        onChange={(e) => {
                            let ob = { value: e.value, label: e.label }
                            setGrossIncome(ob)
                            getDuration && getDuration(e)
                        }
                        }
                        options={monthlyIncomeOptions}
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