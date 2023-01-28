import React, { useState } from 'react';
import DealerPendingAccounts from './DealerPendingAccounts'
import PrivatePendingAccounts from './PrivatePendingAccounts'

const PendingAccounts = (props) => {
    const [tab, setTab] = useState('dealer')
    return (<React.Fragment>
        <div className="Pending-ListHead">
            <h1>Pending listings</h1>
        </div>
        <div className="Admin-ActiveList-Container">
            <ul className="nav nav-tabs TableTab" id="myTab" role="tablist">
                <li className="nav-item" onClick={() => setTab('dealer')}>
                    <a className={tab === 'dealer' ? "active" : ''} id="home-tab" href="#home" data-toggle="tab" role="tab" aria-controls="home" aria-selected="false">Dealers</a>
                </li>
                <li className="nav-item" onClick={() => setTab('private')}>
                    <a className={tab === 'private' ? "active" : ''} id="profile-tab" href="#profile" data-toggle="tab" role="tab" aria-controls="profile" aria-selected="true">Private</a>
                </li>
            </ul>

            <div className="tab-content" id="myTabContent">
                {tab === 'dealer' ? (
                    <div className={tab === 'dealer' ? "tab-pane fade show active" : "tab-pane fade"} id="home" role="tabpanel" aria-labelledby="home-tab">
                        <DealerPendingAccounts />
                    </div>
                ) : null}
                {tab === 'private' ? (<div className={tab === 'private' ? "tab-pane fade show active" : "tab-pane fade"} id="profile" role="tabpanel" aria-labelledby="profile-tab">
                    <PrivatePendingAccounts />
                </div>) : null}

            </div>
        </div>
    </React.Fragment>
    );
}
export default PendingAccounts