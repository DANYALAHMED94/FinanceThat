import React, { Component } from 'react'
import Settings from '../../component/setting/Settings'
import { Helmet } from 'react-helmet';

class DealerAdminSetting extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <React.Fragment>
                <Helmet>
                    <title>Settings</title>
                    <meta name="description" content="" />
                </Helmet>
                <Settings />
            </React.Fragment>
        )
    }
}
export default DealerAdminSetting