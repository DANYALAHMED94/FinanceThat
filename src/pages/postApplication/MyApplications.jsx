import React, { Component } from 'react'
import Application from '../../components/applications/Application'
import { get_post_applications } from '../../actions/postApplication'
import { connect } from 'react-redux'
class MyApplication extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        if(localStorage.getItem('user_type')){
            if(Number(localStorage.getItem('user_type')) === 1){
                if (this.props.user_id !== undefined && this.props.user_id !== null && this.props.user_id !== '') {
                    const data = {
                        user_id: 'my_applications'
                    }
                    this.props.get_post_applications(data)
                }
            }else {
                const data = {
                    user_id: 'apps_on_my_listings'
                }
                this.props.get_post_applications(data)
            }
        }
    }
    render() {
        return (
            <React.Fragment>
                <div className="col-xl-9 col-lg-9 col-md-7 col-sm-12 col-12">
                    <Application post_applications={this.props.post_applications} />
                </div>


            </React.Fragment>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        post_applications: state.postApplication.postApplicationReducer.post_applications,
        user_id: state.authReducer.authentication.user.user_id,
    }
}
export default connect(mapStateToProps, { get_post_applications })(MyApplication)