import React, { Component } from 'react'
import Skeleton from 'react-loading-skeleton';

class SavedAdPlaceHolder extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    render() {
        return (<React.Fragment>
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                <div className="Saveads-Container">
                    <div className="row">

                        <div className="colum-1">
                            <div className="AdImage">
                                <Skeleton width={260} style={{ lineHeight: '16' }} />
                            </div>
                        </div>
                        <div className="colum-2">
                            <div className="AdHeading">
                                <h1>
                                    <Skeleton width={240} style={{ lineHeight: '1' }} />
                                </h1>
                                <Skeleton width={370} style={{ lineHeight: '2' }} />
                            </div>
                            <div className="SaveExpire-Container">
                                <div className="SaveExpire-List">
                                    <h3>
                                        <Skeleton width={52} style={{ lineHeight: '2' }} />
                                    </h3>
                                    <h4>
                                    </h4>
                                </div>
                                <div className="SaveExpire-List">
                                    <h3>
                                        <Skeleton width={52} style={{ lineHeight: '2' }} />
                                    </h3>
                                    <h4>
                                    </h4>
                                </div>
                            </div>
                        </div>
                        <div className="colum-3">
                            <div className="clearfix"></div>
                            <div className="MyBtn-Container">
                                <div className="MyBtn-One">
                                    <Skeleton width={52} style={{ lineHeight: '4', borderRadius: '16px' }} />
                                </div>
                                {/* <div className="MyBtn-Two">
                                    <Skeleton width={138} style={{ lineHeight: '4', borderRadius: '10px', margin: '0 16px 0 0' }} />
                                </div> */}
                                <div className="MyBtn-Three">
                                    <Skeleton width={197} style={{ lineHeight: '4', borderRadius: '10px', margin: '0 16px 0 0' }} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>)
    }
}
export default SavedAdPlaceHolder