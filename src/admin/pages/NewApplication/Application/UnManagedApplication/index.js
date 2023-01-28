import React from 'react'
import Application from '../../../../component/NewApplication/Application'
const UnManagedApplication = ({ tab }) => {
    return (
        <div class="tab-pane fade show active" id="unmanaged-application" role="tabpanel" aria-labelledby="unmanaged-application-tab">
            <div className="Admin-ActiveList-Container">
                <div className="tab-content" id="myTabContent">
                    <Application tabName={tab} />
                </div>
            </div>
        </div>
    )
}
export default UnManagedApplication