import React, { Component } from 'react'
import { Route, Switch, Link } from "react-router-dom";
import UserAdd from "./userAdd";
import UserSaveAdd from "./userSaveAdd";
import UserProfile from './UserProfile'
import Settings from './Settings'
import MyApplications from '../postApplication/MyApplications'
import DMSSideBar from '../../dms/component/sideBar/DMSSideBar'
import DMSHeader from '../../dms/component/header/DMSHeader'
import {
    update_user_profile, update_dealer_profile, change_profile_input, get_dealer_profile_data,
    get_user_profile_data
} from '../../actions/userProfileActions'
import TostarMessages from '../../components/alertMessages/TostarMessages'
import { toastr } from 'react-redux-toastr'
import { connect } from 'react-redux'
import { API_URL } from '../../constant'
import ProfileImageCrop from './ProfileImageCrop'
import $ from 'jquery'
class UserRoute extends Component {
    constructor(props) {
        super(props)
        this.state = {
            changeTab: this.props.location.pathname ? this.props.location.pathname.split('/')[2] !== undefined && this.props.location.pathname.split('/')[2] !== null ? this.props.location.pathname.split('/')[2] === 'my-ads' ? 'my-ad' : this.props.location.pathname.split('/')[2] === 'settings' ? 'my-settings' : this.props.location.pathname.split('/')[2] : 'user-profile' : 'user-profile',
            photo: null,
            image: null,
            preview: null,
            // currentTab: this.props.location.pathname ? this.props.location.pathname.split('/')[2] !== undefined && this.props.location.pathname.split('/')[2] !== null ? this.props.location.pathname.split('/')[2] : 'user-profile' : 'user-profile',
            currentTab: this.props.location.pathname ? this.props.location.pathname.split('/')[2] !== undefined && this.props.location.pathname.split('/')[2] !== null ? this.props.location.pathname.split('/')[2] === 'my-ads' ? 'my-ad' : this.props.location.pathname.split('/')[2] === 'settings' ? 'my-settings' : this.props.location.pathname.split('/')[2] : 'user-profile' : 'user-profile',
            crop: { x: 0, y: 0 },
            zoom: 1,
            aspect: 4 / 3,
        };
        this._handleImageChange = this._handleImageChange.bind(this);
        const activeClass = this.props.location.pathname ? this.props.location.pathname.split('/')[2] !== undefined && this.props.location.pathname.split('/')[2] !== null ? this.props.location.pathname.split('/')[2] : 'user-profile' : 'user-profile'
        this.props.location.pathname.split('/')[2] === 'my-ads' ? $('.my-ad').addClass('active') : this.props.location.pathname.split('/')[2] === 'settings' ? $('.my-settings').addClass('active') : $(`.${activeClass}`).addClass('active');
        this.onCrop = this.onCrop.bind(this)
        this.onClose = this.onClose.bind(this)
        this.onBeforeFileLoad = this.onBeforeFileLoad.bind(this)
        // window.$('#myModal').modal('hide')
    }
    _handleImageChange(e) {
        e.preventDefault();
        let file = e.target.files[0];
        if (file.type !== "image/png" && file.type !== "image/jpg" && file.type !== "image/jpeg") {
            toastr.error('Error', "File does not support. You must use .png, jpeg or .jpg ")
            return false;
        }
        if (file.size > (2 * 1024 * 1024)) {
            toastr.error('Error', "Please upload a file smaller than 2 MB")
            return false;
        }
        if (e.target.files && e.target.files.length > 0) {
            const reader = new FileReader();
            reader.addEventListener('load', () =>
                this.setState({ preview: reader.result })
            );
            reader.readAsDataURL(e.target.files[0]);
        }
        const name = e.target.name;
        // const fileName = e.target.files[0].name
        this.setState({
            ...this.state,
            [name]: file,
            image: URL.createObjectURL(e.target.files[0])
        });

        // reader.readAsDataURL(file)
    }

    componentDidMount() {
        if (this.state.changeTab === 'user-profile') {
            $('.user-profile').addClass('active');
            $('.my-ad').removeClass('active');
            $('.saved-ads').removeClass('active');
            $('.messages').removeClass('active');
            $('.my-application').removeClass('active');
            $('.my-settings').removeClass('active');
        } else if (this.state.changeTab === 'my-ad') {
            $('.my-ad').addClass('active');
            $('.user-profile').removeClass('active');
            $('.saved-ads').removeClass('active');
            $('.messages').removeClass('active');
            $('.my-application').removeClass('active');
            $('.my-settings').removeClass('active');

        } else if (this.state.changeTab === 'saved-ads') {
            $('.saved-ads').addClass('active');
            $('.user-profile').removeClass('active');
            $('.my-ad').removeClass('active');
            $('.messages').removeClass('active');
            $('.my-application').removeClass('active');
            $('.my-settings').removeClass('active');

        } else if (this.state.changeTab === 'messages') {
            $('.messages').addClass('active');
            $('.user-profile').removeClass('active');
            $('.my-ad').removeClass('active');
            $('.saved-ads').removeClass('active');
            $('.my-application').removeClass('active');
            $('.my-settings').removeClass('active');

        } else if (this.state.changeTab === 'my-application') {
            $('.my-application').addClass('active');
            $('.user-profile').removeClass('active');
            $('.my-ad').removeClass('active');
            $('.saved-ads').removeClass('active');
            $('.messages').removeClass('active');
            $('.my-settings').removeClass('active');

        } else {
            $('.my-settings').addClass('active');
            $('.my-application').removeClass('active');
            $('.user-profile').removeClass('active');
            $('.my-ad').removeClass('active');
            $('.saved-ads').removeClass('active');
            $('.messages').removeClass('active');
        }
        // if (this.props.user_id && Number(localStorage.getItem('user_type')) === 2 && Object.keys(this.props.get_user_profile).length === 0) {
        //     this.props.get_dealer_profile_data(this.props.user_id)
        // }
        // if (this.props.user_id && Number(localStorage.getItem('user_type')) === 1 && Object.keys(this.props.get_user_profile).length === 0) {
        //     this.props.get_user_profile_data(this.props.user_id)
        // }
        // this.setState({
        //     changeTab: this.state.changeTab,
        // });
    }

    onChangeTab = (para) => {
        if (para === 'user-profile') {
            $('.user-profile').addClass('active');
            $('.my-ad').removeClass('active');
            $('.saved-ads').removeClass('active');
            $('.messages').removeClass('active');
            $('.my-application').removeClass('active');
            $('.my-settings').removeClass('active');
            this.setState({
                ...this.state,
                currentTab: 'user-profile'
            })
        } else if (para === 'my-ad') {
            $('.my-ad').addClass('active');
            $('.user-profile').removeClass('active');
            $('.saved-ads').removeClass('active');
            $('.messages').removeClass('active');
            $('.my-application').removeClass('active');
            $('.my-settings').removeClass('active');
            this.setState({
                ...this.state,
                currentTab: 'my-ad'
            })
        } else if (para === 'saved-ads') {
            $('.saved-ads').addClass('active');
            $('.user-profile').removeClass('active');
            $('.my-ad').removeClass('active');
            $('.messages').removeClass('active');
            $('.my-application').removeClass('active');
            $('.my-settings').removeClass('active');
            this.setState({
                ...this.state,
                currentTab: 'saved-ads'
            })
        } else if (para === 'messages') {
            $('.messages').addClass('active');
            $('.user-profile').removeClass('active');
            $('.my-ad').removeClass('active');
            $('.saved-ads').removeClass('active');
            $('.my-application').removeClass('active');
            $('.my-settings').removeClass('active');
            this.setState({
                ...this.state,
                currentTab: 'messages'
            })
        } else if (para === 'my-application') {
            $('.my-application').addClass('active');
            $('.user-profile').removeClass('active');
            $('.my-ad').removeClass('active');
            $('.saved-ads').removeClass('active');
            $('.messages').removeClass('active');
            $('.my-settings').removeClass('active');
            this.setState({
                ...this.state,
                currentTab: 'my-application'
            })
        } else {
            $('.my-settings').addClass('active');
            $('.my-application').removeClass('active');
            $('.user-profile').removeClass('active');
            $('.my-ad').removeClass('active');
            $('.saved-ads').removeClass('active');
            $('.messages').removeClass('active');
            this.setState({
                ...this.state,
                currentTab: 'my-settings'
            })
        }
        // this.setState({
        //     ...this.state,
        //     changeTab: para,
        // });
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }

    emptyFunction = () => {
        return true
    }

    onClose() {
        this.setState({
            ...this.state, photo: null,
            image: null,
            preview: null,
        })
    }

    onCrop(preview) {
        // Take To Much Time When Save Croped Image in Bckend
        this.props.change_profile_input('preview', preview)
        this.setState({ ...this.state, preview })
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.photo !== this.state.photo && this.state.photo !== undefined && this.state.photo !== null) {
            window.$('#profileImageCropModel').modal('show')
        }
        if (prevProps.update_profile !== this.props.update_profile) {
            this.setState({
                ...this.state,
                photo: null,
                image: null,
                preview: null,
            })
        }
        // if (prevProps.photo !== this.props.photo && this.props.photo !== null && this.props.photo !== undefined && this.props.photo !== '') {
        //     this.setState({
        //         ...this.state,
        //         photo: null,
        //         image: null,
        //         preview: `${API_URL}/media/${this.props.photo}`,
        //     })
        // }
        if (prevProps.base64_image !== this.props.base64_image && this.props.base64_image) {
            // if (prevProps.base64_image !== this.props.base64_image && this.props.base64_image !== null && this.props.base64_image !== undefined && this.props.base64_image !== '') {
            this.setState({
                ...this.state,
                photo: null,
                image: null,
                preview: `data:image/png;base64,${this.props.base64_image}`,
            })
        }
        // if (prevProps.location !== this.props.location && this.props.location.pathname.split('/')[2] !== undefined && this.props.location.pathname.split('/')[2] !== null && this.props.location.pathname.split('/')[2] === 'my-ads') {
        if (prevProps.location !== this.props.location && this.props.location.pathname.split('/')[2] && this.props.location.pathname.split('/')[2] === 'my-ads') {
            $('.my-ad').addClass('active');
            $('.user-profile').removeClass('active');
            $('.saved-ads').removeClass('active');
            $('.messages').removeClass('active');
            $('.my-application').removeClass('active');
            $('.my-settings').removeClass('active');
            this.setState({
                ...this.state,
                changeTab: 'my-ad',
                currentTab: 'my-ad'
            });
        }
        // if (prevProps.location !== this.props.location && this.props.location.pathname.split('/')[2] != undefined && this.props.location.pathname.split('/')[2] != null && this.props.location.pathname.split('/')[2] === 'settings') {
        if (prevProps.location !== this.props.location && this.props.location.pathname.split('/')[2] && this.props.location.pathname.split('/')[2] === 'settings') {
            $('.my-settings').addClass('active');
            $('.my-ad').removeClass('active');
            $('.user-profile').removeClass('active');
            $('.saved-ads').removeClass('active');
            $('.messages').removeClass('active');
            $('.my-application').removeClass('active');
            this.setState({
                ...this.state,
                changeTab: 'my-settings',
                currentTab: 'my-settings'
            });
        }

    }

    onBeforeFileLoad(e) {
        e.preventDefault();
        let file = e.target.files[0];
        if (file.type !== "image/png" && file.type !== "image/jpg" && file.type !== "image/jpeg") {
            toastr.error('Error', "File does not support. You must use .png, jpeg or .jpg ")
            return false;
        }
        // if (file.size > (2 * 1024 * 1024)) {
        //     toastr.error('Error', "Please upload a file smaller than 2 MB")
        //     return false;
        // }
        if (e.target.files && e.target.files.length > 0) {
            const reader = new FileReader();
            // reader.addEventListener('load', () => {
            //     console.log(reader.result, 'reader.result')
            //     this.setState({ ...this.state, preview: reader.result })
            //     this.props.change_profile_input('preview', reader.result)
            // }
            // );
            reader.readAsDataURL(e.target.files[0]);
        }
        const name = e.target.name;
        this.setState({
            ...this.state,
            [name]: file,
            image: URL.createObjectURL(e.target.files[0])
        });
    }
    onSaveCrop = () => {
        window.$('#profileImageCropModel').modal('hide')
    }
    openModel = () => {
        window.$('#profileImageCropModel').modal('show')
    }
    onCropChange = (crop) => {
        this.setState({ crop })
    }

    onCropComplete = (croppedArea, croppedAreaPixels) => {
        console.log(croppedArea, croppedAreaPixels)
    }

    onZoomChange = (zoom) => {
        this.setState({ zoom })
    }
    componentWillUnmount() {
        this.setState({
            ...this.state, photo: null,
            image: null,
            preview: null,
        })
    }
    render() {
        let first = this.props.firstName !== undefined && this.props.firstName !== null && this.props.firstName !== '' ? this.props.firstName : ''
        let last = this.props.lastName !== undefined && this.props.lastName !== null && this.props.lastName !== '' ? this.props.lastName : ''
        first = first ? first.charAt(0).toUpperCase() : ''
        last = last ? last.charAt(0).toUpperCase() : ''
        return (
            <React.Fragment>
                <DMSHeader />
                <div class="row">
                    <div class="col-2">
                    <DMSSideBar url={this.props.match.url}/>

                    </div>
                    <div class="col-10">

                   

                <Switch>
                    <Route path={`${this.props.match.url}`}
                        exact
                        name="User Profile"
                        render={(props) => <UserProfile {...props} />} />
                    <Route path={`${this.props.match.url}/user-profile`}
                        exact
                        name="User Profile"
                        render={(props) => <UserProfile {...props} />} />
                    <Route path={`${this.props.match.url}/my-ads`}
                        exact
                        name="My Ads"
                        render={(props) => <UserAdd {...props} />} />
                    <Route path={`${this.props.match.url}/saved-ads`}
                        exact
                        name="Saved Ads"
                        render={(props) => <UserSaveAdd {...props} />} />
                    {/* <Route path={`${this.props.match.url}/messages`}
                                    exact
                                    name="Messages"
                                    render={(props) => (<div className="col-xl-9 col-lg-9 col-md-9 col-sm-12 col-12">Design needs to be ready</div>)} /> */}
                    <Route path={`${this.props.match.url}/my-application`}
                        exact
                        name="My Application"
                        render={(props) => <MyApplications {...props} />} />
                    <Route
                        path={`${this.props.match.url}/application/:id`}
                        exact
                        render={(props) => <MyApplications {...props} />} 
                    />
                    <Route path={`${this.props.match.url}/settings`}
                        exact
                        name="Settings"
                        render={(props) => <Settings {...props} />} />
                    {/* <Route path={`${this.props.match.url}/my-application/application-detail/:id`}
                                    exact
                                    name="My Application Detail"
                                    render={(props) => <EditApplication {...props} />} /> */}
                </Switch>
 </div>
                </div>
            </React.Fragment >
        )
    }
}
const mapStateToProps = state => {
    return {
        user_id: state.authReducer.authentication.user.user_id,
        firstName: state.userProfileReducer.firstName,
        lastName: state.userProfileReducer.lastName,
        streetAddress: state.userProfileReducer.streetAddress,
        postalCode: state.userProfileReducer.postalCode,
        city: state.userProfileReducer.city,
        country: state.userProfileReducer.country,
        email: state.userProfileReducer.email,
        telephone: state.userProfileReducer.telephone,
        name: state.userProfileReducer.name,
        firstName: state.userProfileReducer.firstName,
        lastName: state.userProfileReducer.lastName,
        photo: state.userProfileReducer.photo,
        base64_image: state.userProfileReducer.base64_image,
        update_profile: state.userProfileReducer.update_profile,
        get_user_profile: state.userProfileReducer.get_user_profile,
    }
}
export default connect(mapStateToProps, {
    update_user_profile, update_dealer_profile, change_profile_input, get_dealer_profile_data,
    get_user_profile_data
})(UserRoute)