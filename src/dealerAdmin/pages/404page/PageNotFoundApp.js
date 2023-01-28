import React from 'react'

export default function PageNotFoundApp() {
    return (
        <div className="app-form-content">
            <div className="app-form-content-inner">
                <div className="applicant-info-main">
                    <div class="Admin-PersonalInfo-Container co-applicant-detail-container">
                        <div className="pageNotFound">
                            <div className="mainDiv">
                                <div className="d-block d-md-none"></div>
                                <div>
                                    <img src="/assets/image/404page.svg" alt="404page"></img>
                                    <h2>Sorry, we couldn't find that page</h2>
                                    <h5>
                                        Most likely the page has been removed or there was a typo in the
                                        link.
                                    </h5>
                                </div>

                                <a href="/admin">
                                    <button className="primaryButton">Go to Homepage</button>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}