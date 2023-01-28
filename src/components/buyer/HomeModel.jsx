import React,{memo} from 'react'

const HomeModel = (props) => {
    return (<>
        <div className="modal fade" id="homeDefaultModel" data-backdrop="static" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document" tabIndex="-1">
                <div className="modal-content">
                    <div className="modal-body">
                        <div className="easy-to-post-container">
                            <div className="colum-left">
                                <div className="modal-logo">
                                    <img src="/assets/image/modal-logo.svg" alt="" />
                                </div>
                                <div className="automated-application-list">
                                    <ul>
                                        <li>Easy to post and manage ads</li>
                                        <li>Automated application process</li>
                                        <li>New grid based listings</li>
                                        <li>Dealer inventory auto sync</li>
                                        <li>Online messaging</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="colum-right">
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => localStorage.setItem('showDefdaultModel', false)}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                                <div className="welcome-improve-head">
                                    <h1>Welcome to our new<br /> and improved website.</h1>
                                    <p>In order to provide you with an enhanced experience, we<br /> have completely revamped our website with new features.<br /> The website is currently in beta mode and any feedback or<br /> bugs reporting will be greatly appreciated.<br /><br />

                                        You can email us your feedback, features request or bugs<br /> reporting to <a href="mailto:feedback@financethat.ca">feedback@financethat.ca</a></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>)
}
export default memo(HomeModel)