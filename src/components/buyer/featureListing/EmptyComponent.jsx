import React, {memo} from 'react'
const EmptyComponent = (props) => {
    return (<React.Fragment>
       <div className="empty-content">
            <img src="/assets/image/empty-icon.svg" alt="" />
            <h2> No Result </h2>
            <p> Sorry there is no result for {props.name}. </p>
        </div>
    </React.Fragment>)
}
export default memo(EmptyComponent)