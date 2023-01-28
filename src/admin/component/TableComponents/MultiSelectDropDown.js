import React, { memo } from 'react'
import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes';

const MultiSelectDropDown = ({ dataOptions, selectedValue, setSelectedValue, placeHolder }) => {
    return (
        <ReactMultiSelectCheckboxes options={dataOptions}
            value={selectedValue}
            onChange={setSelectedValue}
            placeholderButtonLabel={placeHolder}
        />
    )
}
export default memo(MultiSelectDropDown, MemoMultiSelectDropDown)
function MemoMultiSelectDropDown(prevProps, nextProps) {
    return prevProps.dataOptions === nextProps.dataOptions && prevProps.selectedValue === nextProps.selectedValue

}