import React from "react";
import Skeleton from 'react-loading-skeleton';

const HomePlaceHolder = props => {
    return (
        <div className="FeatureList-Thum my-awesome-placeholder">
            <Skeleton style={{ lineHeight: '15' }} />

            <h1><Skeleton width={100} /></h1>
            <h2>
                <Skeleton width={250} /> <span><Skeleton width={150} /></span>
            </h2>
            <h3>
                <i className="icon-subtract-icon"></i> <Skeleton width={100} />
            </h3>
        </div>
    )
}
export default HomePlaceHolder