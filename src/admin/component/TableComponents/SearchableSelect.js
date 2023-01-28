import React from 'react'
import AsyncSelect from 'react-select/async';
import { components } from "react-select";
import { Scrollbars } from "react-custom-scrollbars";

const { Option } = components;

const SearchableSelect = ({ placeHolder }) => {
    const renderOption = (props) => {
        return (
            <Option {...props}>
                <div>{props.data.label}</div>
            </Option>
        );
    };
    const renderScrollbar2 = (props) => {
        return (
            <div style={{ height: 225 }}>
                <Scrollbars>{props.children}</Scrollbars>
            </div>
        );
    };
    const promiseOptions = (value) => {
        console.log(value)
        setTimeout(() => {
            return;
        }, 1000);
    }
    return (<>
        <AsyncSelect
            cacheOptions
            placeholder={placeHolder}
            components={{
                Option: renderOption,
                MenuList: renderScrollbar2,
            }}
            captureMenuScroll={false}
            className=""
            classNamePrefix="banner-react-select"
            defaultOptions={[{ value: 1, label: 'Black' }]}
            loadOptions={promiseOptions}
        />
    </>)
}
export default SearchableSelect