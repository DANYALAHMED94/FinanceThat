
import React from "react";
import Skeleton from 'react-loading-skeleton';

const TypeOfVehiclePlaceHolder = props => {
    return (
        <div className="boxed-grid-col">
            <div className="addPostBox"  >
                <label className="AdPost-CheckBox">
                    <Skeleton style={{ lineHeight: '180px' }} />
                </label>
            </div>
        </div>
    )
}
export default TypeOfVehiclePlaceHolder