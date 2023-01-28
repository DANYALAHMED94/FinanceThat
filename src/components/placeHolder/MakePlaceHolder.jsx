
import React from "react";
import Skeleton from 'react-loading-skeleton';

const MakePlaceHolder = props => {
    return (
        <div className="boxed-grid-col my-awesome-placeholder">
            <div className="SelectCar-Brand">
                <Skeleton style={{ lineHeight: '75px' }} />
            </div>
        </div>

    )
}
export default MakePlaceHolder