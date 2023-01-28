import React from 'react'
import Application from '../../../../component/NewApplication/Deleted'
const InHouseApplication = ({ tab }) => {
    return (
        <div class="tab-pane fade show active" id="in-house-application" role="tabpanel" aria-labelledby="in-house-application-tab">
            <div className="Admin-ActiveList-Container">
                <div className="tab-content" id="myTabContent">
                    <Application tabName={tab} />
                </div>
            </div>
        </div>
    )
}
export default InHouseApplication