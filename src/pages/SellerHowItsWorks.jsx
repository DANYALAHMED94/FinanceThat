import React, { Component } from 'react'
import SellerHowItWorks from '../components/howItWork/SellerHowItWorks'
import { Helmet } from 'react-helmet';

class HowItsWorks extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    render() {
        return (
            <React.Fragment>
                <Helmet>
                    <title>How it Works – Finance That – We are an automotive and powersports marketplace that help buyers with instant financing online.</title>
                    <meta name="description" content="Choose a vehicle from our marketplace, apply for financing, get instant approval and enjoy your new vehicle. It’s that simple." />
                </Helmet>
                <SellerHowItWorks />
            </React.Fragment>
        )
    }
}
export default HowItsWorks