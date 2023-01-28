

import React from "react";
import Skeleton from 'react-loading-skeleton';

const ModelPlaceHolder = props => {
    return (
        <div className="col-outer">
            <div className="grid-col" >
                <div className="VehicleChoose-Name">
                    <h1><Skeleton style={{ lineHeight: '60px' }} /></h1>
                </div>
            </div>
        </div>


    )
}
export default ModelPlaceHolder