import React, { useEffect, useState } from "react";
import DealerShipGeneral from "../../../component/accounts/DealerAccount/DealerShipGeneral";
import DealerOwners from "../../../component/accounts/DealerAccount/DealerOwners";
import DmsDocument from "../../../component/accounts/DealerAccount/DmsDocument";
import DmsVehical from "../../../component/accounts/DealerAccount/DmsVehical";
import DmsLocation from "../../../component/accounts/DealerAccount/DmsLocation";
import DmsAdminFee from "../../../component/accounts/DealerAccount/DmsAdminFee";
import DealerBilling from "../../../component/accounts/DealerAccount/DealerBilling";
import ApplicationType from "../../../component/accounts/DealerAccount/ApplicationType";
import DmsCreditScore from "../../../component/accounts/DealerAccount/DmsCreditScore";
import { update_account_dealer_data } from "../../../../actions/admin/accountActions";
import { useDispatch } from "react-redux";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

const DealerAccountDetail = () => {
    const dispatch = useDispatch()
    const { id } = useParams()
    const [activeTab, setActiveTab] = useState('general')
    const [activeTabChange, setActiveTabChage] = useState(false)
    useEffect(() => {
        const data = {
            user_type: 'dealer',
            id: id
        }
        console.log(data)
        dispatch(update_account_dealer_data(data))
    }, [])
    const submit = (status) => {
        confirmAlert({
            message: 'Are you sure to do this.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        setActiveTab(status)
                        setActiveTabChage(false)
                    }
                },
                {
                    label: 'No',
                    onClick: () => console.log("")
                }
            ]
        });
    };

    return (
        <>
            <Helmet>
                <title>Dealer Account Detail</title>
                <meta name="description" content="" />
            </Helmet>
            <div className="Pending-ListHead">
                <h1>Account #{id}</h1>
                <p style={{ color: "#667085" }} class="py-2">Manage your dealership information and application preferences.</p>
                <hr></hr>
            </div>

            <div className="container pe-5">

                <nav>
                    <div class="dealership nav nav-tabs " id="nav-tab" role="tablist">
                        <button class={activeTab == "general" ? "nav-link active" : "nav-link"} onClick={() => {
                            if (activeTabChange) {
                                submit("general")
                            } else {
                                setActiveTab('general')
                            }

                        }}>General</button>
                        <button class={activeTab == "owner" ? "nav-link active" : "nav-link"} onClick={() => {
                            if (activeTabChange) {
                                submit("owner")
                            } else {
                                setActiveTab('owner')
                            }

                        }
                        }>Owner</button>
                        <button class={activeTab == "documents" ? "nav-link active" : "nav-link"} onClick={() => {
                            if (activeTabChange) {
                                submit("documents")
                            } else {
                                setActiveTab('documents')
                            }

                        }
                        }>Documents</button>
                           <button class={activeTab == "applicationtype" ? "nav-link active" : "nav-link"} onClick={() => {
                            if (activeTabChange) {
                                submit("applicationtype")
                            } else {
                                setActiveTab('applicationtype')
                            }

                        }
                        }>Application Type</button>
                        <button class={activeTab == "vehicle" ? "nav-link active" : "nav-link"} onClick={() => {
                            if (activeTabChange) {
                                submit("vehicle")
                            } else {
                                setActiveTab('vehicle')
                            }

                        }
                        }>Vehicles</button>
                        <button class={activeTab == "location" ? "nav-link active" : "nav-link"} onClick={() => {
                            if (activeTabChange) {
                                submit("location")
                            } else {
                                setActiveTab('location')
                            }

                        }
                        }>Locations</button>
                        <button class={activeTab == "admin_fee" ? "nav-link active" : "nav-link"} onClick={() => {
                            if (activeTabChange) {
                                submit("admin_fee")
                            } else {
                                setActiveTab('admin_fee')
                            }

                        }
                        }>Admin Fee</button>
                        <button class={activeTab == "creditscore" ? "nav-link active" : "nav-link"} onClick={() => {
                            if (activeTabChange) {
                                submit("creditscore")
                            } else {
                                setActiveTab('creditscore')
                            }

                        }
                        }>Credit Score</button>
                        <button class={activeTab == "billing" ? "nav-link active" : "nav-link"} onClick={() => {
                            if (activeTabChange) {
                                submit("billing")
                            } else {
                                setActiveTab('billing')
                            }

                        }
                        }>Billing</button>

                    </div>
                </nav>

                <div class="tab-content" id="nav-tabContent">

                    {activeTab === 'general' && <div class="tab-pane fade show active">
                        <div className="Admin-ActiveList-Container">
                            <div className="tab-content" id="myTabContent">
                                <DealerShipGeneral goToNext={(status) => {
                                    setActiveTabChage(status)
                                }} />
                            </div>
                        </div>
                    </div>}

                    {activeTab === 'owner' && <div class="tab-pane fade show active">
                        <div className="Admin-ActiveList-Container">
                            <div className="tab-content" id="myTabContent">
                                <DealerOwners  goToNext={(status) => {
                                    setActiveTabChage(status)
                                }}/>
                            </div>
                        </div>
                    </div>}


                    {activeTab === 'documents' && <div class="tab-pane fade show active">
                        <div className="Admin-ActiveList-Container">
                            <div className="tab-content" id="myTabContent">
                                <DmsDocument   goToNext={(status) => {
                                    setActiveTabChage(status)
                                }}/>
                            </div>
                        </div>
                    </div>}
                    {activeTab === 'applicationtype' && <div class="tab-pane fade show active">
                        <div className="Admin-ActiveList-Container">
                            <div className="tab-content" id="myTabContent">
                                <ApplicationType userId={id}/>
                            </div>
                        </div>
                    </div>}

                    {activeTab === 'vehicle' && <div class="tab-pane fade show active">
                        <div className="Admin-ActiveList-Container">
                            <div className="tab-content" id="myTabContent">
                                <DmsVehical   goToNext={(status) => {
                                    setActiveTabChage(status)
                                }}/>
                            </div>
                        </div>
                    </div>}



                    {activeTab === 'location' && <div class="tab-pane fade show active">
                        <div className="Admin-ActiveList-Container">
                            <div className="tab-content" id="myTabContent">
                                <DmsLocation   goToNext={(status) => {
                                    setActiveTabChage(status)
                                }}/>
                            </div>
                        </div>
                    </div>}


                    {activeTab === 'admin_fee' && <div class="tab-pane fade show active">
                        <div className="Admin-ActiveList-Container">
                            <div className="tab-content" id="myTabContent">
                                <DmsAdminFee   goToNext={(status) => {
                                    setActiveTabChage(status)
                                }}/>
                            </div>
                        </div>
                    </div>}


                    {activeTab === 'creditscore' && <div class="tab-pane fade show active">
                        <div className="Admin-ActiveList-Container">
                            <div className="tab-content" id="myTabContent">
                                <DmsCreditScore userId={id} />
                            </div>
                        </div>
                    </div>}
                    {activeTab === 'billing' && <div class="tab-pane fade show active">
                        <div className="Admin-ActiveList-Container">
                            <div className="tab-content" id="myTabContent">
                                <DealerBilling userId={id} />
                            </div>
                        </div>
                    </div>}

                </div>
            </div>

        </>
    )
}
export default DealerAccountDetail