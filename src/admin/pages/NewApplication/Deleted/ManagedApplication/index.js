import React from 'react'
import Application from '../../../../component/NewApplication/Deleted'
const ManagedApplication = ({ tab }) => {
    return (
        <div class="tab-pane fade show active" id="managed-application" role="tabpanel" aria-labelledby="managed-application-tab">
            <div className="Admin-ActiveList-Container">
                <div className="tab-content" id="myTabContent">
                    <Application tabName={tab} />
                </div>
            </div>
        </div>
    )
}
export default ManagedApplication