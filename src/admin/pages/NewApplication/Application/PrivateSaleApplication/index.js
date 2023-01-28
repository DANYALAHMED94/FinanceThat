import React from 'react'
import Application from '../../../../component/NewApplication/Application'
const PrivateSaleApplication = ({ tab }) => {
    return (
        <div class="tab-pane fade show active" id="private-sale-application" role="tabpanel" aria-labelledby="private-sale-application-tab">
            <div className="Admin-ActiveList-Container">
                <div className="tab-content" id="myTabContent">
                    <Application tabName={tab} />
                </div>
            </div>
        </div>
    )
}
export default PrivateSaleApplication